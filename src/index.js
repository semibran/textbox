import Store from './lib/store'
import { render } from './render'
import { load, icons, palette } from './sprites'

import { copy } from './lib/canvas'
import recolor from './lib/canvas-recolor'
import vshadow from './lib/style-vshadow'
import TextBox from './render/textbox'

const units = [
  { name: 'Chorizo', cell: [2, 7], faction: 'player' },
  { name: 'Orc', cell: [7, 2], faction: 'enemy' }
]

const { init, listen } = Store({
  state: {
    screen: 'game',
    scene: {
      index: 0,
      actors: ['Jimbo'],
      script: [
        [0, 'helo..... Gamer\'s....']
      ]
    },
    game: {
      select: null,
      width: 9,
      height: 9,
      units: units,
      pending: units.filter(unit => unit.faction === 'player'),
      phase: 'player'
    },
    viewport: {
      native: {
        width: 160,
        height: 160
      },
      width: window.innerWidth,
      height: window.innerHeight,
      scale: 2
    }
  },
  actions: {
    switchscr: (state, newscr) =>
      ({ page: newscr }),
    resize: ({ viewport }) => {
      const minhscale = Math.floor(window.innerWidth / viewport.native.width)
      const minvscale = Math.floor(window.innerHeight / viewport.native.height)
      const hscale = Math.max(1, minhscale)
      const vscale = Math.max(1, minvscale)
      const scale = Math.min(hscale, vscale)
      const width = Math.ceil(window.innerWidth / scale)
      const height = Math.ceil(window.innerHeight / scale)
      return { viewport: { ...viewport, width, height, scale } }
    }
  }
})

init(async (state, dispatch) => {
  await load('./sprites.png')
  listen(render)
  dispatch('resize')
  window.addEventListener('resize', _ => dispatch('resize'))

  setTimeout(_ => {
    const boxwidth = Math.min(200, state.viewport.width - 8)
    const write = TextBox('Jimbo', 'Here\'s some long text that displays on two lines.', boxwidth)
    const textbox = write()
    document.querySelector('main').appendChild(textbox)

    // draw a black arrow with a brown shadow
    const arrow = vshadow(recolor(copy(icons.arrow).canvas, palette.jet), palette.taupe)

    // arrow mask for clearing previous draws
    const mask = recolor(copy(arrow).canvas, palette.beige)

    let offset = 0
    let time = 0
    let writing = true
    textbox.addEventListener('animationend', function update () {
      if (writing) {
        writing = write()
      } else {
        const ctx = textbox.getContext('2d')
        const x = textbox.width - 16
        const y = textbox.height - 17
        const a = 0.6 // amplitude
        const d = 30 // cycle duration
        const t = time % d / d // time percentage
        ctx.drawImage(mask, x, y + offset)
        offset = Math.round(Math.sin(t * 2 * Math.PI) * a)
        ctx.drawImage(arrow, x, y + offset)
      }
      time++
      window.requestAnimationFrame(update)
    })
  }, 500)
})

import Store from './lib/store'
import TextBox from './render/textbox'
import { render } from './render'
import { load } from './sprites'

const units = [
  { name: 'Chorizo', cell: [2, 7], faction: 'player' },
  { name: 'Orc', cell: [7, 2], faction: 'enemy' }
]

const { listen, dispatch } = Store({
  state: {
    screen: 'game',
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

;(async function main () {
  await load('./sprites.png')
  const textbox = TextBox('Jimbo',
    'Let\'s say, hypothetically, everything was fine.', 160)
  const canvas = textbox()

  listen(render)
  dispatch('resize')
  window.addEventListener('resize', _ => dispatch('resize'))
  document.querySelector('main')
    .appendChild(canvas)

  window.setTimeout(function update () {
    textbox()
    window.requestAnimationFrame(update)
  }, 500)
})()

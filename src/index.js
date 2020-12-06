import Store from './lib/store'
import patch from './lib/patch'
import cssify from 'css-string'
import { load } from './sprites'
import { view } from './view'

const $main = document.querySelector('main')
const $style = document.createElement('style')
document.head.appendChild($style)

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
      const minscalex = Math.floor(window.innerWidth / viewport.native.width)
      const minscaley = Math.floor(window.innerHeight / viewport.native.height)
      const scalex = Math.max(1, minscalex)
      const scaley = Math.max(1, minscaley)
      const scale = Math.min(scalex, scaley)
      const width = Math.ceil(window.innerWidth / scale)
      const height = Math.ceil(window.innerHeight / scale)
      return { viewport: { ...viewport, width, height, scale } }
    }
  }
})

;(async function main () {
  await load('./sprites.png')

  listen(render)

  dispatch('resize')
  window.addEventListener('resize', _ => dispatch('resize'))
})()

function render (state, dispatch) {
  const { width, height, scale } = state.viewport
  $style.innerHTML = cssify({
    main: {
      width: width + 'px',
      height: height + 'px',
      transform: `scale(${scale})`
    }
  })
  patch($main, view(state, dispatch))
}

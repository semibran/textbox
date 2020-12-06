import Store from './lib/store'
import patch from './lib/patch'
import cssify from 'css-string'
import { init as initspr } from './sprites'
import { view } from './view'

const $main = document.querySelector('main')
const $style = document.createElement('style')
document.head.appendChild($style)

const units = [
  { name: 'Chorizo', cell: [2, 7], faction: 'player' },
  { name: 'Orc', cell: [7, 2], faction: 'enemy' }
]

;(async function main () {
  await initspr('./sprites.png')
  Store({
    state: {
      page: 'game',
      game: {
        select: null,
        width: 9,
        height: 9,
        units: units,
        pending: units.filter(unit => unit.faction === 'player'),
        phase: 'player'
      },
      viewport: {
        nativewidth: 160,
        nativeheight: 160,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 2
      }
    },
    actions: {
      switchpage: (state, newpage) =>
        ({ page: newpage })
    },
    update: (state, dispatch) => {
      const {
        nativewidth: width,
        nativeheight: height,
        scale
      } = state.viewport
      $style.innerHTML = cssify({
        main: {
          background: 'black',
          width: width + 'px',
          height: height + 'px',
          transform: `scale(${scale})`
        }
      })
      patch($main, view(state, dispatch))
    }
  })

  window.addEventListener('resize', evt => {

  })
})()

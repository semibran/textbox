import Store from './lib/store'
import patch from './lib/patch'
import { init as initspr } from './sprites'
import { view } from './view'

const $main = document.querySelector('main')

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
        scale: 1
      }
    },
    actions: {
      switchpage: (state, newpage) =>
        ({ page: newpage })
    },
    update: (state, dispatch) => {
      patch($main, view(state, dispatch))
    }
  })
})()

import Store from './lib/store'
import { init as initview } from './view'
import { load } from './sprites'

const units = [
  { name: 'Chorizo', cell: [2, 7], faction: 'player' },
  { name: 'Orc', cell: [7, 2], faction: 'enemy' }
]

const { init, listen } = Store({
  state: {
    time: 0,
    screen: 'game',
    scene: {
      index: 0,
      writing: true,
      done: false,
      actors: ['???', 'Dodo'],
      script: [
        [0, 'Hi! Let\'s draw some text.'],
        [0, 'Here\'s some long text that displays on two lines.'],
        [1, 'When someone else talks, the text box reanimates.'],
        [1, 'The speaker\'s name is also drawn on the other side.']
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
    update: (state) =>
      ({ time: state.time + 1 }),

    switchscr: (state, _, [newscr]) =>
      ({ screen: newscr }),

    resize: ({ viewport }) => {
      const minhscale = Math.floor(window.innerWidth / viewport.native.width)
      const minvscale = Math.floor(window.innerHeight / viewport.native.height)
      const hscale = Math.max(1, minhscale)
      const vscale = Math.max(1, minvscale)
      const scale = Math.min(hscale, vscale)
      const width = Math.ceil(window.innerWidth / scale)
      const height = Math.ceil(window.innerHeight / scale)
      return { viewport: { ...viewport, width, height, scale } }
    },

    // advance(state)
    // skips the writing phase if writing
    // otherwise, tries to go to the next page
    // if no next page exists, does nothing
    advance: ({ scene }) => {
      if (!scene.script[scene.index + 1]) return { scene }
      // if (scene.writing) return { scene: { ...scene, writing: false } }
      return { scene: { ...scene, writing: true, index: scene.index + 1 } }
    }
  }
})

init(async (state, dispatch) => {
  await load('./sprites.png')
  dispatch('resize')
  initview(state, dispatch, listen)
})

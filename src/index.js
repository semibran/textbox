import Store from './lib/store'
import { init as initViewport } from './viewport'
import { load } from './sprites'
import drawNodes from './node-draw'
import Scene from './screens/scene'
import Script from './script'
import scenedata from './scenes/test.json'

const script = Script(scenedata)

const { init, listen } = Store({
  state: {
    time: 0,
    screen: 'scene'
  }
})

init(async (state, dispatch) => {
  await load('./sprites.png')
  let nodes = null
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  initViewport(160, 160, (width, height, scale) => {
    canvas.width = width
    canvas.height = height
    canvas.style.transform = `scale(${scale})`
    if (nodes) drawNodes(canvas, nodes)
  })
  const scene = Scene(script)
  nodes = scene.render()
  drawNodes(canvas, nodes)
  console.log(...nodes)
})

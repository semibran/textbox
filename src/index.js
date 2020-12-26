import { init as initViewport } from './viewport'
import { load } from './sprites'
import bbox from './node-bbox'
import drawNodes from './node-draw'
import Scene from './screens/scene'
import Script from './script'
import scenedata from './scenes/test.json'

const script = Script(scenedata)

;(async function main (state, dispatch) {
  await load('./sprites.png')
  const scene = Scene(script)
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  initViewport(160, 160, (width, height, scale) => {
    canvas.width = width
    canvas.height = height
    canvas.style.transform = `scale(${scale})`
  })

  let nodes = [] // node cache for clearing previous render
  setTimeout(function update () {
    const ctx = canvas.getContext('2d')
    for (const node of nodes) {
      const bounds = bbox(node)
      const x = Math.round(bounds.left)
      const y = Math.round(bounds.top)
      const width = Math.round(bounds.width)
      const height = Math.round(bounds.height)
      ctx.clearRect(x, y, width, height)
    }
    nodes = scene.render()
    drawNodes(canvas, nodes)
    scene.update()
    window.requestAnimationFrame(update)
  }, 500)
})()

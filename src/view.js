import cssify from 'css-string'
import { copy } from './lib/canvas'
import recolor from './lib/canvas-recolor'
import vshadow from './lib/style-vshadow'
import TextBox from './comps/textbox'
import { init as initviewport } from './viewport'
import { icons, palette } from './sprites'

// const $main = document.querySelector('main')
const $style = document.createElement('style')
document.head.appendChild($style)

// let textbox = null
// let writing = true
// let animating = false
// let speakerid = null
// let index = 0
// let offset = 0
// let arrow = null
// let mask = null

// export function render (state) {
//   if (animating) return false
//   if (writing) {
//     writing = textbox.write()
//   } else {
//     const ctx = textbox.canvas.getContext('2d')
//     const x = textbox.canvas.width - 16
//     const y = textbox.canvas.height - 16
//     const a = 1 // amplitude
//     const d = 45 // cycle duration
//     const t = state.time % d / d // time percentage
//     ctx.drawImage(mask, x, y + offset)
//     offset = Math.round(Math.sin(t * 2 * Math.PI) * a)
//     ctx.drawImage(arrow, x, y + offset)
//   }
// }

export function init (state, dispatch, listen) {
  initviewport(160, 160, console.log)
  // const viewport = state.viewport
  // const { width, height, scale } = viewport
  // // $style.innerHTML = cssify({
  // //   main: {
  // //     width: width + 'px',
  // //     height: height + 'px',
  // //     transform: `scale(${scale})`
  // //   }
  // // })
}

// function onadvance ({ scene }) {
//   if (scene.index === index) return
//   index = scene.index
//   const [id, content] = scene.script[scene.index]
//   if (speakerid !== id) {
//     speakerid = id

//     const $textbox = textbox.canvas
//     animating = true
//     $textbox.classList.add('-exit')
//     $textbox.addEventListener('animationend', function onend () {
//       $textbox.removeEventListener('animationend', onend)
//       $textbox.classList.remove('-exit')

//       const speaker = scene.actors[id]
//       textbox.rename(speaker.name, speaker.side)
//       textbox.load(content)

//       $textbox.classList.add('-enter')
//       $textbox.addEventListener('animationend', function onend () {
//         $textbox.removeEventListener('animationend', onend)
//         $textbox.classList.remove('-enter')
//         animating = false
//         writing = true
//       })
//     })
//   } else {
//     textbox.load(content)
//     writing = true
//   }
// }

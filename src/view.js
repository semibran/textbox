import cssify from 'css-string'
import { copy } from './lib/canvas'
import recolor from './lib/canvas-recolor'
import vshadow from './lib/style-vshadow'
import TextBox from './render/textbox'

const $main = document.querySelector('main')
const $style = document.createElement('style')
document.head.appendChild($style)

let $textbox = null
let write = null
let inited = false
// const boxwidth = Math.min(200, state.viewport.width - 8)
// const write = TextBox('???', 'Here\'s some long text that displays on two lines.', boxwidth)
// const textbox = write()
// document.querySelector('main').appendChild(textbox)

// // draw a black arrow with a brown shadow
// const arrow = vshadow(recolor(copy(icons.arrow).canvas, palette.jet), palette.taupe)

// // arrow mask for clearing previous draws
// const mask = recolor(copy(arrow).canvas, palette.beige)

// let offset = 0
// let time = 0
// let writing = true
// textbox.addEventListener('animationend', function update () {
//   if (writing) {
//     writing = write()
//   } else {
//     const ctx = textbox.getContext('2d')
//     const x = textbox.width - 16
//     const y = textbox.height - 17
//     const a = 1 // amplitude
//     const d = 45 // cycle duration
//     const t = time % d / d // time percentage
//     ctx.drawImage(mask, x, y + offset)
//     offset = Math.round(Math.sin(t * 2 * Math.PI) * a)
//     ctx.drawImage(arrow, x, y + offset)
//   }
//   time++
//   window.requestAnimationFrame(update)
// })

export function render (state) {
  write()
}

export function init ({ viewport, scene }, dispatch) {
  inited = true

  const { width, height, scale } = viewport
  $style.innerHTML = cssify({
    main: {
      width: width + 'px',
      height: height + 'px',
      transform: `scale(${scale})`
    }
  })

  const script = scene.script
  const [speakeridx, content] = script[scene.index]
  const speaker = scene.actors[speakeridx]
  const boxwidth = Math.min(200, viewport.width - 8)
  write = TextBox(speaker, content, boxwidth)
  $textbox = write()
  $textbox.className = 'textbox'

  setTimeout(_ => {
    $main.appendChild($textbox)
    $textbox.addEventListener('animationend', function update () {
      dispatch('update')
      window.requestAnimationFrame(update)
    })
  }, 500)
}

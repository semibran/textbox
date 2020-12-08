import cssify from 'css-string'
import { copy } from './lib/canvas'
import recolor from './lib/canvas-recolor'
import vshadow from './lib/style-vshadow'
import TextBox from './render/textbox'
import { icons, palette } from './sprites'

const $main = document.querySelector('main')
const $style = document.createElement('style')
document.head.appendChild($style)

let $textbox = null
let write = null
let inited = false
let writing = true
let offset = 0
let arrow = null
let mask = null

export function render (state) {
  if (writing) {
    writing = write()
  } else {
    const ctx = $textbox.getContext('2d')
    const x = $textbox.width - 16
    const y = $textbox.height - 16
    const a = 1 // amplitude
    const d = 45 // cycle duration
    const t = state.time % d / d // time percentage
    ctx.drawImage(mask, x, y + offset)
    offset = Math.round(Math.sin(t * 2 * Math.PI) * a)
    ctx.drawImage(arrow, x, y + offset)
  }
}

export function init (state, dispatch) {
  inited = true

  const viewport = state.viewport
  const { width, height, scale } = viewport
  $style.innerHTML = cssify({
    main: {
      width: width + 'px',
      height: height + 'px',
      transform: `scale(${scale})`
    }
  })

  const scene = state.scene
  const [speakeridx, content] = scene.script[scene.index]
  const speaker = scene.actors[speakeridx]
  const boxwidth = Math.min(200, viewport.width - 8)
  write = TextBox(speaker, content, boxwidth)
  $textbox = write()
  $textbox.className = 'textbox'

  // cache black arrow with a brown shadow
  arrow = vshadow(recolor(copy(icons.arrow).canvas, palette.jet), palette.taupe)

  // cache arrow mask for clearing previous draws
  mask = recolor(copy(arrow).canvas, palette.beige)

  window.addEventListener('click', _ => dispatch('advance'))

  setTimeout(_ => {
    $main.appendChild($textbox)
    $textbox.addEventListener('animationend', function update () {
      dispatch('update')
      render(state)
      window.requestAnimationFrame(update)
    })
  }, 500)
}

import { fonts, icons, palette } from '../sprites'
import { width as vw, height as vh } from '../viewport'
import { get as getCharmap } from '../disasm/charmap'
import { create as Canvas, copy } from '../lib/canvas'
import recolor from '../lib/canvas-recolor'
import vshadow from '../lib/style-vshadow'
import split from '../lib/text-split'
import rgb from '../lib/rgb'
import Box from '../render/box'
import Tag from '../render/tag'

const padx = 9
const pady = 8
const tagx = 6
const tagy = 8

export default function TextBox (script) {
  console.log('init textbox with', vw, vh)
  const font = fonts.seven
  const charmap = getCharmap(font, palette.jet)
  const shadowmap = getCharmap(font, palette.taupe)
  const arrow = vshadow(
    recolor(
      copy(icons.arrow).canvas,
      palette.jet
    ), palette.taupe)

  let width = vw
  const height = (font.data.cellheight + font.data.linespace) * 2 + pady * 2
  let box = null
  let ctx = null
  let tag = null
  let x = 0
  let y = 0
  let col = 0
  let row = 0
  let charidx = 0
  let lineidx = 0
  let lines = null
  resize(width)
  load(script)

  const textbox = { canvas: ctx.canvas, load, resize }
  return textbox

  function resize () {
    // set new size
    // rerender contents
    // use stored time value to rerender everything up to that point
    width = vw
    box = Box(width - 2, height - 2)
    ctx = Canvas(width, height + tagy)

    const speaker = script[lineidx].speaker
    rename(speaker.name, speaker.side)
  }

  function rename (name, side = 'left') {
    tag = vshadow(Tag(name), palette.taupe)
    let x = tagx
    if (side === 'right') {
      x = ctx.canvas.width - tag.width - tagx
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(box, 0, tagy)
    ctx.drawImage(tag, x, 0)
  }

  function load (script) {
    lineidx = 0
    loadLine(script[0])
  }

  function loadLine (line) {
    clear()
    x = padx
    y = pady + tagy + 2
    idx = 0
    col = 0
    row = 0
    lines = split(line.content, font.data, width - padx * 2)
  }

  // function update () {
  //   const ctx = textbox.canvas.getContext('2d')
  //   const x = textbox.canvas.width - 16
  //   const y = textbox.canvas.height - 16
  //   const a = 1 // amplitude
  //   const d = 45 // cycle duration
  //   const t = time % d / d // time percentage
  //   ctx.fillStyle = rgb(...palette.beige)
  //   ctx.fillRect(x, y + offset)
  //   offset = Math.round(Math.sin(t * 2 * Math.PI) * a)
  //   ctx.drawImage(arrow, x, y + offset)
  // }

  // function write () {
  //   const char = content[i++]
  //   if (!char) return false
  //   if (char === ' ') {
  //     x += font.data.wordspace
  //   } else {
  //     const image = charmap[char] || charmap[char.toUpperCase()]
  //     if (!image) {
  //       console.warn('No char found for "' + char + '", skipping...')
  //     } else {
  //       const shadow = shadowmap[char] || shadowmap[char.toUpperCase()]
  //       textbox.drawImage(shadow, x + 1, y + 1)
  //       textbox.drawImage(shadow, x, y + 1)
  //       textbox.drawImage(shadow, x + 1, y)
  //       textbox.drawImage(image, x, y)
  //       x += image.width + font.data.charspace
  //     }
  //   }
  //   if (++col > lines[row].length) {
  //     x = padx
  //     y += font.data.cellheight + font.data.linespace
  //     col = 0
  //     row++
  //   }
  //   return true
  // }

  function clear () {
    ctx.fillStyle = rgb(...palette.beige)
    ctx.fillRect(padx, pady + tagy + 1, width - padx * 2, height - pady * 2 + 1)
  }
}

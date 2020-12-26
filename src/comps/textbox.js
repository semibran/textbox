import { fonts, icons, palette } from '../sprites'
import { width as vw, height as vh } from '../viewport'
import { get as getCharmap } from '../disasm/charmap'
import { create as Canvas, copy } from '../lib/canvas'
import lerp from 'lerp'
import EaseOut from '../anims/ease-out'
import recolor from '../lib/canvas-recolor'
import vshadow from '../lib/style-vshadow'
import split from '../lib/text-split'
import rgb from '../lib/rgb'
import Box from '../render/box'
import Tag from '../render/tag'

export { load, render, update }

const margin = 8
const padx = 9
const pady = 8
const tagx = 6
const tagy = 8

let inited = false
let width = 0
let height = 0
let tag = null
let box = null
let ctx = null
let node = null
let anim = null
let font = null
let charmap = null
let shadowmap = null
let arrow = null
let arrowy = 0
let _script = null
let _line = null
let lines = null
let lineidx = 0
let charidx = 0
let writeidx = -1
let writex = 0
let writey = 0
let row = 0
let col = 0
let y = 0
let time = 0

function load (script) {
  _script = script
  lineidx = 0
  loadLine(script[0])
}

function loadLine (line) {
  _line = line
  charidx = -1
  resetPointer()
}

function resetPointer () {
  writeidx = -1
  writex = padx
  writey = pady + tagy + 2
  col = 0
  row = 0
}

function init () {
  inited = true
  font = fonts.seven
  height = (font.data.cellheight + font.data.linespace) * 2 + pady * 2
  charmap = getCharmap(font, palette.jet)
  shadowmap = getCharmap(font, palette.taupe)
  arrow = vshadow(
    recolor(
      copy(icons.arrow).canvas,
      palette.jet
    ), palette.taupe)
  anim = EaseOut(30)
  node = {
    image: null,
    layer: 'ui',
    origin: 'bottom',
    x: 0,
    y: 0
  }
}

function update () {
  if (anim) {
    const t = anim()
    if (t !== -1) {
      y = lerp(vh + ctx.canvas.height, vh - margin, t)
    } else {
      anim = null
    }
  } else if (charidx < _line.content.length - 1) {
    charidx++
  }
}

function render () {
  if (!inited) init()
  const w = vw - margin * 2
  if (width !== w) {
    width = w
    box = Box(width - 2, height - 2)
    ctx = Canvas(width, height + tagy)
    node.x = vw / 2
    lines = split(_line.content, font.data, width - padx * 2)
    rename(_line.speaker.name, _line.speaker.side)
    resetPointer()
  }

  time++
  while (writeidx < charidx) {
    write()
    writeidx++
  }

  if (charidx === _line.content.length - 1) {
    const x = ctx.canvas.width - 16
    const y = ctx.canvas.height - 16
    const a = 1 // amplitude
    const d = 45 // cycle duration
    const t = time % d / d // time percentage
    ctx.fillStyle = rgb(...palette.beige)
    ctx.fillRect(x, y + arrowy, arrow.width, arrow.height)
    arrowy = Math.round(Math.sin(t * 2 * Math.PI) * a)
    ctx.drawImage(arrow, x, y + arrowy)
  }

  node.image = ctx.canvas
  node.y = y
  return node
}

function write () {
  const char = lines[row][col]
  if (!char) return false
  if (char === ' ') {
    writex += font.data.wordspace
  } else {
    const image = charmap[char] || charmap[char.toUpperCase()]
    if (!image) {
      console.warn('No char found for "' + char + '", skipping...')
    } else {
      const shadow = shadowmap[char] || shadowmap[char.toUpperCase()]
      ctx.drawImage(shadow, writex + 1, writey + 1)
      ctx.drawImage(shadow, writex, writey + 1)
      ctx.drawImage(shadow, writex + 1, writey)
      ctx.drawImage(image, writex, writey)
      writex += image.width + font.data.charspace
    }
  }

  if (++col > lines[row].length) {
    writex = padx
    writey += font.data.cellheight + font.data.linespace
    col = 0
    row++
  }

  return true
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

// export default function TextBox (script) {

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

//   function clear () {
//     ctx.fillStyle = rgb(...palette.beige)
//     ctx.fillRect(padx, pady + tagy + 1, width - padx * 2, height - pady * 2 + 1)
//   }
// }

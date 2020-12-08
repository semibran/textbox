import { get as getCharmap } from '../disasm/charmap'
import { create as Canvas, copy } from '../lib/canvas'
import recolor from '../lib/canvas-recolor'
import vshadow from '../lib/style-vshadow'
import split from '../lib/text-split'
import rgb from '../lib/rgb'
import { fonts, palette } from '../sprites'
import Box from './box'
import Tag from './tag'

export default function TextBox (name, content, width) {
  const xpad = 9
  const ypad = 8
  const tagoffset = 8
  const font = fonts.seven

  const innerwidth = width - xpad * 2
  const height = (font.data.cellheight + font.data.linespace) * 2 + ypad * 2
  const box = Box(width - 2, height - 2)
  let tag = null

  const textbox = Canvas(width, height + tagoffset)
  textbox.drawImage(box, 0, tagoffset)
  rename(name)

  const charmap = getCharmap(font, palette.jet)
  const shadowmap = getCharmap(font, palette.taupe)
  let i, x, y, col, row, lines
  load(content)

  return { canvas: textbox.canvas, write, load, rename }

  function write () {
    const char = content[i++]
    if (!char) return false
    if (char === ' ') {
      x += font.data.wordspace
    } else {
      const image = charmap[char] || charmap[char.toUpperCase()]
      if (!image) {
        console.warn('No char found for "' + char + '", skipping...')
      } else {
        const shadow = shadowmap[char] || shadowmap[char.toUpperCase()]
        textbox.drawImage(shadow, x + 1, y + 1)
        textbox.drawImage(shadow, x, y + 1)
        textbox.drawImage(shadow, x + 1, y)
        textbox.drawImage(image, x, y)
        x += image.width + font.data.charspace
      }
    }
    if (++col > lines[row].length) {
      x = xpad
      y += font.data.cellheight + font.data.linespace
      col = 0
      row++
    }
    return true
  }

  function load (text) {
    clear()
    i = 0
    x = xpad
    y = tag.height - 2 + ypad
    col = 0
    row = 0
    content = text
    lines = split(content, font.data, innerwidth)
  }

  function clear () {
    textbox.fillStyle = rgb(...palette.beige)
    textbox.fillRect(xpad, ypad + tagoffset + 1, width - xpad * 2, height - ypad * 2 + 1)
  }

  function rename (name) {
    tag = vshadow(Tag(name), palette.taupe)
    textbox.drawImage(tag, 6, 0)
  }
}

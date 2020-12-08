import { get as getCharmap } from '../disasm/charmap'
import { create as Canvas } from '../lib/canvas'
import vshadow from '../lib/style-vshadow'
import split from '../lib/text-split'
import rgb from '../lib/rgb'
import { fonts, palette } from '../sprites'
import Box from './box'
import Tag from './tag'

export default function TextBox (name, content, width) {
  const padx = 9
  const pady = 8
  const tagx = 6
  const tagy = 8
  const font = fonts.seven

  const innerwidth = width - padx * 2
  const height = (font.data.cellheight + font.data.linespace) * 2 + pady * 2
  const box = Box(width - 2, height - 2)
  let tag = null

  const textbox = Canvas(width, height + tagy)
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
      x = padx
      y += font.data.cellheight + font.data.linespace
      col = 0
      row++
    }
    return true
  }

  function load (text) {
    clear()
    i = 0
    x = padx
    y = pady + tagy + 2
    col = 0
    row = 0
    content = text
    lines = split(content, font.data, innerwidth)
  }

  function clear () {
    textbox.fillStyle = rgb(...palette.beige)
    textbox.fillRect(padx, pady + tagy + 1, width - padx * 2, height - pady * 2 + 1)
  }

  function rename (name, side = 'left') {
    tag = vshadow(Tag(name), palette.taupe)
    let x = tagx
    if (side === 'right') {
      x = textbox.canvas.width - tag.width - tagx
    }
    textbox.clearRect(0, 0, textbox.canvas.width, textbox.canvas.height)
    textbox.drawImage(box, 0, tagy)
    textbox.drawImage(tag, x, 0)
  }
}

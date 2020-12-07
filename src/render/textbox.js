import { get as getCharmap } from '../disasm/charmap'
import { create as Canvas, copy } from '../lib/canvas'
import recolor from '../lib/canvas-recolor'
import split from '../lib/text-split'
import { fonts, palette } from '../sprites'
import Box from './box'
import Tag from './tag'

export default function TextBox (name, content, width) {
  const xpad = 9
  const ypad = 8
  const tagoffset = 4
  const font = fonts.seven

  const innerwidth = width - xpad * 2
  const lines = split(content, font.data, innerwidth)
  const height = (font.data.cellheight + font.data.linespace) * 2 + ypad * 2
  const box = Box(width - 2, height - 2)
  const tag = Tag(name)
  // const texts = lines.map(line => Text(line, style))

  const textbox = Canvas(width, height + tag.height - tagoffset)
  textbox.drawImage(box, 0, tag.height - tagoffset)
  textbox.drawImage(recolor(copy(tag).canvas, palette.taupe), 6, 1)
  textbox.drawImage(tag, 6, 0)

  // let y = tag.height - 2 + ypad
  // for (const text of texts) {
  //   textbox.drawImage(text, xpad, y)
  //   y += font.cellheight + font.linespace
  // }

  let i = -1
  let x = xpad
  let y = tag.height - 2 + ypad
  let col = 0
  let row = 0
  const charmap = getCharmap(font, palette.jet)
  const shadowmap = getCharmap(font, palette.taupe)

  return function write () {
    const char = content[i++]
    if (i === 0) return textbox.canvas
    if (!char) return null
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
    return textbox.canvas
  }
}

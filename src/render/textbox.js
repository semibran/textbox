import { create as Canvas, copy } from '../lib/canvas'
import recolor from '../lib/canvas-recolor'
import findTextWidth from '../lib/text-width'
import split from '../lib/text-split'
import { fonts, palette } from '../sprites'
import Text from './text'
import Box from './box'
import Tag from './tag'

export default function TextBox (name, content, width) {
  const xpad = 8
  const ypad = 8
  const tagoffset = 4
  const font = fonts.seven
  const style = {
    color: palette.jet,
    shadow: palette.taupe
  }

  const innerwidth = width - xpad * 2
  const lines = split(content, font.data, innerwidth)
  const height = (font.data.cellheight + font.data.linespace) * 2 + ypad * 2
  const box = Box(width - 1, height - 1)
  const tag = Tag(name)
  const texts = lines.map(line => Text(line, style))

  const textbox = Canvas(width, height + tag.height - tagoffset)
  textbox.drawImage(box, 0, tag.height - tagoffset)
  textbox.drawImage(recolor(copy(tag).canvas, palette.taupe), 6, 1)
  textbox.drawImage(tag, 6, 0)

  let y = tag.height - 2 + ypad
  for (const text of texts) {
    textbox.drawImage(text, xpad, y)
    y += font.data.cellheight + font.data.linespace
  }

  return textbox.canvas
}

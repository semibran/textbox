import { fonts, palette } from '../sprites'
import { create as Canvas } from '../lib/canvas'
import findTextWidth from '../lib/find-textwidth'
import drawShadow from '../lib/style-shadow'
import makeCharmap from '../disasm/charmap'

export default function Text(content, style, width) {
  style = Object.assign({
    font: fonts.seven,
    color: palette.white,
    shadow: null
  }, style)
  const font = style.font
  if (!font) {
    throw new Error('Attempting to render an unregistered font.' +
      ' Is your font exported by fonts/index.js?')
  }
  let charmap = font.cache[style.color]
  if (!charmap) {
    charmap = makeCharmap(font.image, font.data, style.color)
    font.cache[style.color] = charmap
  }
  content = content.toString()
  if (!width) {
    width = findTextWidth(content, font, style.stroke)
  }
  let height = font.data.cellheight
  if (style.stroke) {
    height += 2
  }
  const text = Canvas(width, height)
  let x = 0
  let kerning = font.data.charspace
  if (style.stroke) {
    kerning -= 2
  }
  for (const char of content) {
    if (char === ' ') {
      x += font.data.wordspace
      continue
    }
    let image = charmap[char]
    if (!image) image = charmap[char.toUpperCase()]
    if (!image) continue
    text.drawImage(image, x, 0)
    x += image.width + kerning
  }
  if (style.shadow) {
    return drawShadow(text.canvas, style.shadow)
  } else {
    return text.canvas
  }
}

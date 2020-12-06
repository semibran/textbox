import { fonts } from '../sprites'
import { create as Canvas } from '../lib/canvas'
import findTextWidth from '../lib/find-textwidth'

export const Text = (content, style, width) => {
  style = Object.assign({ font: fonts.seven }, style)
  const font = style.font
  if (!font) {
    throw new Error('Attempting to render an unregistered font.' +
      ' Is your font exported by fonts/index.js?')
  }
  const charmap = font.charmap
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
  return text.canvas
}

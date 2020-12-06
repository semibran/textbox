import extract from 'img-extract'
import replaceColors from '../lib/canvas-replace'
import { copy } from '../lib/canvas'

export default function disasmTags (image, palette) {
  const tags = {}
  const oldColors = [
    [255, 255, 255, 255],
    [204, 204, 204, 255],
    [153, 153, 153, 255],
    [102, 102, 102, 255],
    [51, 51, 51, 255],
    [0, 0, 0, 255]
  ]
  const yellows = [palette.yellow, palette.gold, palette.brass]
  const colors = {
    default: [palette.brass, palette.brown, palette.jet],
    player: [palette.opal, palette.coal, palette.jet],
    enemy: [palette.pink, palette.maroon, palette.jet],
    ally: [palette.lime, palette.moss, palette.jet]
  }

  for (const scheme in colors) {
    const subpal = colors[scheme]
    const newColors = yellows.concat(subpal)
    const canvas = copy(image).canvas
    replaceColors(canvas, oldColors, newColors)
    tags[scheme] = {
      start: extract(canvas, 0, 0, 2, 12),
      end: extract(canvas, 2, 0, 3, 12),
      palette: subpal
    }
  }

  return tags
}

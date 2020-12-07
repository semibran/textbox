import { create as Canvas } from '../lib/canvas'
import rgb from '../lib/rgb'
import Text from './text'
import { tags, palette } from '../sprites'

export default function renderNameTag (name, faction) {
  const pady = 2
  const text = Text(name, { shadow: palette.jet })
  const width = 52
  const height = pady + text.height - 1 + pady
  const tag = renderTag(width, height, faction)
    .getContext('2d')
  const x = Math.ceil(width / 2 - (text.width - 1) / 2)
  tag.drawImage(text, x, pady)
  return tag.canvas
}

function renderTag (width, height, faction) {
  if (!faction) faction = 'default'
  const palette = tags[faction].palette
  const tag = Canvas(width + 1, height)
  tag.fillStyle = rgb(...palette[0])
  tag.fillRect(2, 0, width - 3, 1)
  tag.fillStyle = rgb(...palette[1])
  tag.fillRect(2, 1, width - 3, height - 2)
  tag.fillStyle = rgb(...palette[2])
  tag.fillRect(2, height - 1, width - 3, 1)
  tag.drawImage(tags[faction].start, 0, 0)
  tag.drawImage(tags[faction].end, width - 2, 0)
  return tag.canvas
}

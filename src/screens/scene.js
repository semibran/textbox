import { icons, palette } from '../sprites'
import { copy } from '../lib/canvas'
import recolor from '../lib/canvas-recolor'
import vshadow from '../lib/style-vshadow'
import rgb from '../lib/rgb'
import Textbox from '../comps/textbox'

const comps = []
let textbox = null

export default function Scene (script) {
  textbox = Textbox(script)
  return { render }
}

function render () {
  const $textbox = {
    image: textbox.canvas,
    layer: 'ui',
    x: 0,
    y: 0
  }
  return [$textbox]
}

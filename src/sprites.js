import srcmap from '../dist/tmp/sprites.json'
import loadImage from 'img-load'
import disasm from './lib/disasm'
import disasmFonts from './fonts/disasm'
import * as fontdata from './fonts'

export let sprites = null
export let fonts = null

export async function init (path) {
  const sheet = await loadImage(path)
  const images = disasm(sheet, srcmap)
  sprites = {}
  fonts = disasmFonts(images, fontdata)
  return sprites
}

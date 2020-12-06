import srcmap from '../dist/tmp/sprites.json'
import loadImage from 'img-load'
import disasm from './lib/disasm'
import disasmPalette from './disasm/palette'
import disasmFonts from './disasm/fonts'
import disasmTags from './disasm/tags'
import * as fontdata from './fonts'

export let palette = null
export let fonts = null
export let tags = null

export async function load (path) {
  const sheet = await loadImage(path)
  const images = disasm(sheet, srcmap)
  palette = disasmPalette(images.palette)
  fonts = disasmFonts(images, fontdata)
  tags = disasmTags(images.tags, palette)
}

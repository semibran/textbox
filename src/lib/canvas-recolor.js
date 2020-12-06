// recolor(canvas, color) -> canvas
// > replaces all non-transparent pixels in `canvas` with `color`
export default function recolor (canvas, color) {
  const context = canvas.getContext('2d')
  const image = context.getImageData(0, 0, canvas.width, canvas.height)
  if (!color[3]) {
    color = [color[0], color[1], color[2], 255]
  }
  for (let i = 0; i < image.data.length; i += 4) {
    if (image.data[i + 3] === 0) continue
    for (let c = 0; c < 4; c++) {
      image.data[i + c] = color[c]
    }
  }
  context.putImageData(image, 0, 0)
  return canvas
}

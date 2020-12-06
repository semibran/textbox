export function create (width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d')
}

export function copy (canvas) {
  const result = create(canvas.width, canvas.height)
  result.drawImage(canvas, 0, 0)
  return result
}

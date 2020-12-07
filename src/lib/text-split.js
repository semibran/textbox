export default function split (text, font, width) {
  const lines = []
  let space = 0
  let split = 0
  let x = 0
  let i = 0
  for (; i < text.length; i++) {
    const char = text[i]
    if (char === ' ') {
      x += font.wordspace
      space = i
    } else {
      const except = font.exceptions[char]
      if (except && except.width) {
        x += except.width + font.charspace
      } else {
        x += font.charwidth + font.charspace
      }
    }
    if (x > width) {
      x = 0
      if (space) {
        lines.push(text.slice(split, space))
        split = space + 1
        space = 0
      } else if (i > split) {
        lines.push(text.slice(split, i))
        split = i
      } else {
        lines.push(text.slice(split, split + 1))
        split = i + 1
      }
    }
  }
  const line = text.slice(split, i)
  if (line) lines.push(line)
  return lines
}

export default function EaseOut (duration) {
  let done = false
  let time = 0
  return function update () {
    if (done) return -1
    const t = time / (duration - 1)
    const x = easeOut(t)
    if (++time === duration) {
      done = true
    }
    return x
  }
}

export function easeOut (t) {
  return -t * (t - 2)
}

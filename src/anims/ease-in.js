export default function EaseIn (duration, data) {
  let done = false
  let time = 0
  return Object.assign(function update () {
    if (done) return -1
    const t = time / (duration - 1)
    const x = easeIn(t)
    if (++time === duration) {
      done = true
    }
    return x
  }, { data })
}

function easeIn (t) {
  return t * t
}

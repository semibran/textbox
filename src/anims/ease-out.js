export default function EaseOut (duration, data) {
  let done = false
  let time = 0
  function update () {
    if (done) return -1
    const t = time / (duration - 1)
    const x = easeOut(t)
    if (++time === duration) {
      done = true
    }
    return x
  }

  update.data = data
  return update
}

function easeOut (t) {
  return -t * (t - 2)
}

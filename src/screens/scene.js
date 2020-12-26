import * as textbox from '../comps/textbox'

export default function Scene (script) {
  textbox.load(script)
  return { render, update }
}

function update () {
  textbox.update()
}

function render () {
  const $textbox = textbox.render()
  return [$textbox]
}

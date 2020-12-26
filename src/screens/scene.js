import * as textbox from '../comps/textbox'

export default function Scene (script) {
  textbox.load(script)
  return { render, update, click }
}

function render () {
  const $textbox = textbox.render()
  return [$textbox]
}

function update () {
  textbox.update()
}

function click () {
  textbox.next()
}

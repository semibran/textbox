import cssify from 'css-string'
import patch from '../lib/patch'
import { view } from '../view'

const $main = document.querySelector('main')
const $style = document.createElement('style')
document.head.appendChild($style)

export const render = (state, dispatch) => {
  const { width, height, scale } = state.viewport
  $style.innerHTML = cssify({
    main: {
      width: width + 'px',
      height: height + 'px',
      transform: `scale(${scale})`
    },
    canvas: {
      position: 'absolute',
      bottom: 0,
      margin: '4px 0'
    }
  })
  patch($main, view(state, dispatch))
}

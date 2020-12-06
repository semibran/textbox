import { main } from './lib/vdom'
import { Text } from './view/render-text'

export const view = (state, dispatch) =>
  main(Text('Hello world!'))

// when i say Text in my DOM tree, i actually mean
// "create a Text component that will get updated whenever i call this fn again"

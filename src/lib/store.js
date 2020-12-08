export default function Store ({ state, actions }) {
  const listeners = { '*': [] }
  for (const cmdname in actions) {
    listeners[cmdname] = []
  }

  const patches = /* JSON.parse(window.localStorage.patches || null) || */ []
  if (patches.length) {
    state = revert(state, patches)
  } else {
    state = { ...state }
  }

  const init = (fn) => {
    fn(state, dispatch)
  }

  const listen = (cmdname, fn) => {
    if (!listeners[cmdname]) {
      throw new Error('Failed to listen for action ' + cmdname + ':' +
        'Action has not been defined')
    }
    listeners[cmdname].push(fn)
  }

  const dispatch = (cmdname, ...cmdargs) => {
    const action = actions[cmdname]
    if (!action) {
      throw new Error('Failed to dispatch command:' +
        ' No corresponding action found for command ' + cmdname)
    }
    const patch = action(state, dispatch, cmdargs)
    Object.assign(state, patch)
    patches.push(patch)
    // window.localStorage.patches = JSON.stringify(patches) // assumes state is serializable!

    for (const fn of listeners['*'].concat(listeners[cmdname])) {
      fn(state, dispatch)
    }
    return patch
  }

  return { init, listen, dispatch }
}

// revert(state, patch[]) -> state
// reconstruct state given an initial state and list of patches
function revert (state, patches) {
  state = { ...state }
  const keys = []
  for (const key in state) {
    keys.push(key)
  }
  for (let i = patches.length - 1; keys.length && i--;) {
    const patch = patches[i]
    for (const key in patch) {
      const idx = keys.indexOf(key)
      if (idx === -1) continue
      keys.splice(idx, 1)
      state[key] = patch[key]
      if (!keys.length) break
    }
  }
  return state
}

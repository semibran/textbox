// patch(Element, vnode) -> Element
// Updates an existing DOM element to match the given vnode.
// The returned element may be used in case the element's tag changes,
// at which point a new element needs to be created.
export default function patch (el, node) {
  if (!(el instanceof window.Element || el instanceof window.Text)) {
    throw new Error('Patch operation failed: Provided target is not an Element or Text node')
  }

  if (Array.isArray(node)) {
    throw new Error('Patch operation failed: Cannot patch from an array of nodes')
  }

  const tag = el.tagName
  const data = el.attributes
  const content = el.childNodes

  // just create a new element if the new tag is different
  if (!tag || typeof tag !== typeof node.tag ||
  tag !== node.tag.toUpperCase() || el.key !== node.data.key) {
    const newel = manifest(node)
    if (el.parentNode) {
      el.parentNode.replaceChild(newel, el)
    }
    return newel
  }

  // leave keyed elements alone
  if (el.key) return el

  // remove attributes on old element
  // if they are missing from new node
  for (let i = 0; i < data.length; i++) {
    const attr = data[i]
    const attrid = attr.name
    if (!node.data[attrid]) {
      el.removeAttribute(attrid)
    }
  }

  // add new node attributes to old element
  // if they are missing from old element
  for (const propname in node.data) {
    const propval = node.data[propname]
    if (typeof propval === 'function') {
      if (el[propname] === propval) continue
      el[propname] = propval
    } else if (propname === 'key') {
      el.key = propval
    } else if (el.getAttribute(propname) !== propval.toString()) {
      el.setAttribute(propname, propval)
    }
  }

  // ignore whitespace in old element
  for (let i = 0; i < content.length; i++) {
    const child = content[i]
    if (child instanceof window.Text && !child.data.trim()) {
      el.removeChild(child)
    }
  }

  // remove null children in new node
  for (let i = 0; i < node.content.length; i++) {
    if (node.content[i] == null) {
      node.content.splice(i--, 1)
    }
  }

  // remove extra children from old element
  // if they are missing from new element
  // TODO: determine if there's a faster way
  //   to find which elements were removed
  while (content.length > node.content.length) {
    el.removeChild(content[content.length - 1])
  }

  // patch remaining children
  for (let i = 0; i < node.content.length; i++) {
    let child = content[i]
    const newchild = node.content[i]
    if (!child) {
      // nothing to patch, add a new element
      child = manifest(newchild)
      if (child) el.appendChild(child)
    } else if (child instanceof window.Element || typeof newchild === 'object') {
      // general situation: patch existing child to reflect new child data
      patch(child, newchild)
    } else if (child.data !== newchild) {
      // for textnode: just change content
      child.data = newchild
    }
  }

  return el
}

// manifest(node) -> Element
// Converts a vnode and all its children to a DOM element.
function manifest (node) {
  // ignore if node is already an element
  // useful for stateful elements eg. canvas
  if (node instanceof window.Element) return node

  // convert primitive values to text nodes
  if (!node || typeof node !== 'object') {
    return document.createTextNode(node)
  }

  const tag = node.tag
  const data = node.data
  const content = node.content
  const el = document.createElement(tag)

  // assign attributes
  for (const name in data) {
    const value = data[name]
    el[name] = value
    // don't display eg. event handlers as attributes
    if (typeof value !== 'function') {
      el.setAttribute(name, value)
    }
  }

  // add children
  for (let i = 0; i < content.length; i++) {
    // ignore null and undefined children
    if (content[i] == null) continue

    // recurse until all children are DOM elements
    const child = manifest(content[i])
    if (!child) continue

    el.appendChild(child)
  }

  return el
}

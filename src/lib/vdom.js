// h(data, content) -> vnode
// facilitates vnode creation through contextualized h functions

const EMPTY_OBJ = {}
const h = tag => (data, content) => {
  // perform arg switch if first arg is an array or primitive
  if (data === undefined || typeof data !== 'object' ||
  data instanceof window.Element || Array.isArray(data)) {
    content = data
    data = EMPTY_OBJ
  }

  // ensure content is always an array
  if (content === undefined) {
    content = []
  } else if (!Array.isArray(content)) {
    content = [content]
  }

  return { tag, data, content }
}

const a = h('a')
const abbr = h('abbr')
const address = h('address')
const area = h('area')
const article = h('article')
const aside = h('aside')
const audio = h('audio')
const b = h('b')
const base = h('base')
const bdi = h('bdi')
const bdo = h('bdo')
const blockquote = h('blockquote')
const body = h('body')
const br = h('br')
const button = h('button')
const canvas = h('canvas')
const caption = h('caption')
const cite = h('cite')
const code = h('code')
const col = h('col')
const colgroup = h('colgroup')
const data = h('data')
const datalist = h('datalist')
const dd = h('dd')
const del = h('del')
const details = h('details')
const dfn = h('dfn')
const dialog = h('dialog')
const div = h('div')
const dl = h('dl')
const dt = h('dt')
const em = h('em')
const embed = h('embed')
const fieldset = h('fieldset')
const figcaption = h('figcaption')
const figure = h('figure')
const footer = h('footer')
const form = h('form')
const h1 = h('h1')
const h2 = h('h2')
const h3 = h('h3')
const h4 = h('h4')
const h5 = h('h5')
const h6 = h('h6')
const head = h('head')
const header = h('header')
const hgroup = h('hgroup')
const hr = h('hr')
const html = h('html')
const i = h('i')
const iframe = h('iframe')
const img = h('img')
const input = h('input')
const ins = h('ins')
const kbd = h('kbd')
const label = h('label')
const legend = h('legend')
const li = h('li')
const link = h('link')
const main = h('main')
const map = h('map')
const mark = h('mark')
const math = h('math')
const menu = h('menu')
const meta = h('meta')
const meter = h('meter')
const nav = h('nav')
const noscript = h('noscript')
const object = h('object')
const ol = h('ol')
const optgroup = h('optgroup')
const option = h('option')
const output = h('output')
const p = h('p')
const param = h('param')
const picture = h('picture')
const pre = h('pre')
const progress = h('progress')
const q = h('q')
const rp = h('rp')
const rt = h('rt')
const ruby = h('ruby')
const s = h('s')
const samp = h('samp')
const script = h('script')
const section = h('section')
const select = h('select')
const slot = h('slot')
const small = h('small')
const source = h('source')
const span = h('span')
const strong = h('strong')
const style = h('style')
const sub = h('sub')
const summary = h('summary')
const sup = h('sup')
const svg = h('svg')
const table = h('table')
const tbody = h('tbody')
const td = h('td')
const template = h('template')
const textarea = h('textarea')
const tfoot = h('tfoot')
const th = h('th')
const thead = h('thead')
const time = h('time')
const title = h('title')
const tr = h('tr')
const track = h('track')
const u = h('u')
const ul = h('ul')
const video = h('video')
const wbr = h('wbr')

export {
  a, abbr, address, area, article, aside, audio, b, base, bdi, bdo,
  blockquote, body, br, button, canvas, caption, cite, code, col, colgroup,
  data, datalist, dd, del, details, dfn, dialog, div, dl, dt, em, embed,
  fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, head,
  header, hgroup, hr, html, i, iframe, img, input, ins, kbd, label, legend, li,
  link, main, map, mark, math, menu, meta, meter, nav, noscript, object, ol,
  optgroup, option, output, p, param, picture, pre, progress, q, rp, rt, ruby,
  s, samp, script, section, select, slot, small, source, span, strong, style,
  sub, summary, sup, svg, table, tbody, td, template, textarea, tfoot, th,
  thead, time, title, tr, track, u, ul, video, wbr
}

import { isFunction } from '../../utils'

const nodeList = new Map()

const runHandler = el => {

  nodeList.forEach(i => {
    i.forEach(t => {
      if (!t.el.contains(el.target) && (t.white && t.white.every(w => !w.contains(el.target)))) {
        t.fn && t.fn()
      }
    })
  })
}

document.addEventListener('click', runHandler, true)

export const CgClickOut = {
  mounted(el, { value }) {
    if (!nodeList.get(el)) {
      nodeList.set(el, [])
    }
    nodeList.get(el).push({
      el: el,
      fn: isFunction(value) ? value : value.fn ? value.fn : null,
      white: value.white || [],
    })
  },
  unmounted(el) {
    nodeList.delete(el)
  },
}

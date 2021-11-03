import { createApp } from '@vue/runtime-dom'
import { isObject } from './index'

export const getSlotsVNodeEls = VNode => {
  const result = []

  VNode.forEach(item => {
    if (item.el) {
      result.push(item.el)
    } else if (isObject(item.type)) {
      console.log(item)
      result.push(...getSlotsVNodeEls(item.setup(item.type.props).render()))
    } else {
      console.log(item.type.render())
    }
  })

  return result
}

const myBox = document.createElement('div')
export const getComponetApp = (comp, props) => {
  const compObj = createApp(comp, props)
  const app = compObj.mount(myBox)

  return {
    app,
    el: myBox.firstChild,
  }
}

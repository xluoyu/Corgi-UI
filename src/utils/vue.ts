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

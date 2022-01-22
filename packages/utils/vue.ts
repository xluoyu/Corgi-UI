import { createApp, h } from 'vue'
import { isObject } from './index'

// export const getSlotsVNodeEls = VNode => {
//   const result = []

//   VNode.forEach(item => {
//     if (item.el) {
//       result.push(item.el)
//     } else if (isObject(item.type)) {
//       console.log(item)
//       result.push(...getSlotsVNodeEls(item.setup(item.type.props).render()))
//     } else {
//       console.log(item.type.render())
//     }
//   })

//   return result
// }

// export const getComponetApp = (comp, props) => {
//   const myBox = document.createElement('div')
//   const compObj = createApp(comp, props)
//   const app = compObj.mount(myBox)
//   ;(app as typeof app & { unMount: () => void; }).unMount = compObj.unmount
//   return app
// }

import Mask from './Mask.vue'
import { createApp } from 'vue'

const MaskApp = createApp(Mask)
const newDom = document.createElement('div')
const maskVNode = MaskApp.mount(newDom) as any
let curEl = null
export const useShowMask = () => {
  const show = () => {
    if (!curEl) {
      curEl = document.querySelector('body').appendChild(newDom.firstChild)
    } else {
      maskVNode.$show()
    }
  }
  const close = () => {
    maskVNode.$hide()
  }
  show()
  return {
    show,
    close,
  }
}

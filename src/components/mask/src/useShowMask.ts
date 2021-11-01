import Mask from './Mask.vue'
import { createApp, ref } from 'vue'

const isShow = ref(false)
const MaskApp = createApp(Mask, { isShow })
const newDom = document.createElement('div')
const maskVNode = MaskApp.mount(newDom)
let curEl = null
export const useShowMask = () => {
  const show = () => {
    if (!curEl) {
      curEl = document.querySelector('body').appendChild(newDom.firstChild)
    } else {
      // curEl.style.display = 'block'
      (maskVNode.$root as any).show()
    }
  }
  const close = () => {
    // curEl.style.display = 'none'
    (maskVNode.$root as any).hide()
  }
  show()
  return {
    show,
    close,
  }
}

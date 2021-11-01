import Mask from './Mask.vue'
import { createApp, ref } from 'vue'

const isShow = ref(false)
const MaskObj = createApp(Mask, { isShow })
const newDom = document.createElement('div')
MaskObj.mount(newDom)
let curEl = null
export const useShowMask = () => {
  const show = () => {
    if (!curEl) {
      curEl = document.querySelector('body').appendChild(newDom.firstChild)
    } else {
      // curEl.style.display = 'block'
      isShow.value = true
    }
  }
  const close = () => {
    // curEl.style.display = 'none'
    console.log(MaskObj)
    isShow.value = false
  }
  console.log(isShow)
  show()
  return {
    show,
    close,
  }
}

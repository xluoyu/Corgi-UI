import Mask from './Mask.vue'
import { computed, createApp } from 'vue'


interface IMask { isShow: Boolean; show: () => void; hide: () => void; }
export const useShowMask = () => {

  const MaskApp = createApp(Mask)
  const newDom = document.createElement('div')
  let MaskEl = null
  let curEl = null
  if (!curEl) {
    MaskEl = MaskApp.mount(newDom) as unknown as IMask
    curEl = document.querySelector('body').appendChild(newDom.firstChild)
  }
  return {
    status: computed(() => MaskEl.isShow),
    show: MaskEl.show,
    close: MaskEl.hide,
  }
}

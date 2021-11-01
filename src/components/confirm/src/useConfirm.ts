import { createApp, VNode } from 'vue'
import Confirm from './Confirm.vue'


interface options {
  title?: string
  type?: 'success' | 'warning' | 'info' | 'error'
  content: string | VNode
}

const defaultOptions: options = {
  title: '提示',
  content: '这是弹框内容',
  type: 'success',
}


export const useConfirm = (options: options = defaultOptions) => {
  const newDom = document.createElement('div')

  const confirmApp = createApp(Confirm, { ...options })

  const confirmComp = confirmApp.mount(newDom)
  document.querySelector('body').appendChild(newDom.firstChild)

  const unMount = () => {
    confirmApp.unmount()
  }

  ;(confirmComp as any).setUnMount(unMount)

  const res = {
    then: fn => {
      (confirmComp as any).confirmCb(fn)
      return res
    },
    catch: fn => {
      (confirmComp as any).cancelCb(fn)
    },
  }

  return res
}

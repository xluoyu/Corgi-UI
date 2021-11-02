import { createApp, VNode } from 'vue'
import Confirm from './Confirm.vue'
import { isFunction } from '@corgi/utils'
import { useShowMask } from '@corgi/index'


interface options {
  title?: string
  type?: 'success' | 'warning' | 'info' | 'error'
  content: string | VNode
  success?: () => void
  cancel?: () => void
  close?: () => void
  callback?: (type: String) => void
}

const defaultOptions: options = {
  title: '提示',
  content: '这是弹框内容',
  type: 'success',
}


export const useConfirm = (options: options = defaultOptions) => {
  const newDom = document.createElement('div')

  const confirmApp = createApp(Confirm, { ...options, isFixed: true })

  const confirmComp = confirmApp.mount(newDom) as any
  document.querySelector('body').appendChild(newDom.firstChild)

  const showMask = useShowMask()

  confirmComp.closeAddFn(() => {
    showMask.close()
    confirmApp.unmount()
  })

  if (options.success && isFunction(options.success)) {
    confirmComp.confirmAddFn(options.success)
  }
  if (options.cancel && isFunction(options.cancel)) {
    confirmComp.cancelAddFn(options.cancel)
  }
  if (options.callback && isFunction(options.callback)) {
    confirmComp.closeAddFn(options.callback)
  }

  const res = {
    then: fn => {
      confirmComp.confirmAddFn(fn)
      return res
    },
    catch: fn => {
      confirmComp.cancelAddFn(fn)
    },
  }

  return res
}

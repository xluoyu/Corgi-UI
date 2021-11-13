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


export const useConfirm = (options: options) => {
  const newDom = document.createElement('div')

  const confirmApp = createApp(Confirm, { ...options, isFixed: true })

  const confirmComp = confirmApp.mount(newDom) as any

  console.log(confirmComp.submit)
  document.querySelector('body').appendChild(newDom.firstChild)
  const showMask = useShowMask()
  showMask.show()

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

useConfirm.success = options => {
  options.type = 'success'
  useConfirm(options)
}
useConfirm.warning = options => {
  options.type = 'warning'
  useConfirm(options)
}
useConfirm.error = options => {
  options.type = 'error'
  useConfirm(options)
}
useConfirm.info = options => {
  options.type = 'info'
  useConfirm(options)
}

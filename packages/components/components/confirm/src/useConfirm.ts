import { createApp, VNode, nextTick, h } from 'vue'
import MessageBox from './Confirm.vue'
import { isFunction } from '@corgi-box/utils'
import { CgMask } from 'corgi-box'

interface options {
  title?: string
  type?: 'success' | 'warning' | 'info' | 'error'
  content: string | VNode
  success?: () => void
  cancel?: () => void
  close?: () => void
  callback?: (type: String) => void
}

interface MessageBoxResult {
  then: (fn: Function) => MessageBoxResult
  catch: (fn: Function) => void
}

const createMessageBox = (options: options, type: 'confirm' | 'alert'): MessageBoxResult => {
  const newDom = document.createElement('div')
  const componentApp = createApp(CgMask, { slot: h(MessageBox, { ...options, useType: type, isFixed: true }) } )

  const componentAppMounted = componentApp.mount(newDom).$root as any

  document.querySelector('body').appendChild(newDom.firstChild)

  nextTick(() => {
    componentAppMounted.visible = true

    const confirmComp = componentAppMounted.slotRef

    confirmComp.addFn(() => {
      componentAppMounted.visible = false

      setTimeout(() => {
        componentApp.unmount()
      }, 500)
    }, 'close')

    if (options.success && isFunction(options.success)) {
      confirmComp.addFn(options.success, 'confirm')
    }
    if (options.cancel && isFunction(options.cancel)) {
      confirmComp.addFn(options.cancel, 'cancel')
    }
    if (options.callback && isFunction(options.callback)) {
      confirmComp.addFn(options.callback, 'close')
    }
  })

  const res: MessageBoxResult = {
    then: fn => {
      nextTick(() => {
        componentAppMounted.slotRef.addFn(fn, 'confirm')
      })
      return res
    },
    catch: fn => {
      nextTick(() => {
        componentAppMounted.slotRef.addFn(fn, 'cancel')
      })
    },
  }

  return res
}

export const useConfirm = (options: options) => {
  return createMessageBox(options, 'confirm')
}

export const useAlert = (options: options) => {
  return createMessageBox(options, 'alert')
}

useAlert.success = (options: options) => {
  options.type = 'success'
  return useAlert(options)
}
useAlert.warning = (options: options) => {
  options.type = 'warning'
  return useAlert(options)
}
useAlert.error = (options: options) => {
  options.type = 'error'
  return useAlert(options)
}


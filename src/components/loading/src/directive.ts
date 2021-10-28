import { createApp } from 'vue'
import { isBoolean } from '@corgi/utils/typeTool'
import Loading from './Loading.vue'

const createLoadParent = () => {
  const loadingEl = document.createElement('div')
  loadingEl.className = 'cg-loading'
  loadingEl.addEventListener('click', e => {
    e.stopPropagation()
  })
  return loadingEl
}

const mounApp = el => {
  if (el.cgLoading) return
  el.loadingEl = createLoadParent()
  el.loadingApp = createApp(Loading)
  el.loadingApp.mount(el.loadingEl)
  el.style.position = 'relative'
  el.appendChild(el.loadingEl)
  el.cgLoading = true
}

const ummounApp = el => {
  if (!el.cgLoading) return
  el.loadingApp.unmount()
  el.removeChild(el.loadingEl)
  el.cgLoading = false
}


export const loadingDirective = {
  type: 'directive',
  install: app => {
    app.directive('cg-loading', {
      mounted(el, { value }) {
        if (isBoolean(value)) {
          if (value) {
            mounApp(el)
          }
        } else {
          mounApp(el)
        }
      },
      updated(el, { value }) {
        if (isBoolean(value)) {
          if (value) {
            mounApp(el)
          } else {
            ummounApp(el)
          }
        }
      },
    })
  },
}

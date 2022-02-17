import * as components from '@corgi-box/components'
import * as directives from '@corgi-box/directives'
import version from './version'
import { App } from 'vue'
console.log(components)
const componentArray = Object.keys(components).map(key => components[key])
const directivesArray = Object.keys(directives).map(key => Object.assign(directives[key], { key }))
const create = {
  version,
  install (app: App) {
    componentArray.forEach(component => {
      if (component.type === 'directive') {
        app.use(component)
      }
      if (component.name) {
        app.component(component.name, component)
      }
    })
    directivesArray.forEach(directive => {
      app.use({
        install: app => {
          app.directive(directive.key, directive)
        },
      })
    })
  },
}

export default create

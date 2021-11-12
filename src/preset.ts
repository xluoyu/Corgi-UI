import * as components from './components'
import * as directives from './directives'
import version from './version'
import { App } from 'vue'

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

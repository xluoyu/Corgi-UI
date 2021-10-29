import * as components from './components'
import * as directives from './directives'
import version from './version'
import { App } from 'vue'

const componentArray = Object.keys(components).map(key => components[key])
const directivesArray = Object.keys(directives).map(key => directives[key as keyof typeof components])
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
      app.use(directive)
    })
  },
}

export default create

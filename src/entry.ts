import { App } from 'vue'
import version from './version'
import * as components from './components'

const componentArray = Object.keys(components).map(key => components[key as keyof typeof components])

const componentPrefix = 'Cg'

const create = {
  version,
  componentPrefix,
  install (app: App) {
    componentArray.forEach(component => {
      const {name} = component
      const registered = app.component(componentPrefix + name)
      if (!registered) {
      console.log(componentPrefix + name)
        app.component(componentPrefix + name, component)
      }
    })
  }
}

export default create
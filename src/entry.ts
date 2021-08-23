import { App } from 'vue'
import version from './version'
import {componentPrefix} from './config'
import * as components from './components'

const componentArray = Object.keys(components).map(key => components[key as keyof typeof components])

const create = {
  version,
  componentPrefix,
  install (app: App) {
    componentArray.forEach(component => {
      app.use(component.default)
    })
  }
}

export default create
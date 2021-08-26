import * as components from './components'
import version from './version'
import {componentPrefix} from './config'
import { App } from 'vue'

const componentArray = Object.keys(components).map(key => components[key as keyof typeof components])

const create = {
  version,
  componentPrefix,
  install (app: App) {
    componentArray.forEach(component => {
      app.use(component)
    })
  }
}

export default create
import genDts from './gen-dts'
import * as Paths from './paths'

const BUILD_KEY = process.env.BUILD_KEY

const InputPath = (() => {
  switch (BUILD_KEY) {
    case 'directives':
      return Paths.directiveRoot
    case 'hooks':
      return Paths.hooksRoot
    case 'utils':
      return Paths.utilsRoot
    case 'corgi':
      return Paths.corgiRoot
  }
})()

genDts(InputPath)


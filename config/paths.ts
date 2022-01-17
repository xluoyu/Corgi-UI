import { resolve } from 'path'

const projRoot = resolve(__dirname, '../')
const pkgRoot = resolve(projRoot, './packages')
const compRoot = resolve(pkgRoot, './components')
const utilsRoot = resolve(pkgRoot, './utils')
const hooksRoot = resolve(pkgRoot, './hooks')
const directiveRoot = resolve(pkgRoot, './directives')
const corgiRoot = resolve(pkgRoot, './Corgi-box')

export {
  projRoot,
  pkgRoot,
  compRoot,
  utilsRoot,
  hooksRoot,
  directiveRoot,
  corgiRoot,
}

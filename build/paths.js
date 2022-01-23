import { resolve } from 'path'

export const projRoot = resolve(__dirname, '../') // 项目根目录
export const pkgRoot = resolve(projRoot, './packages') // 包目录
export const compRoot = resolve(pkgRoot, './components') // 组件
export const utilsRoot = resolve(pkgRoot, './utils') // 工具
export const hooksRoot = resolve(pkgRoot, './hooks') // hooks
export const directiveRoot = resolve(pkgRoot, './directives') // 指令
export const corgiRoot = resolve(pkgRoot, './Corgi-box') // 库入口

// export {
//   projRoot,
//   pkgRoot,
//   compRoot,
//   utilsRoot,
//   hooksRoot,
//   directiveRoot,
//   corgiRoot,
// }

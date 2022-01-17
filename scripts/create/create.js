const fs = require('fs')
const ejs = require('ejs')
const path = require('path')

function resulve(url) {
  return path.resolve(__dirname, url)
}

const ComponentsIndexTemplate = resulve('./template/component/index.ejs')
const createComponentIndex = (url, options) => {
  return new Promise(reslove => {
    ejs.renderFile(ComponentsIndexTemplate, { options: options }, (err, str) => {
      if (err) { console.log(err); return }
      try {
        fs.opendirSync(url)
      } catch (err) {
        fs.mkdirSync(url)
      }

      fs.writeFileSync(path.join(url, `./index.ts`), str)
      reslove()
    })
  })
}

const ComponentsStyleTemplate = resulve('./template/component/styleVar.ejs')
const createComponentCssVal = (url, options) => {
  return new Promise(reslove => {
    ejs.renderFile(ComponentsStyleTemplate, { options: options }, (err, str) => {
      if (err) { console.log(err); return }
      try {
        fs.opendirSync(url)
      } catch (err) {
        fs.mkdirSync(url)
      }

      fs.writeFileSync(path.join(url, `./styleVar.ts`), str)
      reslove()
    })
  })
}

/**
 * 生成组件
 */
const ComponentsVueTemplate = resulve('./template/component/component.ejs')
const createComponentVue = (url, options) => {
  return new Promise(reslove => {
    ejs.renderFile(ComponentsVueTemplate, { options: options }, (err, str) => {
      if (err) { console.log(err); return }

      fs.writeFileSync(path.join(url, `./${options.fileName}.vue`), str)
      reslove()
    })
  })
}

/**
 * 往/src/components/index 中添加组件引用
 * @param {*} rootPath /src/components/index
 * @param {*} componentName
 * @returns
 */
const addComponentImport = (rootPath, componentName) => {
  return new Promise(reslove => {
    const IndexFile = path.resolve(rootPath, './index.ts')
    fs.writeFile(IndexFile, `export * from './${componentName}'\n`, { flag: 'a' }, err => {
      console.log(err)
    })
    reslove()
  })
}

/**
 * 生成组件模块的入口
 */
const createComponent = async (rootPath, options) => {
  let componentUrl = path.join(rootPath, `./${options.name}`)
  let componentSrcUrl = path.join(rootPath, `./${options.name}/src`)
  await createComponentIndex(componentUrl, options)
  await createComponentCssVal(componentSrcUrl, options)
  await createComponentVue(componentSrcUrl, options)
  await addComponentImport(rootPath, options.name)
}

/**
 * 生成自定义指令的模块内容
 */
const DirectiveIndexTemplate = resulve('./template/directive/index.ejs')
const createDirective = async (rootPath, options) => {
  let componentUrl = path.join(rootPath, `./${options.name}`)
  ejs.renderFile(DirectiveIndexTemplate, { options: options }, (err, str) => {
    if (err) { console.log(err); return }
    try {
      fs.opendirSync(url)
    } catch (err) {
      fs.mkdirSync(url)
    }

    fs.writeFileSync(path.join(componentUrl, `./index.ts`), str)
  })
}

module.exports = {
  createComponent,
  createDirective,
}

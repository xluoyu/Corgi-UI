## 2021-08-17
这是这个项目的第一篇日记。之前封装组件都是些小打小闹，这次打算认真地做出一个自己的组件库。

项目的名称暂且命名为Corgi（柯基）

大致翻看了`elementui`和`NaiveUI`的源码，最后还是决定仿照`NaiveUI`的框架来写

```js
Corgi-UI                   
├─ build                     // 主要用于demo.md / note.md的解析工作
├─ demo                      // 这是组件库展示用的项目     
├─ notes                     // 用于写笔记
├─ src                       // 主目录
│  ├─ components             // 封装组件   
│  ├─ styles                   
│  └─  utils                 // 后续的话打算在这里增加一些对指令、Hooks工具的封装
└─ index.html                 
```

目前只是先大致列出了项目的结构，后续可能会再做出调整

### 关于markdown的解析

当前的难点：markdown的解析。

md解析好麻烦啊，之前没有做过。

简单分析了`Naive`的md解析，编写了一个`vite`插件，在调用md时触发编译操作，通过使用`marked`来解析md文件，对于不同的内容形式标签做了个性化处理`在源码的 build -> loaders -> md-renderer`, 写入自定义的`className`、样式、标签结构。

划分了doc与demo的区别

> doc用于展示整体的md，包含title content code-card props 等

> demo仅用于展示code-card

一下是对button组件md加载时的分析，其他组件同理

以router的形式加载button的demos文件，入口为`index.demo-enter.md`

通过后缀来区分整体md和组件示例

```js
if (path.endsWith('.demo.md')){
    return dmeoLoader(code) // 需要渲染组件示例的card
} else if (path.endsWith('.md')) {
    return docLoader(code) // 需要渲染文档页面
}
```

渲染文档页面时，使用字符串的形式进行拼接

![image-20210818110820985](https://cdn.jsdelivr.net/gh/xluoyu/image-riverbed@latest/images/image-20210818110820985.png)

> 如何引入代码示例？

在编写entry.md时

```
```demo
basic
size
test
```

以代码块的形式，语言选择`dmeo`，写上响应的示例文件名

在拼装文档页面时

```js
const demosIndex = tokens.findIndex(
    (token) => token.type === 'code' && token.lang === 'demo'
  )
```

找到这些需要再次引入的子文档，以引入`vue`组件的形式拼接在文档页面上

```html
<basicDemo/>
<sizeDemo/>
<testDemo/>
```

```js
import basicDemo from './basic.demo.md'
import sizeDemo from './size.demo.md'
import textDemo from './text.demo.md'

components: {
    basicDemo,
    sizeDemo,
   	textDemo
}
```

此时完成文档拼接并引入后会触发对demo子模块的引入。

对于demo的引入，区分了`langeuage`使用`highlightjs`来自语法点亮

在展示项目中全局引入了`component-demo`组件，该组件就是用来展示示例组件的，

并且准备了调用模板

```hmtl
<template>
  <component-demo
    demo-file-name="<!--DEMO_FILE_NAME-->"
    relative-url="<!--URL-->"
    title="<!--TITLE_SLOT-->"
    code="<!--CODE_SLOT-->"
  >
    <template #title>
      <!--TITLE_SLOT-->
    </template>
    <template #content>
      <!--CONTENT_SLOT-->
    </template>
    <template #demo>
      <div class="demo-card__view">
        <!--DEMO_SLOT-->
      </div>
    </template>
  </component-demo>
</template>
```

之后的工作就是用fs引入模板，使用正则匹配`<!--TITLE_SLOT-->`等，将解析出的md的相应部分替换进去，然后到处`vue组件`已供调用。

> 可优化的点

* 以js字符串拼接的形式个人感觉不太清晰，最好可以将模板单独抽离，虽然对灵活性有一定影响，但可以是代码更直观，方便后续修改

## 2021-08-18

基本完成了`button`组件的开发

对于样式变量的方案，还是决定采用vue3.2的`v-bind`来做

将样式变量分为全局和组件专有

全局主要存放主题等通用变量

![image-20210819100201746](https://cdn.jsdelivr.net/gh/xluoyu/image-riverbed@latest/images/image-20210819100201746.png)

在使用时需要与组件变量混合，以组件变量为主。

记得在使用变量组时要做下浅拷贝，避免修改某个变量后会对后续的组件造成影响。

![image-20210819101745773](https://cdn.jsdelivr.net/gh/xluoyu/image-riverbed@latest/images/image-20210819101745773.png)

## 2021-08-19

ok，写这篇日记的时候已经20号了。

带我回想一下昨天做了什么。

大概是写了一个用于创建新组建的快捷脚本，主要是使用`ejs`为模板，通过命令行交互来拷贝出文件，等这个项目大致稳定了可以考虑出一个针对UI组件库项目的cli。

其实对于cli来讲，需要做的功能大致就是命令交互，然后将特定信息导入到模板中，生成项目架构。

嗯嗯，理想很丰满，但愿可以实现。

## 2021-08-20

今天终于把md的解析做了出来，虽然大部分的想法都是节点`naiveUI`的，但好歹出口来效果了。

![image-20210820225130249](https://cdn.jsdelivr.net/gh/xluoyu/image-riverbed@latest/images/image-20210820225130249.png)

顿时觉得自己帮帮的。

下一步就是把首页做好，然后先开发首页搭建要用的组件

目前计划是：

菜单

弹框

布局

加油吧~！

## 2021-08-25
已经是25号了，今天终于把打包搞定了。

```
// 打包前
src                           
├─ components                  
│  └─ button      
│     ├─ demos                
│     │  ├─ index.md            
│     │  └─ type.demo.md   
│     ├─ src      
│     │  ├─ Button.vue        
│     │  └─ styleVar.ts     
│     └─ index.ts             
├─ hooks                      
│  └─ useToggle               
│     └─ index.ts             
├─ styles                     
│  ├─ base.less               
│  └─ variable.less           
├─ utils                             
│  ├─ index.ts                 
│  └─ error.ts                 
├─ components.ts              
├─ config.ts                  
├─ hooks.ts                   
├─ index.ts                   
├─ preset.ts                  
├─ version.ts                 
└─ vue-shim.d.ts              

```

```
// 打包后
es                            
├─ cg-button                   
│  ├─ src                      
│  │  ├─ Button.vue.d.ts       
│  │  └─ styleVar.d.ts         
│  ├─ index.d.ts               
│  └─ index.js                           
├─ hooks                       
│  ├─ useToggle.d.ts           
│  └─ useToggle.js             
├─ utils                       
│  ├─ index.d.ts               
│  ├─ index.js                            
│  ├─ error.d.ts                
│  └─ error.js                  
├─ components.d.ts             
├─ components.js               
├─ config.d.ts                 
├─ config.js                   
├─ hooks.d.ts                  
├─ hooks.js                    
├─ index.d.ts                  
├─ index.esm.js                
├─ index.js                    
├─ preset.d.ts                 
├─ preset.js                   
├─ version.d.ts                
└─ version.js                  

```

本次打包主要采用rollup，参考了`Element UI`的打包方式

### 打包思路

虽然EL在`scripts`中放置了很多打包时用到的命令，但是其主要打包方式还是走`build.sh`的shell命令。

EL使用`lerna`来做包管理，具体用法明天再分析

先是使用`yarn build:type`来打包出`ts`的类型文件，由于使用SFC形式来写组件，普通的`tsc`无法做到对`.vue`文件的类型输出，所以使用`ts-morph`来灵活的处理类型打包。

(以下代码来自 corgi 的打包方案，与EL有所不同)

#### 首先是对组件的打包

[源码]: https://github.com/xluoyu/Corgi-UI/blob/master/build/rollup.components.config.js	"github"



```
yarn build:component
```

所用到的插件

```
const plugins = [
  nodeResolve(), // rollup查找外部模块 @rollup/plugin-node-resolve
  vue({
    preprocessStyles: true,
    target: 'browser'
  }), // vue解析 rollup-plugin-vue
  postcss(), // vue中css解析 rollup-plugin-postcss
  vueJsx(), // vue中jsx的解析  rollup-plugin-vue-jsx-compat
  esbuild({jsxFactory: "vueJsxCompat"}) //rollup-plugin-esbuild
]
```

由于corgi编写组件时使用了vue的SFC方式，加上jsx的语法，所以需要额外引用解析jsx的插件。

没有做样式分离，直接将组件的样式打进该组件的包中

```js
/**
 * 使用fs对所有的组件进行遍历、打包
 */
const INPUT_PATH = path.resolve(__dirname, "../src")

export default fs.readdirSync(`${INPUT_PATH}/components`).map((name) => {
  const input = `${INPUT_PATH}/components/${name}/index.ts`
  return {
    input,
    plugins: [...plugins],
    external: ['vue'],
    output: {
      name: "index",
      file: `${OUTPUT_PATH}/cg-${name}/index.js`,
      format: "es",
      paths: (id) => {
        // 这里对于组件引用到的其他工具做了路径解析
        // 生成的位置还要看个人的打包需求
        // 改写了路径之后就不会将这些包在打入组件包中了，也实现了功能的分离
        if (/@components/.test(id)) {
          return '../cg-' + id.slice('@components/'.length);
        }
        if (/@hooks/.test(id)) {
          return '../hooks/' + id.slice('@hooks/'.length)
        }
        if (/@utils/.test(id)) {
          return '../utils/' + id.slice('@utils/'.length)
        }
      }
    },
    onwarn
  };
})
```

#### 对Hooks、Utils的打包

对与Hooks、Utils的打包就可以直接使用常规的rollup打包方式进行打包了。

注意，如果使用了alias，也尽量与组件中的paths一样，做一下转义。

[源码]: https://github.com/xluoyu/Corgi-UI/blob/master/build/rollup.components.config.js	"github"
以上两步顺利完成之后我们就得到了这些
```
es                            
├─ cg-button                           
│  └─ index.js                           
├─ hooks                                
│  └─ useToggle.js             
└─ utils                                   
   ├─ index.js                                           
   └─ error.js   
```

此时还需要对入口的文件进行打包，由于入口文件只要是对组件各个组件、hooks中各个功能的引用，所以也不需要特殊处理，可以放在后面做ts导出类型时直接导出js源文件。

#### 导出类型

由于使用了.vue文件，无法直接通过tsc导出.vue的类型文件

所以需要做些特殊处理 

[源码]: https://github.com/xluoyu/Corgi-UI/blob/master/build/gen-type.js	"GitHub"

主要使用的第三方包为

```js
const { Project } = require('ts-morph') // 可以更灵活的配置ts类型的导出
const vueCompiler = require('@vue/compiler-sfc') // 用来解析vue的sfc文件
const klawSync = require('klaw-sync') // 用来批量获取文件 
```

```js
// 配置下ts用到的配置
const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true, // 生成声明文件
      noEmitOnError: false, // 发送错误时不输出任何文件
      outDir: getFilePath('../types'), // 目标目录
      baseUrl: getFilePath('../'),
      paths: {
        '@components/*': ["src/components/*"],
        '@hooks/*': ["src/hooks/*"],
        '@utils/*': ["src/utils/*"],
      },
      exclude: [
        "node_modules"
      ]
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })
```

```js

/**
   * 读取src下的所有文件
   * 
   * 过滤测试用文件，只留下.ts/.vue类型的文件
   */
  const filePaths = klawSync(getFilePath('../src'), {
    nodir: true,
  }).map(item => item.path)
    .filter(e => !/\.spec/.test(e))
    .filter(e => /\.ts|\.vue/.test(e))
```

```js
// 待编译文件数组
 const sourceFiles = []
  
await Promise.all(
    filePaths.map(async file => {
      /**
       * 对vue文件生成vue.d.ts
       */
      if (file.endsWith('.vue')) {
        const content = await fs.promises.readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const {script, scriptSetup} = sfc.descriptor
        /**
         * 因为ts只能是对ts的编译，所以要提取.vue中的ts内容
         */
        if (script || scriptSetup) {
          let content = ''
          let isTS = false
          // 获取<script>的内容、并标记语言
          if (script && script.content) {
            content += script.content
            if (script.lang === 'ts') isTs = true
          }
          /**
            * 因为是<script setup>的语法，需要额外调用compileScript
            * 
            *	该api可以从vue描述符中获取script的内容

            * 这里需要一个必填的第二个参数 options{id: string}
            * 主要是用来生成css的hash的，所以此时可以随意填
            */
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
            if (scriptSetup.lang === 'ts') isTS = true
          }
          // 将处理好的内容使用ts-morph的APi生成待编译文件
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) + (isTS ? '.ts' : '.js'),
            content
          )
          // 放到待编译数组中
          sourceFiles.push(sourceFile)
        }
      } else if (file.endsWith('.ts')) {
        // 对于普通的ts 直接添加上文件链接，放到数组中
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    })
  )

/**
 * 开始执行编译
 */
await project.emit({
   emitOnlyDtsFiles: true, // 只编译指定内容
})
 
// 输入编译好的文件
 for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath()
      await fs.promises.writeFile(filepath, outputFile.getText(), 'utf-8')
    }
 }

```

此时通过ts编译我们得到了types文件夹，在这个文件夹中既有.d.ts的类型文件，还有源码的js文件。(EL在`compilerOptions`配置了`emitDeclarationOnly： true`，没有生成js文件)。

#### 整合

[源码]: https://github.com/xluoyu/Corgi-UI/blob/master/build/merge-type.js	"github"

现在我们要做的就是将types中的类型文件和生成的入口文件都放到`es`文件夹中

首先我们要删除一些文件，由于之前的组件、hooks都是通过rollup打包好的，所以不需要在添加源码的js文件了，我们需要把这些没用的文件删除掉。(生成的vue源码文件只有script中的内容，无法正常使用)

```js
const INPUT_PATH = path.resolve(__dirname, '../types')
/**
 * 遍历types文件夹
 * 
 * 删除掉除types根目录以外的.js文件
 */
function clearJS () {
  klawSync(INPUT_PATH, {
    nodir: true,
  }).map(item => item.path)
    .filter(e => /\.js/.test(e))
    .filter(e => !/types\\\w+\.js/.test(e))
    .forEach(file => {
      fs.unlinkSync(file)
    })
}
```

之后就可以进行文件移动了。

由于代码有点长就不贴了。可以去看源码，这里简单讲下。

通过fs进行遍历，对每个文件进行判断，如果是文件就直接移动到es中相应的位置，如果时文件夹就进行递归处理。对于`components -> button -> src` 这种src文件夹可以直接移动src文件夹。

移动API `fs.rename(oldPath, newPath, callback)`

判断文件夹API `fs.statSync(file).isDirectory()`

在全部移动完后，types文件夹只剩下一个空壳子了。我们就可以删掉它了。

```js
function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file) {
          var curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) {
              deleteFolderRecursive(curPath);
          } else {
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
  }
};
```

至此，打包已完成。

#### 按需加载

因为这次做打包的目的就是奔着按需加载去的，所以打的都是ES包。

在`package.json`中添加`"sideEffects": false`就可以在使用该组件库的项目打包时启用`tree shaking`功能，只打包用到的内容。

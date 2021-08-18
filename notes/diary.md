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

![image-20210818110820985](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210818110820985.png)

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

今天的任务是做md解析工作！

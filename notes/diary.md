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

## 2021-08-23

今天基本完成了自定义的滚动条组件

下午准备开始搞打包

## 2021-08-24
今天依旧是沉迷打包的一天

`naive ui` 全部以tsc的形式打包，是由于其全篇使用`ts + tsx`的特点，但对于这个项目不太适用，因为这个项目使用了vue的SFC。

初步考虑使用rollup来做打包，目前打出来的包不太满意，

### 简单用法

```vue
<template>
  <div class="text">
    看看我的颜色
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
    
const textColor = ref('#ff7904')
</script>

<style>
  .text{
    color: v-bind('textColor')
  }
</style>
```



### 1. 它与`css var` 的不同

首先 `v-bind `可以直接使用 `vue`中声明的响应式变量，更方便直接地操作样式

### 2. 它的运行流程

#### 2.1 简短描述

`parse`时从`SFC` 文件的`style`模块中解析出`v-bind`，获取这

块样式所关联的变量，之后在 `compilerScript`时将变量绑定到该组件的dom中，之后在 `compilerStyle`中就可以使用该变量了。

#### 2.2 源码流程

我们从一个简单的测试实例出发

![image-20211221140257295](https://s2.loli.net/2021/12/21/S4rWj7iZzCGQaOm.png)

`compileSFCScript`是测试时使用的工具函数，主要操作只有两步：分析`SFC`文件、编译文件。

![image-20211221141422442](https://s2.loli.net/2021/12/21/9z2GUyOjkxC84No.png)

在`parse`中，会事先初始化一个描述对象

(`compiler-sfc/src/parse.ts:112`)

![image-20211221154848343](https://s2.loli.net/2021/12/21/zIq2ZhpCE8xnOev.png)

之后将源码传入`CompilerDOM.parse`解析成`vue`专属的AST，通过对AST的`children`进行遍历，获取的`template` 、`script`、`style`等这些代码块，其中`style`可能会有多个的情况，所以`desciptor.styles`是个数组。

(`compiler-sfc/src/parse.ts:155`)

![code2](https://s2.loli.net/2021/12/21/qOrivxSVHDsujJN.png)

获取到`styles`之后就要取得样式表中的`css Vars`

(`compiler-sfc/src/parse.ts:263`)

![image-20211221155927072](https://s2.loli.net/2021/12/21/WN1PM2eqOHyQfLd.png)

(`compiler-sfc/src/cssVars.ts:40`)

![image-20211221160851850](https://s2.loli.net/2021/12/21/jaGzZeuQRAV3xsI.png)

使用正则的方式取得`v-bind`中的值，储存在`vars`中并返回

至此就完成了`style`中值的获取

之后，在`compileScript`中，判断AST中的`cssVars`是否有值，有值则拼接上预先编译的文本

(`compiler-sfc/src/compileScript.ts:201`)

![image-20211221161453588](https://s2.loli.net/2021/12/21/PysDNJ4t6wz28jm.png)

(`compiler-sfc/src/cssVars.ts:108`)![image-20211221161604497](https://s2.loli.net/2021/12/21/uS4j2sX5RkGPYid.png)

最后的结果就是测试用例中的内容

![image-20211221163644072](https://s2.loli.net/2021/12/21/Ys4vDtG2HmiIB3S.png)

解析阶段的任务完成，之后就是使用阶段

在该组件被使用时，通过`useCssVars`这个API来挂载`css变量`

(`runtime-dom/src/helpers/useCssVars.ts`)

![code3](https://s2.loli.net/2021/12/21/X3b6LozdkHcRjat.png)



### 3.使用中遇到的问题

#### 3.1 与teleport配合

在使用`<teleport>`的组件中使用`v-bind`会使得移动了的节点找不到绑定在根节点中的`css变量`

#### 3.2 hash问题

绑定在节点上的变量默认会带有hash值，想要全局管理的`css变量`的话就不推荐这种方式了


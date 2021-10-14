# 使用方法

在使用之前记得在`App.vue`的最外层嵌套`<cg-loading-bar>`

```html
<!-- 这里是App.vue -->
<!-- <cg-loading-bar> -->
  <!-- 项目代码 -->
<!-- </cg-loading-bar> -->
<!-- App.vue结束 -->

<cg-space>
  <cg-button type="primary" @click="start">开始</cg-button>
  <cg-button type="success" @click="finish">结束</cg-button>
  <cg-button type="error" @click="error">报错</cg-button>
</cg-space>
```

```js-setup
import { useLoadingBar } from '@corgi/index'

const {start, finish, error} = useLoadingBar()
```

# 使用方法

在使用之前记得在`App.vue`的最外层嵌套`<cg-loading-bar>`

```html
<cg-space>
  <cg-button type="primary" @click="start">开始</cg-button>
  <cg-button type="success" @click="finish">结束</cg-button>
  <cg-button type="error" @click="error">报错</cg-button>
</cg-space>
```

```js-setup
import { useLoadingBar } from 'index'

const {start, finish, error} = useLoadingBar()
```

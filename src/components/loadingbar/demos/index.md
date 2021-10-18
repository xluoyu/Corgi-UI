# 加载条 LoadingBar

<cg-space vertical>

速度决定一切

<cg-alert>!!记得在项目最外层(比如：App.vue的外层)套上该组件</cg-alert>

```html
<!-- 这里是App.vue -->
<cg-loading-bar>
  <!-- 项目代码 -->
  <content />
</cg-loading-bar>
```

```js
import { defineComponent } from 'vue'
import { useLoadingBar } from 'naive-ui'

// content
export default defineComponent({
  setup () {
    const loadingBar = useLoadingBar()
    return {
      loading () {
        loadingBar.start()
      },
    }
  },
})
```
</cg-space>


# 示例
```demo
base
```

# Props

| 名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| activeColor | `string` |  | `#0fd130` | 加载时的颜色 |
| errorColor | `string` |  | `#d34937` | 报错时的颜色 |
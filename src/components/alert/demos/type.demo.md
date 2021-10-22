# 类型

不同的`type`有不同的用处

```html
<cg-space vertical>
  <cg-alert :show-icon="showIcon">这是一些简短的话语</cg-alert>
  <cg-alert :show-icon="showIcon" type="info">这是一些简短的话语</cg-alert>
  <cg-alert :show-icon="showIcon" type="warning">你会遇到一些警告</cg-alert>
  <cg-alert :show-icon="showIcon" type="error">甚至走上错误的道路</cg-alert>
  <cg-alert :show-icon="showIcon" type="success">但总有一天会成功的</cg-alert>
</cg-space>

<cg-button @click="toggleShowIcon" type="info">显示图标</cg-button>
```

```js-setup
import { ref } from 'vue'

const showIcon = ref(false)
const toggleShowIcon = () => {
  showIcon.value = !showIcon.value
}
```
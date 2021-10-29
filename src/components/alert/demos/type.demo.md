# 类型

不同的`type`有不同的用处

```html
<cg-space vertical>
  <cg-alert :show-icon="showIcon">有何不可 default</cg-alert>
  <cg-alert :show-icon="showIcon" type="success">为你唱这首歌 success</cg-alert>
  <cg-alert :show-icon="showIcon" type="info">没有什么风格 info</cg-alert>
  <cg-alert :show-icon="showIcon" type="warning">它仅仅代表着 warning</cg-alert>
  <cg-alert :show-icon="showIcon" type="error">我想给你快乐 error</cg-alert>
</cg-space>

<cg-switch @click="toggleShowIcon">显示图标：</cg-switch>
```

```js-setup
import { ref } from 'vue'

const showIcon = ref(false)
const toggleShowIcon = () => {
  showIcon.value = !showIcon.value
}
```
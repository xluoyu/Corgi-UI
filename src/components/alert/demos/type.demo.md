# 类型

不同的`type`有不同的用处

```html
<cg-alert :show-icon="showIcon" :show-close="showClose">有何不可 default</cg-alert>
<cg-alert :show-icon="showIcon" :show-close="showClose" type="success">为你唱这首歌 success</cg-alert>
<cg-alert :show-icon="showIcon" :show-close="showClose" type="info">没有什么风格 info</cg-alert>
<cg-alert :show-icon="showIcon" :show-close="showClose" type="warning">它仅仅代表着 warning</cg-alert>
<cg-alert :show-icon="showIcon" :show-close="showClose" type="error">我想给你快乐 error</cg-alert>

<cg-space>
  <cg-switch v-model="showIcon">显示图标：</cg-switch>
  <cg-switch v-model="showClose">显示叉叉：</cg-switch>
</cg-space>
```

```js-setup
import { ref } from 'vue'

const showIcon = ref(true)
const showClose = ref(true)
```
# 方向

```html
<cg-tabs :position="position">
  <cg-tab-item label="第一个" name="first">
    <cg-content>
      <div>这里是一个内容</div>
    </cg-content>
  </cg-tab-item>
  <cg-tab-item label="第二个" name="second">
    <cg-content>
      <div>这里又是另一个内容</div>
    </cg-content>
  </cg-tab-item>
</cg-tabs>
<br />
<cg-form-item label="选择类型">
  <cg-select v-model="tabType" :options="options" />
</cg-form-item>
```

```js-setup
import { ref } from 'vue'

const position = ref('line')
const options = [
  {value: 'top', label: 'top'},
  {value: 'right', label: 'right'},
  {value: 'bottom', label: 'bottom'},
  {value: 'left', label: 'left'},
]


```
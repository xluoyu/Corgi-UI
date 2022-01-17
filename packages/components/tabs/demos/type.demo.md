# 基础用法

```html
<cg-tabs :type="tabType" :position="position">
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
  <cg-select v-model="tabType" :options="typeOptions" />
</cg-form-item>
<cg-form-item label="选择方向">
  <cg-select v-model="position" :options="positionOptions" />
</cg-form-item>
```

```js-setup
import { ref } from 'vue'

const tabType = ref('line')
const typeOptions = [
  {value: 'line', label: 'line'},
  {value: 'card', label: 'card'},
]

const position = ref('top')
const positionOptions = [
  {value: 'top', label: 'top'},
  {value: 'right', label: 'right'},
  {value: 'bottom', label: 'bottom'},
  {value: 'left', label: 'left'},
]

```
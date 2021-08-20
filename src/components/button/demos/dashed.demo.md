# 虚线

使用 `ghost` + `dashed` 来使用虚线按钮。

```html
<cg-space>
  <cg-button type="primary" ghost dashed>tiny</cg-button>
  <cg-button type="info" ghost dashed>small</cg-button>
  <cg-button type="success" ghost dashed :onClick="showVal">medium</cg-button>
  <cg-button type="warning" ghost dashed @click="handleClick">large</cg-button>
  <div>{{val}}</div>
</cg-space>
```

```js
import { ref } from 'vue'
export default {
  setup () {
    const val = ref(1)
    const handleClick = () => {
      console.log('点击率')
      val.value = val.value + 1
    }

    const showVal = () => {
      console.log(val.value)
    }

    return {
      handleClick,
      showVal,
      val
    }
  }
}
```
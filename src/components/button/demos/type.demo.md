# 基础

一些常规按钮

```html
<cg-space>
  <cg-button>Default</cg-button>
  <cg-button @click="handleClick" type="primary">Primary</cg-button>
  <cg-button type="info">Info</cg-button>
  <cg-button type="success">Success</cg-button>
  <cg-button type="warning">Warning</cg-button>
  <cg-button type="error">Error</cg-button>
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
# 尺寸

```html
<cg-space>
  {{val}}

  <cg-switch size="mini" v-model="val"/>
  <cg-switch size="medium"/>

  <cg-switch size="large" disabled/>
</cg-space>
```

```js-setup
import { ref } from 'vue'

const val = ref(false)
```
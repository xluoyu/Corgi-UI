# 图标
`iconPosition` 用来控制图标的位置

当然你可以不用`slot:icon`，全部写在`default`里，但这样就没法做到👉(加载时更改icon)的效果了

```html
<cg-space>
  <cg-button type='primary'>
    <template v-slot:icon>
      <cg-icon>
        <Medal />
      </cg-icon>
    </template>
    左边
  </cg-button>
  <cg-button type='info' iconPosition="right">
    <template v-slot:icon>
      <cg-icon>
        <Medal />
      </cg-icon>
    </template>
    右边
  </cg-button>
</cg-space>
```

```js-setup
import {Medal} from '@element-plus/icons'
```
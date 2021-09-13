# 图标按钮

如果你想用图标做按钮的话。将按钮改为`text`，然后用`style`来控制样式吧。

```html
<cg-button text style="font-size: 32px;color: #ffac4e">
  <cg-icon>
    <coordinate />
  </cg-icon>
</cg-button>
```

```js
import { Coordinate } from '@element-plus/icons'

export default {
  components: {
    Coordinate,
  },
}

```
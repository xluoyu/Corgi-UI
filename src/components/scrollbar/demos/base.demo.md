# 基本使用

```html
<div class="test-container">
  <cg-scrollbar
    ref="scroll"
    y
    :load-more="loadMore"
  >
    <div class="test-content" :style="{height: contentHeight + 'px'}"></div>
  </cg-scrollbar>
</div>
```

```js-setup
import { ref } from 'vue'

const contentHeight = ref(800)
const scroll = ref(null)
const loadMore = () => {
  contentHeight.value += 400
  scroll.value.update()
}
```

```css
.test-container{
  width: 400px;
  height: 400px;
}
.test-content{
  width: 800px;
  background: linear-gradient(to bottom, #F4AD5A, #2080f0);
}
```
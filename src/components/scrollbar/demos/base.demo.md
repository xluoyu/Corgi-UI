# 基本使用

滚啊、滚啊、滚啊、滚

附赠一个触底的回调，当然有可能用不上。

```html
<div class="test-container">
  <cg-scrollbar
    ref="scroll"
    y
    :load-more="loadMore"
    show="hover"
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
}
```

```css
.test-container{
  width: 100%;
  height: 400px;
}
.test-content{
  width: 800px;
  background: linear-gradient(to bottom, #fff, #F4AD5A);
}
```
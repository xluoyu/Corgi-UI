# 自定义

你可以随意的定义滚动条样式。

```html
<div class="test-container">
  <cg-scrollbar
    ref="scroll"
    y
    :height='400'
    thrumbStyle="background: linear-gradient(45deg, #FF7F00, #FFFF00);width: 8px;opacity: .6"
    show="always"
  >
    <div class="test-content"></div>
  </cg-scrollbar>
</div>
```

```css
.test-container{
  width: 100%;
  height: 400px;
}
.test-content{
  width: 800px;
  height: 800px;
  background-image: linear-gradient(#fff, #93b5cf);
}
```
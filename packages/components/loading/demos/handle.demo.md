# 变量控制

当然，你可以传入一个变量进行控制

```html
<cg-switch v-model="isLoading" @change="changeLoadingStatus">控制状态：</cg-switch>
<div v-cg-loading="isLoading" class="box">
</div>
```

```js-setup
import { ref } from 'vue'

const isLoading = ref(true)

const changeLoadingStatus = () => {
  isLoading.value = !isLoading.value
}

```

```css
.box{
  width: 200px;
  height: 200px;
  background: skyblue;
}
```
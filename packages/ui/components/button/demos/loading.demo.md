# 加载

```html
<cg-space>
  <cg-button :loading="isLoad" type="primary" @click="changeLoad">{{isLoad ? '等我两秒' : '点击加载'}}</cg-button>
  
  <cg-button
    :loading="isLoad2"
    type="error"
    @click="changeLoad2"
  >
    <template v-slot:icon>
      <cg-icon>
        <apple />
      </cg-icon>
    </template>
    {{isLoad2 ? '吃吃吃' : '吃个苹果'}}
  </cg-button>
</cg-space>
```

```js-setup
import {watch} from 'vue'
import {useToggle} from 'corgi-box'
import {Apple} from '@element-plus/icons'

const [isLoad, changeLoad] = useToggle(false)

watch(isLoad, () => {
  if (isLoad.value) {
    setTimeout(() => {
      changeLoad()
    }, 2000)
  }
})

const [isLoad2, changeLoad2] = useToggle(false)
watch(isLoad2, () => {
  if (isLoad2.value) {
    setTimeout(() => {
      alert('吃完了')
      changeLoad2()
    }, 1500)
  }
})
```
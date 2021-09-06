<template>
  <div style="margin: 20px">
    <cg-theme-config :theme="themeConfig">
      <cg-button size="tiny" style="margin-right: 10px;" type="error">tiny</cg-button>
      <cg-button size="small" style="margin-right: 10px;" type="success">small</cg-button>
      <cg-button
        size="medium"
        style="margin-right: 10px;"
        type="info"
        disabled
      >
        medium
      </cg-button>
      <cg-button size="large" style="margin-right: 10px;" type="warning">large</cg-button>
      <cg-button
        size="medium"
        style="margin-right: 10px;"
        type="info"
        ghost
        dashed
        v-copy="nextFn"
      >
        ghost
      </cg-button>
      <cg-button size="large" style="margin-right: 10px;">default</cg-button>
    </cg-theme-config>

    <cg-icon size="34px" color="#336699">
      <edit />
    </cg-icon>

    <div class="test-scrollbar">
      <cg-scrollbar
        ref="scroll"
        y
        x
        :load-more="loadMore"
      >
        <div class="main" :style="{height: mainHeight + 'px'}"></div>
      </cg-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Edit } from '@element-plus/icons'
import { useCopy } from '@corgi/index'
import {CgButton} from '../../es'

let size = ref('medium')
const clickHandle = () => {
  console.log('点击了')
  size.value = size.value == 'large' ? 'small' : 'large'
}

useCopy('哈哈哈').then(() => {
  console.log('复制成功了')
})

const themeConfig = {
  small: {
    fontSize: '20px'
  }
}

const nextFn = () => {
  alert('okkk')
}

let val = ref(1)
const handleClick = () => {
  val.value = val.value + 1
}

const showVal = () => {
  console.log(val)
}

let height = 800
let mainHeight = ref(height + 'px')
let scroll = ref(null)
const loadMore = () => {
  height += 400
  mainHeight.value = height + 'px'
  console.log($raw(scroll))
  scroll.update()
}
</script>


<style lang="less" scoped>
.box{
  color: #f3dede;
}

.test-scrollbar{
  width: 400px;
  height: 400px;
  .main{
    width: 800px;
    height: v-bind(mainHeight);
    background: linear-gradient(to bottom, #336696, #aa3377);
  }
}

</style>

<template>
  <div style="margin: 20px">
    <cg-theme-config :theme="themeConfig">
      <cg-button size="tiny" style="margin-right: 10px;" type="error">tiny</cg-button>
      <cg-button size="small" style="margin-right: 10px;" type="success">small</cg-button>
      <cg-button size="medium" style="margin-right: 10px;" type="info" disabled>medium</cg-button>
      <cg-button size="large" style="margin-right: 10px;" type="warning" >large</cg-button>
      <cg-button size="medium" style="margin-right: 10px;" type="info" ghost dashed>ghost</cg-button>
      <cg-button size="large" style="margin-right: 10px;">default</cg-button>
    </cg-theme-config>

    <cg-icon size="34px" color="#336699">
      <edit />
    </cg-icon>

    <div class="test-scrollbar">
      <cg-scrollbar y x :loadMore="loadMore" ref="scroll">
        <div class="main"></div>
      </cg-scrollbar>
    </div>

    <div>
      <cg-valid-code time="60" :getCode="getCode" v-model="code"/>

      <cg-button @click="submit">提交</cg-button>
    </div>
    

  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { Edit } from '@element-plus/icons'
import _Button from '../../src/components/button/index';
const size = ref('medium')
const clickHandle = () => {
  console.log('点击了')
  size.value = size.value == 'large' ? 'small' : 'large'
}

const themeConfig = {
  // small: {
  //   fontSize: '20px'
  // }
}

const val = ref(1)
const handleClick = () => {
  val.value = val.value + 1
}

const showVal = () => {
  console.log(val.value)
}

let height = 800
const mainHeight = ref(height + 'px')
const scroll = ref()
const loadMore = () => {
  height += 400
  mainHeight.value = height + 'px'
  console.log(scroll)
  scroll.value.update()
}


const code = ref('')
const getCode = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 200);
  })
}
const submit = () => {
  console.log(code.value)
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
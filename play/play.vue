
<template>
  <div class="main">
    <cg-alert
      type="info"
      show-icon
      show-close
      @onClose="onClose"
    >
      <template #title>
        <div class="title">{{ text }}</div>
      </template>
      <div class="content">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊沙发沙发沙发阿萨的程序从v吧豆腐干豆腐干</div>
    </cg-alert>

    <cg-button size="small" ghost>hhh</cg-button>
    <cg-button size="small" ghost type="primary">hhh</cg-button>
    <cg-button size="small" ghost type="success">hhh</cg-button>
    <cg-button size="small" ghost type="info">hhh</cg-button>
    <cg-button size="small" ghost type="warning">hhh</cg-button>
    <cg-button
      size="small"
      ghost
      type="error"
      @click="change"
    >
      hhh
    </cg-button>

    <cg-message />
    <br>
    <cg-switch size="mini" />
    <cg-switch
      active-text="哈哈哈哈"
      inactive-text="nonono"
      inside-text
    />
    <cg-switch size="large" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const onClose = () => {
  console.log('检测到关闭了')
}
const text = ref('16546513135')
const change = () => {
  text.value = '1654841'
}

const activeText = h => {
  return h('div', {}, '哈哈哈哈')
}
</script>

<style lang="less" scoped>
.main{
  width: 800px;
}
</style>

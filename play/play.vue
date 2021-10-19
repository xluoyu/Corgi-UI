<template>
  <div class="main">
    <cg-alert
      type="info"
      show-icon
      show-close
      @onClose="onClose"
    >
      <template #title>
        <div class="title">头部头部头部头部啊实打实的撒</div>
      </template>
      <div class="content">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊沙发沙发沙发阿萨的程序从v吧豆腐干豆腐干</div>
    </cg-alert>

    <cg-button size="small" ghost>hhh</cg-button>
    <cg-button size="small" ghost type="primary">hhh</cg-button>
    <cg-button size="small" ghost type="success">hhh</cg-button>
    <cg-button size="small" ghost type="info">hhh</cg-button>
    <cg-button size="small" ghost type="warning">hhh</cg-button>
    <cg-button size="small" ghost type="error">hhh</cg-button>

    <cg-message />
  </div>
</template>

<script lang="ts" setup>
const onClose = () => {
  console.log('检测到关闭了')
}
</script>

<style lang="less" scoped>
.main{
  width: 800px;
}
</style>

<template>
  <div class="site-header">
    <div class="site-logo">
      <img src="../assets/logo.png" alt="">
      <span>Corgi UI</span>
    </div>
    <div class="nav-menu">
      <cg-menu :list="menuOptions" mode="horizontal" />
    </div>
    <div class="nav-end"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const menuOptions = [
      {
        label: '首页',
        key: 'home',
        path: '/',
      },
      {
        label: '文档',
        key: 'doc',
        path: '/doc',
      },
      {
        label: '组件',
        key: 'component',
        path: '/component',
      },
    ]
    return {
      menuOptions,
    }
  },
})
</script>

<style lang="less" scoped>
.site-header{
  width: 100%;
  height: var(--header-height);
  border-bottom: 1px solid var(--border-color);
  padding: 0 32px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 250px 1fr auto;
  align-items: center;
}
.site-logo{
  height: 40px;
  display: flex;
  align-items: center;
  img{
    height: 100%;
    margin-right: 20px;
  }
}

.nav-menu{
  height: 100%;
  :deep(.cg-menu-item){
    height: 100% !important;
  }
}
</style>

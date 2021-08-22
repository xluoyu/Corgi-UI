<template>
  <div class="container">
    <aside class="cg-nav">
      <cg-menu :list="menuList"/>
      <div class="shrink"></div>
    </aside>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup () {
    let menuList = [
      {
        label: '按钮',
        path: '/component/button'
      },
      {
        label: '菜单',
        path: '/component/menu'
      },
      {
        label: '图标',
        path: '/component/icon'
      }
    ]

    return {
      menuList
    }
  }
})
</script>

<style lang="less" scoped>
.container{
  display: flex;
}
.cg-nav{
  width: 240px;
  height: calc(100vh - var(--header-height));
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  .menu{
    width: 100%;
  }
  .menu-item{
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
  }
}
.main{
  flex: 1;
  box-sizing: border-box;
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  scroll-behavior:smooth;
}
</style>
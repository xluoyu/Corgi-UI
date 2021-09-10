<template>
  <div class="container">
    <aside class="cg-nav">
      <cg-scrollbar y>
        <cg-menu :list="menuList" is-router :active-key="activeKey" />
      </cg-scrollbar>
      <div class="shrink"></div>
    </aside>
    <div class="main">
      <cg-scrollbar y show="hover">
        <router-view />
      </cg-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuList from '@site/menu.conf'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

let menuList = MenuList

const activeKey = useRoute().name
console.log(activeKey)
</script>

<style lang="less" scoped>
.container{
  display: flex;
}
.cg-nav{
  width: 240px;
  height: calc(100vh - var(--header-height));
  border-right: 1px solid var(--border-color);
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
  scroll-behavior:smooth;
}
</style>

<template>
  <div class="container">
    <aside class="cg-nav">
      <cg-scrollbar ref="scrollbar" y>
        <cg-menu :list="menuList" />
      </cg-scrollbar>
      <div class="shrink"></div>
    </aside>
    <div class="main">
      <cg-scrollbar y show="always">
        <router-view />
      </cg-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuList from '@site/menu.conf'
import { ref, onMounted } from 'vue'

let menuList = MenuList

const customTheme = {
  color: '#c33696',
}

const scrollbar = ref(null)

onMounted(() => {
  console.log(scrollbar.value.update)
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

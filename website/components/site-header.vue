<template>
  <div class="site-header" :style="{background: isIndex ? 'transparent': ''}">
    <div class="site-logo">
      <img src="../assets/logo.png" alt="">
      <span>Corgi UI</span>
    </div>
    <div class="nav-menu">
      <cg-menu
        :list="menuOptions"
        mode="horizontal"
        active-key="component"
        active-style="background: none"
      />
    </div>
    <div class="nav-end"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

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
    const isIndex = computed(() => {
      const { path } = useRoute()
      return path == '/'
    })
    return {
      isIndex,
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
  background: var(--backgroundColorH2);
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

<template>
  <div class="layout">
    <site-header />
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import SiteHeader from './components/site-header.vue'
export default {
  components: {
    SiteHeader,
  },
  setup(props, ctx) {
    let demoContent = ref('')

    return {
      demoContent
    }
  }
}
</script>

<style lang="less" scoped>

</style>
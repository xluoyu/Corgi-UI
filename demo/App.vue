<template>
  <div class="layout">
    <site-header />
    <cg-button>asd</cg-button>
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
    // import('../src/button/demos/index.md').then(demo => {
    //   demoContent.value = demo.default
    // })

    return {
      demoContent
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
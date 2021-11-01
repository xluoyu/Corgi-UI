<template>
  <cg-theme-config :theme="themeConfig">
    <play />
  </cg-theme-config>
</template>

<script lang="ts" setup>
import Play from './play.vue'

const themeConfig = {
  menu: {
    color: 'red',
  },
}
</script>

<style lang="scss" scoped>

</style>

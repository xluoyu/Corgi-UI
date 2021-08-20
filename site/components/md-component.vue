<template>
  <div class="demo-card">
    <slot name="title"/>
    <slot name="content"/>
    <slot name="code"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
.demo-card{

}
</style>
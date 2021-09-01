<template>
  <div
    class="cg-layout"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgLayout',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  setup () {

    return {
    }
  },
})
</script>

<style lang="less" scoped>
.cg-layout{
  display: flex;
}
</style>

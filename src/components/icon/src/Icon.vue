<template>
  <i
    :class="[
      'cg-icon'
    ]"
    :style="{
      color: color,
      fontSize: size
    }"
  >
    <slot></slot>
  </i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgIcon',
  props: {
    size: String,
    color: String,
  },
  setup () {

    return {
      styleVar,
    }
  },
})
</script>

<style lang="less" scoped>

.cg-icon{
  display: inline-block;
  height: 1em;
  width: 1em;
  font-size: 1em;
  fill: currentColor;
  color: inherit;
}
</style>

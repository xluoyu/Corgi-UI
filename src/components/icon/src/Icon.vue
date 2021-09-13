<template>
  <i
    :class="[
      'cg-icon',
      {
        'cg-icon-loading': isLoading
      }
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
    isLoading: Boolean,
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
  &.cg-icon-loading{
    animation: rotating 2s linear infinite;
  }
}

@keyframes rotating {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>

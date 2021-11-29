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

export default defineComponent({
  name: 'CgIcon',
  props: {
    size: String,
    color: String,
    isLoading: Boolean,
  },
})
</script>

<style lang="less" scoped>
.cg-icon{
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 1em;
  fill: currentColor;
  color: inherit;
  text-align: center;
  line-height: 1em;
  vertical-align: text-bottom;
  padding: 0 0.2em;
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

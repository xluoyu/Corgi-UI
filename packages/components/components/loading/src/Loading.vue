<template>
  <svg class="circular" viewBox="25 25 50 50">
    <circle
      class="path"
      cx="50"
      cy="50"
      r="16"
      fill="none"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { IThemeCssVar, getGlobalCssVar } from '@corgi-box/components/utils'

export default defineComponent({
  name: 'CgLoading',
  setup() {
    const customTheme = inject<IThemeCssVar>('theme', null)
    const globalCssVar = getGlobalCssVar(customTheme)

    return {
      globalCssVar,
    }
  },
})
</script>

<style lang="less">
.cg-loading{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(255, 255, 255, .6);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="less" scoped>
.circular{
  display: inline;
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  animation: loading-rotate 2s linear infinite;
}
.path{
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: v-bind('globalCssVar.primary.bg');
  stroke-linecap: round;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>

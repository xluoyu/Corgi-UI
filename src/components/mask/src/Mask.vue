<template>
  <teleport to="body">
    <transition name="slide-fade">
      <div
        class="cg-mask"
        :style="costomCssVar"
      >
      </div>
    </transition>
  </teleport>
  <slot></slot>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgMask',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, ref } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, useGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Mask', customTheme, styleVar)
  return componentCssVar
})

const costomCssVar = useGlobalCssVar('Mask', customTheme, styleVar)

// const costomCssVar = computed(() => {
//   return `
//     --Cg-Mask-background: ${cssVar.value.background};
//     --Cg-popupMaskZIndex: ${cssVar.value.popupMaskZIndex}
//   `
// })
</script>

<style lang="less" scoped>
@import url('../../style/animes.less');

.cg-mask{
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--Cg-popupMaskZIndex);
  width: 100vw;
  height: 100vh;
  background: var(--Cg-Mask-background);
}
</style>

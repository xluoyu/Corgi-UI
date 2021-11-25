<template>
  <transition name="slide-fade">
    <div
      v-show="modelValue"
      class="cg-mask"
      :style="costomCssVar"
      @click.self="emits('click')"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgMask',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, ref, onMounted, onUnmounted, watch } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, useGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['click'])

const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Mask', customTheme, styleVar)
  return componentCssVar
})

watch(() => props.modelValue, val => {
  document.body.style.overflow = val ? 'hidden' : 'auto'
}, {
  immediate: true,
})

useGlobalCssVar(['popupMaskZIndex'])

const costomCssVar = computed(() => {
  return `
    --Cg-Mask-background: ${cssVar.value.background};
  `
})
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

<template>
  <transition name="slide-fade">
    <div
      v-show="visible"
      class="cg-mask"
      :style="costomCssVar"
      @click.self="emits('click')"
    >
      <transition name="slide-fade">
        <slot>
          <component :is="slot" v-if="slot" ref="slotRef" />
        </slot>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgMask',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, ref, watch } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, useGlobalCssVar } from '@corgi-box/utils'
import { IThemeCssVar } from '@corgi-box/utils/type'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  slot: {
    type: Object,
  },
})
const emits = defineEmits(['click'])

const visible = ref(props.modelValue)

const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Mask', customTheme, styleVar)
  return componentCssVar
})

watch(() => props.modelValue, val => {
  document.body.style.overflow = val ? 'hidden' : 'auto'
  visible.value = val
}, {
  immediate: true,
})

useGlobalCssVar(['popupMaskZIndex'])

const costomCssVar = computed(() => {
  return `
    --Cg-Mask-background: ${cssVar.value.background};
  `
})

const slotRef = ref(null)
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

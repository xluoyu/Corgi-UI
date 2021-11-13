<template>
  <div
    class="cg-dialog"
  >
    <slot></slot>
    <slot name="footer">
    </slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgDialog',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import { useShowMask } from '@corgi/index'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
})

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Dialog', customTheme, styleVar)
  if (props.color) {
    composeVar.color = props.color
  }
  return componentCssVar
})

useShowMask()
</script>

<style lang="less" scoped>

</style>

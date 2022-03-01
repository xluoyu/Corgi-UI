<template>
  <div
    class="cg-form"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgForm',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, IThemeCssVar } from '@corgi-box/ui/utils'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
})

// const customTheme = inject<IThemeCssVar>('theme', null)
// const globalCssVar = getGlobalCssVar(customTheme)
// let cssVar = computed(() => {
//   const componentCssVar = getComponentCssVar('Form', customTheme, styleVar)
//   if (props.color) {
//     composeVar.color = props.color
//   }
//   return componentCssVar
// })
</script>

<style lang="less" scoped>

</style>

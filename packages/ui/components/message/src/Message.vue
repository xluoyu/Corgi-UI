<template>
  <div
    class="cg-message"
  >
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgMessage',
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
const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Message', customTheme, styleVar)
  componentCssVar.theme = globalCssVar[props.type || 'default']

  return componentCssVar
})
</script>

<style lang="less" scoped>

</style>

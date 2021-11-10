<template>
  <div
    class="cg-select"
  >
    <input type="text" class="cg-select-inner">
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgSelect',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  optionsLabel: String,
  optionsValue: String,
  moduleValue: [String, Number],
})

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Select', customTheme, styleVar)
  return componentCssVar
})
</script>

<style lang="less" scoped>
.cg-select-inner{
  border: 1px solid v-bind('cssVar.borderColor');
  outline: none;
  height: 26px;
  line-height: 26px;
  padding: 4px 6px;
  border-radius: 4px;
  &:hover, &:focus{
    border-color: v-bind('cssVar.borderActiveColor');
  }
}
</style>

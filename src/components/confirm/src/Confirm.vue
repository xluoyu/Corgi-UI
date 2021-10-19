<template>
  <div
    class="cg-confirm"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

export default defineComponent({
  name: 'CgConfirm',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  setup () {
    const customTheme = inject<IThemeCssVar>('theme', null)
    const globalCssVar = getGlobalCssVar(customTheme)
    let cssVar = computed(() => {
      const componentCssVar = getComponentCssVar('Confirm', customTheme, styleVar)
      return componentCssVar
    })

    return {
      cssVar,
    }
  },
})
</script>

<style lang="less" scoped>

</style>

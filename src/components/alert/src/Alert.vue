<template>
  <div
    class="cg-alert"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

export default defineComponent({
  name: 'CgAlert',
  props: {
    marginTop: {
      type: String,
      default: '100px',
    },
  },
  setup (props) {
    const customTheme = inject<IThemeCssVar>('theme', null)
    const globalCssVar = getGlobalCssVar(customTheme)
    let cssVar = computed(() => {
      const componentCssVar = getComponentCssVar('Alert', customTheme, styleVar)
      Object.keys(props).forEach(key => componentCssVar[key] = props[key])
      console.log(props)
      return componentCssVar
    })

    return {
      cssVar,
    }
  },
})
</script>

<style lang="less" scoped>
.cg-alert{
  position: fixed;
  top: v-bind('cssVar.marginTop');
  left: 0;
  right: 0;
  z-index: v-bind('cssVar.popupZIndex');
}
</style>

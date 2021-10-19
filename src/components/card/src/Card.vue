<template>
  <div
    class="cg-card"
  >
    <slot v-cloak></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

export default defineComponent({
  name: 'CgCard',
  props: {
    content: {
      type: String,
      default: 'default',
    },
  },
  setup (props, { slots }) {
    const customTheme = inject<IThemeCssVar>('theme', null)
    const globalCssVar = getGlobalCssVar(customTheme)
    let cssVar = computed(() => {
      const componentCssVar = getComponentCssVar('Card', customTheme, styleVar)
      return componentCssVar
    })

    console.log(slots.default())

    const defalutContent = slots.default()

    return {
      cssVar,
      defalutContent,
    }
  },
})
</script>

<style lang="less" scoped>
.cg-card{
  font-size: v-bind('cssVar.fontSizeH4');
  width: 100%;
  border: 1px solid v-bind('cssVar.borderColor');
  padding: 20px;
  background: #fff;
  transition: all .3s;
  border-radius: 4px;
  &:hover{
    box-shadow: 0 0 6px rgba(0, 0, 0, .2);
  }
}
</style>

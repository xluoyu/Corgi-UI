<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { merge } from 'lodash-es'
import { defineComponent, inject, provide } from 'vue'
import { getGlobalCssVar } from '@corgi-box/ui/utils'


export default defineComponent({
  name: 'CgThemeConfig',
  props: {
    theme: {
      type:[Object, null],
      default: null,
    },
  },
  setup (props) {
    const globalCssVar = getGlobalCssVar(props.theme)
    const theme = inject('theme', null)
    provide('theme',theme ? merge({}, theme, props.theme) : props.theme)

    return {

    }
  },
})
</script>

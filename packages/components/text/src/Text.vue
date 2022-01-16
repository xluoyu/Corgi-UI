<template>
  <div
    class="cg-text"
  >
  </div>
</template>

<script lang="ts">
import { assignThemecustom } from '@corgi-box/utils'
import { computed, defineComponent } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgText',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  setup (props) {
    let cssVar = computed(() => {
      let composeVar = customTheme ? assignThemecustom(customTheme, styleVar) : styleVar
      if (props.color) {
        composeVar.color = props.color
      }
      return composeVar
    })

    return {
      cssVar,
    }
  },
})
</script>

<style lang="less" scoped>

</style>

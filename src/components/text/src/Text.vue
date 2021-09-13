<template>
  <div
    class="cg-text"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgText',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  setup () {

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

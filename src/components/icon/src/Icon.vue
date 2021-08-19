<template>
  <div 
    :class="[
    'cg-icon'
    ]"
  >

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  setup () {
    
    return {
      styleVar
    }
  }
})
</script>

<style lang="less" scoped>
@import url('@/components/_style/mixin.less');


</style>
<template>
  <p class="cg-p"><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'P',
  setup () {
    return {
      styleVar
    }
  }
})
</script>

<style scoped>
.cg-p{
  font-size: v-bind('styleVar.fontSizeH4');
  margin: v-bind('styleVar.pMargin') 0;
}
</style>

<template>
  <div
    class="cg-content"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgContent',
})
</script>

<script lang="ts" setup>
import { defineComponent } from 'vue'

</script>

<style lang="less" scoped>
.cg-content{
  padding: 15px 10px;
}
</style>

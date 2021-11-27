<template>
<cg-button @click="submit">提交</cg-button>
  <cg-table></cg-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {useConfirm} from '@corgi/index'
const box = ref(null)
const submit = () => {
  useConfirm.success({
  title: '这是标题',
  content: '哈哈哈哈'
})
}



</script>

<style lang="less" scoped>
.container{
  width: 600px;
  height: 800px;
  background: #eee;
}
</style>
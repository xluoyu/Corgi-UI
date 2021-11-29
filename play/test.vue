<template>
<cg-button @click="submit">提交</cg-button>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {CgButton} from '@corgi/index'
const box = ref(null)
// const submit = () => {
//   useConfirm({
//     title: '这是标题',
//     content: '哈哈哈哈'
//   })
// }


const confirmRef = ref(null)
onMounted(() => {
  console.log(confirmRef.value)

  // useAlert.success({
  //   title: '这是标题',
  //   content: '哈哈哈哈',
  //   callback: (val) => {
  //     console.log('让我看啊可能', val)
  //   }
  // }).then(() => {
  //   console.log('完成')
  // })
})

</script>

<style lang="less" scoped>
.container{
  width: 600px;
  height: 800px;
  background: #eee;
}
</style>
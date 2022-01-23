<template>
<!-- <div> -->
  <cg-button @click="submit">提交</cg-button>
  <b>哈哈哈</b>
  <!-- <teleport to="body"> -->
    <div class="text">看看我的颜色</div>
  <!-- </teleport> -->
<!-- </div> -->
  <div class="boxTest"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {CgButton, useConfirm} from 'corgi-box'
const box = ref(null)
const submit = () => {
  useConfirm({
    title: '这是标题',
    content: '哈哈哈哈'
  })
}


const confirmRef = ref(null)

const textcolor = ref('#ff7904')

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

<style lang="less">
.container{
  width: 600px;
  height: 800px;
  background: #eee;
}
.text{
  color: v-bind('textcolor');
  font-size: 18px;
}
.boxTest{
  width: 375px;
  height: 800px;
  color: transparent;
  background: linear-gradient(to bottom, transparent 60%, #fff), linear-gradient(30deg, rgba(247, 151, 20, 0.2) 40%,rgba(46, 84, 234, 0.2));
  // background-size: 100% 600px;
  // background-repeat: no-repeat;
  background-blend-mode: lighten darken;
  // background-color: #f8f8f8;
}
</style>
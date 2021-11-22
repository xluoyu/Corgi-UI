<template>
<cg-button @click="submit">提交</cg-button>
  <div class="container" ref="box"></div>
  <cg-table></cg-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {editor} from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
import {useConfirm} from '@corgi/index'
const box = ref(null)
let monacoInstance = null
onMounted(() => {
  monacoInstance = editor.create(box.value, {
    value:``,
    theme: 'vs',
    language:"html"
  })

// monacoInstance.dispose();//使用完成销毁实例
})

const submit = () => {
  console.log(monacoInstance.getValue())
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
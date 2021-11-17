<template>
<cg-button @click="submit">提交</cg-button>
  <div class="container" ref="box"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {editor} from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
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

}

</script>

<style lang="less" scoped>
.container{
  width: 600px;
  height: 800px;
  background: #eee;
}
</style>
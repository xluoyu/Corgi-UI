
<template>
  <cg-dialog
    v-model="visible"
    :title="label"
  >
    <div ref="editRef" class="edit"></div>
    <template #footer>
      <cg-button @click="closeDialog">取消</cg-button>
      <cg-button v-if="isCodeExample" type="info" @click="copyCode">复制</cg-button>
      <cg-button v-else type="info" @click="submitCode">确定</cg-button>
    </template>
  </cg-dialog>
</template>

<script lang='ts' setup>
import { computed, nextTick, onMounted, PropType, ref, watch } from 'vue'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import { getCurrentTheme } from '@site/utils'
import { useCopy } from '@corgi/index'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isCodeExample: Boolean,
  label: String,
  code: String,
  lang: String,
})
const emits = defineEmits(['update:modelValue', 'submit'])

const visible = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val),
})

const editRef = ref(null)
let monacoInstance = null
watch(() => props.modelValue, val => {
  if (val) {
    nextTick(() => {
      monacoInstance = editor.create(editRef.value, {
        value: props.code,
        theme: getCurrentTheme() == 'light' ? 'vs' : 'vs-dark',
        language: props.lang,
      })
    })

  } else {
    monacoInstance && monacoInstance.dispose()
  }
}, {
  immediate: true,
})

const closeDialog = () => {
  emits('update:modelValue', false)
}
const submitCode = () => {
  emits('submit', monacoInstance.getValue())
  emits('update:modelValue', false)
}

const copyCode = () => {
  useCopy(monacoInstance.getValue()).then(() => { alert('复制成功') })
}
</script>
<style lang="less" scoped>
.edit{
  height: 500px;
}
</style>

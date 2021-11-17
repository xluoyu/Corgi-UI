
<template>
  <cg-dialog
    v-model="visible"
    :title="label"
  >
    <div ref="editRef" class="edit"></div>
    <template #footer>
      <cg-button @click="closeDialog">取消</cg-button>
      <cg-button type="info" @click="submitCode">确定</cg-button>
    </template>
  </cg-dialog>
</template>

<script lang='ts' setup>
import { computed, nextTick, onMounted, PropType, ref, watch } from 'vue'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import { getCurrentTheme } from '@site/utils'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: String,
  code: String,
  lang: String as PropType<'javascript' | 'html'>,
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
    monacoInstance.dispose()
  }
})

const closeDialog = () => {
  emits('update:modelValue', false)
}
const submitCode = () => {
  emits('submit', monacoInstance.getValue())
  emits('update:modelValue', false)
}
</script>
<style lang="less" scoped>
.edit{
  height: 500px;
}
</style>

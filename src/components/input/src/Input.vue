<template>
  <div
    class="cg-input"
  >
    <template v-if="formItemProd?.mode === 'inline'">
      <div class="label">
        {{ isString(formItemProd.label) ? formItemProd.label : <component :is="formItemProd.label" /> }}
      </div>
    </template>
    <input
      :value="modelValue"
      class="cg-input-inner"
      type="text"
      :placeholder="placeholder"
      @input="changeInput"
    >
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgInput',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, isString } from '@corgi/utils'
import { IThemeCssVar } from '@corgi/utils/type'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: String,
})

const emits = defineEmits(['update:modelValue', 'change'])

const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Switch', customTheme, styleVar)

  return componentCssVar
})

const formItemProd = inject('formItem', null)
if (formItemProd?.mode === 'inline') {
  console.log(formItemProd.label)
}

const changeInput = e => {
  const val = e.target.value
  emits('update:modelValue', val)
  emits('change', val)
}

</script>

<style lang="less" scoped>
.cg-input{
  display: inline-flex;
  font-size: v-bind('cssVar.fontSizeH4');
}
.cg-input-inner{
  border: 1px solid #efefef;
  outline: none;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  padding: 4px 6px;
  border-radius: 4px;
  &:hover, &:focus{
    border-color: v-bind('cssVar.activeColor');
  }
}
</style>

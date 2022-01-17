<template>
  <div
    class="cg-input"
    :class="{
      'cg-input--label-inline': inputLabelInline
    }"
  >
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      class="cg-input-inner cg-input-textarea"
      rows="3"
      :placeholder="placeholder"
      :readonly="readonly"
      @input="hadnleInput"
      @change="changeInput"
    ></textarea>
    <input
      v-else
      :value="modelValue || value"
      class="cg-input-inner"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      @input="hadnleInput"
      @change="changeInput"
    >
    <template v-if="inputLabelInline">
      <div class="input-label">
        <template v-if="isString(formItemProd.label)">{{ formItemProd.label }}</template>
        <component :is="formItemProd.label" v-else />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgInput',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, ref, PropType } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, isString, useGlobalCssVar } from '@corgi-box/utils'
import { IThemeCssVar } from '@corgi-box/utils/type'

const props = defineProps({
  value: [String, Number],
  modelValue: {
    type: [String, Number],
    default: '',
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: ' ',
  },
  type: {
    type: String,
    default: 'text',
  },
  readonly: Boolean,
})
const emits = defineEmits(['update:modelValue', 'change', 'input'])

useGlobalCssVar(['fontSizeH4', 'fontSizeH3'])

const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Switch', customTheme, styleVar)

  return componentCssVar
})

const formItemProd = inject('formItem', null)
const inputLabelInline = ref(false)
inputLabelInline.value = formItemProd?.mode === 'inline'

const hadnleInput = e => {
  if (props.modelModifiers?.lazy) return
  const val = e.target.value
  emits('input', val)
  emits('update:modelValue', val)
}

const changeInput = e => {
  const val = e.target.value
  emits('update:modelValue', val)
  emits('change', val)
}

</script>

<style lang="less" scoped>
.cg-input{
  width: fit-content;
  display: inline-flex;
  font-size: var(--Cg-fontSizeH4);
}
.cg-input-inner{
  border: 1px solid #efefef;
  outline: none;
  width: 160px;
  height: 26px;
  line-height: 26px;
  padding: 4px 6px;
  font-size: var(--Cg-fontSizeH3);
  border-radius: 4px;
  &:hover, &:focus{
    border-color: v-bind('cssVar.activeColor');
  }
}
.cg-input-textarea{
  width: 100%;
  min-height: 60px;
}

&.cg-input--label-inline{
  position: relative;
  .cg-input-inner:placeholder-shown::placeholder {
    color: transparent;
    user-select: none;
  }
  .input-label{
    position: absolute;
    line-height: 26px;
    top: 4px;
    left: 6px;
    color: #666;
    pointer-events: none;
    transition: all .3s;
    background: #fff;
    font-size: v-bind('cssVar.fontSizeH4');
  }
  .cg-input-inner:not(:placeholder-shown) ~ .input-label,
  .cg-input-inner:focus ~ .input-label {
    transform: scale(0.75) translate(-12px, -24px);
  }
}
</style>

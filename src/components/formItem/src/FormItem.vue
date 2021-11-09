<template>
  <div
    class="cg-form-item"
    :class="[
      `cg-form-item--${mode}`
    ]"
    :style="{
      display: inline ? 'inline-flex' : 'flex'
    }"
  >
    <slot v-if="mode != 'inline'" name="label">
      <p class="label">{{ label }}</p>
    </slot>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgFormItem',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, PropType, provide, useSlots } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

const props = defineProps({
  label: String,
  inline: Boolean,
  mode: {
    type: String as PropType<'left' | 'top' | 'inline'>,
    default: 'left',
  },
})

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('FormItem', customTheme, styleVar)
  return componentCssVar
})

const slots = useSlots()
console.log(slots)
provide('formItem', {
  mode: props.mode,
  label: slots?.label || props.label,
})
</script>

<style lang="less" scoped>
.cg-form-item{
  .label{
    font-size: v-bind('cssVar.fontSizeH4');
    color: v-bind('cssVar.fontColor2');
  }
  &.cg-form-item--left{
    align-items: center;
    .label{
      margin-right: 10px;
    }
  }
  &.cg-form-item--top{
    flex-direction: column;
    .label{
      margin-bottom: 10px;
    }
  }
}

</style>

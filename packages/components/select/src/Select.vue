<template>
  <cg-popover
    ref="popover"
    position="bottom"
    effect="light"
    trigger="click"
  >
    <template #content>
      <div ref="selectBodyEl" class="cg-select-options" :style="{width: rootWidth + 'px', ...ownCssVar}">
        <div
          v-for="item in options"
          :key="getItemValue(item)"
          class="cg-select-option"
          @click="clickOption(item)"
        >
          {{ getItemLabel(item) }}
        </div>
      </div>
    </template>
    <div
      ref="selectEl"
      class="cg-select"
    >
      <input
        type="text"
        :value="showLabel"
        :readonly="!filterable"
        class="cg-select-inner"
      >
      <cg-icon :style="{transition: 'transform .2s', transform: popover?.isShow ? `rotate(180deg)` : ''}">
        <ArrowDown />
      </cg-icon>
    </div>
  </cg-popover>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgSelect',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, PropType, ref, onMounted } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, isString } from '@corgi-box/utils'
import { IThemeCssVar } from '@corgi-box/utils/type'
import { CgPopover, CgIcon } from 'corgi-box'
import { ArrowDown } from '@element-plus/icons'
import selectBody from './select-body.vue'

const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  optionsLabel: {
    type: String,
    default: 'label',
  },
  optionsValue: {
    type: String,
    default: 'value',
  },
  modelValue: [String, Number],
  value: [String, Number],
  filterable: Boolean,
})
const emits = defineEmits(['update:modelValue'])

const popover = ref(null)

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Select', customTheme, styleVar)
  return componentCssVar
})

const ownCssVar = {
  '--hoverBackgroundColor': cssVar.value.hoverBackgroundColor,
}
const selectEl = ref(null)
const selectBodyEl = ref(null)

const getItemLabel = item => item ? isString(item) ? item : item[props.optionsLabel] : ''
const getItemValue = item => item ? isString(item) ? item : item[props.optionsValue] : ''

const showLabel = computed(() => getItemLabel(props.options.find(e => getItemValue(e) == (props.modelValue || props.value))))

const clickOption = val => {
  emits('update:modelValue', getItemValue(val))
  popover.value.hide()
}

const rootWidth = ref(0)

onMounted(() => {
  const { width } = selectEl.value.getBoundingClientRect()
  rootWidth.value = width
})
</script>

<style lang="less" scoped>
.cg-select{
  width: fit-content;
  border: 1px solid v-bind('cssVar.borderColor');
  padding: 4px 6px;
  border-radius: 4px;
  &:hover, &:focus{
    border-color: v-bind('cssVar.borderActiveColor');
  }
}
.cg-select-inner{
  outline: none;
  height: 26px;
  line-height: 26px;
  border: none;
  width: 160px;
  font-size: v-bind('cssVar.fontSizeH3');
  &[readonly] {
    cursor: pointer;
  }
}
.cg-select-options{
  width: 100%;
  padding: 4px 0;
  .cg-select-option{
    padding: 6px 4px;
    line-height: 26px;
    cursor: pointer;
    &:hover{
      background: var(--hoverBackgroundColor);
    }
  }
}
</style>

<template>
  <cg-popover
    ref="popover"
    position="bottom"
    effect="light"
    trigger="click"
  >
    <template #content>
      <div ref="selectBodyEl" class="cg-select-options" :style="{width: rootWidth + 'px'}">
        <div v-for="item in options" :key="item.value" class="cg-select-option">
          {{ item.label }}
        </div>
      </div>
    </template>
    <div
      ref="selectEl"
      class="cg-select"
    >
      <input type="text" :readonly="!filterable" class="cg-select-inner">
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
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import { CgPopover, CgIcon } from '@corgi/index'
import { ArrowDown } from '@element-plus/icons'
import selectBody from './select-body.vue'

const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  optionsLabel: String,
  optionsValue: String,
  modelValue: [String, Number],
  filterable: Boolean,
})

const popover = ref(null)

onMounted(() => {
  console.log(popover)
})

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Select', customTheme, styleVar)
  return componentCssVar
})

const selectEl = ref(null)
const selectBodyEl = ref(null)

const rootWidth = ref(0)

onMounted(() => {
  const { width } = selectEl.value.getBoundingClientRect()
  rootWidth.value = width
})
</script>

<style lang="less" scoped>
.cg-select{
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
  &[readonly] {
    cursor: pointer;
  }
}
.cg-select-options{
  width: 100%;
  .cg-select-option + .cg-select-option{
    border-top: 1px solid v-bind('cssVar.borderColor');
  }
}
</style>

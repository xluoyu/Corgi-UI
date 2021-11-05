<template>
  <div
    ref="ctxRef"
    class="cg-tab-nav"
    :class="[
      `cg-tab-nav--${type}`
    ]"
  >
    <div class="cg-tab-nav-items">
      <div
        v-for="item in labels"
        :key="item.key"
        class="cg-tab-nav-item"
        :class="{
          'cg-tab-nav-item--active': activeLabel == item.key
        }"
        @click="handleActiveItem(item.key)"
      >
        <span v-if="isString(item.label)">{{ item.label }}</span>
        <component :is="item.label" v-else />
      </div>
    </div>
    <div class="cg-tab-nav-activebar" :style="{width: lineActiveBar.width + 'px', transform: `translateX(${lineActiveBar.left}px)`}"></div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgTabNav',
})
</script>

<script lang="ts" setup>
import { defineComponent, PropType, inject, computed, onMounted, getCurrentInstance, ref, nextTick, onUpdated, reactive } from 'vue'
import { getComponentCssVar, isString, IThemeCssVar } from '@corgi/utils'
import ITabProvide from './tabProvide'
import styleVar from './styleVar'
const props = defineProps({
  type: {
    type: String as PropType<'line' | 'card'>,
    default: 'line',
  },
  labels: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  activeLabel: String,
})
const emits = defineEmits(['changeActive'])
const ctxRef = ref(null)
const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Switch', customTheme, styleVar)

  return componentCssVar
})

// const tabControl = inject<ITabProvide>('tabControl', null)
// const activeLabel = tabControl.activeLabel
const handleActiveItem = key => {
  emits('changeActive', key)
}

const setLineActivebarWidth = () => {
  let item = ctxRef.value.querySelector('.cg-tab-nav-item--active') as HTMLElement
  const { width, left } = item.getBoundingClientRect()
  const { paddingLeft, paddingRight } = getComputedStyle(item)
  console.log(item.offsetLeft, item.parentElement.offsetLeft)
  lineActiveBar.left = item.offsetLeft - item.parentElement.offsetLeft + parseFloat(paddingLeft)
  lineActiveBar.width = Math.floor(width - parseFloat(paddingLeft) - parseFloat(paddingRight))
}

const lineActiveBar = reactive({
  width: 0,
  left:0,
})

onUpdated(() => {
  if (props.type === 'line') {
    // nextTick(() => {
    setLineActivebarWidth()
    // })
  }
})


</script>

<style lang="less" scoped>
.cg-tab-nav{
  .cg-tab-nav-items{
    display: flex;
  }
  .cg-tab-nav-item{
    cursor: pointer;
    padding: 0 10px;
    line-height: 40px;
    font-size: v-bind('cssVar.fontSizeH4');
    user-select: none;
    &.cg-tab-nav-item--active{
      color: v-bind('cssVar.activeColor')
    }
  }
  &.cg-tab-nav--line{
    position: relative;
    .cg-tab-nav-activebar{
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: v-bind('cssVar.activeColor');
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &::after{
      content: '';
      width: 100%;
      height: 2px;
      display: block;
      background: #d5d5d5;
    }
  }
}
</style>

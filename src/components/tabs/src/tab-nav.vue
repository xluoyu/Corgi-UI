<template>
  <div
    ref="ctxRef"
    class="cg-tab-nav"
    :class="[
      `cg-tab-nav--${type}`,
      `cg-tab-nav--${position}`
    ]"
  >
    <div class="cg-tab-items">
      <div
        v-for="item in labels"
        :key="item.name"
        class="cg-tab-nav-item"
        :class="{
          'cg-tab-nav-item--active': activeLabel == item.name
        }"
        @click="handleActiveItem(item.name)"
      >
        <span v-if="isString(item.label)">{{ item.label }}</span>
        <component :is="item.label" v-else />
      </div>
    </div>
    <div v-if="type === 'line'" class="cg-tab-nav-activebar" :style="activeBarStyle"></div>
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
import{ IPosition, IType } from './type'
const props = defineProps({
  type: String as PropType<IType>,
  labels: Array as PropType<string[]>,
  activeLabel: String,
  position: String as PropType<IPosition>,
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
const handleActiveItem = name => {
  emits('changeActive', name)
}

const setLineActivebarWidth = () => {
  let item = ctxRef.value.querySelector('.cg-tab-nav-item--active') as HTMLElement
  const { width, height } = item.getBoundingClientRect()
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(item)
  lineActiveBar.left = item.offsetLeft - item.parentElement.offsetLeft + parseFloat(paddingLeft)
  lineActiveBar.width = Math.floor(width - parseFloat(paddingLeft) - parseFloat(paddingRight))
  lineActiveBar.top = item.offsetTop - item.parentElement.offsetTop + parseFloat(paddingTop)
  lineActiveBar.height = Math.floor(height - parseFloat(paddingTop) - parseFloat(paddingBottom))
  console.log(lineActiveBar.height)

}

const lineActiveBar = reactive({
  width: 0,
  left:0,
  height: 0,
  top: 0,
})

const activeBarStyle = computed(() => {
  return props.position === 'left' || props.position === 'right' ? {
    width: '2px',
    height: lineActiveBar.height + 'px',
    transform: `translateY(${lineActiveBar.top}px)`,
  } : {
    width: lineActiveBar.width + 'px',
    height: '2px',
    transform: `translateX(${lineActiveBar.left}px)`,
  }
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
  flex-shrink: 0;
  --radius: 10px;
  .cg-tab-items{
    display: flex;
  }
  .cg-tab-nav-item{
    cursor: pointer;
    padding: 0 20px;
    height: 40px;
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
      z-index: 10;
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
  &.cg-tab-nav--card{
    background: v-bind('cssVar.cardBgColor');
    .cg-tab-nav-item{
      position: relative;
      &:not(:first-of-type)::before,
      &:not(:first-of-type)::after {
        content: "";
        width: var(--radius);
        height: var(--radius);
        position: absolute;
      }
    }
    .cg-tab-nav-item--active{
      background: v-bind('cssVar.cardActiveBg');
    }
  }
}
.cg-tab-nav--top, .cg-tab-nav--bottom{
  &.cg-tab-nav--card{
    margin-top: 10px;
    .cg-tab-nav-item{
      transition: height 0.2s, margin 0.2s;
      &:not(:first-of-type)::before,
      &:not(:first-of-type)::after {
        bottom: 0;
      }
    }
    .cg-tab-nav-item--active{
      height: 50px;
      line-height: 50px;
      margin-top: -10px;
      border-radius: var(--radius) var(--radius) 0 0;
      &::before {
        left: -10px;
        border-radius: 0 0 10px 0;
        background: v-bind('cssVar.cardBgColor');
        z-index: 2;
      }
      &::after {
        left: -10px;
        background: v-bind('cssVar.cardActiveBg');
        z-index: 1;
      }
    }
    .cg-tab-nav-item--active + .cg-tab-nav-item {
      &::before {
        left: 0;
        background: v-bind('cssVar.cardActiveBg');
      }
      &::after {
        border-radius: 0 0 0 10px;
        left: 0;
        background: v-bind('cssVar.cardBgColor');
      }
    }
  }
}
.cg-tab-nav--left, .cg-tab-nav--right{
  .cg-tab-items{
    flex-direction: column;
  }
  &.cg-tab-nav--line{
    &::after{
      content: '';
      width: 2px;
      height: 100%;
      display: block;
      background: #d5d5d5;
      position: absolute;
      top: 0;
    }
  }
  &.cg-tab-nav--card{
    .cg-tab-nav-item--active{
      &::before {
        top: -10px;
        background: v-bind('cssVar.cardBgColor');
        z-index: 2;
      }
      &::after {
        top: -10px;
        background: v-bind('cssVar.cardActiveBg');
        z-index: 1;
      }
    }
    .cg-tab-nav-item--active + .cg-tab-nav-item {
      &::before {
        top: 0;
        background: v-bind('cssVar.cardActiveBg');
      }
      &::after {
        top: 0;
        background: v-bind('cssVar.cardBgColor');
      }
    }
  }
}
.cg-tab-nav--left{
  &.cg-tab-nav--line{
    &::after{
      right: 0;
    }
    .cg-tab-nav-activebar{
      top: 0;
      right: 0;
      left: unset;
      bottom: unset;
    }
  }
  &.cg-tab-nav--card{
    .cg-tab-nav-item{
      &:not(:first-of-type)::before,
      &:not(:first-of-type)::after {
        right: 0;
      }
    }
    .cg-tab-nav-item--active{
      &::before {
        border-radius:  0 0 10px 0 ;
      }
    }
    .cg-tab-nav-item--active + .cg-tab-nav-item {
      &::after {
        border-radius: 0 10px 0 0;
      }
    }
  }
}
.cg-tab-nav--right{
  &.cg-tab-nav--line{
    &::after{
      left: 0;
    }
    .cg-tab-nav-activebar{
      top: 0;
      left: 0;
      right: unset;
      bottom: unset;
    }
  }
  &.cg-tab-nav--card{
    .cg-tab-nav-item{
      &:not(:first-of-type)::before,
      &:not(:first-of-type)::after {
        left: 0;
      }
    }
    .cg-tab-nav-item--active{
      &::before {
        border-radius: 0 0 0 10px;
      }
    }
    .cg-tab-nav-item--active + .cg-tab-nav-item {
      &::after {
        border-radius: 10px 0 0 0;
      }
    }
  }
}
</style>

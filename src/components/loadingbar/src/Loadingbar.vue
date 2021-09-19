<template>
  <transition name="fade" @after-enter="beforeEnter">
    <div v-show="isBarShow">
      <div
        :class="['cg-loadingbar',{
          'cg-loadingbar--start': status == 'start',
          'cg-loadingbar--finish': status == 'finish',
          'cg-loadingbar--error': status == 'error',
        }]"
        :style="{width: maxWidthStyle}"
      ></div>
    </div>
  </transition>
  <slot></slot>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgLoadingbar',
})
</script>

<script lang="ts" setup>
import { getComponentCssVar } from '@corgi/utils'
import { IThemeCssVar } from '@corgi/utils/type'
import { defineComponent, computed, ref, Ref, provide, inject } from 'vue'
import styleVar from './styleVar'
import { loadBarProvideKey } from './type'

const props = defineProps({
  activeColor: String,
  errorColor: String,
})
const customTheme = inject<IThemeCssVar>('theme', null)

const cssVar = computed(() => {
  const componentCssVar = getComponentCssVar(customTheme, styleVar, 'loadingbar')

  if (props.activeColor) componentCssVar.activeColor = props.activeColor
  if (props.errorColor) componentCssVar.errorColor = props.errorColor

  return componentCssVar
})

const isBarShow = ref(false)
const status: Ref<'start' | 'finish' | 'error'> = ref('finish')


const maxWidth = ref(0)
const maxWidthStyle = computed(() => maxWidth.value + '%')

let defaultMaxWidth = 0
const beforeEnter = () => {
  requestAnimationFrame(() => {
    maxWidth.value = defaultMaxWidth
  })
}

const start = (num?: number) => {
  isBarShow.value = true
  status.value = 'start'
  maxWidth.value = 0
  defaultMaxWidth = Number(num) ? Number(num) : 80
}
const finish = () => {
  status.value = 'finish'
  maxWidth.value = 100
  isBarShow.value = false
}
const error = () => {
  status.value = 'error'
  maxWidth.value = 100
  isBarShow.value = false
}

provide(loadBarProvideKey, {
  start,
  finish,
  error,
})
</script>

<style lang="less" scoped>
.cg-loadingbar{
  position: absolute;
  height: 4px;
  background: v-bind('cssVar.activeColor');
  &.cg-loadingbar--start{
    transition: width 2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &.cg-loadingbar--finish{
    transition: width .4s linear;
  }
  &.cg-loadingbar--error{
    transition: width .4s linear;
    background: v-bind('cssVar.errorColor');

  }
}
.fade-enter-active {
  transition: opacity 0.2s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease .4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

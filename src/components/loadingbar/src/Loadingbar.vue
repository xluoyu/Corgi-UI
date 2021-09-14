<template>
  <transition name="fade">
    <div
      :class="['cg-loadingbar',{
        'cg-loadingbar--start': status == 'start',
        'cg-loadingbar--finish': status == 'finish',
        'cg-loadingbar--error': status == 'error',
      }]"
      :style="{width: maxWidthStyle}"
    ></div>
  </transition>
  <slot></slot>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgLoadingbar',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, ref, Ref, provide, nextTick } from 'vue'
import styleVar from './styleVar'
import { assignThemecustom } from '@corgi/utils'
import { loadBarProvideKey } from './type'

defineProps({
  type: {
    type: String,
    default: 'default',
  },
})

const status: Ref<'start' | 'finish' | 'error'> = ref('finish')

const customTheme = inject('theme', {})
const cssVar = computed(() => {
  let composeVar = customTheme ? assignThemecustom(customTheme, styleVar) : styleVar

  return composeVar
})
const maxWidth = ref(0)
const maxWidthStyle = computed(() => maxWidth.value + '%')


const start = () => {
  maxWidth.value = 0
  status.value = 'start'
  nextTick(() => {
    maxWidth.value = 80
  })
}
const finish = () => {
  status.value = 'finish'
  maxWidth.value = 100
}
const error = () => {
  status.value = 'error'
  maxWidth.value = 100

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
  transition: width 4s linear;
    background: #0fd130;

  &.cg-loadingbar--finish{
    transition: width .4s linear;
  }
  &.cg-loadingbar--error{
    transition: width .4s linear;
    background: #d1260f;

  }
}
</style>

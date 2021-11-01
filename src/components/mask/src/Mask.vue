<template>
  <transition>
    <div
      v-show="isShow"
      class="cg-mask"
    >
    </div>
  </transition>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgMask',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, ref } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

// const props = defineProps({
//   isShow: {
//     type: Boolean,
//     default: true,
//   },
// })

// console.log(props.isShow)

const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Mask', customTheme, styleVar)
  return componentCssVar
})

const isShow = ref(true)

defineExpose({
  show: () => isShow.value = true,
  hide: () => isShow.value = false,
})
</script>

<style lang="less" scoped>
.cg-mask{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: v-bind('cssVar.background');
}
</style>

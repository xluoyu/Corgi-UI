<template>
  <div
    v-if="isShow"
    class="cg-confirm"
  >
    <div v-if="title" class="cg-confirm-title">{{ title }}</div>
    <slot>
      <template v-if="isString(content)">{{ content }}</template>
      <component :is="content" v-else />
    </slot>
    <div class="cg-confirm-footer">
      <slot name="footer">
        <cg-space>
          <cg-button :type="cancelButtonType" @click="close">{{ cancelButtonText }}</cg-button>
          <cg-button :type="confirmButtonType" @click="submit">{{ confirmButtonText }}</cg-button>
        </cg-space>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgConfirm',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, PropType, ref, VNode, onUnmounted } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, IThemeCssVar, isString } from '@corgi/utils'
import { IButtonType } from '@corgi/components/button/src/Button.vue'
import { useShowMask, CgSpace, CgButton } from '@corgi/index'

const props = defineProps({
  title: String,
  content: String as PropType<String | VNode>,
  confirmButtonText: {
    type: String,
    default: '确定',
  },
  confirmButtonType: {
    type: String as PropType<IButtonType>,
    default: 'success',
  },
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  cancelButtonType: {
    type: String as PropType<IButtonType>,
    default: 'default',
  },
})
const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Confirm', customTheme, styleVar)
  return componentCssVar
})
console.log(customTheme)
const isShow = ref(true)

const showMask = useShowMask()


const confirmCbArray = []
const confirmCb = fn => {
  confirmCbArray.push(fn)
}

const cancelCbArray = []
const cancelCb = fn => {
  cancelCbArray.push(fn)
}

let unMountFn = null
const setUnMount = fn => {
  unMountFn = fn
}

const close = () => {
  cancelCbArray.forEach(e => e())
  showMask.close()
  isShow.value = false
  unMountFn && unMountFn()

}
const submit = () => {
  confirmCbArray.forEach(e => e())
  showMask.close()
  isShow.value = false
  unMountFn && unMountFn()
}

onUnmounted(() => {
  console.log('卸载了')
})

defineExpose({
  confirm: submit,
  cancel: close,
})
</script>

<style lang="less" scoped>
.cg-confirm{
  position: fixed;
  top: v-bind('cssVar.top');
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1001;
  background: #fff;
  width: v-bind('cssVar.width');
  height: fit-content;
}
</style>

<template>
  <cg-mask
    ref="maskEl"
    v-model="visible"
  >
    <transition name="slide-fade">
      <div
        v-show="visible"
        class="cg-confirm"
        :class="{
          'cg-confirm--fixed': isFixed
        }"
      >
        <cg-icon><Close /></cg-icon>
        <div v-if="title" class="cg-confirm-title">{{ title }}</div>
        <slot>
          <template v-if="isString(content)">{{ content }}</template>
          <component :is="content" v-else />
        </slot>
        <div class="cg-confirm-footer">
          <slot name="footer">
            <cg-button :type="cancelButtonType" @click="cancel">{{ cancelButtonText }}</cg-button>
            <cg-button :type="confirmButtonType" @click="submit">{{ confirmButtonText }}</cg-button>
          </slot>
        </div>
      </div>
    </transition>
  </cg-mask>
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
import { CgMask, CgButton, CgIcon } from '@corgi/index'
import { Close } from '@element-plus/icons'


const props = defineProps({
  title: String,
  content: String as PropType<String | VNode>,
  type: String,
  isFixed: {
    type: Boolean,
    default: false,
  },
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
const visible = ref(false)


const fnArray = {
  confirm: [],
  cancel: [],
  close: [],
}

const confirmAddFn = fn => {
  fnArray.confirm.push(fn)
}

const cancelAddFn = fn => {
  fnArray.cancel.push(fn)
}

const closeAddFn = fn => {
  fnArray.close.push(fn)
}

let unMountFn = null
const setUnMount = fn => {
  unMountFn = fn
}

const cancel = () => {
  fnArray.cancel.forEach(e => e())
  visible.value = false
  close('cancel')

}
const submit = () => {
  fnArray.confirm.forEach(e => e())
  visible.value = false
  close('confirm')
}

const close = type => {
  fnArray.close.forEach(e => e(type))
}

onUnmounted(() => {
  console.log('卸载了')
})

// defineExpose({
//   visible,
//   $confirm: submit, // 确认事件
//   $cancel: cancel, // 取消事件
//   confirmAddFn, // 为确认按钮添加回调
//   cancelAddFn, // 为取消按钮添加回调
//   closeAddFn, // 为关闭添加回调
// })
</script>

<style lang="less" scoped>
@import url('../../style/animes.less');
.cg-confirm{
  background: #fff;
  width: v-bind('cssVar.width');
  height: fit-content;
}
.cg-confirm--fixed{
  position: fixed;
  top: v-bind('cssVar.top');
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1001;
}
</style>

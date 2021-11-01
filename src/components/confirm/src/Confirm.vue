<template>
  <div
    v-if="isShow"
    class="cg-confirm"
  >
    <div v-if="title" class="cg-confirm-title">{{ title }}</div>
    <slot></slot>
    <div class="cg-confirm-footer">
      <slot name="footer">
        <cg-space>
          <cg-button :type="cancelButtonType" @click="close">{{ cancelButtonText }}</cg-button>
          <cg-button :type="confirmButtonType">{{ confirmButtonText }}</cg-button>
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
import { defineComponent, computed, inject, PropType, onMounted } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import { IButtonType } from '@corgi/components/button/src/Button.vue'
import { useShowMask } from '@corgi/index'

const props = defineProps({
  isShow: Boolean,
  title: String,
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


const showMask = useShowMask()

const close = () => {
  showMask.close()

}
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

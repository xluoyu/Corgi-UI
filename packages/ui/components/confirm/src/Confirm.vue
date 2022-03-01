<template>
  <div
    v-if="visible"
    class="cg-confirm"
    :class="{
      'cg-confirm--fixed': isFixed
    }"
    :style="[, {
      width: cssVar.width,
      top: cssVar.top
    }]"
  >
    <cg-icon class="close"><Close /></cg-icon>
    <div class="cg-confirm-title">
      {{ title }}
    </div>
    <div
      class="cg-confirm-content"
      :class="{
        'cg-confirm-content--center': useType === 'alert'
      }"
    >
      <cg-icon v-if="type" :color="iconColor" size="24px">
        <SuccessFilled v-if="type === 'success'" />
        <WarningFilled v-if="type === 'warning'" />
        <CircleCloseFilled v-if="type === 'error'" />
      </cg-icon>
      <slot>
        <template v-if="isString(content)">{{ content }}</template>
        <component :is="content" v-else />
      </slot>
    </div>
    <div class="cg-confirm-footer">
      <slot name="footer">
        <div class="cg-confirm-footer--right">
          <cg-button v-if="useType === 'confirm'" :type="cancelButtonType" @click="cancel">{{ cancelButtonText }}</cg-button>
          <cg-button :type="confirmButtonType" @click="submit">{{ confirmButtonText }}</cg-button>
        </div>
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
import { getComponentCssVar, getGlobalCssVar, IThemeCssVar, useGlobalCssVar } from '@corgi-box/ui/utils'
import { isString } from '@corgi-box/utils'
import { IButtonType } from '@corgi-box/ui'
import { CgButton, CgIcon } from 'corgi-box'
import { SuccessFilled, WarningFilled, CircleCloseFilled, Close } from '@element-plus/icons'


const props = defineProps({
  title: String,
  content: String as PropType<String | VNode>,
  type: {
    type: String as PropType<'success' | 'warning' | '' | 'error'>,
    default: '',
  },
  useType: {
    type: String as PropType<'confirm' | 'alert'>,
    default: 'confirm',
  },
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

const iconColor = computed(() => {
  if (props.type) {
    return cssVar.value[props.type].bg
  } else {
    return ''
  }
})

const visible = ref(true)

const fnArray = {
  confirm: [],
  cancel: [],
  close: [],
}

const addFn = (fn, type: 'confirm' | 'cancel' | 'close') => {
  fnArray[type].push(fn)
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

const costomCssVar = computed(() => {
  return `
    --Cg-Confirm-top: ${cssVar.value.top};
    --Cg-Confirm-width: ${cssVar.value.width};
  `
})

const close = type => {
  fnArray.close.forEach(e => e(type))
}

useGlobalCssVar(['fontSizeH3', 'radiusMini'])

onUnmounted(() => {
  console.log('卸载了')
})

defineExpose({
  visible,
  $confirm: submit, // 确认事件
  $cancel: cancel, // 取消事件
  addFn,
})
</script>

<style lang="less" scoped>
@import url('../../../style/animes.less');
.cg-confirm{
  background: #fff;
  height: fit-content;
  position: relative;
  border-radius: var(--Cg-radiusMini);
  .cg-confirm-title{
    font-size: var(--Cg-fontSizeH3);
    display: flex;
    align-items: center;
  }
  .cg-confirm-title, .cg-confirm-footer{
    padding: 10px;
  }
  .cg-confirm-content{
    padding: 10px 14px;
    &.cg-confirm-content--center{
      display: flex;
      align-items: center;
    }
  }
  .cg-confirm-footer--right{
    display: flex;
    justify-content: flex-end;
  }
}
.cg-confirm--fixed{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1001;
}
.close{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
}
</style>

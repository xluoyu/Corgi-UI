<template>
  <div
    v-if="showAlert"
    class="cg-alert"
    :class="{
      'cg-alert--showIcon': showIcon,
      'cg-alert--showClose': showClose
    }"
  >
    <div v-if="showIcon" class="cg-alert-icon">
      <cg-icon size="24px">
        <Flag v-if="type === 'default'" />
        <InfoFilled v-if="type === 'info'" />
        <SuccessFilled v-if="type === 'success'" />
        <WarningFilled v-if="type === 'warning'" />
        <CircleCloseFilled v-if="type === 'error'" />
      </cg-icon>
    </div>
    <div v-if="$slots.title || title" class="cg-alert-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="cg-alert-content">
      <slot></slot>
    </div>
    <div v-if="showClose" class="cg-alert-close" @click="handleClose">
      <cg-icon>
        <Close />
      </cg-icon>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgAlert',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, PropType, ref } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, IThemeCssVar } from '@corgi-box/components/utils'
import { Flag, InfoFilled, SuccessFilled, WarningFilled, CircleCloseFilled, Close } from '@element-plus/icons'

const props = defineProps({
  title:String,
  marginTop: {
    type: String,
    default: '100px',
  },
  type: {
    type: String as PropType<'default' | 'success' | 'info' | 'warning' | 'error'>,
    default: 'default',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['close'])

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Alert', customTheme, styleVar)
  componentCssVar.theme = globalCssVar[props.type || 'default']
  return componentCssVar
})

const showAlert = ref(true)
const handleClose = () => {
  showAlert.value = false
  emits('close')
}
</script>

<style lang="less" scoped>
.cg-alert{
  width: 100%;
  background: v-bind('cssVar.theme.transparentBg');
  color: v-bind('cssVar.theme.bg');
  padding: 4px 10px;
  border-radius: v-bind('cssVar.radiusMini');
  box-sizing: border-box;
  position: relative;
  margin-bottom: 10px;
  .cg-alert-title{
    font-size: v-bind('cssVar.fontSizeH3');
    margin-bottom: 5px;
    font-weight: 600;
  }
  .cg-alert-content{
    font-size: v-bind('cssVar.fontSizeH4');
    line-height: 24px;
  }
}
.cg-alert--showIcon{
  padding-left: 40px;
  .cg-alert-icon{
    position: absolute;
    top: 4px;
    left: 0;
    width: 40px;
    text-align: center;
  }
}
.cg-alert--showClose{
  padding-right: 30px;
  .cg-alert-close{
    color: #333;
    position: absolute;
    top: 4px;
    right: 0;
    width: 30px;
    text-align: center;
    cursor: pointer;
  }
}
</style>

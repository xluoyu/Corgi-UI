<template>
  <teleport to="body" :disabled="!appendToBody">
    <cg-mask
      v-model="visible"
      @click="closeDialog"
    >
      <transition name="slide-fade">
        <div
          v-show="visible"
          class="cg-dialog"
          :style="[cssVar, {
            width,
            top
          }]"
        >
          <cg-icon class="closeIcon" @click="closeDialog">
            <Close />
          </cg-icon>
          <div v-if="title || $slots.title" class="cg-dialog-title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div class="cg-dialog-container">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="cg-dialog-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </transition>
    </cg-mask>
  </teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgDialog',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, ref } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, useGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import { CgMask, CgIcon } from '@corgi/components'
import { Close } from '@element-plus/icons'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'default',
  },
  width: {
    type: String,
    default: '500px',
  },
  top: {
    type: String,
    default: '50px',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const customTheme = inject<IThemeCssVar>('theme', null)

useGlobalCssVar(['background', 'popupZIndex', 'radiusMedium', 'borderColor'])

const cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Dialog', customTheme, styleVar)
  return `
  `
})

const visible = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val),
})

const closeDialog = () => {
  emits('update:modelValue', false)
}

</script>

<style lang="less" scoped>
@import url('../../style/animes.less');
.cg-dialog{
  background: var(--Cg-background);
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: var(--Cg-popupZIndex);
  border-radius: var(--Cg-radiusMedium);
  overflow: hidden;
  .cg-dialog-title{
    padding: 10px 10px;
    border-bottom: 1px solid var(--Cg-borderColor);
  }
  .cg-dialog-container{
    padding: 16px 10px;
  }
  .cg-dialog-footer{
    border-top: 1px solid var(--Cg-borderColor);
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
.closeIcon{
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
}
</style>

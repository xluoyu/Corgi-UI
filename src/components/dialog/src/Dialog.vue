<template>
  <teleport to="body" :disabled="!appendToBody">
    <cg-mask>
      <div
        class="cg-dialog"
        :style="[cssVar, {
          width,
          top
        }]"
      >
        <cg-icon class="closeIcon">
          <Close />
        </cg-icon>
        <div v-if="title || $slots.title" class="cg-dialog-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <slot></slot>
        <div v-if="$slots.footer" class="cg-dialog-footer">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </cg-mask>
  </teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgDialog',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, Teleport } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import { CgMask, CgIcon } from '@corgi/components'
import { Close } from '@element-plus/icons'

const props = defineProps({
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

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
// let cssVar = computed(() => {
//   const componentCssVar = getComponentCssVar('Dialog', customTheme, styleVar)
//   return componentCssVar
// })

const cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Dialog', customTheme, styleVar)
  return `
    --Cg-background: ${componentCssVar.background};
    --Cg-popupZIndex: ${componentCssVar.popupZIndex};
    --Cg-radiusMedium: ${componentCssVar.radiusMedium};
    --Cg-borderColor: ${componentCssVar.borderColor};
  `
})
</script>

<style lang="less" scoped>
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
    padding: 8px 6px ;
    border-bottom: 1px solid var(--Cg-borderColor);
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

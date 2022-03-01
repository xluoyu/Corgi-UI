<template>
  <div
    v-if="showAlert"
    class="cg-card"
    :class="{
      'cg-card--border': border,
      'cg-card--showClose': showClose
    }"
  >
    <div v-if="showClose" class="cg-alert-close" @click="handleClose">
      <cg-icon>
        <Close />
      </cg-icon>
    </div>
    <div v-if="$slots.title || title" class="cg-card-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgCard',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, PropType, ref } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, IThemeCssVar } from '@corgi-box/ui/utils'
import { Close } from '@element-plus/icons'

const props = defineProps({
  title: String,
  border: Boolean,
  size: {
    type: String as PropType<'mini' | 'medium' | 'large'>,
    default: 'medium',
  },
  showClose: Boolean,
})

const customTheme = inject<IThemeCssVar>('theme', null)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Card', customTheme, styleVar)
  componentCssVar.size = componentCssVar[props.size] || componentCssVar['medium']

  return componentCssVar
})

const showAlert = ref(true)
const handleClose = () => {
  showAlert.value = false
}
</script>

<style lang="less" scoped>
.cg-card{
  font-size: v-bind('cssVar.fontSizeH4');
  width: 100%;
  padding: v-bind('cssVar.size.padding');
  background: #fff;
  // transition: all .3s cubic-bezier(1, 0.5, 0.8, 1);
  border-radius: 4px;
  // &:hover{
  //   box-shadow: 0 0 6px rgba(0, 0, 0, .2);
  // }
  .cg-card-title{
    font-size: v-bind('cssVar.size.titleFontSize');
    padding-bottom: 20px;
  }
}
.cg-card--border{
  border: 1px solid #eee;
}
.cg-card--showClose{
  padding-right: 30px;
  position: relative;

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

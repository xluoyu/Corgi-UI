<template>
  <div
    class="cg-switch"
    :class="{
      'cg-switch--open': switchStatus
    }"
    @click="toggleStatus"
  >
    <span v-if="inactiveText && !insideText" :style="{color: switchStatus == false ? activeTextColor : ''}">{{ inactiveText }}</span>
    <div class="cg-switch-rail">
      <div class="cg-switch-button">
        <span v-if="inactiveText && insideText" class="cg-switch-insideText insideText--off">{{ inactiveText }}</span>
        <span v-if="activeText && insideText" class="cg-switch-insideText insideText--on">{{ activeText }}</span>
      </div>
    </div>
    <span v-if="activeText && !insideText" :style="{color: switchStatus == true ? activeTextColor : ''}">{{ activeText }}</span>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgSwitch',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, PropType, ref } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import spinDark from '../../../../../readCode/vue3-ui/naive-ui/es/spin/styles/dark'
const props = defineProps({
  size: {
    type: String as PropType<'mini' | 'medium' | 'large'>,
    default: 'medium',
  },
  activeColor: String,
  inactiveColor: String,
  activeText: String,
  inactiveText: String,
  activeTextColor: {
    type: String,
    default: '#409EFF',
  },
  insideText: {
    type: Boolean,
    default: false,
  },
})
console.log(props.activeText)
const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Switch', customTheme, styleVar)
  componentCssVar.size = componentCssVar[props.size] || componentCssVar['medium']
  if (props.activeColor) componentCssVar.activeColor = props.activeColor
  if (props.inactiveColor) componentCssVar.inactiveColor = props.inactiveColor
  if (props.activeTextColor) componentCssVar.activeTextColor = props.activeTextColor

  return componentCssVar
})

const switchStatus = ref(false)
const toggleStatus = () => {
  switchStatus.value = !switchStatus.value
}
</script>

<style lang="less" scoped>
.cg-switch{
  display: inline-flex;
  height: v-bind('cssVar.size.height');
  cursor: pointer;

  .cg-switch-rail{
    background: v-bind('cssVar.inactiveColor');
    height: inherit;
    border-radius: 18px;
    display: flex;
    align-items: center;
    position: relative;
    transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: v-bind('cssVar.size.width');
    display: inline-block;
  }
  .cg-switch-button{
    background: #fff;
    border-radius: 50%;
    width: calc(v-bind('cssVar.size.height') - 4px);
    height: calc(v-bind('cssVar.size.height') - 4px);
    transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    left: 2px;
    top: 2px;
  }
}
.cg-switch--open{
  .cg-switch-rail{
    background: v-bind('cssVar.activeColor');
  }
  .cg-switch-button{
    left: calc(100% - v-bind('cssVar.size.height') + 2px);
  }
}
</style>

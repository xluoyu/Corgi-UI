<template>
  <div
    class="cg-switch"
    :class="{
      'cg-switch--open': switchStatus,
      'cg-switch--disabled': disabled
    }"
    @click="toggleStatus"
  >
    <span v-if="inactiveText && !insideText" class="cg-switch-children children--off" :style="{color: switchStatus == false ? activeTextColor : ''}">{{ inactiveText }}</span>
    <div class="cg-switch-rail">
      <div v-if="insideText" class="cg-switch-children-placeholder">
        <div v-if="inactiveText">{{ inactiveText }}</div>
        <div v-if="activeText">{{ activeText }}</div>
      </div>
      <div class="cg-switch-button">
        <div v-if="inactiveText && insideText" class="cg-switch-insideText insideText--off">{{ inactiveText }}</div>
        <div v-if="activeText && insideText" class="cg-switch-insideText insideText--on">{{ activeText }}</div>
      </div>
    </div>
    <span v-if="activeText && !insideText" class="cg-switch-children children--on" :style="{color: switchStatus == true ? activeTextColor : ''}">{{ activeText }}</span>
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
  disabled: {
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
  if (props.disabled) return
  switchStatus.value = !switchStatus.value
}
</script>

<style lang="less" scoped>
.cg-switch{
  display: inline-flex;
  height: v-bind('cssVar.size.height');
  line-height: v-bind('cssVar.size.height');
  cursor: pointer;
  user-select: none;
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
    overflow: hidden;
  }
  .cg-switch-children{
    transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .children--off{
    padding-right: 6px;
  }
  .children--on{
    padding-left: 6px;
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
  .cg-switch-children-placeholder{
    padding-left: calc(v-bind('cssVar.size.height') * 1.75);
    visibility: hidden;
    pointer-events: none;
  }
  .cg-switch-insideText{
    position: absolute;
    display: inline-block;
    width: fit-content;
    white-space: nowrap;
    top: 0;
    line-height: calc(v-bind('cssVar.size.height') - 4px);
    color: #fff;
    font-size: 14px;
  }
  .insideText--off{
    right: 0;
    padding-right: calc(v-bind('cssVar.size.height'));
  }
  .insideText--on{
    left: 0;
    padding-left: calc(v-bind('cssVar.size.height'));

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
.cg-switch--disabled{
  opacity: .5;
  cursor: not-allowed;
}
</style>

<template>
  <div
    :class="[
      `cg-button`,
      {
        'cg-button--circle': circle,
        'cg-button--round': round,
        'cg-button--ghost': ghost,
        'cg-button--dashed': dashed,
        'cg-button--disabled': disabled || loading,
        'cg-button--text': text,
      },
    ]"
    :style="{
      'display': block ? 'flex' : 'inline-flex',
    }"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="iconPosition === 'right'"><slot></slot></span>
    <cg-icon v-if="loading" is-loading>
      <Loading />
    </cg-icon>
    <slot v-else name="icon"></slot>
    <span v-if="iconPosition === 'left'"><slot></slot></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { getComponentCssVar, getGlobalCssVar, isLight } from '@corgi/utils/index'
import { isString } from '@corgi/utils/typeTool'
import type { PropType } from 'vue'
import { Loading } from '@element-plus/icons'
import styleVar from './styleVar'
import { IThemeCssVar } from '@corgi/utils/type'

const buttonProps = {
  round: {
    type: [Boolean, String],
    default: true,
  },
  text: Boolean,
  circle: Boolean,
  block: Boolean,
  color: String,
  loading: Boolean,
  disabled: Boolean,
  ghost: Boolean,
  dashed: Boolean,
  onClick: Function,
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  size: {
    type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  type: {
    type: String as PropType<'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'>,
    default: 'default',
  },
}

export type IButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'

export default defineComponent({
  name: 'CgButton',
  components: {
    Loading,
  },
  props: buttonProps,
  setup (props) {
    const customTheme = inject<IThemeCssVar>('theme', null)
    const globalCssVar = getGlobalCssVar()
    let cssVar = computed(() => {
      const componentCssVar = getComponentCssVar('button', customTheme, styleVar)
      componentCssVar.theme = globalCssVar[props.type || 'default']
      if (props.color) {
        componentCssVar.theme.bg = props.color
        componentCssVar.theme.color = isLight(props.color) ? '#000' : '#fff'
      }
      if (props.round && isString(props.round)) {
        componentCssVar.round = props.round
      }
      return componentCssVar
    })

    let buttonSizeVar = computed(() => {
      let sizeAboutVar = cssVar.value[props.size] || cssVar.value['medium']

      return sizeAboutVar
    })

    const handleClick = e => {
      if (!props.disabled && !props.loading) {
        const { onClick } = props
        onClick && onClick.call(onClick, e)
      }
    }
    return {
      cssVar,
      buttonSizeVar,
      handleClick,
    }
  },
})
</script>

<style lang="less" scoped>
@import url('../../style/mixin.less');

.cg-button {
  background: v-bind('cssVar.theme.bg');
  height: v-bind('buttonSizeVar.height');
  font-size: v-bind('buttonSizeVar.fontSize');
  color: v-bind('cssVar.theme.color');
  padding: v-bind('buttonSizeVar.padding');
  box-sizing: border-box;
  border: none;
  cursor: pointer;
  user-select: none;
  .flex-center();
  &:hover {
    opacity: 0.7;
  }
  &.cg-button--round {
    border-radius: v-bind('cssVar.round');
  }
  &.cg-button--circle {
    border-radius: v-bind('buttonSizeVar.circle');
  }
  &.cg-button--ghost {
    background: v-bind('cssVar.theme.transparentBg');
    border: 1px solid v-bind('cssVar.theme.bg');
    color: v-bind('cssVar.theme.bg');
    &:hover {
      background: v-bind('cssVar.theme.bg');
      color: v-bind('cssVar.theme.color');
    }
    &.cg-button--dashed {
      border-style: dashed;
    }
  }
  &.cg-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.cg-button--text {
    border: none;
    background: none;
    color: v-bind('cssVar.theme.bg');
  }
}
</style>

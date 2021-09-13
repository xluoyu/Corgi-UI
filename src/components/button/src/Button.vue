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
    :type="attrType"
    @mousedown="handleMouseDown"
  >
    <cg-icon v-if="loading" is-loading>
      <Loading />
    </cg-icon>
    <slot v-else name="icon"></slot>
    <span><slot></slot></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { assignThemecustom, isLight } from '@corgi/utils/index'
import type { IThemeCssVar } from '@corgi/utils/type'
import { isString } from '@corgi/utils/typeTool'
import styleVar from './styleVar'
import type { PropType } from 'vue'
import { Loading } from '@element-plus/icons'

const buttonProps = {
  attrType: {
    type: String,
    default: 'button',
  },
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
  size: {
    type: String as PropType<'tiny' | 'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  type: {
    type: String as PropType<'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'>,
    default: 'default',
  },
}

export default defineComponent({
  name: 'CgButton',
  components: {
    Loading,
  },
  props: buttonProps,
  setup (props) {
    const customTheme = inject<IThemeCssVar>('theme', {})

    let cssVar = computed(() => {
      let composeVar = customTheme ? assignThemecustom(customTheme, styleVar) : Object.assign({}, styleVar)
      composeVar.theme = props.color ? props.color : composeVar[props.type]
      if (props.color) {
        composeVar.color = isLight(props.color) ? '#000' : '#fff'
      }
      return composeVar
    })

    let buttonSizeVar = computed(() => {
      let sizeAboutVar = cssVar.value[props.size]

      if (props.round && isString(props.round)) {
        sizeAboutVar.round = props.round
      }

      return sizeAboutVar
    })

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()

      if (props.disabled) {
        return
      }
    }

    return {
      cssVar,
      buttonSizeVar,
      handleMouseDown,
    }
  },
})
</script>

<style lang="less" scoped>
@import url('../../style/mixin.less');

.cg-button {
  background: v-bind('cssVar.theme');
  height: v-bind('buttonSizeVar.height');
  font-size: v-bind('buttonSizeVar.fontSize');
  color: v-bind('cssVar.color');
  padding: v-bind('buttonSizeVar.padding');
  box-sizing: border-box;
  border: none;
  cursor: pointer;
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
    background: transparent;
    border: 1px solid v-bind('cssVar.theme');
    color: v-bind('cssVar.theme');
    &:hover {
      background: v-bind('cssVar.theme');
      color: v-bind('cssVar.color');
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
    color: v-bind('cssVar.theme');
  }
}
</style>

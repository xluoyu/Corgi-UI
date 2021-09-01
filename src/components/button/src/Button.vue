<script lang="tsx">
import { defineComponent, PropType, computed, inject } from 'vue'
import { assignThemecustom, isLight } from '@utils/index'
import { IThemeCssVar } from '@utils/type'
import { isString } from '@utils/typeTool'
import styleVar from './styleVar'

const props = {
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
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'button',
  },
  onClick: [Function, Array],
}

export default defineComponent({
  name: 'CgButton',
  props,
  setup (props) {
    const customTheme = inject<IThemeCssVar>('theme', {})

    // const handleClick = (e: MouseEvent) => {
    //   const { onClick } = props
    //   if (onClick) {
    //     if (isFunction(onClick)) {
    //       onClick(e)
    //     } else if (isArray(onClick)) {
    //       onClick.forEach(fn => {
    //         isFunction(fn) ? fn(e) : warn('button', '传入的onClick无法执行')
    //       })
    //     } else {
    //       warn('button', '传入的onClick无法执行')
    //     }
    //   }
    // }

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

    return {
      cssVar,
      buttonSizeVar,
    }
  },
  render () {
    const { $slots, tag: Component } = this
    return (
      <Component
        class={[
          `cg-button`,
          {
            'cg-button--default': this.type === 'default',
            'cg-button--circle': this.circle,
            'cg-button--round': this.round,
            'cg-button--ghost': this.ghost,
            'cg-button--dashed': this.dashed,
            'cg-button--disabled': this.disabled,
            'cg-button--text': this.text,
          },
        ]}
        style={{
          'display': this.block ? 'flex' : 'inline-flex',
        }}
        disabled={this.disabled}
        type={this.attrType}
        onClick={this.onClick}
      >
        <span>{$slots.default && $slots.default()}</span>
      </Component>
    )
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
  &.cg-button--default {
    border: 1px solid #eee;
    color: #333;
    background: #fff;
  }
}
</style>

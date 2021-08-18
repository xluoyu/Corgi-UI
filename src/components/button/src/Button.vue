<script lang="tsx">
import { defineComponent, PropType, computed, inject, ref, reactive, onMounted, watchEffect, Ref, watch } from 'vue';
import { assignThemecustom, isLight } from '../../../utils';
import { IThemeCssVar } from '../../../utils/type';
import { isFunction, isArray, isString } from '../../../utils/typeTool'
import { warn } from '../../../utils/warn';
import styleVar from './styleVar'

export default defineComponent({
  name: 'Button',
  props: {
    attrType: {
      type: String,
      default: 'Button'
    },
    round: {
      type: [Boolean, String],
      default: true
    },
    circle: Boolean,
    block: Boolean,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    ghost: Boolean,
    size: {
      type: String as PropType<'tiny' | 'small' | 'medium' | 'large'>,
      default: 'medium'
    },  
    type: {
      type: String as PropType<'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'>,
      default: 'default'
    },
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'button'
    },
    onClick: [Function, Array]
  },
  setup (props) {
    const customTheme = inject<IThemeCssVar>('theme')

    const handleClick = (e: MouseEvent) => {
      const {onClick} = props
      if (onClick) {
        if (isFunction(onClick)) {
          onClick(e)
        } else if (isArray(onClick)) {
          onClick.forEach(fn => {
            isFunction(fn) ? fn(e) : warn('button', '传入的onClick无法执行')
          })
        } else {
          warn('button', '传入的onClick无法执行')
        }
      }
    }

    let cssVar = computed(() => {
      let composeVar = customTheme ? assignThemecustom(customTheme, styleVar) : Object.assign({}, styleVar)
      composeVar.background = props.color ? props.color : styleVar[props.type]
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
      handleClick
    }
  },
  render () {
    const {$slots, tag: Component} = this
    return (
      <Component
        class={[
          `cg-button`,
          {
            'cg-button-default': this.type === 'default',
            'cg-button-circle': this.circle,
            'cg-button-round': this.round,
            'cg-button-ghost': this.ghost
          }
        ]}
        style={{
          'display': this.block ? 'flex' : 'inline-flex'
        }}
        type={this.attrType}
        onClick={this.onClick}
      >
        <span>{$slots.default && $slots.default()}</span>
      </Component>
    )
  }
})
</script>

<style lang="less" scoped>
.cg-button{
  background: v-bind('cssVar.background');
  height: v-bind('buttonSizeVar.height');
  font-size: v-bind('buttonSizeVar.fontSize');
  color: v-bind('cssVar.color');
  padding: v-bind('buttonSizeVar.padding');
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-items: center;
  border: none;
  cursor: pointer;
  &:hover{
    opacity: .7;
  }
  &.cg-button-default{
    border: 1px solid #eee;
    color: #333;
    background: #fff;
  }
  &.cg-button-circle{
    border-radius: v-bind('buttonSizeVar.circle');
  }
  &.cg-button-round{
    border-radius: v-bind('cssVar.round');
  }
  &.cg-button-ghost{
    background: transparent;
    border: 1px solid v-bind('cssVar.background');
    color: v-bind('cssVar.background');
    &:hover{
      background: v-bind('cssVar.background');
      color: #fff;
    }
  }
}
</style>
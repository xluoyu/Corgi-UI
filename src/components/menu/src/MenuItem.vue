<script lang="tsx">
import { computed, defineComponent, inject, PropType, h } from 'vue'
import { IMenuItem, menuProvideKey } from './type'
import styleVar from './styleVar'
import { getComponentCssVar } from '@corgi/utils'
import { IThemeCssVar } from '@corgi/utils/type'
import { isFunction } from '@corgi/utils/typeTool'
export default defineComponent({
  name: 'CgMenuItem',
  props: {
    options: {
      type: Object as PropType<IMenuItem>,
      required: true,
    },
    space: Number,
  },
  setup (props) {
    const {
      menuProps,
      activeKey,
      changeActive,
    } = inject(menuProvideKey)
    const customTheme = inject<IThemeCssVar>('theme', null)

    const componentCssVar = computed(() => {
      const componentCssVar = getComponentCssVar('menu', customTheme, styleVar)
      componentCssVar.paddingLeft = props.space + 'px'

      return componentCssVar
    })

    const handleClick = () => {
      changeActive(props.options.key)
    }

    const isActive = computed(() => activeKey.value === props.options.key)

    return {
      componentCssVar,
      pathBase: menuProps.pathBase || '',
      activeStyle: menuProps.activeStyle || '',
      itemClass: menuProps.itemClass || '',
      isActive,
      handleClick,
    }
  },
  render () {
    const content = this.options.label && isFunction(this.options.label) ? this.options.label(h) : this.options.label
    console.log(content)
    return (
      <div
        class={[
          'cg-menu-item',
          {
            'cg-menu-item--active': this.isActive,
          },
          this.itemClass,
        ]}
        style={this.activeStyle}
        onClick={this.handleClick}
      >
        {
          this.options.path ? <router-link to={this.pathBase + this.options.path}>{content}</router-link>
            : content
        }
      </div>
    )
  },
})
</script>

<style lang="less" scoped>
@import url('../../style/mixin.less');

.cg-menu-item{
  height: 42px;
  padding: 0 20px;
  padding-left: v-bind('componentCssVar.paddingLeft');
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
  font-size: v-bind('componentCssVar.fontSizeH3');
  position: relative;
  &:hover{
    color: v-bind('componentCssVar.theme');
  }
  &.cg-menu-item--active{
    color: v-bind('componentCssVar.activeColor');
    background-color: v-bind('componentCssVar.activeBackground');
  }
  a{
    color: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    &:before{
      content:'';
      .ab-fill()
    }
  }
}
</style>

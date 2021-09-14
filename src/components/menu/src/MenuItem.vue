<script lang="tsx">
import { computed, defineComponent, inject, PropType } from 'vue'
import { IMenuItem, menuProvideKey } from './type'
import styleVar from './styleVar'
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


    const cssVar = computed(() => {
      return Object.assign({}, styleVar, {
        paddingLeft: props.space + 'px',
      })
    })

    const handleClick = () => {
      changeActive(props.options.key)
    }

    const isActive = computed(() => activeKey.value === props.options.key)

    return {
      cssVar,
      pathBase: menuProps.pathBase || '',
      activeStyle: menuProps.activeStyle || '',
      itemClass: menuProps.itemClass || '',
      isActive,
      handleClick,
    }
  },
  render () {
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
          this.options.path ? <router-link to={this.pathBase + this.options.path}>{this.options.label}</router-link>
            : this.options.label
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
  padding-left: v-bind('cssVar.paddingLeft');
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
  font-size: v-bind('cssVar.fontSizeH3');
  // border-radius: v-bind('cssVar.radiusMini');
  position: relative;
  &:hover{
    color: v-bind('cssVar.theme');
  }
  &.cg-menu-item--active{
    color: v-bind('cssVar.activeColor');
    background-color: v-bind('cssVar.activeBackground');
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

<script lang="tsx">
import { defineComponent, computed, provide, ref, PropType } from 'vue'
import { EMenuType, IMenuItem, menuProvideKey } from './type'
import itemRender from './itemRender'

export const Props = {
  space: {
    type: Number,
    default: 20,
  },
  mode: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
  list: {
    type: Array as PropType<IMenuItem[]>,
    dafault: [],
  },
  pathBase: String,
  activeKey: String,
  activeStyle: String,
  activeClass: String,
  itemClass: String,
}

export default defineComponent({
  name: 'CgMenu',
  props: Props,
  setup (props) {
    const activeKey = ref(props.activeKey || '')
    const changeActive = key => {
      activeKey.value = key
    }

    const menuList = computed(() => {
      return props.list.map(e => {
        e.component = e.type ? EMenuType[e.type] : 'CgMenuItem'
        return e
      })
    })

    provide(menuProvideKey, {
      menuProps: props,
      activeKey: activeKey,
      changeActive: changeActive,
    })

    return {
      menuList,
    }
  },
  render () {
    return (
      <div class={['cg-menu', this.mode]}>
        {this.menuList && this.menuList.map(e => itemRender(e, this.space))}
      </div>
    )
  },
})
</script>


<style lang="less" scoped>
.cg-menu{
  height: 100%;
}
.horizontal{
  display: inline-flex;
}
</style>

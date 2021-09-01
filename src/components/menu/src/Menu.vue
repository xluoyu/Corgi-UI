<script lang="tsx">
import { defineComponent, PropType, computed, provide } from 'vue'
import { EMenuType, IMenuItem, MeunItemWithComponent } from './type'
import itemRender from './itemRender'

export default defineComponent({
  name: 'CgMenu',
  props: {
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
  },
  setup (props) {
    provide('indent', props.space)
    const menuList = computed(() => {
      return props.list.map((e: MeunItemWithComponent) => {
        e.component = e.type ? EMenuType[e.type] : 'CgMenuItem'
        return e
      })
    })
    console.log(menuList.value)

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

<script lang="ts">
import { getComponetApp, getSlotsVNodeEls } from '@corgi/utils'
import { createApp, defineComponent, h, onMounted, PropType, ref, VNode } from 'vue'
import { CgPopover } from '@corgi/index'

export default defineComponent({
  name: 'CgTooltip',
  props: {
    content: String,
    effect: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light',
    },
    position: {
      type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
      default: 'bottom',
    },
  },
  setup (props, ctx) {
    const createTool = () => {
      // const compApp = getComponetApp(popver, {})
      // console.log(compApp)
    }
    const showTool = () => {
    }
    const hideTool = () => {}
    onMounted(() => {
      createTool()
    })
    return {
      showTool,
      hideTool,
    }
  },
  render () {
    this.$nextTick(() => {
      console.log(this.$el)
      this.$el.nextSibling.addEventListener('mouseover', this.showTool)
      this.$el.nextSibling.addEventListener('mouseout', this.hideTool)
      // const doms = getSlotsVNodeEls(this.$slots.default())
      // console.log(doms)

      // doms.forEach(item => {
      // if (item.props) {
      //   item.props['onClick'] = this.test
      // } else {
      //   item.props = {
      //     onClick: this.test,
      //   }
      // }
      // if (item) {
      //   item.addEventListener('click', this.test)
      // }
      // })

      // console.log(doms)
    })
    return [h(this.$slots.default), h(CgPopover, { content: '这是opopener' })]
  },
})

</script>

<style lang="less" scoped>
.cg-tooltip{
  position: relative;
}
.cg-tooltip-box{
  position: absolute;
  padding: 4px 6px;
  max-width: 180px;
  width: fit-content;
  &.cg-tooltip-box--top{
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>

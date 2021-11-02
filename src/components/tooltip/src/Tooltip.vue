<script lang="ts">
import { getSlotsVNodeEls } from '@corgi/utils'
import { defineComponent, h, onMounted, PropType, ref, VNode } from 'vue'

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
    const test = () => {
      console.log('哦是的')
    }
    const tooRef = ref(null)
    onMounted(() => {
      console.log(tooRef.value)
    })
    return { test,tooRef }
  },
  render () {
    this.$nextTick(() => {
      console.log(this.$el.nextSibling)
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
    return h(this.$slots.default)
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

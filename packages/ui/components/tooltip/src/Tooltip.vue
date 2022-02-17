<script lang="ts">
import { defineComponent, h } from 'vue'
import { CgPopover, PopoverPorps } from '@corgi-box/components'
export default defineComponent({
  name: 'CgTooltip',
  props: {
    // ...PopoverPorps,
    content: String,
  },
  render () {
    return h(CgPopover, this.$props, {
      default: this.$slots.default,
    })
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

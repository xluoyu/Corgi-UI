<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgSpace',
  props: {
    horizontal: {
      type: Boolean,
      default: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String as PropType<'flex-start' | 'flex-end' | 'center'>,
      default: 'flex-start',
    },
    inline: Boolean,
    wrap: {
      type: Boolean,
      default: true,
    },
  },
  setup () {
    return {
      styleVar,
    }
  },
  render () {
    let children = this.$slots.default && this.$slots.default()

    return (
      <div
        class={[
          'cg-space',
          // 优先匹配vertical
          this.vertical ? 'cg-space--vertical' : this.horizontal ? 'cg-space--horizontal' : '',
        ]}
        style={{
          alignContent: this.align,
        }}
      >
        {children && children.length && children.map(child => (
          <div
            class="cg-space-item"
          >
            {child}
          </div>
        ),
        )}
      </div>
    )
  },
})
</script>

<style lang="less" scoped>
.cg-space{
  display: flex;
  flex-wrap: wrap;
}
.cg-space-item{
  margin-bottom: 10px;
}
.cg-space--horizontal{
  flex-direction: row;
  .cg-space-item+.cg-space-item{
    margin-left: 10px;
  }
}
.cg-space--vertical{
  flex-direction: column;
  .cg-space-item{
    width: 100%;
    margin-left: 0px;
  }
}
</style>

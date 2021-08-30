<script lang="tsx">
import { defineComponent, PropType, VNode } from 'vue'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgSpace',
  props: {
    align: {
      type: String as PropType<'start' | 'end' | 'center'>,
      default: 'start'
    },
    inline: Boolean,
    wrap: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    return {
      styleVar
    }
  },
  render () {
    let children = this.$slots.default && this.$slots.default()
    return (
      <div
        class={[
          'cg-space'
        ]}
      >
        {children && children.length && children.map((child, index) => (
            <div
              style={{
                marginRight: children && index !== (children as VNode[]).length ? '10px' : 0,
                marginBottom: '10px',
                marginTop: '10px'
              }}
            >
              {child}
            </div>
          )
        )}
      </div>
    )
  }
})
</script>

<style lang="less" scoped>

.cg-space{
  display: flex;
  flex-wrap: wrap;
  align-items: center ;
}
</style>
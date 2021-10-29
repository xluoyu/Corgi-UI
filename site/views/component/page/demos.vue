<script lang="tsx">
import { defineComponent, VNode } from 'vue'

export default defineComponent({
  props: {
    column: {
      type: String,
      default: 'two',
    },
  },
  setup (props) {
    console.log(props.column)

    return {}
  },
  render () {
    const children = this.$slots.default && this.$slots.default()
    if (this.column == 'two') {
      const childrens: any[] = [[], []]
      children?.forEach((e, index) => {
        if (index % 2 === 0) {
          childrens[0].push(e)
        } else {
          childrens[1].push(e)
        }
      })
      return (
        <div class="grid">
          <div>
            {
              childrens[0].map((child: VNode) => child)
            }
          </div>
          <div>
            {
              childrens[1].map((child: VNode) => child)
            }
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {
            children.map((child: VNode) => child)
          }
        </div>
      )
    }
  },
})
</script>

<style scoped>

</style>

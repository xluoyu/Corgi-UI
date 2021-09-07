<script lang="tsx">
import { computed, defineComponent, inject, PropType } from 'vue'
import { IMenuItem } from './type'
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
    const base = inject('base', '')
    const isRouter = inject('isRouter', false)
    const cssVar = computed(() => {
      return Object.assign({}, styleVar, {
        paddingLeft: props.space + 'px',
      })
    })

    return {
      cssVar,
      base,
      isRouter,
    }
  },
  render () {
    return (
      <div class="cg-menu-item">
        {
          this.isRouter ? <a href={this.base + this.options.path}>{this.options.label}</a>
            : this.options.label
        }
      </div>
    )
  },
})
</script>

<style lang="less" scoped>
.cg-menu-item{
  height: 42px;
  padding: 0 20px;
  padding-left: v-bind('cssVar.paddingLeft');
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
  border-radius: v-bind('cssVar.radiusMini');
  &:hover{
    // background: v-bind('cssVar.theme');
    color: v-bind('cssVar.theme');
  }
  a{
    color: inherit;
    text-decoration: none;
  }
}
</style>

<script lang="tsx">
import { getGlobalCssVar } from '@corgi/utils'
import { merge } from 'lodash'
import { defineComponent, computed } from 'vue'
import itemRender from './itemRender'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgMenuGroup',
  props: {
    options: Object,
    space: Number,
  },
  setup (props) {
    const globalCssVar = getGlobalCssVar()
    const cssVar = computed(() => {
      const componentCssVar = globalCssVar.menu ? merge(styleVar(globalCssVar), globalCssVar.menu) : styleVar(globalCssVar)
      componentCssVar.paddingLeft = props.space + 'px'

      return componentCssVar
    })
    return {
      cssVar,
    }
  },
  render () {
    return (
      <div class="cg-menu-grop">
        <span class="cg-menu-grop-label">{ this.options.label }</span>
        {
          this.options.children && this.options.children.map(e => itemRender(e, this.space))
        }
      </div>
    )
  },
})
</script>

<style lang="less" scoped>
.cg-menu-grop {
  span{
    color: v-bind('cssVar.fontColor3');
    font-size: v-bind('cssVar.fontSizeH4');
    padding: 10px 0;
    padding-left: v-bind('cssVar.paddingLeft');
    display: inline-block;
  }
}
</style>

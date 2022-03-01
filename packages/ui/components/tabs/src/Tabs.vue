<script lang="ts">
import { defineComponent, computed, inject, onMounted, getCurrentInstance, h, VNode, ref, provide, PropType } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, IThemeCssVar } from '@corgi-box/ui/utils'
import{ IPosition, IType } from './type'
import TabNav from './tab-nav.vue'
export default defineComponent({
  name: 'CgTabs',
  components: {
    TabNav,
  },
  props: {
    type: {
      type: String as PropType<IType>,
      default: 'line',
    },
    modelValue: [String, Number],
    position: {
      type: String as PropType<IPosition>,
      default: 'top',
    },
    bulge: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const labels = ref([])
    const setNavItem = () => {
      if (!instance.subTree.children || !instance.subTree.children.length) return
      const contentItems = (instance.subTree.children as VNode[]).find(e => e.props?.class === 'cg-tabs-content')
      labels.value = (contentItems.children as VNode[]).filter(e => e.props && e.props.name).map(e => {
        return {
          name: e.props.name,
          label: e.children['label'] || e.props.label,
        }
      })
      if (!props.modelValue){ recordLabel.value = labels.value[0]?.name }
    }

    const recordLabel = ref(null)
    const activeLabel = computed(() => props.modelValue || recordLabel.value || null)

    provide('tabControl', {
      activeLabel,
    })

    onMounted(() => {
      setNavItem()
    })

    const handleActiveItem = name => {
      emit('update:modelValue', name)
      recordLabel.value = name
    }

    return {
      labels,
      handleActiveItem,
      activeLabel,
    }
  },
  render () {
    const { type, labels, activeLabel, handleActiveItem, position, bulge } = this
    const nav = this.$slots.header ? this.$slots.header({ labels })
      : h(TabNav, {
        labels,
        type,
        activeLabel,
        position,
        bulge,
        onChangeActive: handleActiveItem,
      })
    const content = h(
      'div',
      {
        class: 'cg-tabs-content',
      },
      this.$slots?.default(),
    )

    return h('div', {
      class:['cg-tabs', `cg-tabs--${position}`, { 'cg-tabs--card': type === 'card' }],
    }, position === 'bottom' || position === 'right' ? [content, nav] : [nav, content])
  },
})
</script>

<style lang="less" scoped>
.cg-tabs{
  &.cg-tabs--card{
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.122), 0 0 6px rgba(0, 0, 0, 0.039);
  }
}
.cg-tabs--left, .cg-tabs--right{
  display: flex;
  .cg-tabs-content{
    flex: 1;
  }
}
</style>

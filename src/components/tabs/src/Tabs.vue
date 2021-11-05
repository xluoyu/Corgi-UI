<script lang="ts">
import { defineComponent, computed, inject, onMounted, getCurrentInstance, h, VNode, ref, provide, PropType } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import TabNav from './tab-nav.vue'
export default defineComponent({
  name: 'CgTabs',
  components: {
    TabNav,
  },
  props: {
    type: {
      type: String as PropType<'line' | 'card'>,
      default: 'line',
    },
    modelValue: [String, Number],
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const labels = ref([])
    const setNavItem = () => {
      if (!instance.subTree.children || !instance.subTree.children.length) return
      const contentItems = (instance.subTree.children as VNode[]).find(e => e.props.class === 'cg-tabs-content')
      labels.value = (contentItems.children as VNode[]).map(e => {
        return {
          key: e.props.name,
          label: e.children['label'] || e.props.label,
        }
      })
    }

    const activeLabel = computed(() => props.modelValue || labels.value[0].key || null)

    provide('tabControl', {
      activeLabel,
    })

    onMounted(() => {
      setNavItem()
    })

    const handleActiveItem = key => emit('update:modelValue', key)

    return {
      labels,
      handleActiveItem,
      activeLabel,
    }
  },
  render () {
    const nav = h(TabNav, {
      labels: this.labels,
      activeLabel: this.activeLabel,
      onChangeActive: this.handleActiveItem,
    })
    const content = h(
      'div',
      {
        class: 'cg-tabs-content',
      },
      this.$slots?.default(),
    )

    return h('div', {
      class:'cg-tabs',
    }, [nav, content])
  },
})
</script>

<style lang="less" scoped>

</style>

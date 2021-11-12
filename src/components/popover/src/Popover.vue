<script lang="ts">
import { defineComponent, h, onMounted, PropType, ref, Teleport, computed, withDirectives, createVNode } from 'vue'
import popoverBody from './popover-body.vue'
import popoverProps from './popoverProps'
import usePopoverEvents from './PopoverEvent'
import { CgClickOut } from '@corgi/index'

export default defineComponent({
  name: 'CgPopover',
  props: {
    ...popoverProps,
    trigger: {
      type: String as PropType<'hover' | 'click' | 'event'>,
      default: 'hover',
    },
  },
  setup (props, { expose }) {
    const isShow = ref(false)
    const popApp = ref(null)
    const currentApp = ref(null)
    const currentEl = computed(() => currentApp.value?.nextSibling)
    onMounted(() => {
      usePopoverEvents(currentEl.value, popApp, props, isShow)
    })

    const show = () =>{
      isShow.value = true
    }
    const hide = () =>{
      isShow.value = false
    }

    expose({
      isShow,
      show,
      hide,
    })

    return {
      hide,
      isShow,
      currentApp,
      popApp,
      currentEl,
    }
  },
  render () {
    const popBody = h(popoverBody, { ...this.$props, isShow: this.isShow, content: this.$slots.content || this.content, ref: 'popApp' })

    const renderBody = this.trigger === 'click' ? withDirectives(popBody, [[CgClickOut, { fn: this.hide, white: [this.currentEl] }]]) : popBody

    return [h(createVNode(this.$slots.default), { ref: 'currentApp' }), h(Teleport, { to: 'body' }, [renderBody])]
  },
})
</script>

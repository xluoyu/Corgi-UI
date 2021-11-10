<template>
  <slot></slot>
</template>

<script lang="ts">
import { getCgHandleBox, getComponetApp } from '@corgi/utils'
import { defineComponent, PropType, VNode } from 'vue'
import popoverBody from './popover-body.vue'
import popoverProps from './popoverProps'
export default defineComponent({
  name: 'CgPopover',
  props: {
    ...popoverProps,
    trigger: {
      type: String as PropType<'hover' | 'click' | 'event'>,
      default: 'hover',
    },
  },
  data() {
    return {
      popEl: null,
      isShow: false,
    }
  },
  computed: {
    popApp () {
      return getComponetApp(popoverBody, { ...this.$props, content: this.$slots.content || this.content })
    },
  },
  mounted () {
    this.$nextTick(() => {
      const handleBox = getCgHandleBox()
      handleBox.appendChild(this.popApp.$el)
    })
    const currentEl = this.$el.nextSibling
    switch(this.trigger) {
      case 'hover':
        currentEl.addEventListener('mouseover', e => {
          if (!this.isShow) {
            this.popApp.show()
            this.isShow = true
            this.$nextTick(() => {
              this.counterRun(this.popApp.$el)
            })
          }
        })
        currentEl.addEventListener('mouseleave', () => {
          this.popApp.hide()
          this.isShow = false
        })
        break
    }
  },
  unmounted() {
    this.popApp.unMount()
  },
  methods: {
    setPosition(popEl, top, left) {
      popEl.style.top = top + 'px'
      popEl.style.left = left + 'px'
    },
    counterRun(popEl) {
      const { height: popHeight, width: popWidth } = popEl.getBoundingClientRect()
      const { height, top, left, width } = this.$el.nextSibling.getBoundingClientRect()
      switch(this.position) {
        case 'top':
          this.setPosition(popEl, top - popHeight, (left + width / 2) - popWidth / 2)
          break
        case 'right':
          this.setPosition(popEl, top, left + width)
          break
        case 'bottom':
          this.setPosition(popEl, height + top, (left + width / 2) - popWidth / 2)
          break
        case 'left':
          this.setPosition(popEl, top, left - popWidth)
          break
      }
    },
  },
})
</script>

<style lang="less" scoped>
.cg-popover{
  --color: #fff;
  --background: #333;
  --arrow-height: 8px;
  padding: 8px 14px;
  border-radius: 4px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  background: var(--background);
  color: var(--color);
  &.cg-popover--dark{
    --color: #fff;
    --background: #333;
  }
  &.cg-popover--light{
    --color: #333;
    --background: #fff;
  }
  .cg-popover-arrow-wrapper{
    display: flex;
    position: absolute;
    bottom: calc(-0.5 * var(--arrow-height));
    left: 0;
    width: 100%;
    height: var(--arrow-height);
    .cg-popover-arrow{
      width: var(--arrow-height);
      height: var(--arrow-height);
      background: var(--background);
      transform: rotate(45deg);
    }
  }

  &.cg-popover--top .cg-popover-arrow-wrapper{
    bottom: calc(-0.5 * var(--arrow-height));
    left: 0;
    top: none;
    width: 100%;
    height: var(--arrow-height);
    justify-content: center;
  }

  &.cg-popover--bottom .cg-popover-arrow-wrapper{
    top: calc(-0.5 * var(--arrow-height));
    left: 0;
    bottom: unset;
    width: 100%;
    height: var(--arrow-height);
    justify-content: center;
  }
  &.cg-popover--left .cg-popover-arrow-wrapper{
    top: 0;
    right: calc(-0.5 * var(--arrow-height));
    bottom: unset;
    left: unset;
    width: var(--arrow-height);
    height: 100%;
    align-items: center;
  }
  &.cg-popover--right .cg-popover-arrow-wrapper{
    left: calc(-0.5 * var(--arrow-height));
    top: 0;
    bottom: unset;
    right: unset;
    width: 100%;
    width: var(--arrow-height);
    height: 100%;
    align-items: center;
  }
}
</style>

<template>
  <div
    v-if="isShow"
    class="cg-popover"
    :class="[
      `cg-popover--${effect}`,
      `cg-popover--${position}`
    ]"
  >
    <div class="cg-popover-arrow-wrapper">
      <div class="cg-popover-arrow"></div>
    </div>
    <slot name="content">
      <div v-if="isString(content)" class="cg-popover-content">{{ content }}</div>
      <component :is="content" v-else />
    </slot>
  </div>
</template>

<script lang="ts">

export default defineComponent({
  name: 'CgPopoverBody',
})
</script>

<script setup lang="ts">
import { PropType, VNode, defineComponent, ref, computed } from 'vue'
import { isString } from '@corgi-box/utils'
import popoverProps from './popoverProps'
const porps = defineProps({
  ...popoverProps,
  isShow: Boolean,
})
</script>

<style lang="less" scoped>
.cg-popover{
  --white: #fff;
  --black: #3c3c3c;
  --arrow-height: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  background: var(--background);
  color: var(--color);
  width: fit-content;
  .cg-popover-content{
    padding: 8px 14px;
  }
  &.cg-popover--dark{
    --color: var(--white);
    --background: var(--black);
  }
  &.cg-popover--light{
    --color: var(--black);
    --background: var(--white);
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
    width: var(--arrow-height);
    height: 100%;
    align-items: center;
  }
}
</style>

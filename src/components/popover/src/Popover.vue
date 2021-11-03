<template>
  <div
    class="cg-popover"
    :class="[
      `cg-popover--${effect}`,
      `cg-popover--${position}`
    ]"
  >
    <div class="cg-popover-arrow-wrapper">
      <div class="cg-popover-arrow"></div>
    </div>
    <slot>
      <template v-if="isString(content)">{{ content }}</template>
      <component :is="content" v-else />
    </slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgPopover',
})
</script>

<script setup lang="ts">
import { defineProps, PropType, VNode, defineComponent } from 'vue'
import { isString } from '@corgi/utils'
const porps = defineProps({
  content: [String, Object] as PropType<string | VNode>,
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark',
  },
  position: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'bottom',
  },
})
</script>

<style lang="less" scoped>
.cg-popover{
  padding: 8px 14px;
  border-radius: 4px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
  &.cg-popover--dark{
    background: #333;
    color: #fff;
  }
  .cg-popover-arrow-wrapper{
    position: absolute;
    .cg-popover-arrow{

    }
  }
}
</style>

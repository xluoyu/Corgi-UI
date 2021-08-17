<template>
  <div class="cg-menu-item">
    {{item.label}}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, unref } from 'vue';
import { getCssVar } from '../../../utils';
import {IMenuItem} from './type'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IMenuItem>,
      required: true
    }
  },
  setup () {
    let {
      hoverBackground,
      hoverColor
    } = unref(computed(getCssVar))

    return {
      hoverBackground,
      hoverColor
    }
  }
})
</script>

<style lang="less" scoped>
.cg-menu-item{
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all .3s;
  &:hover{
    color: v-bind(hoverColor);
    background: v-bind(hoverBackground);
  }
}
</style>
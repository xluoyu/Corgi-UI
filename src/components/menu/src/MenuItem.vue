<template>
  <div class="cg-menu-item">
    <a :href="item.path">{{item.label}}</a>
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
  height: 42px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all .3s;
  color: #333;
  &:hover{
    color: v-bind(hoverColor);
    background: v-bind(hoverBackground);
  }
  a{
    color: inherit;
    text-decoration: none;
  }
}
</style>
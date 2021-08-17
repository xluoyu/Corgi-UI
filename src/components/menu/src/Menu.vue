<template>
  <div :class="['cg-menu', mode]">
    <menu-item v-for="item in list" :item="item" :key="item.key"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MenuItem from './MenuItem.vue';
import { IMenuItem } from './type';

export default defineComponent({
  name: 'Menu',
  components: { MenuItem },
  props: {
    mode: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical'
    },
    list: {
      type: Array as PropType<IMenuItem[]>,
      dafault: []
    }
  },
  setup (props) {

    return {}
  }
})
</script>

<style>
@import url(@/styles/base.less);
</style>

<style lang="less" scoped>
.cg-menu{
  height: 100%;
}
.horizontal{
  display: inline-flex;
}
</style>
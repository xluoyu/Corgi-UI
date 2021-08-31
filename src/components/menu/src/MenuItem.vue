<template>
  <div class="cg-menu-item">
    <a :href="item.path">{{ item.label }}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IMenuItem } from './type'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgMenuItem',
  props: {
    item: {
      type: Object as PropType<IMenuItem>,
      required: true,
    },
  },
  setup () {

    return {
      styleVar,
    }
  },
})
</script>

<style lang="less" scoped>
.cg-menu-item{
  height: 42px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
  &:hover{
    color: #fff;
    background: v-bind('styleVar.theme');
    opacity: v-bind('styleVar.hoverOpacity');
  }
  a{
    color: inherit;
    text-decoration: none;
  }
}
</style>

<template>
  <div class="cg-menu-item">
    <a :href="item.path">{{item.label}}</a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import {IMenuItem} from './type'
import styleVar from './styleVar'

export default defineComponent({
  name: 'CgMenuItem',
  props: {
    item: {
      type: Object as PropType<IMenuItem>,
      required: true
    }
  },
  setup () {

    return {
      styleVar
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
    color: v-bind('styleVar.color');
    background: v-bind('styleVar.theme');
  }
  a{
    color: inherit;
    text-decoration: none;
  }
}
</style>
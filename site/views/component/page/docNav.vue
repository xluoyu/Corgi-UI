<template>
  <div class="doc-nav">
    <div class="nav-box">
      <a :href="'#' + item.id" v-for="item in list" :key="item.id" :class="{active: activeLink === item.id}" @click="changeActiveComponenyKey(item.id)">{{item.title}}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { throttle } from 'lodash'
import { useCompoent } from '../hooks/compoent'

export default defineComponent({
  props: {
    list: Array as PropType<{id: string, title: string}[]>,
  },
  setup (props) {
    let activeLink = ref('')

    const handleScroll = throttle(() => {
      if (!props.list) return
      for (let i = 0; i < props.list?.length; i++) {
        let item = props.list[i]
        const {top} = getElInfo('#' + item.id)

        if (top - 64 < 25 && top - 64 >= 0) {
          activeLink.value = item.id
          break;
        }
      }
    }, 60)

    const getElInfo = (el) => {
      const target = document.querySelector(el) as HTMLElement
      return target.getBoundingClientRect()
    }

    onMounted(() => {
      document.addEventListener('scroll', handleScroll, true)
    })

    const { changeActiveComponenyKey } = useCompoent()
    

    return {
      activeLink,
      changeActiveComponenyKey
    }
  }
})
</script>

<style lang="less" scoped>
.doc-nav{
  padding-left: 20px;
}
.nav-box{
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 30px;
  text-indent: 15px;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: var(--doc-nav-width);
    height: 100%;
    background: rgb(219, 219, 223);
    border-radius: 6px;
  }
  a{
    font-size: var(--fontSize-3);
    line-height: 20px;
    margin: 10px 0;
    color: #999;
    text-decoration: none;
    &:hover{
      color: #666;
    }
    &.active{
      color: var(--theme);
      background: var(--theme-hover);
      position: relative;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: var(--doc-nav-width);
        height: 100%;
        background: var(--theme);
      }
    }
  }
}
</style>
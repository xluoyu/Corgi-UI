<template>
  <div 
    :class="[
    'cg-scrollbar',
    ]"
  >
    <div class="scrollbar-container" ref="containerEl">
      <div class="scrollbar-content" ref="contentEl">
        <slot />
      </div>
    </div>
    <div class="scrollbar-vertical" :ref="el => vertical.el = el">
      <div
        class="scrollbar-thrumb scrollbar-thrumb--vertical"
        :style="{
          height: vertical.thrumbHeight + 'px',
          transform: `translateY(${vertical.thrumbY}px)`
        }"
        @mousedown="thrumbVerticalMouseDown"
      >
      </div>
    </div>
    <div class="scrollbar-horizontal">
      <!-- <div
        class="scrollbar-thrumb scrollbar-thrumb--horizontal"
        :style="{
          width: width + 'px',
          transform: `translateX(${thrumbX}px)`
        }"
        @mousedown="thrumbHorizontalMouseDown"
      >
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, Ref, ref } from 'vue'
import styleVar from './styleVar'

interface IVertical {
  el: null | HTMLElement | any,
  height: number,
  thrumbHeight: number,
  thrumbY: number
}

interface IHorizontal {
  width: number,
  thrumbWidth: number,
  thrumbX: number
}

export default defineComponent({
  name: 'Scrollbar',
  props: {
    y: Boolean,
    x: Boolean,
    show: {
      type: String as PropType<'always' | 'hover' | 'never'>,
      default: 'hover'
    },
    thrumbClass: String,
    thrumbStyle: String,
    scrollClass: String,
    scrollStyle: String,
    loadHeight: Number,
    loadMore: Function
  },
  setup (props) {
    const containerEl:Ref<null | HTMLElement> = ref(null)
    let containerHeight = 0
    const contentEl:Ref<null | HTMLElement> = ref(null)
    const verticalEl:Ref<null | HTMLElement> = ref(null)
    const vertical = reactive<IVertical>({
      el: null,
      height: 0,
      thrumbHeight: 0,
      thrumbY: 0
    })


    const getVerticalHeight = () => {
      let contentH = contentEl.value?.clientHeight as number
      vertical.thrumbHeight = containerHeight / contentH * vertical.height
    }

    let hasLoad = false
    const addScroll = () => {
      containerEl.value?.addEventListener('scroll', () => {
        let boxScrollTop = containerEl.value?.scrollTop as number
        let contentH = contentEl.value?.clientHeight as number

        vertical.thrumbY = boxScrollTop / contentH * vertical.height

        if (props.loadMore && contentH - (boxScrollTop + containerHeight) < 50 && !hasLoad) {
          hasLoad = true
          props.loadMore()
        }
      })
    }

    const update = () => {
      hasLoad = false
      getVerticalHeight()
    }

    onMounted(() => {
      containerHeight = containerEl.value?.clientHeight as number
      vertical.height = vertical.el?.clientHeight as number

      getVerticalHeight()
      addScroll()
    })

    const thrumbVerticalMouseDown = (e) => {
      e.stopPropagation();
      let start = e.pageY
      let contentH = contentEl.value?.clientHeight as number
      let scrollTop = (containerEl.value as HTMLElement).scrollTop
      // let thrumbH = thrumbY.value
      console.log('开始')
      
      const move = (event) => {
        let distance = event.pageY - start
        ;(containerEl.value as HTMLElement).scrollTop = scrollTop + distance / vertical.height * contentH
      }

      const up = () => {
        console.log('up')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }

    return {
      verticalEl,
      vertical,
      containerEl,
      update,
      thrumbVerticalMouseDown,
      contentEl,
      styleVar
    }
  }
})
</script>

<style lang="less" scoped>
@import url('../../_style/mixin.less');

.cg-scrollbar{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .scrollbar-container{
    overflow: auto;
    height: inherit;
    &::-webkit-scrollbar{
      display: none;
    }
  }

  .scrollbar-vertical{
    position: absolute;
    right: 2px;
    top: 2px;
    bottom: 2px;
    z-index: 2;
  }
  .scrollbar-thrumb{
    position: relative;
    width: 4px;
    height: 40px;
    background: rgb(255, 255, 255);
    border-radius: 8px;
    transform: translateY();
    opacity: .4;
    cursor: pointer;
    user-select: none;
    &:hover{
      opacity: .7;
    }
  }
}
</style>
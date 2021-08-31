<template>
  <div
    :class="[
      'cg-scrollbar',
    ]"
  >
    <div
      ref="containerEl"
      :class="[
        'scrollbar-container',
        {
          'scrollbar-Y': y,
          'scrollbar-X': x,
        }
      ]"
    >
      <div ref="contentEl" class="scrollbar-content">
        <slot></slot>
      </div>
    </div>

    <div :ref="el => vertical.el = el" class="scrollbar-vertical">
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
import { assignThemecustom } from '@utils/index'
import { IThemeCssVar } from '@utils/type'
import { computed, defineComponent, inject, onMounted, PropType, reactive, Ref, ref } from 'vue'
import styleVar from './styleVar'

interface IVertical {
  el: null | HTMLElement | any
  height: number
  thrumbHeight: number
  thrumbY: number
}

// interface IHorizontal {
//   width: number
//   thrumbWidth: number
//   thrumbX: number
// }

export default defineComponent({
  name: 'CgScrollbar',
  props: {
    y: Boolean,
    x: Boolean,
    show: {
      type: String as PropType<'always' | 'hover' | 'never'>,
      default: 'hover',
    },
    color: String,
    thrumbClass: String,
    thrumbStyle: String,
    scrollClass: String,
    scrollStyle: String,
    loadHeight: Number,
    loadMore: Function,
  },
  setup (props) {
    const customTheme = inject<IThemeCssVar>('theme', {})

    const containerEl: Ref<null | HTMLElement> = ref(null)
    let containerHeight = 0
    const contentEl: Ref<null | HTMLElement> = ref(null)
    const verticalEl: Ref<null | HTMLElement> = ref(null)
    const vertical = reactive<IVertical>({
      el: null,
      height: 0,
      thrumbHeight: 0,
      thrumbY: 0,
    })


    const getVerticalHeight = () => {
      let contentH = (contentEl.value as HTMLElement).clientHeight as number
      vertical.thrumbHeight = containerHeight / contentH * vertical.height
    }

    let hasLoad = false
    const addScroll = () => {
      containerEl.value?.addEventListener('scroll', () => {
        let boxScrollTop = (containerEl.value as HTMLElement).scrollTop as number
        let contentH = (contentEl.value as HTMLElement).clientHeight as number

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
      containerHeight = (containerEl.value as HTMLElement).clientHeight as number
      vertical.height = (vertical.el as HTMLElement).clientHeight as number

      getVerticalHeight()
      addScroll()
    })

    const thrumbVerticalMouseDown = e => {
      e.stopPropagation()
      let start = e.pageY
      let contentH = (contentEl.value as HTMLElement).clientHeight as number
      let scrollTop = (containerEl.value as HTMLElement).scrollTop

      const move = event => {
        let distance = event.pageY - start
        ;(containerEl.value as HTMLElement).scrollTop = scrollTop + distance / vertical.height * contentH
      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }

    let cssVar = computed(() => {
      let composeVar = customTheme ? assignThemecustom(customTheme, styleVar) : styleVar
      if (props.color) {
        composeVar.color = props.color
      }
      return composeVar
    })

    return {
      verticalEl,
      vertical,
      containerEl,
      update,
      thrumbVerticalMouseDown,
      contentEl,
      cssVar,
    }
  },
})
</script>

<style lang="less" scoped>

.cg-scrollbar{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .scrollbar-container{
    overflow: hidden;
    height: inherit;
    &.scrollbar-Y{
      overflow-y: auto;
    }
    &.scrollbar-X{
      overflow-X: auto;
    }
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
    background: v-bind('cssVar.color');
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

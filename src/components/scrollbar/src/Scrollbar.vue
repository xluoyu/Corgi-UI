<template>
  <div
    :class="[
      'cg-scrollbar',
      {
        'cg-scrollbar-hover': show == 'hover',
        'cg-scrollbar-never': show == 'never',
      }
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

    <div
      v-if="y"
      :ref="el => vertical.el = el"
      class="scrollbar-vertical"
      :class="[scrollClass]"
      :style="[scrollStyle]"
    >
      <div
        v-if="vertical.thrumbHeight < vertical.height"
        class="scrollbar-thrumb scrollbar-thrumb--vertical"
        :class="[thrumbClass]"
        :style="[thrumbStyle, {
          height: vertical.thrumbHeight + 'px',
          transform: `translateY(${vertical.thrumbY}px)`,
        }]"
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
import { assignThemecustom } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'
import { computed, defineComponent, inject, onMounted, onUnmounted, PropType, reactive, Ref, ref } from 'vue'
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
      default: 'always',
    },
    color: String,
    thrumbClass: String,
    thrumbStyle: String,
    scrollClass: String,
    scrollStyle: String,
    loadHeight: Number,
    loadMore: Function,
  },
  setup (props, { expose }) {
    const customTheme = inject<IThemeCssVar>('theme', {})

    const containerEl: Ref<null | HTMLElement> = ref(null)
    let containerHeight = 0
    let contentHeight = 0
    const contentEl: Ref<null | HTMLElement> = ref(null)
    const verticalEl: Ref<null | HTMLElement> = ref(null)
    const vertical = reactive<IVertical>({
      el: null,
      height: 0,
      thrumbHeight: 0,
      thrumbY: 0,
    })

    // 计算thrumb的高度
    /**
     * containerHeight 外部盒子高度 即一个屏幕的高度
     * contentHeight 内容高度 根据内容无限拉伸
     * vertical.height 滚动条的轨道高度 等同于 外部盒子高度
     * thrumbHeight = 盒子高度与内容高度的比值 * 滚动条轨道的高度
     */
    const getVerticalHeight = () => {
      vertical.thrumbHeight = containerHeight / contentHeight * vertical.height
    }

    const addScroll = () => {
      containerEl.value?.addEventListener('scroll', () => {
        let boxScrollTop = (containerEl.value as HTMLElement).scrollTop as number
        let contentH = (contentEl.value as HTMLElement).clientHeight as number

        vertical.thrumbY = boxScrollTop / contentH * vertical.height

        if (props.loadMore && contentH - (boxScrollTop + containerHeight) < 50) {
          props.loadMore()
        }
      })
    }

    /**
     * 初始化
     */
    const init = () => {
      containerHeight = containerEl.value.clientHeight
      vertical.height = vertical.el.clientHeight
      contentHeight = contentEl.value.clientHeight
      getVerticalHeight()
    }

    let observer: MutationObserver
    onMounted(() => {
      init()
      addScroll()

      window.addEventListener('resize', init)

      observer = new MutationObserver(() => {
        if (contentHeight === contentEl.value.clientHeight) {
          return
        }
        contentHeight = contentEl.value.clientHeight
        init()
      })
      observer.observe(contentEl.value, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      })
    })
    onUnmounted(() => {
      window.removeEventListener('resize', init)
      observer.disconnect()
    })

    /**
     * 添加鼠标拖动事件
     */
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
    border-radius: 8px;
  }
  .scrollbar-thrumb{
    position: relative;
    width: 5px;
    height: 40px;
    background: v-bind('cssVar.color');
    border-radius: 8px;
    opacity: .4;
    cursor: pointer;
    user-select: none;
    &:hover{
      opacity: .7;
    }
  }
}

.cg-scrollbar.cg-scrollbar-hover {
  > .scrollbar-vertical .scrollbar-thrumb{
    display: none;
  }
  &:hover > .scrollbar-vertical .scrollbar-thrumb{
    display: block;
  }
}
</style>

<template>
  <div
    :class="[
      'cg-scrollbar',
      {
        'cg-scrollbar-hover': show == 'hover',
        'cg-scrollbar-never': show == 'never',
      }
    ]"
    :style="{
      width: containerWidth,
      height: containerHeight
    }"
  >
    <div
      :ref="el => container.el = el"
      :class="[
        'scrollbar-container',
        {
          'scrollbar-Y': y,
          'scrollbar-X': x,
        }
      ]"
    >
      <div :ref="el => content.el = el" class="scrollbar-content">
        <slot></slot>
      </div>
    </div>

    <div
      v-if="y"
      :ref="el => vertical.el = el"
      class="scrollbar-track scrollbar-vertical"
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
        @mousedown="(e) => thrumbMouseDown(e, 'y')"
      >
      </div>
    </div>
    <div
      v-if="x"
      :ref="el => horizontal.el = el"
      class="scrollbar-track scrollbar-horizontal"
      :class="[scrollClass]"
      :style="[scrollStyle]"
    >
      <div
        v-if="horizontal.thrumbWidth < horizontal.width"
        class="scrollbar-thrumb scrollbar-thrumb--horizontal"
        :class="[thrumbClass]"
        :style="[thrumbStyle, {
          width: horizontal.thrumbWidth + 'px',
          transform: `translateX(${horizontal.thrumbX}px)`,
        }]"
        @mousedown="(e) => thrumbMouseDown(e, 'x')"
      >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface IVertical {
  el: any
  height: number
  thrumbHeight: number
  thrumbY: number
}
interface IHorizontal {
  el: any
  width: number
  thrumbWidth: number
  thrumbX: number
}
interface IContentBox{
  el: any
  width: number
  height: number
}

export default defineComponent({
  name: 'CgScrollbar',
})
</script>

<script lang="ts" setup>
import { getComponentCssVar, IThemeCssVar } from '@corgi-box/ui/utils'
import { number2Px } from '@corgi-box/utils'
import { computed, defineComponent, inject, nextTick, onMounted, onUnmounted, PropType, reactive, ref, watchEffect } from 'vue'
import styleVar from './styleVar'

const props = defineProps({
  y: Boolean,
  x: Boolean,
  show: {
    type: String as PropType<'always' | 'hover' | 'never'>,
    default: 'always',
  },
  color: String,
  height: [Number, String],
  width: [Number, String],
  thrumbClass: String,
  thrumbStyle: String,
  scrollClass: String,
  scrollStyle: String,
  loadHeight: Number,
  loadMore: Function,
})

const container = reactive<IContentBox>({
  el: null,
  height: 0,
  width: 0,
})
const content = reactive<IContentBox>({
  el: null,
  height: 0,
  width: 0,
})
const vertical = reactive<IVertical>({
  el: null,
  height: 0,
  thrumbHeight: 0,
  thrumbY: 0,
})
const horizontal = reactive<IHorizontal>({
  el: null,
  width: 0,
  thrumbWidth: 0,
  thrumbX: 0,
})

let direction: 'y' | 'x' = 'y'

// 计算thrumb的高度
/**
 * containerHeight 外部盒子高度 即一个屏幕的高度
 * contentHeight 内容高度 根据内容无限拉伸
 * vertical.height 滚动条的轨道高度 等同于 外部盒子高度
 * thrumbHeight = 盒子高度与内容高度的比值 * 滚动条轨道的高度
 */
const addScroll = () => {
  container.el.addEventListener('scroll', () => {

    if (direction === 'y') {
      let boxScrollTop = container.el.scrollTop
      let contentH = content.el.clientHeight
      vertical.thrumbY = boxScrollTop / contentH * vertical.height
      if (props.loadMore && contentH - (boxScrollTop + container.height) < 50) {
        props.loadMore()
      }
    } else {
      let boxScrollLeft = container.el.scrollLeft
      horizontal.thrumbX = boxScrollLeft / content.width * horizontal.width
    }
  })
}
/**
 * 初始化
 */
const init = () => {
  container.width = container.el.clientWidth
  container.height = container.el.clientHeight
  content.width = content.el.clientWidth
  content.height = content.el.clientHeight

  if (props.y) {
    vertical.height = vertical.el.clientHeight
    vertical.thrumbHeight = container.height / content.height * vertical.height
  }

  if (props.x) {
    horizontal.width = horizontal.el.clientWidth
    horizontal.thrumbWidth = container.width / content.width * horizontal.width
  }
}

const containerWidth = ref('100%')
const containerHeight = ref('100%')
watchEffect(() => {
  containerWidth.value = props.width ? number2Px(props.width) : '100%'
  containerHeight.value = props.height ? number2Px(props.height) : '100%'
  nextTick(init)
})

let observer: MutationObserver
onMounted(() => {
  addScroll()

  window.addEventListener('resize', init)

  if (props.loadMore) {
    /**
         * 监听content的dom，有变动时重新更新高度
         */
    observer = new MutationObserver(() => {
      if (content.height === content.el.clientHeight) {
        return
      }
      init()
    })
    observer.observe(content.el, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    })
  }

})
onUnmounted(() => {
  window.removeEventListener('resize', init)
  props.loadMore && observer.disconnect()
})


/**
     * 添加鼠标拖动事件
     */
const thrumbMouseDown = (e, t: 'y' | 'x') => {
  e.stopPropagation()
  direction = t
  let start = t === 'y' ? e.pageY : e.pageX
  let contentLen = t === 'y' ? content.el.clientHeight : content.el.clientWidth
  let scroll = t === 'y' ? container.el.scrollTop : container.el.scrollLeft
  const move = event => {
    let distance = t === 'y' ? event.pageY - start : event.pageX - start
    if (t === 'y') {
      container.el.scrollTop = scroll + distance / vertical.height * contentLen
    } else {
      container.el.scrollLeft = scroll + distance / horizontal.width * contentLen
    }
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    direction = 'y'
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

defineExpose({
  scrollTo ({ x, y }: { x: number; y: number; }) {
    container.el.scrollTop = x
    container.el.scrollLeft = y
  },
})

const customTheme = inject<IThemeCssVar>('theme', null)
const cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('scrollbar', customTheme, styleVar)
  if (props.color) {
    componentCssVar.scrollbarColor = props.color
  }
  return componentCssVar
})
</script>

<style lang="less" scoped>
.cg-scrollbar{
  overflow: hidden;
  position: relative;
  .scrollbar-container{
    overflow: hidden;
    height: 100%;
    &.scrollbar-Y{
      overflow-y: auto;
    }
    &.scrollbar-X{
      overflow-X: auto;
    }
    &::-webkit-scrollbar{
      display: none;
    }
    .scrollbar-content{
      display: inline-block;
      min-width: 100%;
      min-height: 100%;
    }
  }
  .scrollbar-track{
    position: absolute;
    border-radius: 8px;
    z-index: 2;
  }

  .scrollbar-vertical{
    right: 2px;
    top: 2px;
    bottom: 2px;
    .scrollbar-thrumb{
      width: 5px;
    }
  }
  .scrollbar-horizontal{
    bottom: 2px;
    left: 2px;
    right: 2px;
    .scrollbar-thrumb{
      height: 5px;
    }
  }
  .scrollbar-thrumb{
    position: relative;
    background: v-bind('cssVar.scrollbarColor');
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
  > .scrollbar-track .scrollbar-thrumb{
    display: none;
  }
  &:hover > .scrollbar-track .scrollbar-thrumb{
    display: block;
  }
}
</style>

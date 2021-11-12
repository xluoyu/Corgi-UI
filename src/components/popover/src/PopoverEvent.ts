import { nextTick, onUnmounted, Ref } from 'vue'

const hoverEvent = (targetEl: HTMLElement, popover: any, props: any, isShow: Ref<Boolean>) => {
  let timer = null

  const popAppShow = () => {
    clearTimeout(timer)
    timer = null
    isShow.value = true
  }
  const popAppClose = () => {
    timer = setTimeout(() => {
      isShow.value = false
    }, 300)
  }

  targetEl.addEventListener('mouseenter', e => {
    popAppShow()
    nextTick(() => {
      counterRun(targetEl, popover, props)
      popAppAddEvent(popover.value.$el)
    })
  })

  targetEl.addEventListener('mouseleave', popAppClose)

  const popAppAddEvent = popEl => {
    popEl.addEventListener('mouseenter', popAppShow)
    popEl.addEventListener('mouseleave', popAppClose)
  }
}

const clickEvent = (targetEl: HTMLElement, popover: any, props: any, isShow: Ref<Boolean>) => {
  targetEl.addEventListener('click', e => {
    e.stopPropagation()
    if (!isShow.value) {
      isShow.value = true
      nextTick(() => {
        counterRun(targetEl, popover, props)
      })
    } else {
      isShow.value = false
    }
  })
}

const counterRun = (targetEl, popover, props) => {
  const { height: popHeight, width: popWidth } = popover.value.$el.getBoundingClientRect()
  const { height, top, left, width } = targetEl.getBoundingClientRect()
  switch(props.position) {
    case 'top':
      setPosition(popover.value.$el, top - popHeight - 8, (left + width / 2) - popWidth / 2)
      break
    case 'right':
      setPosition(popover.value.$el, top, left + width)
      break
    case 'bottom':
      setPosition(popover.value.$el, height + top + 8, (left + width / 2) - popWidth / 2)
      break
    case 'left':
      setPosition(popover.value.$el, top, left - popWidth)
      break
  }
}

const setPosition = (popEl, top, left) => {
  popEl.style.top = top + 'px'
  popEl.style.left = left + 'px'
}

/**
 *  弹框相关事件处理
 */
export default (targetEl: HTMLElement, popover: any, props: any, isShow: Ref<Boolean>): void => {
  switch (props.trigger) {
    case 'hover':
      hoverEvent(targetEl, popover, props, isShow)
      break
    case 'click':
      clickEvent(targetEl, popover, props, isShow)
      break
    default:
      break
  }
}

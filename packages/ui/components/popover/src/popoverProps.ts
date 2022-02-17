import { PropType, VNode } from 'vue'

const props = {
  content: [String, Function] as PropType<string | VNode>,
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark',
  },
  position: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'top',
  },
}

export default props

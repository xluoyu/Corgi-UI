import { Ref, ref } from 'vue'
import { warn } from '@corgi/utils/warn'

export const useToggle = (bol: boolean): [Ref<Boolean>, () => void] => {
  if (typeof bol !== 'boolean') warn('useToggle', '参数不是boolean')
  const val = ref(bol)
  const changeValue = () => { val.value = !val.value }
  return [val, changeValue]
}

export const useWarn = (title, content) => {
  warn(title, content)
}

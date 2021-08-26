import { ref } from 'vue'
import { warn } from '@utils/warn';

export const useToggle = (bol:boolean) => {
  if (typeof bol !== 'boolean') warn('useToggle', '参数不是boolean')
  const val = ref(bol)
  const changeValue = () => {val.value = !val.value}
  const test = () => {
    warn('useToggle', '参数不是boolean')
  }
  return [val, changeValue, test]
}

export const useWarn = (title, content) => {
  warn(title, content)
}
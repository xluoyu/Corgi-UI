import { ref } from 'vue'

export const useToggle = (bol:boolean) => {
  const val = ref(bol)
  const changeValue = () => {val.value = !val.value}
  return [val, changeValue]
}
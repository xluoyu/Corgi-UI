import { ref } from 'vue'

const activeComponentKey = ref('')
export const useCompoent = () => {
  const changeActiveComponenyKey = key => {
    activeComponentKey.value = key
  }

  return {
    activeComponentKey,
    changeActiveComponenyKey,
  }
}

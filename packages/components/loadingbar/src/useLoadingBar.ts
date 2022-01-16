import { warn } from '@corgi-box/utils/warn'
import { inject } from 'vue'
import { loadBarProvideKey } from './type'
export const useLoadingBar = () => {
  const handle = inject(loadBarProvideKey, null)
  if (!handle) warn('useLoadingBar', '没有找到父级为cg-loadingbar的节点')

  return handle
}

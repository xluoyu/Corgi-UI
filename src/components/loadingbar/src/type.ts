import { InjectionKey } from 'vue'

// export interface loadingBarFn
export const loadBarProvideKey: InjectionKey<{
  start: () => void
  finish: () => void
  error: () => void
}> = Symbol('loadingBar')

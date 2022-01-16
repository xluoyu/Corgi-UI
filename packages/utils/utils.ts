
import { mergeWith, isNull, omitBy, cloneDeep } from 'lodash-es'
import { isObject } from '.'


export const extendWithObject = (a, b) => {
  const ctx = cloneDeep(a)
  return omitBy(mergeWith(ctx, b, (old, cur) => {
    if (old && isObject(old)) {
      return extendWithObject(old, cur)
    }
    return old ? cur : null
  }), isNull)
}

// 首字母大写
export const toUpperCase = (str: String) => str.charAt(0).toUpperCase() + str.slice(1)

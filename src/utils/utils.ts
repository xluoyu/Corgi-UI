
import { mergeWith, isNull, omitBy, cloneDeep } from 'lodash'
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


export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isObject = (val: unknown): val is Object => typeof val === 'object'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const number2Px = (val: string | number) => isNumber(val) ? val + 'px' : val

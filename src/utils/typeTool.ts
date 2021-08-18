export const isArray = Array.isArray
export const isFunction = (val: unknown):val is Function => typeof val === 'function'
export const isObject = (val: unknown):val is Object => typeof val === 'object'
export const isString = (val: unknown):val is String => typeof val === 'string'
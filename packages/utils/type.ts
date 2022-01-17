import type { ExtractPropTypes, Plugin } from 'vue'

export interface IThemeCssVar {
  [propName: string]: any
}

export type SFCWithInstall<T> = T & Plugin


export type ExtractPublicPropTypes<T> = Omit<
Partial<ExtractPropTypes<T>>,
Extract<keyof T, `internal${string}`>
>

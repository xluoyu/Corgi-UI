import { VNodeChild } from "vue";

export interface IMenuItem {
  label: string | (() => VNodeChild),
  key: string | number
  path?: string
}
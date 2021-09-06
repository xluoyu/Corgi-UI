import { VNode } from 'vue'

export interface IMenuItem {
  label: string | VNode
  key: string | number
  path?: string
  children?: IMenuItem[]
  type?: 'group' | 'item'
  component?: string
}

// export interface MeunItemWithComponent extends IMenuItem {
//   component: string
// }

export enum EMenuType {
  group = 'CgMenuGroup',
  submenu = 'CgMenuSubmenu'
}

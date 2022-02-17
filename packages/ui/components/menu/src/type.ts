import { InjectionKey, Ref, VNode } from 'vue'
import { Props } from './Menu.vue'
export interface IMenuItem {
  label: string | VNode
  key: string
  path?: string
  children?: IMenuItem[]
  type?: 'group' | 'item' | 'submenu'
  component?: string
}

export enum EMenuType {
  group = 'CgMenuGroup',
  submenu = 'CgMenuSubmenu'
}

export const menuProvideKey: InjectionKey<MenuInjection> = Symbol('menu')
export interface MenuInjection {
  menuProps: Props
  activeKey: Ref<string>
  changeActive: (key: string) => void
}

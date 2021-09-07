import { h, VNodeChild } from 'vue'

interface IMenuObj {
  type?: string
  key: string
  label: string | VNodeChild
  path?: string
  children?: IMenuObj[]
}


const MenuList: IMenuObj[] = [
  {
    type: 'group',
    key: 'base',
    label: '基础组件',
    children: [
      {
        path: 'icon',
        label: 'Icon 图标',
        key: 'icon',
      },
      {
        path: 'button',
        label: 'Button 按钮',
        key: 'button',
      },
      {
        path: 'scrollbar',
        label: 'ScrollBar 滚动条',
        key: 'scrollBar',
      },
    ],
  },
  {
    type: 'group',
    key: 'route',
    label: '导航组件',
    children: [
      {
        path: 'Menu',
        label: 'Menu 菜单',
        key: 'menu',
      },
    ],
  },
]


export default MenuList

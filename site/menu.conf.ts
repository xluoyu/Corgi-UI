import { VNodeChild } from 'vue'

export interface IMenuObj {
  type?: string
  key: string
  label: string | any
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
        label: h => h('span', ['图标', h('b', 'Icon')]),
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
        key: 'scrollbar',
      },
    ],
  },
  {
    type: 'group',
    key: 'route',
    label: '表单类组件',
    children: [
      {
        path: 'switch',
        label: 'switch 开关',
        key: 'switch',
      },
    ],
  },
  // {
  //   type: 'group',
  //   key: 'route',
  //   label: '导航组件',
  //   children: [
  //     {
  //       path: 'Menu',
  //       label: 'Menu 菜单',
  //       key: 'menu',
  //     },
  //   ],
  // },
  {
    type: 'group',
    key: 'route',
    label: '实用组件',
    children: [
      {
        path: 'loadingBar',
        label: 'loadingBar 加载条',
        key: 'loadingBar',
      },
    ],
  },
]


export default MenuList

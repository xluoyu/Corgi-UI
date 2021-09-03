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
    path: '/component/icon',
    label: h('div', {}, 'asdasd'),
    key: 'icon',
  },
  {
    type: 'group',
    key: 'base',
    label: '基础组件',
    children: [
      {
        path: '/component/icon',
        label: 'Icon 图标',
        key: 'icon',
      },
      {
        path: '/component/button',
        label: 'Button 按钮',
        key: 'button',
      },
      {
        path: '/component/scrollbar',
        label: 'ScrollBar 滚动条',
        key: 'scrollBar',
        type: 'submenu',
        children: [
          {
            path: '/component/icon',
            label: 'Icon 图标',
            key: 'icon',
          },
          {
            path: '/component/button',
            label: 'Button 按钮',
            key: 'button',
            type: 'group',
            children: [
              {
                path: '/component/icon',
                label: 'Icon 图标',
                key: 'icon',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'group',
    key: 'route',
    label: '导航组件',
    children: [
      {
        path: '/component/Menu',
        label: 'Menu 菜单',
        key: 'menu',
      },
    ],
  },
]


export default MenuList

import { VNode } from 'vue'
export interface IMenuObj {
  type?: string
  key: string
  label: string | ((h: any) => VNode)
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
    label: '表单组件',
    children: [
      {
        path: 'switch',
        label: 'switch 开关',
        key: 'switch',
      },
      {
        path: 'input',
        label: 'input 输入框',
        key: 'input',
      },
      {
        path: 'select',
        label: 'select 选择器',
        key: 'select',
      },
    ],
  },
  {
    type: 'group',
    key: 'route',
    label: '提示组件',
    children: [
      {
        path: 'alert',
        label: 'alert 提示',
        key: 'alert',
      },
    ],
  },
  {
    type: 'group',
    key: 'route',
    label: '实用组件',
    children: [
      {
        path: 'loadingbar',
        label: 'loadingBar 加载条',
        key: 'loadingBar',
      },
      {
        path: 'tabs',
        label: 'tabs 选项卡',
        key: 'tabs',
      },
    ],
  },
]


export default MenuList

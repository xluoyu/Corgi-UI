import { VNode } from 'vue'
export interface IDocMenuObj {
  type?: string
  key: string
  label: string | ((h: any) => VNode)
  path?: string
  file?: string
  children?: IDocMenuObj[]
}


const MenuList: IDocMenuObj[] = [
  {
    type: 'group',
    key: 'base',
    label: 'setup函数',
    children: [
      {
        path: 'icon',
        label: h => h('span', ['图标', h('b', 'Icon')]),
        key: 'icon',
      },
    ],
  },
  {
    type: 'group',
    key: 'route',
    label: '指令',
    children: [
      {
        path: 'loading',
        file: 'components/loading',
        label: 'v-cg-loading 加载',
        key: 'v-cg-loading',
      },
    ],
  },
  {
    type: 'group',
    key: 'route',
    label: '工具函数',
    children: [
      {
        path: 'alert',
        label: 'alert 开关',
        key: 'alert',
      },
    ],
  },
]


export default MenuList

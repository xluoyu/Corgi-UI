import { RouteRecordRaw } from 'vue-router'
import menuConf from '../menu.conf'

// const

// const getComponentDemo = () => {
//   menuConf =
// }

const routes = [
  {
    path: '/',
    component: () => import('../views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/doc',
    component: () => import('../views/test.vue'),
    name: 'test',
  },
  {
    path: '/component',
    component: () => import('../views/component/index.vue'),
    name: 'component',
    redirect: '/component/button',
    children: [
      {
        path: 'button',
        name: 'button',
        component: () => import('../../src/components/button/demos/index.md'),
      },
      {
        path: 'icon',
        name: 'icon',
        component: () => import('../../src/components/icon/demos/index.md'),
      },
      {
        path: 'scrollbar',
        name: 'scrollbar',
        component: () => import('../../src/components/scrollbar/demos/index.md'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
] as RouteRecordRaw[]

export default routes

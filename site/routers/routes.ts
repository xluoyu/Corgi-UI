import { RouteRecordRaw } from 'vue-router'
import menuConf, { IMenuObj } from '../menu.conf'

interface IComponentRoute {
  path: String
  name: String
  component: () => Promise<typeof import('*.vue')>
}

const getComponentRouters = () => {
  return menuConf.reduce((pre: IComponentRoute[], cur: IMenuObj) => {
    pre = pre.concat(cur.children.map(item => {
      return {
        path: item.path,
        name: item.key,
        component: () => import(`../../src/components/${item.path}/demos/index.md`),
      }
    }))
    return pre
  }, [])
}

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
    children: getComponentRouters(),
    // [
    //   {
    //     path: 'button',
    //     name: 'button',
    //     component: () => import('../../src/components/button/demos/index.md'),
    //   },
    //   {
    //     path: 'icon',
    //     name: 'icon',
    //     component: () => import('../../src/components/icon/demos/index.md'),
    //   },
    //   {
    //     path: 'scrollbar',
    //     name: 'scrollbar',
    //     component: () => import('../../src/components/scrollbar/demos/index.md'),
    //   },
    //   {
    //     path: 'loadingBar',
    //     name: 'loadingBar',
    //     component: () => import('../../src/components/loadingBar/demos/index.md'),
    //   },
    //   {
    //     path: 'alert',
    //     name: 'alert',
    //     component: () => import('../../src/components/alert/demos/index.md'),
    //   },
    //   {
    //     path: 'switch',
    //     name: 'switch',
    //     component: () => import('../../src/components/switch/demos/index.md'),
    //   },
    // ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
] as RouteRecordRaw[]

export default routes

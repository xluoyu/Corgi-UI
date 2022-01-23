import { RouteRecordRaw } from 'vue-router'
import menuConf, { IMenuObj } from '../menu.conf'
import docConf, { IDocMenuObj } from '../doc.conf'
import { compRoot, pkgRoot } from '../../build/paths'
import { resolve } from 'path'
import { defineAsyncComponent } from 'vue'

interface IComponentRoute {
  path: String
  name: String
  component: () => Promise<typeof import('*.vue') | typeof import('*.md')>
}

// const demoModules = import.meta.glob(resolve(compRoot, `./**/*/demos/index.md`))

const LoadingComponent = {
  template: `<div v-loading="true" style="min-height: 500px; width: 100%;"></div>`,
}
const ErrorComponent = {
  template: `
    <div style="text-align: center;padding: 100px 0;">Loading error. Please refresh the page and try again</div>`,
}
const getAsyncComponent = func => {
  return defineAsyncComponent({
    loader: func,
    delay: 0,
    timeout: 30000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
  })
}


const getComponentRouters = () => {
  return menuConf.reduce((pre: IComponentRoute[], cur: IMenuObj) => {
    pre = pre.concat(cur.children.map(item => {
      return {
        path: item.path,
        name: item.key,
        component: defineAsyncComponent(() => import(`../../packages/components/${item.path}/demos/index.md`)),
      }
    }))
    return pre
  }, [])
}

const getDocRouters = () => {
  return docConf.reduce((pre: IComponentRoute[], cur: IDocMenuObj) => {
    pre = pre.concat(cur.children.map(item => {
      return {
        path: item.path,
        name: item.key,
        component: defineAsyncComponent(() => import(`../../packages/${item.folder}/${item.file}/demos/index.md`)),
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
    component: () => import('../views/doc/index.vue'),
    name: 'doc',
    redirect: '/doc/loading',
    children: getDocRouters(),
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
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/',
  // },
] as RouteRecordRaw[]

export default routes

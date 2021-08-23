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
    component: () => import('../views/component/layout.vue'),
    name: 'component',
    redirect: '/component/button',
    children: [
      {
        path: 'button',
        component: () => import('../../src/components/button/demos/index.md')
      },
      {
        path: 'icon',
        component: () => import('../../src/components/icon/demos/index.md')
      },
      {
        path: 'scrollbar',
        component: () => import('../../src/components/scrollbar/demos/index.md')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/home/index.vue')
  }
]

export default routes
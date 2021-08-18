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
    children: [
      {
        path: 'button',
        component: () => import('../views/component/page/doc-template.vue')
      }
    ]
  }
]

export default routes
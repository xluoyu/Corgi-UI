const routes = [
  {
    path: '/',
    component: () => import('../views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/component',
    component: () => import('../views/component/layout.vue'),
    name: 'component',
    children: []
  }
]

export default routes
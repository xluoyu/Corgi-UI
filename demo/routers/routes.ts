const routes = [
  {
    path: '/',
    components: () => import('../views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/component',
    components: () => import('../views/component/layout.vue'),
    name: 'component',
    children: []
  }
]

export default routes
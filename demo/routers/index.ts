import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import Home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      components: Home,
      name: 'home',
    },
    {
      path: '/component',
      components: () => import('../views/component/layout.vue'),
      name: 'component',
      children: []
    }
  ]
})

export default router
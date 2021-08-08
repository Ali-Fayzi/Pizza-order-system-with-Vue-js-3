import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/create-pizza',
    alias: '/',
    component: () => import('@/views/CreatePizza'),
    name: 'createPizza'
  },
  {
    path: '/basket',
    component: () => import('@/views/Basket'),
    name: 'basket'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

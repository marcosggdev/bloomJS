import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/scene',
      name: 'Scene',
      component: () => import('@/views/Scene.vue')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('@/views/Blog.vue')
    }
  ]
})

export default router

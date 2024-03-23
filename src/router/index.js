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
      name: 'scene',
      component: () => import('@/views/Scene.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/blog/Page.vue'),
      redirect: '/blog/welcome'
    },
    {
      path: '/blog/:slug',
      name: 'page',
      component: () => import(`@/views/blog/Page.vue`),
      props: true
    },
  ]
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 父路由有默认子路由，不能有name属性
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home', // 设置为空，就是默认路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa', // 空 默认路由
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video', // 空 默认路由
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my', // 空 默认路由
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import guards from './router.config'
import VueRouter from 'vue-router'

// 主页
import admin from './modules/admin'
// 布局
import Layout from '../views/global/layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/',
        redirect: '/admin' // 页面重定向
      },
      admin
    ]
  },
  // 404页面
  {
    path: '*',
    name: '404',
    component: () => {
      return import(/* webpackChunkName: "user" */ '../404.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫配置
guards(router)

export default router

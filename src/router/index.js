import Vue from 'vue'
import guards from './router.config'
import VueRouter from 'vue-router'
// 统计分析
import analysis from './analysis'
// 协作
import collaboration from './collaboration'
// 小结
import conclusion from './conclusion'
// 绩效
import kpi from './kpi'
// okr
import okr from './okr'
// todo
import todo from './todo'
// 工作台
import workbench from './workbench'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'workbench',
    component: () =>
      import(/* webpackChunkName: "workbench" */ '../views/index.vue'),
  },
  analysis,
  collaboration,
  conclusion,
  kpi,
  okr,
  todo,
  workbench,
  // 404页面
  {
    path: '*',
    name: '404',
    component: () => {
      return import(/* webpackChunkName: "user" */ '../404.vue')
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 路由守卫配置
guards(router)

export default router

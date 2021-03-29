import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default (router) => {
  router.beforeEach((to, from, next) => {
    // 只有在路由地址发生变化时触发进度条
    if (to.path != from.path) {
      NProgress.start()
    }
    next()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import funcs from './api/funcs_modules/index'
import 'normalize.css/normalize.css' // 统一基础样式
import './assets/styles/transition.less' // 过度动画
import './assets/styles/self-elementui.less'
import directives from '@/directives'
import useComponents from './components'
import './assets/iconfont/iconfont.css'
// 注册指令
directives.forEach((item) => {
  Vue.use(item)
})
// 使用公共组件库
useComponents()
// 公用工具库
import utils from './utils'
// 所有的工具内容从这里输出
Vue.prototype.$utils = utils
// 数据请求，统一操作
Vue.prototype.$apis = funcs
// 事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

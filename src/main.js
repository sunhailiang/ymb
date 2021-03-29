import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import funcs from './api/funcs'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false
// 全局注入，随处可用
Vue.prototype.$req = funcs
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

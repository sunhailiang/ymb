import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
// 状态保持，防止数据刷新丢失
import createPersistedState from 'vuex-persistedstate'

// 项目足够大时，将store进行拆分成若干moudle
import user from './modules/user'
console.log('user', user)
// 注意：只有程序级状态/数据方可使用store
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    namespaced: true,
    user
  },
  plugins: [createPersistedState()]
})

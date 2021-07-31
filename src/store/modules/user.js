const state = {
  token: '',
  userInfo: {}
}
const actions = {}
const mutations = {
  // 设置token
  setToken(state, token) {
    localStorage.setItem('okrt-token', token)
    state.token = token
  },
  // 存储用户信息
  setUserInfo(state, userInfo) {
    localStorage.setItem('okrt-userInfo', JSON.stringify(userInfo))
    state.userInfo = userInfo
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}

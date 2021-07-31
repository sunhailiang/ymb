// 状态码处理
import route from '@/router'
import Message from '../components/global/Message'

// === 勿删=====
// 40101：token校验不通过
// 40001：token无效
// 40301：微服务之间无效调用
// 40331：微服务之间禁止调用

// token失效
const TOKEN_INVLIDE_TO_LOGIN = (code) => {
  if (code === 40101 || code === 40001 || code === 40301 || code === 40331) {
    route.replace({ path: '/login' })
    setTimeout(() => {
      Message.error({ msg: 'Token失效,请重新登录！' })
    }, 500)
  }
  return
}
// 全局错误处理
const PUB_ERR = (code) => {
  // 处理其他错误
}

export default { TOKEN_INVLIDE_TO_LOGIN, PUB_ERR }

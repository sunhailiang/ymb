// axios二次封装
import axios from 'axios' // 引入 axios
import baseUrl from './env' // 基础url
import Message from '../components/global/Message' // 全局信息提示
import code from './state_code' // 状态码维护
import store from '@/store'
const service = axios.create({
  validateStatus(status) {
    return status >= 200 && status <= 504 // 合法状态码
  },
  baseURL: baseUrl, // 基础请求路径
  timeout: 15000 // 请求超时
})
// 重复尝试此时
service.defaults.retry = 3
// 重试延时
service.defaults.retryDelay = 15000
// 开启重试
service.defaults.shouldRetry = true

// 请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers['Accept-Language'] = 'zh-CN'
    // token
    config.headers['Authorization'] = store.state.user.token
    if (config.method === 'post') {
      if (!config.data) {
        config.data = {}
      }
    }
    return config
  },
  (error) => {
    const {
      response: { status, statusText }
    } = error
    Message.error({ code: status, msg: statusText })
  }
)
// response 拦截器
service.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      if (response.status !== 200) {
        // 请求失败
        reject(response)
      } else {
        // 判断token有效
        code.TOKEN_INVLIDE_TO_LOGIN(response.data.status)
        // 全局错误拦截
        code.PUB_ERR(response.data.status)
        // 请求成功，但逻辑或者业务有错，返回具体数据，根据业务决定是否要提示
        resolve(response.data)
      }
    }).catch((res) => {
      Message.error({
        code: res.status,
        msg: '请求失败！'
      })
    })
  },
  (err) => {
    // 失败
    let message = '请求异常,请检测网络!'
    if (err.response) {
      message = err.response.data.message
    }
    Message.error({ msg: message })
  }
)

export default service

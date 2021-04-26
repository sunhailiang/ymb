import axios from 'axios'
import baseUrl from '../api/env'
import Vue from 'vue'
const bus = new Vue()
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
service.defaults.retryDelay = 1000
// 开启重试
service.defaults.shouldRetry = true

// 请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept-Language'] = 'zh-CN'
    //   if (getToken()) { // 此处设置token
    //     config.headers['Authorization'] = 'Bearer ' + getToken() // 可以全局设置接口请求header中带token
    //   }
    // 采用本次绘画时共享token
    config.headers['token'] = sessionStorage.getItem('token')
    if (config.method === 'post') {
      if (!config.data) {
        config.data = {}
      }
      // config.data = qs.stringify(config.data) // post时如果需要序列化data就放开
    }
    return config
  },
  (error) => {
    console.log('错误？？', error)
    const {
      response: { status, statusText }
    } = error

    // 弹出错误信息
    bus.$bus.$emit('requestError', { status, statusText })
  }
)
// 响应拦截
// response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response.data)
    } else {
      if (response.data.errcode !== 200) {
        Notification.error({
          message: response.data.errcode,
          description: response.data.errmsg
        })
        return Promise.reject(response.data.errmsg)
      } else {
        return response.data
      }
    }
  },
  (err) => {
    // 失败
    return Promise.reject(err)
  }
)
// 响应烂机器
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response.data)
    } else {
      if (response.data.errcode !== 200) {
        Notification.error({
          message: response.data.errcode,
          description: response.data.errmsg
        })
        return Promise.reject(response.data.errmsg)
      } else {
        return response.data
      }
    }
  },
  (err) => {
    // 失败
    return Promise.reject(err)
  }
)

export default service

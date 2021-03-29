// 统一管理所有的基础请求
import apis from './apis'
import req from '../utils/request'

// 示例：获取用户信息
const GETUSERINFO = () => {
  return req.get(apis.getUserInfo)
}
// 导出基础请求函数
export default {
  GETUSERINFO,
}

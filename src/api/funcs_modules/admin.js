// 主页模块
// 统一管理所有的基础请求
import apis from '../apis_moudles/index'
import req from '../request'

// 示例：获取用户信息
const GETUSERINFO = (params) => {
  return req.get(apis.getUserInfo, { params })
}

// 导出基础请求函数
export default [{ GETUSERINFO }]

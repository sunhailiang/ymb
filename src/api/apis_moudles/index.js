// 引入工具包
import utils from '@/utils/index.js'
// 引入模块
import admin from './admin'
const apis = [...admin]
export default utils.arrToObj(apis)

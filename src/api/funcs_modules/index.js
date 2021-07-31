// 引入工具包
import utils from '@/utils/index.js'
// 引入模块
import admin from './admin'
const funcs = [...admin]
export default utils.arrToObj(funcs)

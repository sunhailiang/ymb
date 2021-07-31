// 此文件注册全局组件
import Vue from 'vue'
import Message from './global/Message'
import Img from './image/Image.vue'
import useElement from './element'
import Icon from './global/Icon/index.vue'
import At from './global/At/index.vue'
export default () => {
  // 全局提示信息
  Vue.prototype.$Message = Message
  // 图片
  Vue.component('Img', Img)
  // 使用element
  useElement()
  // 全局注册Icon
  Vue.component('Icon', Icon)
  // at输入框
  Vue.component('AtInput', At)
}

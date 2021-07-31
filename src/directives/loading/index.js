import Vue from 'vue'
import LoadingComponent from './loading.vue'
const LoadingConstructor = Vue.extend(LoadingComponent)
export default () => {
  Vue.directive('pageloading', {
    /**
     * 只调用一次；指令第一次绑定到元素时调用，可用于初始化设置
     * @param {*} el 指令绑定的元素
     * @param {*} binding 指令传入的信息{ name: '指令名称', value: '指令绑定的值', arg: 'v-bind:text 对应的text' }
     */
    bind(el, binding) {
      const instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: {}
      })

      // 如果超时，返回空图片
      const timer = setTimeout(() => {
        el.instance.visible = false
        el.innerHTML =
          "<div style='height:100%; display:flex;justify-content:center;align-items: center;'><img style='height:65%;' src=" +
          instance.empty +
          '/></div>'
        clearInterval(timer)
      }, 10000)
      el.appendChild(instance.$el)

      el.instance = instance
      Vue.nextTick(() => {
        el.style.setProperty('position', 'relative', 'important')
        el.instance.$el.style.setProperty('position', 'absolute', 'important')
        el.instance.visible = binding.value
      })
    },
    /**
     * 组件的VNode更新时调用
     * @param {*} el
     * @param {*} binding
     */
    update(el, binding) {
      if (binding.oldValue !== binding.value) {
        el.instance.visible = binding.value
      }
    },
    /**
     * 只调用一次；指令与元素解绑是调用
     * @param {*} el
     */
    unbind(el) {
      const pageloading = el.instance.$el
      if (pageloading.parentNode) {
        pageloading.parentNode.removeChild(pageloading)
      }
      el.instance.$destroy()
      el.instance = undefined
    }
  })
}

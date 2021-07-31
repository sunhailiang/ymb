import Vue from 'vue'
import DefaultPage from './default-page.vue'
const DefaultConstructor = Vue.extend(DefaultPage)
export default () => {
  Vue.directive('empty', {
    bind(el, binding) {
      const instance = new DefaultConstructor({
        el: document.createElement('div'),
        data: {}
      })
      el.appendChild(instance.$el)
      el.instance = instance
      Vue.nextTick(() => {
        el.style.setProperty('position', 'relative', 'important')
        el.instance.$el.style.setProperty('position', 'absolute', 'important')
        // 是否显示
        el.instance.visible = binding.value.state
        // 缺省页类型
        el.instance.type = binding.value.type
      })
    },
    update(el, binding) {
      if (binding.oldValue !== binding.value) {
        el.instance.visible = binding.value.state
        el.instance.type = binding.value.type
      }
    }
  })
}

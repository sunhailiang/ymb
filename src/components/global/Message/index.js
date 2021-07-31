import Vue from 'vue'
import index from './Message.vue'
const vms = {
  create(Component, obj) {
    let vm = new Component()
    vm = vm.$mount()
    if (obj) {
      for (const o in obj) {
        vm[o] = obj[o]
      }
      document.body.appendChild(vm.$el)
      return vm
    }
  }
}
const MessageConstructor = Vue.extend(index)

const Message = (args = {}) => {
  const vm = vms.create(MessageConstructor, args)
  Object.assign(vm, args)
}
// 成功
Message.success = (args = {}) => {
  args.type = 'success'
  Message(args)
}

// 警告
Message.warn = (args = {}) => {
  args.type = 'warn'
  Message(args)
}

// 错误
Message.error = (args = {}) => {
  args.type = 'error'
  Message(args)
}

export default Message

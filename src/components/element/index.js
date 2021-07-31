import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Select,
  Loading,
  Form,
  FormItem,
  Input,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  MessageBox
} from 'element-ui'
import Vue from 'vue'

export default () => {
  Vue.use(Checkbox)
  Vue.use(CheckboxButton)
  Vue.use(CheckboxGroup)
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Loading)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Checkbox)
  Vue.use(CheckboxButton)
  Vue.use(CheckboxGroup)
  Vue.prototype.$confirm = MessageBox.confirm
}

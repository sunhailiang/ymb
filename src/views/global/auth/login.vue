<template>
  <div class="login-box">
    <div class="login-main">
      <div class="login-right">
        <!-- 输入验证码界面 -->
        <div v-if="isShowCode" class="code-div">
          <div class="return" @click="nextGoBack">
            <i class="el-icon-back"></i>返回
          </div>
          <div class="code-title">验证手机号</div>
          <div class="code-text">
            请输入发送至
            {{ resetSign ? pwdForm.username : telForm.telphone }} 的 6
            位验证码，有效期十分钟。如未收到，请尝试重新获取验证码。
          </div>
          <div class="invitation_fieldset_sms">
            <vue-input-code
              span-size="20px"
              type="number"
              :number="6"
              height="55px"
              span-color="#333"
              input-size="24px"
              :code="code"
              :success="success"
            />
          </div>
          <div v-if="isCodeEmpty" class="code-empty">{{ codeInfo }}</div>
          <p v-show="timerShow == false" class="invitation_text">
            &nbsp;&nbsp;<label>{{ timerCount }}</label> 秒后可重新获取验证码
          </p>
          <el-button v-show="timerShow == true" type="text" @click="recapture()"
            >重新获取验证码</el-button
          >
          <div class="button-bottom-code">
            <el-button
              :disabled="codeDisabled"
              type="primary"
              class="next-step"
              @click="submitCodeForm()"
              >下一步</el-button
            >
          </div>
        </div>
        <!-- 登录界面 -->
        <template v-if="isShowLogin">
          <div class="login-title">登录源目标</div>
          <div class="login-text">
            登录即代表你已阅读并同意
            <router-link class="login_link" to="/protocol/serviceAgreement"
              >《源目标服务协议》</router-link
            >和
            <router-link class="login_link" to="/protocol/privacyAgreement"
              >《源目标隐私协议》</router-link
            >
          </div>
          <div class="tabs-div">
            <div
              v-for="(item, index) in tabs"
              :key="index"
              :class="tabsActive == index ? 'tabs-item-active' : 'tabs-item'"
              @click="tabsClick(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 密码登录界面 -->
          <div v-show="tabsActive == 0">
            <el-form
              ref="pwdForm"
              class="login-form"
              :model="pwdForm"
              :rules="pwdFormRules"
            >
              <el-form-item prop="username">
                <el-input
                  v-model.number="pwdForm.username"
                  class="tel-input"
                  placeholder="请输入你的手机号"
                  clearable
                  maxlength="11"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="pwdForm.password"
                  placeholder="请输入密码"
                  show-password
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <div class="forget-pwd" @click="resetPwd('pwdForm')">
                  <i class="iconfont ymbicon-mima"></i>
                  忘记密码？
                </div>
              </el-form-item>
              <div class="form-item-button-pwd">
                <el-button
                  :disabled="pwdDisabled || telDisabled"
                  type="primary"
                  class="next-step"
                  @click="submitPwdForm()"
                  >下一步</el-button
                >
              </div>
            </el-form>
          </div>
          <!-- 手机号登录界面 -->
          <div v-show="tabsActive == 1">
            <el-form
              ref="telForm"
              class="login-form"
              :model="telForm"
              :rules="telFormRules"
            >
              <el-form-item prop="telphone">
                <el-input
                  v-model.number="telForm.telphone"
                  class="tel-input"
                  placeholder="请输入你的手机号"
                  clearable
                  maxlength="11"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
              <div class="form-item-button-tel">
                <el-button
                  :disabled="telDisabled"
                  type="primary"
                  class="next-step"
                  @click="submitTelForm('telForm')"
                  >下一步</el-button
                >
              </div>
            </el-form>
          </div>
        </template>
        <!-- 重置密码界面 -->
        <div v-if="isShowReset" class="code-div">
          <div class="return" @click="nextGoBack">
            <i class="el-icon-back"></i>返回
          </div>
          <div class="code-title">重置密码</div>

          <div class="code-text">密码需同时包含字母和数字，且至少 8 个字符</div>
          <el-form
            ref="resetForm"
            style="margin-top: 10px"
            class="login-form"
            :model="resetForm"
            :rules="resetFormRules"
          >
            <el-form-item prop="password">
              <el-input
                v-model="resetForm.password"
                placeholder="请输入密码"
                show-password
                clearable
              />
            </el-form-item>
            <el-form-item prop="passwordComfirm">
              <el-input
                v-model="resetForm.passwordComfirm"
                placeholder="请确认密码"
                show-password
                clearable
              />
            </el-form-item>
            <div class="form-item-button-sub">
              <el-button
                type="primary"
                class="next-step"
                :disabled="pwdDisabled || pwd2Disabled"
                @click="changePwd()"
                >完成</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 在某个组件中
import VueInputCode from 'vue-input-code'
export default {
  name: 'Login',
  components: {
    VueInputCode
  },
  data() {
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        this.telDisabled = true
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          this.telDisabled = false
          callback()
        } else {
          this.telDisabled = true
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    // 验证密码
    var validatePass = (rule, value, callback) => {
      const reg = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/
      if (value === '') {
        this.pwdDisabled = true
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        this.pwdDisabled = true
        callback(
          new Error('密码格式不正确。需同时包含字母和数字，不支持汉字。')
        )
      } else if (value.length < 8 || value.length > 20) {
        this.pwdDisabled = true
        callback(new Error('密码长度在 8 到 10个字符'))
      } else {
        this.pwdDisabled = false
      }
    }
    // 验证确认密码
    var validateConfirmPass = (rule, value, callback) => {
      const reg = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/
      if (value === '') {
        this.pwd2Disabled = true
        callback(new Error('请再次输入密码'))
      } else if (!reg.test(value)) {
        this.pwd2Disabled = true
        callback(
          new Error('密码格式不正确。需同时包含字母和数字，不支持汉字。')
        )
      } else if (value !== this.resetForm.password) {
        this.pwd2Disabled = true
        callback(new Error('两次输入密码不一致!'))
      } else if (value.length < 8 || value.length > 20) {
        this.pwd2Disabled = true
        callback(new Error('密码长度在 8 到 10个字符'))
      } else {
        this.pwd2Disabled = false
        callback()
      }
    }
    return {
      pwdDisabled: true,
      pwd2Disabled: true,
      telDisabled: true,
      codeDisabled: true,
      resetSign: false, // 重置标志
      // 密码登录form
      pwdForm: {
        username: '',
        password: ''
      },
      pwdFormRules: {
        username: [{ validator: checkPhone, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }]
      },
      // 手机登录form
      telForm: {
        telphone: ''
      },
      telFormRules: {
        telphone: [{ validator: checkPhone, trigger: 'change' }]
      },
      // 重置密码form
      resetForm: {
        password: '',
        passwordComfirm: ''
      },
      resetFormRules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        passwordComfirm: [{ validator: validateConfirmPass, trigger: 'change' }]
      },
      timer: null, // 计时器
      code: [], // 短信验证码
      timerCount: '', // 计时文案
      timerShow: false, // 计时器显示
      isShowCode: false, // 是否显示是验证手机号
      isShowLogin: true, // 是否显示登录界面
      isShowReset: false, // 是否显示重置密码界面
      tabsActive: 0, // tab默认值
      tabs: [
        {
          id: 0,
          name: '密码登陆'
        },
        {
          id: 1,
          name: '手机号'
        }
      ],
      isCodeEmpty: false, // 验证码提示是否显示
      codeInfo: '' // 验证码提示
    }
  },
  methods: {
    // 发送验证码API
    sendCode(params) {
      this.$apis.GETCODE(params).then((res) => {
        if (res.status === 200) {
          this.isShowCode = true
          this.isShowReset = false
          this.isShowLogin = false
          this.getCode()
        } else {
          if (res.status === 51000) {
            this.$confirm(res.message + ',将前往注册页？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$router.push('/register')
              })
              .catch(() => {})
          } else {
            this.$Message.error({ msg: res.message })
          }
        }
      })
    },
    // 重置密码发送验证码API
    resetCode(params) {
      this.$apis.RESETPWDCODE(params).then((res) => {
        if (res.status === 200) {
          this.isShowCode = false
          this.isShowReset = true
          this.isShowLogin = false
        } else {
          if (res.status === 51000) {
            this.$confirm(res.message + ',将前往注册页？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$router.push('/register')
              })
              .catch(() => {})
          } else {
            this.$Message.error({ msg: res.message })
          }
        }
      })
    },
    // 重置form
    resetFormData(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取验证码
    submitTelForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.telDisabled = false
          const params = {
            type: '1',
            username: this.telForm.telphone + ''
          }
          this.sendCode(params)
        } else {
          return false
        }
      })
    },
    // 重置密码提交
    changePwd() {
      const params = {
        identifying: this.code.join(''),
        password: this.resetForm.password,
        username: this.pwdForm.username
      }
      this.$apis.RESETPWDSUBMIT(params).then((res) => {
        if (res.status === 200) {
          this.$Message.success({ msg: res.message })
          this.isShowReset = false
          this.isShowCode = false
          this.isShowLogin = true
        } else {
          this.$Message.error({ msg: res.message })
        }
      })
    },
    // 切换tab
    tabsClick(item, index) {
      const that = this
      that.tabsActive = index
      if (that.tabsActive === 0) {
        that.$nextTick(() => {
          that.resetFormData('pwdForm')
          if (this.telForm.telphone) {
            this.pwdForm.username = this.telForm.telphone
          }
        })
      } else {
        that.$nextTick(() => {
          that.resetFormData('telForm')
          if (this.pwdForm.username) {
            this.telForm.telphone = this.pwdForm.username
          }
        })
      }
    },
    // 返回
    nextGoBack() {
      this.isShowCode = false
      this.isShowReset = false
      this.isShowLogin = true
    },
    // 重新获取验证码
    recapture() {
      this.code = []
      this.getCode()
    },
    // 验证码登录
    submitCodeForm() {
      if (this.resetSign) {
        this.isShowLogin = false
        this.isShowCode = false
        this.isShowReset = true
        const params = {
          identifying: this.code.join(''),
          username: this.pwdForm.username + ''
        }
        this.resetCode(params)
        return
      }
      this.isCodeEmpty = false
      if (this.code.length < 6) {
        this.isCodeEmpty = true
        this.codeInfo = '请输入验证码！'
        return
      }
      const params = {
        identifying: this.code.join(''),
        username: this.telForm.telphone
      }
      this.$apis.CODELOGIN(params).then((res) => {
        if (res.status === 200) {
          // 更新token
          this.$store.commit('user/setToken', res.data)
          // 默认首页-工作台
          this.$router.push('/workbench')
        } else {
          this.code = []
          this.isCodeEmpty = true
          this.codeInfo = '验证码错误！'
          this.codeDisabled = true
        }
      })
    },
    // 密码登录
    submitPwdForm() {
      const params = {
        type: '1',
        username: this.pwdForm.username,
        password: this.pwdForm.password
      }
      this.$apis.PWDLOGIN(params).then((res) => {
        if (res.status === 200) {
          // 更新token
          this.$store.commit('user/setToken', res.data)
          // 默认首页-工作台
          this.$router.push('/workbench')
        } else {
          if (res.status === 51000) {
            this.$confirm(res.message + ',将前往注册页？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$router.push('/register')
              })
              .catch(() => {})
          } else {
            this.$Message.error({ msg: res.message })
          }
        }
      })
    },
    // 重置密码
    resetPwd(formName) {
      this.codeDisabled = true
      this.$refs[formName].validateField('username', (valid) => {
        if (valid) {
          return false
        } else {
          const params = {
            type: '3',
            username: this.pwdForm.username + ''
          }
          this.sendCode(params)
          this.resetSign = true
        }
      })
    },
    // 输入验证码时 输入与完成时的回调
    success() {
      if (this.code.length === 6) {
        this.codeDisabled = false
      }
    },
    // 倒计时  在发送验证码 点击时调用
    getCode() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.timerCount = TIME_COUNT
        this.timerShow = false
        this.timer = setInterval(() => {
          if (this.timerCount > 0 && this.timerCount <= TIME_COUNT) {
            this.timerCount--
          } else {
            this.timerShow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>
<style scoped lang="less">
input:focus {
  border: none !important;
  outline: none;
}
.forget-pwd {
  float: right;
  margin-top: -10px;
  cursor: pointer;
  text-align: right;
  .fs(16);
  .lh(30);
  color: #606266;
  .ymbicon-mima {
    .fs(16);
    color: #999;
    vertical-align: -1px;
    font-weight: bold;
  }
}
.login-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .login-main {
    .w(600);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .login-right {
      .w(410);
      .h(464);
      background: #ffffff;
      border-radius: 31px;
      box-shadow: 0px 6px 20px -4px rgba(0, 24, 87, 0.08);
      .pa(68, 40, 68, 40);
      .login-title {
        .fs(28);
        font-family: OPPOSans, OPPOSans-B;
        font-weight: bold;
        color: #333;
      }
      .login-text {
        .fs(16);
        .lh(30);
        color: #666;
        .mg-t(10);
        .login_link {
          color: #3068ff;
        }
      }
      .tabs-div {
        display: flex;
        flex-direction: row;
        .mg-t(26);
        .mg-b(20);
        .tabs-item {
          .fs(20);
          cursor: pointer;
          padding: 5px 0;
          text-align: center;
          margin-right: 15px;
          color: #666;
        }
        .tabs-item-active {
          .tabs-item;
          color: #3068ff;
          border-bottom: 2px #3068ff solid;
        }
      }
      .login-fieldset {
        border: 1px solid #d6d9e5;
        border-radius: 5px;
        font-size: 14px;
        .p-r;
        label {
          margin: 0 0 0 10px;
          padding: 10px 0;
        }
        .login-input {
          width: calc(100% - 60px);
          border: 0;
          padding: 10px 10px;
          border-radius: 5px;
        }
        .login-input-pwd {
          width: calc(100% - 25px);
          padding: 10px 10px;
          border: 0;
          border-radius: 5px;
        }
        .clear-icon {
          font-size: 14px;
          .p-a;
          right: 10px;
          top: 10px;
        }
      }
      .empty-text {
        font-size: 14px;
        .lh(30);
        color: #f93300;
      }

      .button-bottom-code {
        width: 100%;
        .mg-t(80);
      }
      .code-div {
        .return {
          font-size: 16px;
          color: #606266;
          cursor: pointer;
          i {
            font-size: 25px;
            vertical-align: -0.5px;
          }
          .lh(30);
        }
        .code-title {
          margin: 20px 0 15px;
          .fs(28);
          font-weight: bold;
          .lh(50);
        }
        .code-text {
          .fs(16);
          color: #606266;
          .lh(25);
        }
        .invitation_text {
          .fs(16);
          line-height: 22px;
          color: #606266;
          .invitation_link {
            color: #3068ff;
            font-size: 14px;
            cursor: pointer;
          }
          .invitation_link_tel {
            color: #606266;
          }
          .invitation_text_person {
            color: #606266;
            font-size: 28px;
            font-weight: 600;
          }
          .check-box-svg {
            cursor: pointer;
            position: relative;
            top: 0px;
          }
        }
        .code-empty {
          font-size: 14px;
          color: #f93300;
        }
      }
    }
  }
}
.invitation_fieldset_sms {
  margin: 36px 0 8px 0;
  input {
    width: 44px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-left: 10px;
    border-radius: 4px;
    border: 1px solid rgba(150, 159, 190, 1);
  }
  input.border-input-blue {
    border: 1px solid #3067fe !important;
  }
  input.border-input {
    background: transparent;
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
    box-shadow: none !important;
  }
  .fieldset_sms_line {
    display: inline-block;
    width: 30px;
    height: 2px;
    border-bottom: 1px solid #ddd;
    align-self: center;
    margin-left: 10px;
  }
}
.invitation_fieldset_sms input {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid rgba(150, 159, 190, 1);
  margin-left: 6px;
}
.invitation_fieldset_sms {
  margin: 10px 0 8px 0 !important;
}
</style>
<style lang="less">
.vue_input_code {
  .input {
    .input-code {
      margin-left: 2% !important;
      width: 10% !important;
    }
    span.first {
      border-top-left-radius: none !important;
      border-bottom-left-radius: none !important;
    }
    span.last {
      z-index: 1;
    }
    span:nth-child(n) {
      border-right: 1px solid #cccccc !important;
    }
    span:nth-child(6) {
      color: #f00;
    }
    span {
      margin-right: 3% !important;
      border-radius: 5px !important;
      border: 1px solid #cccccc !important;
    }
  }
}
.el-form.login-form {
  .form-item-button-pwd {
    margin-top: 30px;
    // .mg-t(40);
  }
  .form-item-button-tel {
    margin-top: 127px // .mg-t(169);;
  }
  .form-item-button-sub {
    .mg-t(120);
  }
}
</style>

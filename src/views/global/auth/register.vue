<template>
  <div class="login-box">
    <div class="login-main">
      <div class="login-right">
        <!-- 发送验证码界面 -->
        <div v-if="isShowCode" class="code-div">
          <div class="return" @click="nextGoBack">
            <i class="el-icon-back"></i>
            返回
          </div>
          <div class="code-title">验证手机号</div>
          <div class="code-text">
            请输入发送至 {{ telForm.telphone }} 的 6
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
          <div v-show="isCodeEmpty" class="code-empty">
            {{ codeInfo }}
          </div>
          <p v-show="timerShow == false" class="invitation_text">
            &nbsp;&nbsp;<label>{{ timerCount }}</label> 秒后可重新获取验证码
          </p>
          <el-button v-show="timerShow == true" type="text" @click="recapture()"
            >重新获取验证码</el-button
          >
          <div class="button-bottom">
            <el-button
              :disabled="!protocolChecked || codeDisabled"
              type="primary"
              class="next-step"
              @click="registerTelForm()"
              >下一步</el-button
            >
          </div>
        </div>
        <!-- 注册界面 -->
        <template v-else>
          <div class="login-title">欢迎使用源目标</div>
          <div class="login-text">
            源目标面向所有企业及组织免费开放，在线目标管理，全面提升办公效率与体验，助力企业成功
          </div>
          <div class="tabs-div">
            <div
              v-for="(item, index) in tabs"
              :key="index"
              :class="tabsActive == index ? 'tabs-item-active' : 'tabs-item'"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 手机号注册界面 -->
          <div v-if="tabsActive == 0">
            <el-form
              ref="telForm"
              class="register-form"
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

              <div style="margin-top: 20px; color: #606266">
                <el-checkbox v-model="protocolChecked" @change="checkProtocol">
                  <router-link
                    class="login-link"
                    to="/protocol/serviceAgreement"
                    >《源目标服务协议》</router-link
                  >和
                  <router-link
                    class="login-link"
                    to="/protocol/privacyAgreement"
                    >《源目标隐私协议》</router-link
                  >
                </el-checkbox>
              </div>
            </el-form>
          </div>
        </template>
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
      if (!this.protocolChecked) {
        return callback(new Error('请查看协议并勾选协议！'))
      } else {
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
    }
    return {
      telDisabled: true,
      codeDisabled: true,
      // 手机登录form
      telForm: {
        telphone: ''
      },
      telFormRules: {
        telphone: [{ validator: checkPhone, trigger: 'change' }]
      },
      timer: null, // 计时器
      code: [], // 短信验证码
      timerCount: '', // 计时文案
      timerShow: false, // 计时器显示
      isShowCode: false, // 是否显示是验证手机号
      tabsActive: 0, // tab默认值
      tabs: [
        {
          id: 0,
          name: '手机号'
        }
      ],
      protocolChecked: true, // 协议勾选
      isCodeEmpty: false, // 验证码提示是否显示
      codeInfo: '' // 验证码提示
    }
  },
  mounted() {},
  methods: {
    // 验证码注册
    submitTelForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            type: '2',
            username: this.telForm.telphone + ''
          }
          this.isShowCode = true
          this.$apis.GETCODE(params).then((res) => {
            if (res.status === 200) {
              this.getCode()
            } else {
              this.$Message.error({ msg: res.message })
            }
          })
        } else {
          return false
        }
      })
    },
    // 手机验证码注册
    registerTelForm() {
      const params = {
        identifying: this.code.join(''),
        username: this.telForm.telphone + ''
      }
      this.$apis.REGISTER(params).then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('token', JSON.stringify(this.token))
          this.$Message.success({ msg: res.message })
          this.$router.push('/login')
        } else {
          this.code = []
          this.isCodeEmpty = true
          this.codeInfo = '验证码错误！'
          this.codeDisabled = true
        }
      })
    },
    // 重新获取验证码
    recapture() {
      this.code = []
      const params = {
        type: '2',
        username: this.telForm.telphone + ''
      }
      this.isShowCode = true
      this.$apis.GETCODE(params).then((res) => {
        if (res.status === 200) {
          this.getCode()
        } else {
          this.$Message.error({ msg: res.message })
        }
      })
    },
    // 输入验证码时 输入与完成时的回调
    success() {
      if (this.code.length === 6) {
        this.codeDisabled = false
      }
    },
    // 返回
    nextGoBack() {
      this.isShowCode = false
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
    },
    // 勾选协议
    checkProtocol(val) {
      this.protocolChecked = val
      this.$refs.telForm.validate()
    }
  }
}
</script>
<style scoped lang="less">
input:focus {
  border: none !important;
  outline: none;
}
.login-link {
  color: #3068ff;
  text-decoration: none;
  font-weight: normal;
}
.login-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  .login-main {
    .w(600);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .login-right {
      .w(410);
      .h(464);
      opacity: 1;
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
        margin-top: 10px;
        .login_link {
          color: #3068ff;
        }
      }
      .tabs-div {
        display: flex;
        flex-direction: row;
        margin-top: 26px;
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
        width: 100%;
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
        }
        .clear-icon {
          cursor: pointer;
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
      .forget-pwd {
        text-align: right;
        font-size: 14px;
        .lh(30);
        color: #606266;
        .ymbicon-mima {
          font-size: 18px;
          color: #999;
          vertical-align: -0.5px;
        }
      }
      .forget-pwd:hover {
        color: #3068ff;
      }
      .code-empty {
        font-size: 14px;
        color: #f93300;
      }
      .code-empty-tel {
        .code-empty;
        margin-top: -5px;
      }
      .code-div {
        .h(464);
        position: relative;
        .button-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
        }
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
          .fs(28);
          font-weight: bold;
          margin: 20px 0 15px;
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
.el-form.register-form {
  .form-item-button-tel {
    .mg-t(120);
  }
}
</style>

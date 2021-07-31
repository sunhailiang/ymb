//  主页模块
export default [
  { getUserInfo: '/api/admin/v1/user/info' }, // 获取用户信息
  { pwdLogin: '/api/auth/jwt/token' }, // 密码登录
  { register: '/api/auth/jwt/tokenRegisterCode' }, // 注册
  { resetPwdCode: '/api/auth/jwt/validatePwCode' }, // 重置密码
  { resetPwdSubmit: '/api/auth/jwt/validatePwCodeUpdate' } // 重置密码提交
]

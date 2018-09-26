import Vue from 'vue'

export default {
  // 登录
  login: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/login', params)
  },
  // 注册
  regist: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/insert', params)
  },
  // 更新密码
  update: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
  },
  // 发送验证码
  sendCode: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/sendSMSCheckCode', params)
  },
  // 校验验证码
  validateCode: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/checkPhoneCode', params)
  },
}

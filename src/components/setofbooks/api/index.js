import Vue from 'vue'

export default {
  // 查询管理员所有账套
  updatePwd: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
  },
  // 修改个人信息
  updateInfo: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/update', params)
  },
}

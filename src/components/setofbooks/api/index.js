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
  // 查询账套设置-科目设置
  querySubprojects: url => {
    return Vue.http.get(url)
  },
  // 查询账套
  queryAccounts: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/accountset/queryByAdminId', params)
  },
  // 查询单个账套信息
  queryAccountById: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/accountset/queryById', params)
  },
  // 查询企业密钥
  querySecretKey: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/accountset/getSecretKey', params)
  },
  // 更新账套信息
  updateAccount: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/accountset/update', params)
  },
}

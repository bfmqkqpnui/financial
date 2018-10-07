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
  // 上传文件
  upload: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/enterpriseannex/insert', params,{headers: { 'Content-Type': 'multipart/form-data'}})
  },
  // 删除文件
  delFile: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/enterpriseannex/delete', params)
  },
  // 查询科目设置
  queryAccountSet: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/course/queryByAccountSetId', params)
  }
}

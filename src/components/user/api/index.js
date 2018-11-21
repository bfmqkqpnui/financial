import Vue from 'vue'

export default {
    // 查询用户数据
    queryUserList: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/queryAllPage', params)
    },
    // 新增用户
    backInsert: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/backInsert', params)
    },
    // 更新用户
    update: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/update', params)
    },
    // 删除
    delete: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/delete', params)
    },
    // 更新用户登录密码
    updateAdminPassWord: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWordById', params)
    }
}
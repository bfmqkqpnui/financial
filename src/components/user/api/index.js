import Vue from 'vue'

export default {
    // 查询管理员所有账套
    queryUserList: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/queryAllPage', params)
    },
}
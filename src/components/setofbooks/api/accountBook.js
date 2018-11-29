import Vue from 'vue'
export default {
    // 查询总账数据
    queryAllByGenerals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询明细表数据
    queryAllByGenerals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询余额表数据
    queryAllByGenerals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询序时簿数据
    queryAllByGenerals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询辅助核算明细表数据
    queryAllByGenerals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询辅助核算余额表数据
    queryAllByGenerals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
}
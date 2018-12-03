import Vue from 'vue'
export default {
    // 查询总账数据
    queryAllByGenerals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/gencon/getGenCon', params)
    },
    // 查询明细表数据
    queryAllBySubsidiaries: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询余额表数据
    queryAllByBalances: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询序时簿数据
    queryAllByChronologicals: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询辅助核算明细表数据
    queryAllByAssistSubsidiaries: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
    // 查询辅助核算余额表数据
    queryAllByAssistBalances: params => {
        return Vue.http.post(Vue.$SERVICE_BASE_URL + '/admin/updateAdminPassWord', params)
    },
}
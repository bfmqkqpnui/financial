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
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/enterpriseannex/insert', params, {headers: {'Content-Type': 'multipart/form-data'}})
  },
  // 删除文件
  delFile: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/enterpriseannex/delete', params)
  },
  // 查询科目设置
  queryAccountSet: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/course/queryByAccountSetId', params)
  },
  // 添加账套
  createAccount: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/accountset/insert', params)
  },
  // 添加辅助核算
  addAssist: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/assistaccounting/insert', params)
  },
  // 查询所有辅助核算
  queryAllAssists: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/assistaccounting/queryByAccountSetId', params)
  },
  // 更新辅助核算
  updateAssists: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/assistaccounting/update', params)
  },
  // 删除辅助核算
  deleteAssists: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/assistaccounting/delete', params)
  },
  // 查询固定资产
  queryFixedAssets: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/fixedassets/queryByAccountSetId', params)
  },
  // 添加固定资产
  addFixedAsset: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/fixedassets/insert', params)
  },
  // 更新固定资产
  updateFiexdAsset: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/fixedassets/update', params)
  },
  // 更新固定资产状态 出售 盘亏 变卖
  changeAssetStatus: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/fixedassets/changeStatus', params)
  },
  // 删除固定资产
  delAsset: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/fixedassets/delete', params)
  },
  // 获取入账日期
  getDate: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/sys/getNowYMD', params)
  },
  // 获取入账科目
  queryAccountingCourse: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/course/getAccountingCourse', params)
  },
  // 查询所有待摊费用
  queryUnamortizedexpense: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/unamortizedexpense/queryByAccountSetId', params)
  },
  // 查询待摊科目
  queryAmortizedExpenseCourse: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/course/getAmortizedExpenseCourse', params)
  },
  // 新增待摊费用
  addAmortized: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/unamortizedexpense/insert', params)
  },
  // 更新待摊费用
  updateAmortized: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/unamortizedexpense/update', params)
  },
  // 删除待摊费用
  delAmortized: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/unamortizedexpense/delete', params)
  },
  // 查询报表-资产负债数据
  queryReoprtByLiabilities: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/balancesheet/queryByAccountSetId', params)
  },
  // 查询报表-利润数据
  queryReoprtByProfit: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/incomestatement/queryByAccountSetId', params)
  },
  // 查询报表-现金流量数据
  queryReoprtByCashFlow: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/cashflowstatement/queryByAccountSetId', params)
  },
  // 更新-现金流量数据
  updateCashFlow: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/cashflowstatement/update', params)
  },
  // 查询科目余额表数据
  querySubjectBalances: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/accountbalance/queryByAccountSetId', params)
  },
  // 更新保存科目余额表数据
  updateSubjectBalances: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/accountbalance/update', params)
  },
  // 查询凭证科目数据
  querySubjectListData: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/course/getVoucherCourse', params)
  },
  // 新增凭证数据
  addSubjectData: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/voucher/insert', params)
  },
  // 查询凭证列表信息
  queryVoucher: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/voucher/queryAllByAccountSetId', params)
  },
  // 更新凭证列表信息数据
  updateVoucher: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/voucher/update', params)
  }
}

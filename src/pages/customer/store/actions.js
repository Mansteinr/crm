import { $http } from '@/common/js/ajax'
import * as types from './mutations-types'
import API from '@/config/api'
import { showModal } from '@/common/js/utils'

//新增客户
export const addNewCompanyAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  $http(API.userApi.addNewCompany, options).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllCompanyAjax')
      commit(types.ADD_NEW_COMPANY, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_COMPANY, true) 
    }
  })
}
//获取所有的客户
export const getAllCompanyAjax = ({ commit }, options) => {
  let opt = {
    bussName: '',
    companyName: '',
    pageNum: 1,
    pageSize: 10
  }
  $http(API.userApi.getAllCompany, Object.assign(opt, options)).then(res => {
    commit(types.GET_ALL_COMPANY, res.resData.resultList)
    commit(types.GET_ALL_COMPANY_LENGTH, res.resData.total)
  })
}
//删除客户
export const deleteCompanyAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteCompany}/${id}`, {}).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllCompanyAjax')
      showModal(res.messageText)
    } 
  })
}
//编辑客户
export const updateCompanyAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updeteCompany, option).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllCompanyAjax')
      commit(types.ADD_NEW_COMPANY, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_COMPANY, true) 
    }
  })
}



//账户
export const addNewAccountAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  delete options.accountEnable
  $http(API.userApi.addNewAccount, options).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAccountAjax')
      commit(types.ADD_NEW_ACCOUNT, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_ACCOUNT, true) 
    }
  })
}

export const getAllAccountAjax = ({ commit }, options) => {
  let opt = {
    accountName: '',
    bussName: '',
    pageNum: 1,
    pageSize: 10
  }
  $http(API.userApi.getAllAccount, Object.assign(opt, options)).then(res => {
    commit(types.GET_ALL_ACCOUNT, res.resData.resultList)
    commit(types.GET_ALL_ACCOUNT_LENGTH, res.resData.total)
  })
}

export const deleteAccountAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteAccount}/${id}`, {}).then(res => {
    dispatch('getAllAccountAjax')
    showModal(res.messageText)
  })
}

export const updateAccountAjax = ({ dispatch, commit }, option) => {
  delete option.accountName
  delete option.accountKey
  option.needErrorData = true
  $http(API.userApi.updeteAccount, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAccountAjax')
      commit(types.ADD_NEW_ACCOUNT, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_ACCOUNT, true) 
    }
  })
}

//账户已有的产品列表
export const getProductPriceDetailAjax = ({ commit }, option) => {
  let opt  = {
    accountId: '',
    productId: '',
    pageNum: 1,
    pageSize: 10
  }
  $http(API.userApi.productPriceDetail, Object.assign(opt, option)).then(res => {
    commit(types.GET_PRODUCT_PRICE_DETAIL, res.resData.resultList)
    commit(types.GET_PRODUCT_PRICE_DETAIL_LENGTH, res.resData.total)
  })
}

//根据账户获取产品列表
export const getProductListAjax = ({ commit }, option) => {
  $http(`${API.userApi.productList}/${option}`).then(res => {
    commit(types.GET_PRODUCT_LIST, res.resData)
  })
}
//充值
export const rechargeAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.recharge, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAccountAjax')
      commit(types.SER_CHARGE, false)
      showModal(res.messageText)
    } else {
      commit(types.SER_CHARGE, true)
    }
  })
}
//授信额度
export const changeCreditAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updateCreditLine, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAccountAjax')
      commit(types.CHANGE_CREDIT, false)
      showModal(res.messageText)
    } else {
      commit(types.CHANGE_CREDIT, true)
    }
  })
}
//更改阈值
export const updateAlarmLineAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updateAlarmLine, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAccountAjax')
      commit(types.UPDATE_ALARM_LINE, false)
      showModal(res.messageText)
    } else {
      commit(types.UPDATE_ALARM_LINE, true)
    }
  })
}
//定价
export const setProductPriceAjax = ({ commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.setProductPrice, option).then(res => {
    if(res.messageCode === 10000) {
      commit(types.UPDATE_ALARM_LINE, true)
      showModal(res.messageText)
    } else {
      commit(types.UPDATE_ALARM_LINE, false)
    }
  })
}
//绑定服务
export const setServiceAjax = ({dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.bindProduct, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAccountAjax')
      commit(types.SET_SERVICE, false)
      showModal(res.messageText)
    } else {
      commit(types.SET_SERVICE, true)
    }
  })
}
// 变价记录
export const accountPriceRecordAjax = ({ commit }, option = {}) => {
  let opt  = {
    accountId: '',
    productId: '',
    pageNum: 1,
    pageSize: 10
  }
  $http(API.userApi.accountPriceRecord, Object.assign(opt, option)).then(res => {
    commit(types.ACCOUNT_PRICE_RECORD, res.resData.resultList)
    commit(types.ACCOUNT_PRICE_RECORD_LENGTH, res.resData.total)
  })
}
// 取消调价
export const cancelWaitPriceAjax = ({ dispatch, commit },option) => {

  $http(API.userApi.cancelWaitPrice, option).then(res => {
    dispatch('accountPriceRecordAjax')
    commit(types.CANCEL_WAIT_PRICE, false)
    showModal(res.messageText)
  })
}

// 授信记录
export const creditRecordAjax = ({ commit },option = {}) => {
  let opt  = {
    creditType: '0',
    accountId: '',
    pageNum: 1,
    pageSize: 10
  } 
  $http(API.userApi.creditRecord, Object.assign(opt, option)).then(res => {
    commit(types.CREDIT_RECORD, res.resData.resultList)
    commit(types.CREDIT_RECORD_LENGTH, res.resData.total)
  })
}
// 充值记录
export const rechargeRecordAjax = ({ commit },option = {}) => {
  let opt  = {
    accountId: '',
    pageNum: 1,
    pageSize: 10
  } 
  $http(API.userApi.rechargeRecord, Object.assign(opt, option)).then(res => {
    commit(types.RECHARGE_RECORD, res.resData.resultList)
    commit(types.RECHARGE_RECORD_LENGTH, res.resData.total)
  })
}


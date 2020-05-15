/**
 * 操作改变motataio 改变state里面的数据
 */

import * as types from './mutations-types'

const mutations = {
  [types.GET_ALL_COMPANY] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allCompanyList = Object.assign([], newList)
  },
  [types.ADD_NEW_COMPANY] (state, flag) {
    state.addNewCompanyFlag = flag
  },
  [types.GET_ALL_COMPANY_LENGTH] (state, length) {
    state.allCompanyListLength = length
  },
  [types.GET_ALL_ACCOUNT] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allAccountList = Object.assign([], newList)
  },
  [types.ADD_NEW_ACCOUNT] (state, flag) {
    state.addNewAccountFlag = flag
  },
  [types.GET_ALL_ACCOUNT_LENGTH] (state, length) {
    state.allAccountListLength = length
  },
  [types.GET_PRODUCT_PRICE_DETAIL] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.productPriceDetailList = Object.assign([], newList)
  },
  [types.GET_PRODUCT_PRICE_DETAIL_LENGTH] (state, length) {
    state.productPriceDetailListLength = length
  },
  [types.GET_PRODUCT_LIST] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allProductList = newList
  },
  [types.SER_CHARGE] (state, flag) {
    state.setChargeFlag = flag
  },
  [types.CHANGE_CREDIT] (state, flag) {
    state.changCreditFlag = flag
  },
  [types.UPDATE_ALARM_LINE] (state, flag) {
    state.updateAlarmLineFlag = flag
  },
  [types.SET_PRICE] (state, flag) {
    state.updateAlarmLineFlag = flag
  },
  [types.SET_SERVICE] (state, flag) {
    state.setServiceFlag = flag
  },
  [types.ACCOUNT_PRICE_RECORD] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.accountPriceRecordList = newList
  },
  [types.ACCOUNT_PRICE_RECORD_LENGTH] (state, length) {
    state.accountPriceRecordListLength = length
  },
  [types.CANCEL_WAIT_PRICE] (state, flag) {
    state.cancelWaitPriceFlag = flag
  },
  [types.CREDIT_RECORD] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.creditRecordList = newList
  },
  [types.CREDIT_RECORD_LENGTH] (state, length) {
    state.creditRecordLength = length
  },
  [types.RECHARGE_RECORD] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.rechargeRecordList = newList
  },
  [types.RECHARGE_RECORD_LENGTH] (state, length) {
    state.rechargeRecordLength = length
  },
}
export default mutations
/**
 * 操作改变motataio 改变state里面的数据
 */

import * as types from './mutations-types'

const mutations = {
  [types.GET_ALL_PRODUCT] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allProductList = Object.assign([], newList)
  },
  [types.ADD_NEW_PRODUCT] (state, flag) {
    state.addNewProductFlag = flag
  },
  [types.GET_ALL_PRODUCT_LENGTH] (state, length) {
    state.allProductListLength = length
  },
  [types.GET_ALL_CHAEGE_FIELD] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allChargeFiledList = Object.assign([], newList)
  },
  [types.ADD_NEW_CHAEGE_FIELD] (state, flag) {
    state.addNewChargeFiledFlag = flag
  },
  [types.GET_ALL_CHAEGE_FIELD_LENGTH] (state, length) {
    state.allChargeFiledListLength = length
  },
  [types.GET_ALL_TYPE] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allTypeList = Object.assign([], newList)
  },
  [types.ADD_NEW_TYPE] (state, flag) {
    state.addNewTypeFlag = flag
  },
  [types.GET_ALL_TYPE_LENGTH] (state, length) {
    state.allTypeListLength = length
  },
  [types.SET_PRICE_RULES] (state, flag) {
    state.setPriceRuleFlag = flag
  },
  [types.PRODCUT_PRICE_DETAIL] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    console.log(list)
    state.productPriceDetailList = Object.assign([], newList)
  },
  [types.PRODCUT_PRICE_DETAIL_LENGTH] (state, length) {
    state.productPriceDetailLength = length
  },
  [types.ACCOUNT_PRODUCT_SETPRICE_FLAG] (state, flag) {
    state.accountProductSerpriceFlag = flag
  }
}
export default mutations
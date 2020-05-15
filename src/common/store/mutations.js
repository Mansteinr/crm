/**
 * 操作改变motataio 改变state里面的数据
 */

import * as types from './mutations-types'

const mutations = {
  [types.GET_SYSTEMMENU_AJAX_LIST] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.systemMenuList = Object.assign([], newList)
  },
  [types.SET_ACTIVE_MEUN] (state, menuActive) { //左侧标记菜单激活状态
    state.menuActive = menuActive
  },
  [types.SET_HEADER_TABS] (state, list) { //顶部导航卡片
    let newList = JSON.parse(JSON.stringify(state.editableTabs))
    state.editableTabs = [...newList, ...list]
  },
  [types.SET_ACTIVE_HEADER_TAB] (state, currentHeader) { //顶部导航激活卡片
    state.editableTabsValue = currentHeader
  },
  [types.DELETE_HEADER_TAB] (state, list) { //删除导航
    state.editableTabs = [...list]
  },
  [types.GET_VERIFY_CODE] (state, verifyCode) {
    state.verifyCode = verifyCode
  },
  [types.GET_RANDOM] (state, random) {
    state.random = random
  },
  [types.GET_ALL_BASICS_COMPANY] (state, list) {
    state.allBasicCompanyList = [...list]
  },
  [types.GET_ALL_BASICS_PRODUCT] (state, list) {

    state.allBasicProductList = [...[{
      productId: '',
      productName: '全部'
    }], ...list]
  },
  [types.GET_ALL_BASICS_PRODUCTTYPE] (state, list) {
    state.allBasicProductTypeList = [...list]
  },
  [types.GET_ALL_BASICS_LABEL] (state, list) {
    state.allBasicLabelList = [...[{
      labelName: '全部',
      labelId: ''
    }],...list]
  },
  [types.GET_ALL_BASICS_USER] (state, list) {
    state.allBasicUserList = [...[{
      userName: '全部',
      userId: ''
    }], ...list]
  },
  [types.GET_ALL_BASICS_ROLE] (state, list) {
    state.allBasicRoleList = [...[{
      roleName:'全部',
      roleId: ''
    }], ...list]
  },
  [types.GET_ALL_BASICS_ACCOUNT] (state, list) {
    state.allBasicAccountList = [...[{
      accountName: '全部',
      accountId: ''
    }], ...list]
  },
  [types.GET_ALL_BASICS_CHAEGE_FIELD] (state, list) {
    state.allBasicChargeFieldList = [...list]
  },
  [types.GET_NAV_MEUN_LIST] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.navMeunList = Object.assign([], newList)
  }
}
export default mutations
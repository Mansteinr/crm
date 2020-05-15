/**
 * 操作改变motataio 改变state里面的数据
 */

import * as types from './mutations-types'
const mutations = {
  [types.GET_ALL_DEPAERMENT] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.departmentList = Object.assign([], newList)
  },
  [types.ADD_NEW_DEPAERMENT] (state, flag) {
    state.addNewDepartmentFlag = flag
  },
  [types.GET_ALL_MEUN] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allMenuList = Object.assign([], newList)
  },
  [types.GET_ALL_LABEL] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allLabelList = Object.assign([], newList)
  },
  [types.GET_ALL_LABEL_LENGTH] (state, length) {
    state.allLabelListLength = length
  },
  [types.ADD_NEW_LABEL] (state, flag) {
    state.addNewLabelFlag = flag
  },
  [types.GET_ALL_ROLE] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allRoleList = Object.assign([], newList)
  },
  [types.GET_ALL_ROLE_LENGTH] (state, length) {
    state.allRoleListLength = length
  },
  [types.ADD_NEW_ROLE] (state, flag) {
    state.addNewRoleFlag = flag
  },
  [types.GET_ALL_ATTRIBUTE] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allAttributeList = Object.assign([], newList)
  },
  [types.GET_ALL_ATTRIBUTE_LENGTH] (state, length) {
    state.allAttributeListLength = length
  },
  [types.ADD_NEW_ATTRIBUTE] (state, flag) {
    state.addNewAttributeFlag = flag
  },
  [types.GET_ALL_USERINFO] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allUserList = Object.assign([], newList)
  },
  [types.GET_ALL_USERINFO_LENGTH] (state, length) {
    state.allUserListLength = length
  },
  [types.ADD_NEW_USERINFO] (state, flag) {
    state.addNewUserFlag = flag
  },
  [types.MEUN_TREE] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.meunTreeList = Object.assign([], newList)
  },
  [types.ADD_NEW_MEUN] (state, flag) {
    state.addNewMeunFlag = flag
  },
  [types.GET_ALL_APPLICATION] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allApplicationList = Object.assign([], newList)
  },
  [types.GET_ALL_APPLICATION_LENGTH] (state, length) {
    state.allApplicationListLength = length
  },
  [types.ADD_NEW_APPLICATION] (state, flag) {
    state.addNewApplicationFlag = flag
  },
  [types.SET_ACTIVE_MEUN] (state, menuActive) { //左侧标记菜单激活状态
    state.menuActive = menuActive
  },
  [types.SET_HEADER_TABS] (state, list) { //顶部导航卡片
    let newList = JSON.parse(JSON.stringify(list)), oldEditableTabs = JSON.parse(JSON.stringify(state.editableTabs)), flag = false
    if(oldEditableTabs) {
     flag = oldEditableTabs.some(v => {
        return v.name === newList[0].name
      })
    }
    if(flag) return
    state.editableTabs = [...state.editableTabs, ...newList]
  },
  [types.SET_ACTIVE_HEADER_TAB] (state, currentHeader) { //顶部导航激活卡片
    state.editableTabsValue = currentHeader
  },
  [types.DELETE_HEADER_TAB] (state, list) { //删除导航
    state.editableTabs = [...list]
  },
  [types.REST_AUTH] (state, flag) {
    state.resetAuthFormFlag = flag
  },
  [types.BIND_MEUN] (state, flag) {
    state.bindMeunFlag = flag
  },
  [types.DEFAULT_CHECKED_KEYS] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.defaultCheckedKeys = Object.assign([], newList)
  },
  [types.HAS_BIND_MENU] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.hasBindMenuList = Object.assign([], newList)
  }
}
export default mutations
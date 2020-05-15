import { $http } from '@/common/js/ajax'
import * as types from './mutations-types'
import API from '@/config/api'
import { showModal } from '@/common/js/utils'

// 获取所有的部门
export const getAllDepartmentAjax = ({ dispatch, commit }, option) => {
  $http(API.userApi.getAllDepartment, option).then((res) => {
    commit(types.GET_ALL_DEPAERMENT, res.resData)
    dispatch('getAllUsersAjax')
  })
}
//新增部门
export const addNewDepartmentAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.addNewDepartment, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllDepartmentAjax')
      commit(types.ADD_NEW_DEPAERMENT, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_DEPAERMENT, true) 
    }
  })
}

//删除部门
export const deleteDepartmentAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteDepartment}/${id}`, {}).then(res => {
    dispatch('getAllDepartmentAjax')
    showModal(res.messageText)
  })
}

//标签
export const getAllLabelAjax = ({ commit }, options = {
  labelName: '',
  pageNum: 1,
  pageSize: 10
}) => {
  $http(API.userApi.getAllLabels, options).then(res => {
    commit(types.GET_ALL_LABEL, res.resData.resultList)
    commit(types.GET_ALL_LABEL_LENGTH, res.resData.total)
  })
}

export const addNewLabelAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  $http(API.userApi.addNewLabel, options).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllLabelAjax')
      commit(types.ADD_NEW_LABEL, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_LABEL, true) 
    }
  })
}

export const deleteLabelAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteLabel}/${id}`, {}).then((res) => {
    dispatch('getAllLabelAjax')
    showModal(res.messageText)
  })
}

export const updateLabelAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updateLabel, option).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllLabelAjax')
      commit(types.ADD_NEW_LABEL, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_LABEL, true) 
    }
  })
}

//角色
export const getAllRoleAjax = ({ commit }, options = {
  roleName: '',
  pageNum: 1,
  pageSize: 10
}) => {
  
  $http(API.userApi.getAllRole, options).then(res => {
    commit(types.GET_ALL_ROLE, res.resData.resultList)
    commit(types.GET_ALL_ROLE_LENGTH, res.resData.total)
  })
}

export const addNewRoleAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  $http(API.userApi.addNewRole, options).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllRoleAjax')
      commit(types.ADD_NEW_ROLE, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_ROLE, true) 
    }
  })
}

export const deleteRoleAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteRole}/${id}`, {}).then((res) => {
    dispatch('getAllRoleAjax')
    showModal(res.messageText)
  })
}

export const updateRoleAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updeteRole, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllRoleAjax')
      commit(types.ADD_NEW_ROLE, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_ROLE, true) 
    }
  })
}
let defaultCheckedKeys = []
const getDefaultCheckedKeys = (list) => {
  list.forEach(v => {
    if(v.hasBind) {
      defaultCheckedKeys.push(v.id)
    }
    if( v.children ) {
      getDefaultCheckedKeys(v.children)
    }
  })
}

export const hasBindMenuAjax = ({ commit }, option) => {
  defaultCheckedKeys = []
  $http(`${API.userApi.hasBindMenu}/${option}` ).then(res => {
    if(res.messageCode === 10000) {
      getDefaultCheckedKeys(res.resData)
      commit(types.HAS_BIND_MENU, res.resData)
      commit(types.DEFAULT_CHECKED_KEYS, defaultCheckedKeys)
    } 
  })
}

export const bindMenuAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.bindMenu, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllRoleAjax')
      commit(types.BIND_MEUN, false)
      showModal(res.messageText)
    } else {
      commit(types.BIND_MEUN, true)
    }
  })
}




//属性
export const getAllAttributeAjax = ({ commit }, options = {
  configName: '',
  pageNum: 1,
  pageSize: 10
}) => {
  console.log('getAllAttributeAjaxgetAllAttributeAjax')
  $http(API.userApi.getAllAttribute, options).then(res => {
    commit(types.GET_ALL_ATTRIBUTE, res.resData.resultList)
    commit(types.GET_ALL_ATTRIBUTE_LENGTH, res.resData.total)
  })
}

export const addNewAttributeAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  $http(API.userApi.addNewAttribute, options).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAttributeAjax')
      commit(types.ADD_NEW_ATTRIBUTE, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_ATTRIBUTE, true) 
    }
  })
}

export const deleteAttributeAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteAttribute}/${id}`, {}).then(res => {
    dispatch('getAllAttributeAjax')
    showModal(res.messageText)
  })
}

export const updateAttributeAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updeteAttribute, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllAttributeAjax')
      commit(types.ADD_NEW_ATTRIBUTE, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_ATTRIBUTE, true) 
    }
  })
}

//用户
export const getAllUsersAjax = ({ commit, state }, option) => {
  let opt = {
    deptId: state.departmentList[0] ? state.departmentList[0].id : '4234324' ,
    userName: '',
    pageNum: 1,
    pageSize: 10
  }
  $http(API.userApi.getAllUsers, Object.assign(opt, option)).then(res => {
    commit(types.GET_ALL_USERINFO, res.resData.resultList)
    commit(types.GET_ALL_USERINFO_LENGTH, res.resData.total)
  })
}

export const addNewUserAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  $http(API.userApi.addNewUser, options).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllUsersAjax')
      commit(types.ADD_NEW_USERINFO, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_USERINFO, true) 
    }
  })
}

export const deleteUserAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteUser}/${id}`, {}).then(res => {
    dispatch('getAllUsersAjax')
    showModal(res.messageText)
  })
}

export const updateUserAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updateUser, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllUsersAjax')
      commit(types.ADD_NEW_USERINFO, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_USERINFO, true) 
    }
  })
}

export const changeEnableAjax = ({ dispatch }, option) => {
  $http(API.userApi.userEnable, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllUsersAjax')
      showModal(res.messageText)
    }
  })
}
export const resetAuthAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.resetAuth, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllUsersAjax')
      showModal(res.messageText)
      commit(types.REST_AUTH, false) 
    } else {
      commit(types.REST_AUTH, true) 
    }
  })
}


//菜单
export const getMenuTreeAjax = ({ commit, state }, options = {}) => {
  $http(API.userApi.menuTree, {}).then(res => {
    let truePathName = location.pathname ? location.pathname : res.resData[0].href
    commit(types.MEUN_TREE, res.resData)
    commit(types.SET_ACTIVE_MEUN, truePathName)
    commit(types.SET_ACTIVE_HEADER_TAB, truePathName)
    commit(types.SET_HEADER_TABS, [{
      title: options.meta ? options.meta.title : '',
      name: truePathName,
      url: truePathName
    }])
  })
}

export const addNewMenuAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  $http(API.userApi.addNewMenu, options).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getMenuTreeAjax')
      commit(types.ADD_NEW_MEUN, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_MEUN, true) 
    }
  })
}

export const deleteMenuAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteMenu}/${id}`, {}).then((res) => {
    dispatch('getMenuTreeAjax')
    showModal(res.messageText)
  })
}

export const updateMenuAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.updateMenu, option).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getMenuTreeAjax')
      commit(types.ADD_NEW_MEUN, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_MEUN, true) 
    }
  })
}

//应用
export const getAllApplicationAjax = ({ commit }, option) => {
  let opt = {
    userNconfigNameame: '',
    pageNum: 1,
    pageSize: 10
  }
  $http(API.userApi.getAllAppConfig, Object.assign(opt, option)).then(res => {
    commit(types.GET_ALL_APPLICATION, res.resData.resultList)
    commit(types.GET_ALL_APPLICATION_LENGTH, res.resData.total)
  })
}

export const addNewApplicationAjax = ({ dispatch, commit }, options) => {
  options.needErrorData = true
  $http(API.userApi.addAppConfig, options).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllApplicationAjax')
      commit(types.ADD_NEW_APPLICATION, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_APPLICATION, true) 
    }
  })
}

export const deleteApplicationAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.delAppConfig}/${id}`, {}).then(res => {
    dispatch('getAllApplicationAjax')
    showModal(res.messageText)
  })
}

export const updateApplicationAjax = ({ dispatch, commit }, option) => {
  option.needErrorData = true
  delete option.configName
  $http(API.userApi.updateAppConfig, option).then(res => {
    if(res.messageCode === 10000) {
      dispatch('getAllApplicationAjax')
      commit(types.ADD_NEW_APPLICATION, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_APPLICATION, true) 
    }
  })
}

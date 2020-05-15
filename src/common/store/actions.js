import { $http } from '@/common/js/ajax'
import * as types from './mutations-types'
import API from '@/config/api'


// 获取验证码
export const getVerifyCodeAjax = ({ commit } ) => {
  $http(API.base.getVerifyCode, {}).then(res => {
    commit(types.GET_VERIFY_CODE, res.resData.image)
    commit(types.GET_RANDOM, res.resData.random)
  })
}
// 推出登陆
export const doLoginOutAjax = ({ commit }) => {
  $http(API.base.loginOut, {}).then(res => {
    localStorage.removeItem('token')
    window.location.href = window.location.origin + '/Login' // 跳转页面
  })
}
// 获取所有的公司
export const getAllBasicCompanyAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicCompany, {}).then(res => {
    commit(types.GET_ALL_BASICS_COMPANY, res.resData)
  })
}
// 获取所有的产品
export const getAllBasicProductAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicProduct, {}).then(res => {
    commit(types.GET_ALL_BASICS_PRODUCT, res.resData)
  })
}
// 获取所有的产品类型
export const getAllBasicProductTypeAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicProductType, {}).then(res => {
    commit(types.GET_ALL_BASICS_PRODUCTTYPE, res.resData)
  })
}
// 获取所有的标签
export const getAllBasicLabelAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicLabel, {}).then(res => {
    commit(types.GET_ALL_BASICS_LABEL, res.resData)
  })
}
// 获取所有的用户
export const getAllBasicUserAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicUser, {}).then(res => {
    commit(types.GET_ALL_BASICS_USER, res.resData)
  })
}
// 获取所有的角色
export const getAllBasicRoleAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicRole, {}).then(res => {
    commit(types.GET_ALL_BASICS_ROLE, res.resData)
  })
}
// 获取所有的计费字段
export const getAllBasicChargeFieldAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicChargeFiled, {}).then(res => {
    commit(types.GET_ALL_BASICS_CHAEGE_FIELD, res.resData)
  })
}
// 获取所有的计费字段
export const getAllBasicAccountAjax = ({ commit }) => {
  $http(API.userApi.getAllBasicAccount, {}).then(res => {
    commit(types.GET_ALL_BASICS_ACCOUNT, res.resData)
  })
}

//递归遍历实现
let serachTrueTitle = (list, truePathName) => function(){
  for(let i = 0; i < list.length; i++) {
    if(list[i].childResource.length) {
      let result = serachTrueTitle(list[i].childResource, truePathName)()
      if(result) return result
    } else {
      if(list[i].resourceUrl.trim() === truePathName) {
        return list[i].name
      }
    }
  }
}
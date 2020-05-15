import { $http } from '@/common/js/ajax'
import * as types from './mutations-types'
import API from '@/config/api'
import { showModal } from '@/common/js/utils'

//新增新标签
export const addNewProductAjax = ({ dispatch, commit }, options) => {
  $http(API.userApi.addNewProduct, options).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllProductAjax')
      commit(types.ADD_NEW_PRODUCT, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_PRODUCT, true) 
    }
  })
}
//获取所有的标签
export const getAllProductAjax = ({ commit }, options = {
  productName: '',
  pageNum: 1,
  pageSize: 10
}) => {
  $http(API.userApi.getAllProduct, options).then(res => {
    commit(types.GET_ALL_PRODUCT, res.resData.resultList)
    commit(types.GET_ALL_PRODUCT_LENGTH, res.resData.total)
  })
}
//删除标签
export const deleteProductAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteProduct}/${id}`, {}).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllProductAjax')
      showModal(res.messageText)
    } 
  })
}
//编辑标签
export const updateProductAjax = ({ dispatch, commit }, option) => {
  $http(API.userApi.updeteProduct, option).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllProductAjax')
      commit(types.ADD_NEW_PRODUCT, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_PRODUCT, true) 
    }
  })
}

// 新增计费字段
export const addNewChargeFieldAjax = ({ dispatch, commit }, options) => {
  $http(API.userApi.addNewChargeFiled, options).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllChargeFieldAjax')
      commit(types.ADD_NEW_CHAEGE_FIELD, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_CHAEGE_FIELD, true) 
    }
  })
}
// 所有计费字段
export const getAllChargeFieldAjax = ({ commit }, options = {
  fieldName: '',
  pageNum: 1,
  pageSize: 10
}) => {
  $http(API.userApi.getAllChargeFiled, options).then(res => {
    commit(types.GET_ALL_CHAEGE_FIELD, res.resData.resultList)
    commit(types.GET_ALL_CHAEGE_FIELD_LENGTH, res.resData.total)
  })
}
//删除计费字段
export const deleteChargeFieldAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteChargeFiled}/${id}`, {}).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllChargeFieldAjax')
      showModal(res.messageText)
    } 
  })
}
//编辑计费字段
export const updateChargeFieldAjax = ({ dispatch, commit }, option) => {
  $http(API.userApi.updeteChargeFiled, option).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllChargeFieldAjax')
      commit(types.ADD_NEW_CHAEGE_FIELD, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_CHAEGE_FIELD, true) 
    }
  })
}


// 新增类型
export const addNewTypeAjax = ({ dispatch, commit }, options) => {
  $http(API.userApi.addNewType, options).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllTypeAjax')
      commit(types.ADD_NEW_TYPE, false) 
      showModal(`添加${res.messageText}`)
    } else {
      commit(types.ADD_NEW_TYPE, true) 
    }
  })
}
// 所有类型
export const getAllTypeAjax = ({ commit }, options = {
  typeName: '',
  pageNum: 1,
  pageSize: 10
}) => {
  $http(API.userApi.getAllType, options).then(res => {
    if(res.messageCode === 10000) {
      commit(types.GET_ALL_TYPE, res.resData.resultList)
      commit(types.GET_ALL_TYPE_LENGTH, res.resData.total)
    }
  })
}
//删除类型
export const deleteTypeAjax = ({ dispatch }, id) => {
  $http(`${API.userApi.deleteType}/${id}`, {}).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllTypeAjax')
      showModal(res.messageText)
    } 
  })
}
//编辑类型
export const updateTypeAjax = ({ dispatch, commit }, option) => {
  $http(API.userApi.updeteType, option).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllTypeAjax')
      commit(types.ADD_NEW_TYPE, false) 
      showModal(res.messageText)
    } else {
      commit(types.ADD_NEW_TYPE, true) 
    }
  })
}
//定价
export const setProductPriceAjax = ({ dispatch, commit }, option) => {
  $http(API.userApi.setProductPrice, option).then((res) => {
    if(res.messageCode === 10000) {
      dispatch('getAllProductAjax')
      commit(types.SET_PRICE_RULES, false) 
      showModal(res.messageText)
    } else {
      commit(types.SET_PRICE_RULES, true) 
    }
  })
}


//账户已有的产品价格列表
export const productPriceDetailAjax = ({ commit }, option) => {
  let opt = {
    "accountId": "",
    "pageNum": 0,
    "pageSize": 0,
    "productId": ""
  }
  $http(API.userApi.productPriceDetail, Object.assign(opt, option)).then(res => {
    commit(types.PRODCUT_PRICE_DETAIL, res.resData.resultList) 
    commit(types.PRODCUT_PRICE_DETAIL_LENGTH, res.resData.total) 
  })
}

export const accountProductSepriceAjax = ({ commit }, option) => {
  option.needErrorData = true
  $http(API.userApi.setPrice, option).then(res => {
    if(res.messageCode === 10000) {
      commit(types.ACCOUNT_PRODUCT_SETPRICE_FLAG, false)
      showModal(`改价${res.messageText}`)
    }
  })
}
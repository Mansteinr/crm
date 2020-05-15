
import interfaceApi from './interface.json'
/*默认使用协议*/
const protocol = 'http', mode = 'prod',
// const protocol = 'http', mode = process.env.NODE_ENV,
baseConfig = {
  protocols: {
    http: 'http://',
    https: 'https://'
  }
}

/*设置api转换*/
let apiFormat = (api = '', hostkey = 'base', pt = protocol) => {
  return baseConfig.protocols[pt] + interfaceApi[mode][hostkey] + api
}

const api = {
  base: {
    login: apiFormat('crm/auth/login', 'base'), // 登陆
    loginOut: apiFormat('crm/auth/logout'), // 推出登陆
    loginout: apiFormat('logout/ajaxLogout', 'rbacapi', mode === 'prod' ? 'https' : 'http'),
    getVerifyCode: apiFormat('crm/auth/random', 'base'),
    projectchoose: apiFormat('boss2-0-web/rbac-web/choose.html', 'rbacweb', mode === 'prod' ? 'https' : 'http'),
    loginchannel: apiFormat('boss2-0-web/rbac-web/loginChannel.html', 'rbacweb', mode === 'prod' ? 'https' : 'http'),
    imageapi: interfaceApi[mode].imageapi
  },
  userApi: {
    /* 用户管理 */
    getAllDepartment: apiFormat('crm/dept/tree'), // 获取所有的部门
    addNewDepartment: apiFormat('crm/dept/add'), // 新增的部门
    deleteDepartment: apiFormat('crm/dept/del'), // 删除部门
    getAllUsers: apiFormat('crm/user/page'), // 获取所有的用户
    getAllLabels: apiFormat('crm/label/page'), // 获取所有的标签
    addNewLabel: apiFormat('crm/label/add'), // 新增标签
    deleteLabel: apiFormat('crm/label/del'), // 删除标签
    updateLabel: apiFormat('crm/label/update'), // 更新标签
    getAllRole: apiFormat('crm/role/page'), // 获取所有的角色
    addNewRole: apiFormat('crm/role/add'), // 新增角色
    deleteRole: apiFormat('crm/role/del'), // 删除角色
    updeteRole: apiFormat('crm/role/update'), // 更新角色
    addNewProduct: apiFormat('crm/product/add'), // 新增产品
    deleteProduct: apiFormat('crm/product/del'), // 删除产品
    updeteProduct: apiFormat('crm/product/update'), // 更新产品
    getAllProduct: apiFormat('crm/product/page'), // 更新产品
    setProductPrice: apiFormat('crm/product/setProductPrice'), // 设置产品价格信息
    addNewChargeFiled: apiFormat('crm/field/add'), // 新增计费字段
    deleteChargeFiled: apiFormat('crm/field/del'), // 删除计费字段
    updeteChargeFiled: apiFormat('crm/field/update'), // 更新计费字段
    getAllChargeFiled: apiFormat('crm/field/page'), // 更新计费字段
    addNewType: apiFormat('crm/productType/add'), // 新增类型
    deleteType: apiFormat('crm/productType/del'), // 删除类型
    updeteType: apiFormat('crm/productType/update'), // 更新类型
    getAllType: apiFormat('crm/productType/page'), // 更新类型
    addNewCompany: apiFormat('crm/company/add'), // 新增客户
    deleteCompany: apiFormat('crm/company/del'), // 删除客户
    updeteCompany: apiFormat('crm/company/update'), // 更新客户
    getAllCompany: apiFormat('crm/company/page'), // 更新客户
    addNewAccount: apiFormat('crm/account/add'), // 新增账户
    deleteAccount: apiFormat('crm/account/del'), // 删除账户
    updeteAccount: apiFormat('crm/account/update'), // 更新账户
    getAllAccount: apiFormat('crm/account/page'), // 更新账户
    recharge: apiFormat('crm/account/recharge'), // 充值
    updateAlarmLine: apiFormat('crm/account/updateAlarmLine'), // 更新告警额度
    updateCreditLine: apiFormat('crm/account/updateCreditLine'), // 更新授信额度
    addNewAttribute: apiFormat('crm/appConfig/add'), // 新增属性
    deleteAttribute: apiFormat('crm/appConfig/del'), // 删除属性
    updeteAttribute: apiFormat('crm/appConfig/update'), // 更新属性
    getAllAttribute: apiFormat('crm/appConfig/page'), // 更新属性
    getAllBasicCompany: apiFormat('crm/company/all'), // 获取所有的公司名称
    getAllBasicProduct: apiFormat('crm/product/all'), // 获取所有的产品名称
    getAllBasicProductType: apiFormat('crm/productType/all'), // 获取所有的产品类型
    getAllBasicLabel: apiFormat('crm/label/all'), // 获取所有的产品类型
    getAllBasicAccount: apiFormat('crm/account/all'), // 获取所有的产品类型
    getAllBasicUser: apiFormat('crm/user/all'), // 获取所有的产品类型
    getAllBasicRole: apiFormat('crm/role/all'), // 获取所有的角色
    getAllBasicChargeFiled: apiFormat('crm/field/all'), // 获取所有计费字段
    getAllUser: apiFormat('crm/user/page'), // 获取所有分页用户
    deleteUser: apiFormat('crm/user/del'), // 删除用户
    updateUser: apiFormat('crm/user/update'), //更新用户
    addNewUser: apiFormat('crm/user/add'), // 获取所有分页用户
    resetAuth: apiFormat('crm/user/resetAuth'), // 重置用户密码
    userEnable: apiFormat('crm/user/enable'), // 重启用户
    bindProduct: apiFormat('crm/accountProduct/bindProduct'), // 给账号绑定产品
    productList: apiFormat('crm/accountProduct/productList'), // 根据账号获取产品列表
    productPriceDetail: apiFormat('crm/accountProduct/productPriceDetail'), // 账号已绑定产品
    setPrice: apiFormat('crm/accountProduct/setPrice'), // 客户的产品改价
    addNewMenu: apiFormat('crm/menu/add'), // 新增菜单
    deleteMenu: apiFormat('crm/menu/del'), // 删除菜单
    menuTree: apiFormat('crm/menu/tree'), // 获取菜单树信息
    updateMenu: apiFormat('crm/menu/update'), // 更新菜单信息
    addAppConfig: apiFormat('crm/appConfig/add'), // 新增应用配置
    delAppConfig: apiFormat('crm/appConfig/del'), // 删除配置信息
    getAllAppConfig: apiFormat('crm/appConfig/page'), // 分页查询应用配置信息
    updateAppConfig: apiFormat('crm/appConfig/update'), // 更新配置信息
    hasBindMenu: apiFormat('crm/role/hasBindMenu'), // 角色已经绑定的菜单信息
    bindMenu: apiFormat('crm/role/bindMenu'), // 角色已经绑定的菜单信息
    accountPriceRecord: apiFormat('crm/accountProduct/accountPriceRecord'), // 变价记录
    cancelWaitPrice: apiFormat('crm/accountProduct/cancelWaitPrice'), // 取消调价
    creditRecord: apiFormat('crm/account/creditRecord'), // 授信记录
    rechargeRecord: apiFormat('crm/account/rechargeRecord'), // 充值记录
    getAllLogs: apiFormat('crm/log/page'), // 日志查询
  }
}
export default api

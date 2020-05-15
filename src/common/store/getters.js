

// getters支是一个包装器 并不会改变state中的数据

// 验证码
export const random = state => state.random // es6语法简写 ruturn state.menu
export const verifyCode = state => state.verifyCode // es6语法简写 ruturn state.menu

// 菜单列表
// export const systemMenuList = state => [...[], ...state.systemMenuList]
export const menuActive = state => state.menuActive
export const editableTabs = state => [...[], ...state.editableTabs] 
export const editableTabsValue = state => state.editableTabsValue

//所有的客户
export const allBasicCompanyList = state => state.allBasicCompanyList
// 所有的产品
export const allBasicProductList = state => state.allBasicProductList
// 所有的产品类型
export const allBasicProductTypeList = state => state.allBasicProductTypeList
// 所有的标签
export const allBasicLabelList = state => state.allBasicLabelList
// 所有的用户
export const allBasicUserList = state => state.allBasicUserList
// 所有的角色
export const allBasicRoleList = state => state.allBasicRoleList
// 所有的计费字段
export const allBasicChargeFieldList = state => state.allBasicChargeFieldList
// 推出登陆

export const allBasicAccountList = state => state.allBasicAccountList
export const navMeunList = state => state.navMeunList.length > 1 ? state.navMeunList : JSON.parse(localStorage.getItem('userInfo')).menuTrees
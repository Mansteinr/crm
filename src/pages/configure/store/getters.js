

// getters支是一个包装器 并不会改变state中的数据
// 获取所有的部门
export const departmentList = state => [...[], ...state.departmentList]
// 新增部门是否成功
export const addNewDepartmentFlag = state => state.addNewDepartmentFlag

// 标签
export const allLabelList = state => state.allLabelList
export const allLabelListLength = state => state.allLabelListLength
export const addNewLabelFlag = state => state.addNewLabelFlag

// 角色
export const allRoleList = state => state.allRoleList
export const addNewRoleFlag = state => state.addNewRoleFlag
export const allRoleListLength = state => state.allRoleListLength
export const hasBindMenuList = state => state.hasBindMenuList
export const bindMeunFlag = state => state.bindMeunFlag
export const defaultCheckedKeys = state => state.defaultCheckedKeys

// 属性
export const allAttributeList = state => state.allAttributeList
export const addNewAttributeFlag = state => state.addNewAttributeFlag
export const allAttributeListLength = state => state.allAttributeListLength

// 用户
export const allUserList = state => state.allUserList
export const addNewUserFlag = state => state.addNewUserFlag
export const allUserListLength = state => state.allUserListLength
export const resetAuthFormFlag = state => state.resetAuthFormFlag

// 菜单
export const meunTreeList = state => state.meunTreeList
export const addNewMeunFlag = state => state.addNewMeunFlag

// 应用
export const allApplicationList = state => state.allApplicationList
export const addNewApplicationFlag = state => state.addNewApplicationFlag
export const allApplicationListLength = state => state.allApplicationListLength

// 左侧菜单激活状态
export const menuActive = state => state.menuActive
// 头部导航器
export const editableTabs = state => [...[], ...state.editableTabs] 
// 头部导航激活状态
export const editableTabsValue = state => state.editableTabsValue
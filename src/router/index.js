import Vue from 'vue'
import Router from 'vue-router'
// 用户管理
import userInfo from '@/pages/configure/user-info'
// 管理配置
import role from '@/pages/configure/role' // 角色管理
// 菜单管理
import menu from '@/pages/configure/menu' // 角色管理
// 标签
import label from '@/pages/configure/label' // 标签
// 产品管理
import productManagement from '@/pages/product/product-management'
// 计费字段
import chargingField from '@/pages/product/charging-field' 
// 类型管理
import type from '@/pages/product/type' 
// 客户管理
import company from '@/pages/customer/company' 
// 授信记录
import creditRecord from '@/pages/customer/credit-record' 
// 充值记录
import rechargeRecord from '@/pages/customer/recharge-record' 
// 账户管理
import account from '@/pages/customer/account' 
// 价格管理
import price from '@/pages/customer/price' 
// 应用配置
import application from '@/pages/configure/application' 
// 客户产品
import productPrice from '@/pages/product/product-price' 
// 日志
import Logs from '@/pages/tools/logs'
// 应用配置P
import NotFound from '@/pages/NotFound' 

import Login from '@/pages/Login'
import Demo from '@/pages/demo'
import Main from '@/pages/Main'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/Login',
    name: 'Login',
    component: Login
    }, {
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: '/userInfo',
      name: '/userInfo',
      component: userInfo,
      meta: {
        title: '用户信息'
      }
    }, {
      path: '/role',
      name: '/role',
      component: role,
      meta: {
        title: '角色管理'
      }
    }, {
      path: '/menu',
      name: '/menu',
      component: menu,
      meta: {
        title: '菜单管理'
      }
    }, {
      path: '/label',
      name: '/label',
      component: label,
      meta: {
        title: '标签管理'
      }
    }, {
      path: '/productManagement',
      name: '/productManagement',
      component: productManagement,
      meta: {
        title: '产品管理'
      }
    }, {
      path: '/chargingField',
      name: '/chargingField',
      component: chargingField,
      meta: {
        title: '计费字段管理'
      }
    }, {
      path: '/type',
      name: '/type',
      component: type,
      meta: {
        title: '类型管理'
      }
    }, {
      path: '/company',
      name: '/company',
      component: company,
      meta: {
        title: '公司管理'
      }
    }, {
      path: '/account',
      name: '/account',
      component: account,
      meta: {
        title: '账户管理'
      }
    }, {
      path: '/price',
      name: '/price',
      component: price,
      meta: {
        title: '调价记录'
      }
    }, {
      path: '/application',
      name: '/application',
      component: application,
      meta: {
        title: '配置项管理'
      }
    }, {
      path: '/creditRecord',
      name: '/creditRecord',
      component: creditRecord,
      meta: {
        title: '授信记录'
      }
    }, {
      path: '/rechargeRecord',
      name: '/rechargeRecord',
      component: rechargeRecord,
      meta: {
        title: '充值记录'
      }
    }, {
      path: '/productPrice',
      name: '/productPrice',
      component: productPrice,
      meta: {
        title: '产品价格'
      }
    }, {
      path: '/productPrice',
      name: '/productPrice',
      component: productPrice,
      meta: {
        title: '产品价格'
      }
    }, {
      path: '/Demo',
      name: 'Demo',
      component: Demo,
      meta: {
        title: 'demo'
      }
    },  {
      path: '/Logs',
      name: 'Logs',
      component: Logs,
      meta: {
        title: 'demo'
      }
    }, {
      path:'*',
      component:NotFound
    }
  ]}
]
})
export default router
// 这是根Store
import Vue from 'vue'
import Vuex from 'vuex'
// 基础性
import basics from '@/common/store'

// 配置管理
import configureModule from '@/pages/configure/store'
// 产品管理
import productModule from '@/pages/product/store'
// 客户管理
import customerModule from '@/pages/customer/store'
// 日志
import logsModule from '@/pages/tools/store'

import createLogger from 'vuex/dist/logger' // 通过mutations修改state的时候 在控制台打印相关的修改记录

Vue.use(Vuex) // 注册vuex插件

// debug调试工具， NODE_ENV在调用webpack编译的时候 如果运行npm run dev则是dev环境
const debug = process.env.NODE_ENV !== 'prod'

export default new Vuex.Store({ // 导出Store的实例
  modules: {
    basics,
    configureModule,
    productModule,
    customerModule,
    logsModule,
  },
  strict: false, // 开启严格模式 可以帮助检测state的修改，是不是通过mutations去修改，否则会报错 开启时候性能会损耗，所以线上不建议使用
  plugins: debug ? [createLogger()] : []
})

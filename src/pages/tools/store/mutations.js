/**
 * 操作改变motataio 改变state里面的数据
 */

import * as types from './mutations-types'

const mutations = {
  [types.GET_ALL_LOGS] (state, list) {
    let newList = JSON.parse(JSON.stringify(list))
    state.allLogsList = Object.assign([], newList)
  },
  [types.GET_ALL_LOGS_LENGTH] (state, length) {
    state.allLogsListLength = length
  }
}
export default mutations
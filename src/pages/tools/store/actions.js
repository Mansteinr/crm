import { $http } from '@/common/js/ajax'
import * as types from './mutations-types'
import API from '@/config/api'

//新增新标签
export const getAllLogsAjax = ({ commit }, options) => {
  $http(API.userApi.getAllLogs, Object.assign({
    pageNum: 1,
    module: '',
    pageSize: 10
  }, options)).then((res) => {
    commit(types.GET_ALL_LOGS, res.resData.resultList)
    commit(types.GET_ALL_LOGS_LENGTH, res.resData.total)
  })
}

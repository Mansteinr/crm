
import axios from 'axios'
import loading from '@/components/loading'
import { showModal } from '@/common/js/utils'
import localData from '@/config/localData.js'

const RESPONSE_CODE = 10000, // 返回成功
      INVALID_CODE = 10002 // 失效

      
console.log(localData)
export function $http (url, data, method = 'post', responseType = 'json') {
  loading.show()
  let options = {
    method: method,
    url: url,
    responseType: responseType,
    headers: {
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  if (method === 'post') { // get post 方法兼容
    options = Object.assign(options, {data: data})
  } else {
    options = Object.assign(options, {params: data})
  }
  // return new Promise((resolve, reject) => {
   return axios(options).then(res => {
      if (res.data.messageCode === RESPONSE_CODE) { // 成功并且返回码为1
        resolve(res.data)
      } else if (responseType === 'blob') {
        resolve(res.data)
      } else { // 返回吗 不为10000
        showModal(res.data.messageText, 'warning')
        if (res.data.messageCode  === INVALID_CODE) { // 若没有登录 则强制到登录页面
          localStorage.removeItem('token')
          window.location.href = window.location.origin + '/Login' // 跳转页面
        } else {
          if(options.needErrorData) {
            resolve(res.data)
          }
        }
      }
      loading.hide()
    }).catch(err => { // 错误
      reject(err)
      loading.hide()
      showModal('网络有问题', 'warning')
    })
  // })
}

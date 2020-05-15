/* eslint-disable */  //不需要eslint语法检测
import { Message } from 'element-ui'

// 弹框
export function showModal (text = '操作成功', type = 'success') {
  Message({
    message: text,
    type: type,
    center: true
  })
}
// 保留两位小数
export function toFixed (val, len = 2) {
  return Math.round(val * Math.pow(10, len)) / Math.pow(10, len)
}

// 是否为空
export function checkNull (val) {
   if (!val || val == "" || val == '--') {
	return false
  } else if (typeof val === "object") {
    for (var prop in val) {
      return true
    }
    return false
  }
  return true
}

/*格式化时间*/
export const formaterTime = (timestamp, format = 'yyyy-mm-dd') => {
  //format:  "yyyy-m-d h:i:s.S","yyyy年mm月dd日 hh:ii:ss"  default: "yyyy-mm-dd"
  let obj = parseInt(timestamp), date = new Date(obj),
    data = {
      "m+": date.getMonth() + 1,                 //月   
      "d+": date.getDate(),                    //日   
      "h+": date.getHours(),                   //小时   
      "i+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds()             //毫秒   
    }
  if (/(y+)/.test(format)) {  // date.getFullYear() + ""  转为字符串
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (let k in data) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (data[k]) : (("00" + data[k]).substring(("" + data[k]).length)))
    }
  }
  
  return format
}

export const isValidIP = (ip) => {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

export const isValidMoney = (money) => {
  let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
  return reg.test(money)
}
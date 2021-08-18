import { message } from '@dx/xbee'
import axios from 'axios'

import { API_SERVER, API_USER_INFO } from '@constants'
import { param, isPlainObject, compact } from './lang'

axios.defaults.baseURL = API_SERVER
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

const messageMap = {
  'request error': '请求失败，请稍后重试',
  'Network Error': '网络出错，请检查您的网络状况',
  'Request failed with status code 502': '服务器出小差了，请稍后重试',
}
const loginIgnoreList = [API_USER_INFO]

function handleLoginExpire() {
  message.error('登录已失效，请重新登录')
  location.reload()
}

export default function request(config = {}) {
  config = Object.assign(
    {
      // catchError为自定义配置，是否捕获错误
      catchError: true,
      // 是否返回整个response data，默认返回接口里的data字段
      returnResponseData: false,
      withCredentials: true,
      timeout: 30 * 1000,
    },
    config,
  )

  const ret = axios(config).then(response => {
    const { success, code, data, msg } = response.data

    if (success) {
      return config.returnResponseData ? response.data : data
    } else if (code === 403) {
      // 未登录时，系统一开始获取用户信息是正常调用
      if (loginIgnoreList.indexOf(config.url) === -1) {
        handleLoginExpire()
      }
    } else {
      throw new Error(msg || '请求失败')
    }
  })

  if (config.catchError) {
    return ret.catch(err => {
      message.error(messageMap[err.message] || err.message)
    })
  }

  return ret
}

// https://github.com/axios/axios/blob/master/lib/core/Axios.js
export function get(url, params = {}, config = {}) {
  return request(
    Object.assign(config, {
      method: 'get',
      url,
      params: compact(params),
    }),
  )
}

export function post(url, data, config = {}) {
  if (isPlainObject(data)) {
    data = param(compact(data))
  }

  return request(
    Object.assign(config, {
      method: 'post',
      url,
      data,
    }),
  )
}

export function jsonPost(url, data = {}, config = {}) {
  return request(
    Object.assign(config, {
      method: 'post',
      url,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }),
  )
}

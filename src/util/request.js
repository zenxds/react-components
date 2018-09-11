import axios from 'axios'

export default function request(config={}) {
  config = Object.assign({
    withCredentials: true,
    timeout: 30 * 1000
  }, config)

  return axios(config).then((response) => {
    const { success, data, msg } = response.data || {}

    if (success) {
      return data
    } else {
      throw new Error(msg || 'request error')
    }
  })
}

// https://github.com/axios/axios/blob/master/lib/core/Axios.js
export function get(url, config={}) {
  return request(Object.assign(config, {
    method: 'get',
    url
  }))
}

export function post(url, data, config={}) {
  return request(Object.assign(config, {
    method: 'post',
    url,
    data
  }))
}

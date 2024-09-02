/* eslint-disable no-unused-expressions */
import Configuration from '@/configuration'
import axios from 'axios'
import qs from 'qs'
import { useUser } from '@/stores/user'
import { getToken } from '@core/utils/auth'
import useNotify from '@/hooks/useNotify'
import useLogout from '@/hooks/useLogout'

const defaultRequestInterceptors = (config) => {
  const storeUser = useUser()
  if (config.method === 'post' && (config.headers)['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }
  if (config.method === 'get' && config.params) {
    let url = config.url
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== undefined && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
  if (storeUser.token) {
    config.headers['X-Token'] = getToken()
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
};
(error) => {
  console.log(error)
  Promise.reject(error)
}

export const handleError = (error) => {
  const { response } = error
  const { notifyAPIError } = useNotify()
  if (response) {
    return Promise.reject(error)
  }

  // can not receive response
  // 請求過時或者是斷網
  if (!window.navigator.onLine) {
    notifyAPIError({ message: '網絡有些問題。請重新加載' })
  } else {
    // maybe Program have some problem
    return Promise.reject(error)
  }
}

export const handleAuthError = async (error) => {
  const { status } = error.response
  if (status !== 401) return Promise.reject(error)
  const { resetStore } = useLogout()
  resetStore()
  return Promise.reject(error)
}

export const handleResponse = async (response) => {
  return Promise.resolve(response)
}

// create an axios instance
const service = axios.create({
  baseURL: `${Configuration('backendHost')}`, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
})

// request interceptor
service.interceptors.request.use(defaultRequestInterceptors)

service.interceptors.response.use(
  handleResponse,
  handleError,
)

service.interceptors.response.use(
  handleResponse,
  handleAuthError,
)

export default service

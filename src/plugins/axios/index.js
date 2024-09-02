import axios from 'axios'
import { getToken } from '@core/utils/auth'
import configuration from '@/configuration'

const $axios = axios.create({
  baseURL: configuration('backendHost'),
  timeout: 5000,
})

export const $axiosPublic = axios.create({
  baseURL: configuration('backendHost'),
  timeout: 5000,
})

$axios.interceptors.request.use((config) => {
  if (!getToken()) return config
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})

export default function (app) {
}

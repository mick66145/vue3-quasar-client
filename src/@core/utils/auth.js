import Cookies from 'js-cookie'

const TokenKey = 'Client-Frontend-Token'
const LineAccessTokenKey = 'Client-Frontend-Line-Access-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getLineAccessToken () {
  return Cookies.get(LineAccessTokenKey)
}

export function setLineAccessToken (token) {
  return Cookies.set(LineAccessTokenKey, token)
}

export function removeLineAccessToken () {
  return Cookies.remove(LineAccessTokenKey)
}

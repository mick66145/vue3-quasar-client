const KEY_TOEKN = '$app_token'

export default {
  getToken () {
    return localStorage.getItem(KEY_TOEKN)
  },
  setToken (token) {
    localStorage.setItem(KEY_TOEKN, token)
  },
}

import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@core/utils/auth'
import useNotify from '@/hooks/useNotify'
import { AuthResource } from '@core/modules/auth/api'

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    info: '',
    socialiteProvider: {
      token: '',
      provider: '',
      other: {
        id_token: null,
        code: null,
        code_token: null,
        phone: null,
        phone_country: 'TW',
      },
    },
    permissionList: [],
    authResource: AuthResource({}),
  }),
  getters: {
    isLogin: state => !!state.token,
  },
  actions: {

    login (payload) {
      return new Promise((resolve, reject) => {
        this.authResource.login({ payload })
          .then(res => {
            const { data } = res
            this.setToken(data.token)
            resolve(res)
          }).catch(error => {
            const message = error.response.data.message
            notifyAPIError({ message: message })
            reject(error)
          })
      })
    },
    register (payload) {
      /* 如果有註冊的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   this.authResource.register({payload})
      //     .then(res => {
      //       resolve(res)
      //     }).catch(error => {
      //       const message = error.response.data.message
      //       notifyAPIError({ message: message })
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        resolve(true)
      })
    },
    forgetPassword (payload) {
      /* 如果有忘記密碼的api就使用以下註解 */
      // return this.authResource.forgetPassword({payload})
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    getVerifyCode (payload) {
      /* 如果有取得驗證碼的api就使用以下註解 */
      // return this.authResource.getVerifyCode({payload})
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    getLoginCaptcha (payload) {
      /* 如果有登入驗證碼的api就使用以下註解 */
      // return this.authResource.getLoginCaptcha({payload})
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    bindCheck (payload) {
      /* 如果有檢查綁定的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   this.authResource.bindCheck({ payload })
      //     .then(res => {
      //       resolve(res)
      //     }).catch(error => {
      //       const message = error.response.data.message
      //       notifyAPIError({ message: message })
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    bind (payload) {
      /* 如果有綁定的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   this.authResource.bind({ payload })
      //     .then(res => {
      //       const { data } = res
      //       this.setToken(data.token)
      //       resolve(res)
      //     }).catch(error => {
      //       const message = error.response.data.message
      //       notifyAPIError({ message: message })
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    unbind (payload) {
      /* 如果有綁定的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   this.authResource.unbind({payload})
      //     .then(res => {
      //       resolve(res)
      //     }).catch(error => {
      //       const message = error.response.data.message
      //       notifyAPIError({ message: message })
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    whoami () {
      /* 如果有Me的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   this.authResource.me()
      //     .then(res => {
      //       if (!res) {
      //         reject(new Error('Verification failed, please Login again.'))
      //       }
      //       this.info = { ...res }
      //       resolve(res)
      //     }).catch(error => {
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        this.info = { }
        resolve(true)
      })
    },

    permission () {
      /* 如果有權限的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   this.authResource.permission()
      //     .then(res => {
      //       const { list } = res
      //       this.permissionList = list.map(permission => { return permission.name })
      //       resolve()
      //     }).catch(error => {
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    profile (payload) {
      return this.authResource.profile({ payload })
    },

    changePassword (payload) {
      return this.authResource.changePassword({ payload })
    },

    logout () {
      /* 如果有登出的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   return this.authResource.logout().then(res => {
      //     this.clear()
      //     resolve()
      //   })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
      this.clear()
    },

    refreshToken (payload) {
      return this.authResource.refreshToken({ payload })
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },

    setToken (token) {
      setToken(token)
      this.token = token
    },

    setSocialiteProvider (socialiteProvider) {
      this.socialiteProvider = socialiteProvider
    },

    clear () {
      this.token = ''
      removeToken()
      this.$reset()
    },
  },

})

const { notifyAPIError } = useNotify()

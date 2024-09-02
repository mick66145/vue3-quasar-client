import request from '@core/utils/request'

export const AuthResource = ({
  uri = 'auth'
}) => {

  const login = ({params}) => {
    return request({
      url: `/${uri}/login`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const register = ({params}) => {
    return request({
      url: `/${uri}/register`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const forgetPassword = ({params}) => {
    return request({
      url: `/${uri}/forget_password`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const getVerifyCode = ({params}) => {
    return request({
      url: `/${uri}/verify_code`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const getLoginCaptcha = ({query}) => {
    return request({
      url: `/${uri}/login_captcha`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => res.data)
  }

  const logout = () => {
    return request({
      url: `/${uri}/logout`,
      method: 'post',
    })
  }

  const bindCheck = ({params}) => {
    return request({
      url: `/${uri}/bind/action/check`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const bind = ({params}) => {
    return request({
      url: `/${uri}/bind`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const unbind = ({params}) => {
    return request({
      url: `/${uri}/unbind`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const me = () => {
    return request({
      url: `/${uri}/me`,
      method: 'get',
    }).then(res => res.data)
      .then(res => {
        const meObj = new baseModules.Me({
          ...res.data,
        })
        return meObj
      })
  }

  const profile = ({params}) => {
    return request({
      url: `/${uri}/me`,
      method: 'patch',
      data: params,
    }).then(res => res.data)
  }

  const permission = () => {
    return request({
      url: `/${uri}/me/permission`,
      method: 'get',
    }).then(res => res.data)
      .then(res => {
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return {
            list: list,
          }
        }
      })
  }

  const changePassword = ({params}) => {
    return request({
      url: `/${uri}/change_password`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const refreshToken = ({params}) => {
    return request({
      url: `/${uri}/refresh_token`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  return {
    login,
    register,
    forgetPassword,
    getVerifyCode,
    getLoginCaptcha,
    logout,
    bindCheck,
    bind,
    unbind,
    me,
    profile,
    permission,
    changePassword,
    refreshToken,
  }
}
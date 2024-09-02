const config = {
  backendHost: '$VITE_APP_BACKEND_HOST',
  fileServerHost: '$VITE_APP_FILE_SERVER_HOST',
  lineClientId: '$VITE_APP_LINE_CLIENT_ID',
  lineClientSecret: '$VITE_APP_LINE_CLIENT_SECRET',
  lineRedirectUri: '$VITE_APP_LINE_REDIRECT_URI',
  googleClientId: '$VITE_APP_GOOGLE_CLIENT_ID',
  googleClientSecret: '$VITE_APP_GOOGLE_CLIENT_SECRET',
  googleRedirectUri: '$VITE_APP_GOOGLE_REDIRECT_URI',
  facebookClientId: '$VITE_APP_FACEBOOK_CLIENT_ID',
  facebookClientSecret: '$VITE_APP_FACEBOOK_CLIENT_SECRET',
  facebookRedirectUri: '$VITE_APP_FACEBOOK_REDIRECT_URI',
}

// 代入與替換
export default (name) => {
  if (!(name in config)) {
    return
  }

  const value = config[name]
  if (!value) {
    return
  }

  // 搜尋前綴為 $VITE_APP_ 開頭的Value 並代入替換 .env 對應的值
  if (value.startsWith('$VITE_')) {
    const envName = value.substr(1)
    const envValue = import.meta.env[envName]

    if (envValue) {
      return envValue
    }
    return ''
  } else {
    return value
  }
}

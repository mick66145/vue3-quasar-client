import { ref, computed } from 'vue-demi'
import request from '@core/utils/request'
import Configuration from '@/configuration'

export default function useLine ({
  channelId = Configuration('lineClientId'),
  channelSecret = Configuration('lineClientSecret'),
  redirectUri = Configuration('lineRedirectUri'),
  scope = 'profile openid email',
}) {
  // data
  const urlParams = ref(new URLSearchParams(window.location.search))

  // computed
  const isRedirect = computed(() => {
    const code = urlParams.value.get('code')
    return code !== null
  })
  // methods
  const oauth2 = () => {
    const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=123&scope=${scope}`
    location.href = loginUrl
  }
  const oauth2Token = async () => {
    const code = urlParams.value.get('code')
    if (code) {
      try {
        const response = await request({
          url: 'https://api.line.me/oauth2/v2.1/token',
          method: 'post',
          withCredentials: false,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            grant_type: 'authorization_code',
            code: code,
            client_id: channelId,
            client_secret: channelSecret,
            redirect_uri: redirectUri,
          },
        })
        const { access_token: accessToken, id_token: idToken } = response.data
        return { accessToken, idToken }
      } catch (error) {}
    }
  }

  const share = () => {
    window.open('line://msg/text/' + encodeURIComponent(window.location.href))
  }
  return {
    isRedirect,
    oauth2,
    oauth2Token,
    share,
  }
}

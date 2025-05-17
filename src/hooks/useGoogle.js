import { ref, computed } from 'vue-demi'
import request from '@core/utils/request'
import Configuration from '@/configuration'

export default function useGoogle ({
  channelId = Configuration('googleClientId'),
  channelSecret = Configuration('googleClientSecret'),
  redirectUri = Configuration('googleRedirectUri'),
  state = '',
  scope = 'profile+email',
}) {
  // data
  const urlParams = ref(new URLSearchParams(window.location.search))

  // computed
  const isRedirect = computed(() => {
    const code = urlParams.value.get('code')
    return code !== null
  })
  const redirectState = computed(() => {
    const state = urlParams.value.get('state')
    if (!state) return null
    const params = new URLSearchParams(state)
    return Object.fromEntries(params.entries())
  })

  // methods
  const oauth2 = () => {
    const oauth2Url = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`
    location.href = oauth2Url
  }

  const oauth2Token = async () => {
    const code = urlParams.value.get('code')
    if (code) {
      try {
        const response = await request({
          url: 'https://oauth2.googleapis.com/token',
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
    window.open(
      'https://plus.google.com/share?url=' + encodeURIComponent(window.location.href),
      'googleplus-share-dialog',
      'width=500,height=500',
    )
  }
  return {
    isRedirect,
    redirectState,
    oauth2,
    oauth2Token,
    share,
  }
}

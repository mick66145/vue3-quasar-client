import { ref, computed } from 'vue-demi'
import request from '@core/utils/request'
import Configuration from '@/configuration'

export default function useFacebook ({
  channelId = Configuration('facebookClientId'),
  channelSecret = Configuration('facebookClientSecret'),
  redirectUri = Configuration('facebookRedirectUri'),
  scope = 'profile+email',
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
    const oauth2Url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${channelId}&redirect_uri=${redirectUri}`
    location.href = oauth2Url
  }

  const oauth2Token = async () => {
    const code = urlParams.value.get('code')
    if (code) {
      try {
        const response = await request({
          url: 'https://graph.facebook.com/v19.0/oauth/access_token',
          method: 'post',
          withCredentials: false,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
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
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href),
      'facebook-share-dialog',
      'width=626,height=436',
    )
  }
  return {
    isRedirect,
    oauth2,
    oauth2Token,
    share,
  }
}

<template>
  <div>
    <base-button
      v-if="! useIconStyle"
      color="white"
      text-color="black"
      :outline="outline"
      :rounded="rounded"
      :label="buttonLabel"
      @click="handleClick"
    />
    <q-icon v-else class="cursor-pointer" size="3rem" @click="handleClick">
      <img src="@/assets/images/socialite-images/circle-facebook.svg">
    </q-icon>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue-demi'
import { toReactive } from '@vueuse/core'
import Configuration from '@/configuration'
import { i18n } from '@/plugins/i18n'
import useFacebook from '@/hooks/useFacebook'
import useLoading from '@/hooks/useLoading'

export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    channelId: { type: String, default: Configuration('facebookClientId') },
    channelSecret: { type: String, default: Configuration('facebookClientSecret') },
    redirectUri: { type: String, default: Configuration('facebookRedirectUri') },
    state: { type: String, default: '' },
    scope: { type: String, default: 'profile openid email' },
    useIconStyle: { type: Boolean, default: false },
    action: { type: String, default: 'oauth2' }, // oauth2,share
  },
  emits: ['handleSuccess'],
  setup (props, { emit }) {
    // data
    const { label, channelId, channelSecret, redirectUri, state, scope } = toReactive(props)

    // computed
    const buttonLabel = computed(() => {
      return label || i18n.global.t('g.btn.facebook')
    })

    // mounted
    onMounted(async () => {
      if (isRedirect.value) {
        showLoading({})
        const { accessToken, idToken } = await oauth2Token()
        hideLoading()
        emit('handleSuccess', { accessToken, idToken })
      }
    })

    // methods
    const handleClick = () => {
      const actionObj = {
        oauth2: () => { oauth2() },
        share: () => { share() },
      }
      actionObj[props.action]()
    }

    // use
    const { isRedirect, oauth2, share, oauth2Token } = useFacebook({
      channelId: channelId,
      channelSecret: channelSecret,
      redirectUri: redirectUri,
      state: state.value,
      scope: scope,
    })
    const { showLoading, hideLoading } = useLoading({})

    return {
      buttonLabel,
      handleClick,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

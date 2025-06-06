<template>
  <div>
    <base-button
      v-if="! useIconStyle"
      color="positive"
      :outline="outline"
      :rounded="rounded"
      :label="buttonLabel"
      @click="handleClick"
    />
    <q-icon v-else class="cursor-pointer" size="3rem" @click="handleClick">
      <img src="@/assets/images/socialite-images/circle-line.svg">
    </q-icon>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, toRefs } from 'vue-demi'
import Configuration from '@/configuration'
import { i18n } from '@/plugins/i18n'
import useLine from '@/hooks/useLine'
import useLoading from '@/hooks/useLoading'

export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    channelId: { type: String, default: Configuration('lineClientId') },
    channelSecret: { type: String, default: Configuration('lineClientSecret') },
    redirectUri: { type: String, default: Configuration('lineRedirectUri') },
    state: { type: String, default: '' },
    scope: { type: String, default: 'profile openid email' },
    useIconStyle: { type: Boolean, default: false },
    action: { type: String, default: 'oauth2' }, // oauth2,share
  },
  emits: ['handleSuccess'],
  setup (props, { emit }) {
    // data
    const { label, channelId, channelSecret, redirectUri, state, scope } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.line')
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
    const { isRedirect, oauth2, share, oauth2Token } = useLine({
      channelId: channelId.value,
      channelSecret: channelSecret.value,
      redirectUri: redirectUri.value,
      state: state.value,
      scope: scope.value,
    })
    const { showLoading, hideLoading } = useLoading({})

    return {
      buttonLabel,
      handleClick,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>

<template>
  <span />
</template>

<script>

import { defineComponent, reactive, onMounted } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import useLine from '@/hooks/useLine'
import useGoogle from '@/hooks/useGoogle'
import useLoading from '@/hooks/useLoading'
import useCRUD from '@/hooks/useCRUD'

export default defineComponent({
  setup () {
    // data
    const router = useRouter()
    const store = useUser()
    const formData = reactive({
      token: '',
      provider: '',
      other: {
        id_token: '',
        phone: '',
      },
    })

    // mounted
    onMounted(async () => {
      const { isRedirect } = handleRedirect()
      if (isRedirect.value) {
        const { accessToken, idToken } = await handleGetToken()
        formData.provider = getProvider()
        formData.token = accessToken
        formData.other.id_token = idToken
        const [res, err] = await callBindCheckFetch({ ...formData })
        if (err) {}
        if (res) bind()
      }
    })

    // methods
    const bindCheckFetch = async (payload) => {
      return await store.bindCheck(payload)
    }
    const bindFetch = async (payload) => {
      return await store.bind(payload)
    }
    const handleRedirect = () => {
      switch (getProvider()) {
      case 'line':{
        const { isRedirect } = useLine({})
        return { isRedirect }
      }
      case 'google':{
        const { isRedirect } = useGoogle({})
        return { isRedirect }
      }
      }
    }
    const handleGetToken = async () => {
      const getToken = async () => {
        switch (getProvider()) {
        case 'line':{
          const { oauth2Token } = useLine({})
          const { accessToken, idToken } = await oauth2Token()
          return { accessToken, idToken }
        }
        case 'google':{
          const { oauth2Token } = useGoogle({})
          const { accessToken, idToken } = await oauth2Token()
          return { accessToken, idToken }
        }
        }
      }
      showLoading({})
      const { accessToken, idToken } = await getToken()
      hideLoading()
      return { accessToken, idToken }
    }
    const bind = async () => {
      const urlObj = {
        bind: () => { return callBindFetch({ ...formData }) },
      }
      const [res] = await urlObj.bind()
      if (res) { router.push({ name: 'MemberCenter' }) } else { router.push({ name: 'Login' }) }
    }
    const getProvider = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const provider = urlParams.get('provider')
      return provider
    }

    // use
    const { callCreateFetch: callBindCheckFetch } = useCRUD({
      isShowCreateSuccess: false,
      isShowCreateFail: false,
      createFetch: bindCheckFetch,
    })
    const { callCreateFetch: callBindFetch } = useCRUD({
      isShowCreateSuccess: false,
      createFetch: bindFetch,
    })
    const { showLoading, hideLoading } = useLoading({})
    return {
      formData,
      bind,
    }
  },
})
</script>
<style lang="postcss" scoped></style>

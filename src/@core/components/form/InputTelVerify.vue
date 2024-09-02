<template>
  <input-tel
    v-model="observeValue"
    :label="label"
    :placeholder="placeholder"
  >
    <template #after>
      <base-button label="獲取驗證碼" @click="getVerifyCode" />
    </template>
  </input-tel>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import { useVModel, toReactive } from '@vueuse/core'
import { useUser } from '@/stores/user'
import useNotify from '@/hooks/useNotify'
import useCRUD from '@/hooks/useCRUD'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    label: { type: String, default: '手機號碼' },
    placeholder: { type: String, default: '請輸入手機號碼' },
    verifyCodeType: { type: String },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const store = useUser()
    const { verifyCodeType } = toReactive(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const token = ref()

    // methods
    const getVerifyCodeFetch = async (payload) => {
      return await store.getVerifyCode(payload)
    }
    const getVerifyCode = async () => {
      if (!observeValue.value) return notifyError({ message: '請先填寫手機才能獲取驗證碼' })
      const payload = { type: verifyCodeType, phone: observeValue.value }
      const [res] = await callGetVerifyCodeFetch(payload)
      if (res) {
        const { token: codeToken } = res.data
        token.value = codeToken
      }
    }
    const getToken = () => {
      return token.value
    }

    // use
    const { callCreateFetch: callGetVerifyCodeFetch } = useCRUD({
      createSuccess: '取得驗證碼成功',
      createFetch: getVerifyCodeFetch,
    })
    const { notifyError } = useNotify()

    return {
      observeValue,
      emit,
      getVerifyCode,
      getToken,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
    <div :class="esignCol" v-if="!observeValue">
      <esign
        class="shadow-1"
        ref="esign"
        :width="width"
        :height="height"
      />
    </div>
    <div :class="imageCol" v-else>
      <base-image class="w-full" fit="fill" :height="imageHeight" :width="imageWidth" :src="uploadPreview" />
    </div>
    <div :class="actionCol">
      <div class="flex h-full text-center">
        <template v-if="!observeValue">
          <confirm-flat-button @click="confirm" />
          <delete-flat-button label="清空" @click="reset" />
        </template>
        <base-flat-button v-else label="重新產生" @click="regenerate" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref , reactive , computed } from "vue-demi";
import useImgStorage from '@/hooks/useImgStorage'

export default defineComponent({
  props: {
    modelValue: { type: [Object, File, String] },
    width: { type: Number, default: 800 },
    height: { type: [Number, String], default: 400 },
    esignCol: { type: String, default: 'col-12 col-md-10' },
    imageCol: { type: String, default: 'col-12 col-md-6 col-lg-6 col-xl-10' },
    actionCol: { type: String, default: 'col-12 col-md-2' },
    imageWidth: { type: [Number, String]},
    imageHeight: { type: [Number, String], default: '200px' },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // data
    const esign = ref();
    const state = reactive({
      image: '',
    })
    
    // computed
    const observeValue = computed({
      get () {
        state.image = props.modelValue
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      },
    })
    const uploadPreview = computed(() => {
      const { blobURL, url, base64 , filename } = state.image || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
      return getImageSrc({ filename, size: '200x' })
    })

    // methods
    const confirm = async () => {
      const base64 = await esign.value.generateAsBase();
      setImage(null,null,base64)
    };
    const reset = () => {
      esign.value.reset();
    };
    const regenerate = () => {
      emit("update:modelValue", null);
    };
    const setImage = (blobURL, file, base64) => {
      state.image = {
        blobURL: blobURL,
        raw: file,
        base64: base64,
      }
      const { image } = state
      observeValue.value = { ...image }
    }

    // use
    const { getImageSrc } = useImgStorage()
    
    return {
      esign,
      observeValue,
      uploadPreview,
      confirm,
      reset,
      regenerate,
    };
  },
});
</script>

<style lang="postcss" scoped></style>

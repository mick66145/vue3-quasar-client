<template>
  <video
    id="video-player"
    class="video-js vjs-default-skin"
  />
</template>

<script>
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'

export default defineComponent({
  props: {
    id: { type: String, default: 'video-player' },
    url: { type: String },
    type: { type: String },
  },
  setup (props) {
    // data
    const myPlayer = ref()
    const { url } = toRefs(props)

    onMounted(() => {
      initVideoSource()
    })

    const initVideoSource = () => {
      myPlayer.value = videojs('video-player', {
        controls: true, // 是否顯示控制條
        preload: 'auto',
        autoplay: false,
        fluid: true, // 自適應寬高
        language: 'zh-TW', // 設置語言
        muted: false, // 是否靜音
        inactivityTimeout: false,
        controlBar: { // 設置控制條組件
          children: [
            { name: 'playToggle' }, // 播放按鈕
            { name: 'currentTimeDisplay' }, // 當前已播放時間
            { name: 'progressControl' }, // 播放進度條
            { name: 'durationDisplay' }, // 總時間
            {
              name: 'volumePanel', // 音量控制
              inline: false, // 不使用水平方式
            },
            { name: 'FullscreenToggle' }, // 全屏
          ],
        },
        sources: [
          {
            src: url.value,
            type: 'application/x-mpegURL',
          },
        ],
      })
    }

    return {
      myPlayer,
    }
  },
})

</script>

<style lang="postcss" scoped></style>

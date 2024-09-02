<template>
  <div class="adv-stencil" :style="stencilStyle">
    <draggable-element
      class="circle-stencil__handler"
      @drag="onResize"
      @drag-end="onResizeEnd"
    >
      <div class="bg-func-focus h-2 w-2" />
    </draggable-element>
    <draggable-area @move="onMove" @move-end="onMoveEnd">
      <stencil-preview
        class=""
        :image="image"
        :coordinates="coordinates"
        :width="stencilCoordinates.width"
        :height="stencilCoordinates.height"
        :transitions="transitions"
      />
    </draggable-area>
  </div>
</template>

<script setup>
import {
  StencilPreview,
  DraggableElement,
  DraggableArea,
  ResizeEvent,
} from 'vue-advanced-cropper'

import { computed } from 'vue-demi'

const props = defineProps({

  image: {
    type: Object,
  },
  coordinates: {
    type: Object,
  },
  transitions: {
    type: Object,
  },
  stencilCoordinates: {
    type: Object,
  },
})

const emits = defineEmits(['move', 'move-end', 'resize', 'resize-end'])

const stencilStyle = computed(() => {
  const { height, width, left, top } = props.stencilCoordinates
  return {
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${left}px, ${top}px)`,
  }
})

const aspectRatios = () => {
  return {
    minimum: 1,
    maximum: 1,
  }
}

const onMove = (moveEvent) => {
  emits('move', moveEvent)
}

const onMoveEnd = () => {
  emits('move-end')
}

const onResize = (dragEvent) => {
  const shift = dragEvent.shift()
  const widthResize = shift.leftz
  const heightResize = -shift.top
  emits('resize', new ResizeEvent(
    {
      left: widthResize,
      right: widthResize,
      top: heightResize,
      bottom: heightResize,
    },
    {
      compensate: true,
    },
  ))
}

const onResizeEnd = () => {
  emits('resize-end')
}
</script>

<style lang="scss">
.adv-stencil {
  @apply border border-white overflow-hidden;
}
</style>

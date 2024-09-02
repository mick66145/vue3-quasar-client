<template>
  <div class="image-cropper">
    <cropper
      ref="cropper"
      :src="source"
      :style="{ 'border-radius': '10px' }"
      :stencil-props="{
        aspectRatio,
        handlersClasses,
        linesClasses
      }"
      :stencil-component="stencilComponent"
      image-restriction="none"
    />
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { defineComponent, computed, ref } from 'vue-demi'

export default defineComponent({
  components: {
    Cropper,
  },
  props: {
    source: { type: [Object, String] },
    aspectRatio: { type: Number, default: 1 },
  },
  emits: ['crop', 'cancel'],
  setup (props, { emit }) {
    // data
    const cropper = ref(null)
    const handlersClasses = ref({
      default: 'my-handler',
      hover: 'my-handler--hover',
      eastNorth: 'my-handler--east-north',
      north: 'my-handler--north',
      westNorth: 'my-handler--west-north',
      west: 'my-handler--west',
      westSouth: 'my-handler--west-south',
      south: 'my-handler--south',
      eastSouth: 'my-handler--east-south',
      east: 'my-handler--east',
    })
    const linesClasses = ref({
      default: 'my-line',
    })

    // computed
    const stencilComponent = computed(() => {
      // return AdvStencil
      return undefined
    })

    const stencilCoordinates = computed(() => {
      if (!cropper.value) return {}
      return cropper.value.stencilCoordinates
    })

    const xUnit = computed(() => {
      const { width = 0 } = stencilCoordinates.value
      return width / 3 + 'px'
    })

    const yUnit = computed(() => {
      const { height = 0 } = stencilCoordinates.value
      return height / 3 + 'px'
    })

    // methods
    const getResult = async () => {
      return cropper.value.getResult()
    }

    return {
      cropper,
      handlersClasses,
      linesClasses,
      stencilComponent,
      stencilCoordinates,
      xUnit,
      yUnit,
      getResult,
    }
  },
})

</script>

<style lang="postcss">
.image-cropper {
  --x-unit: v-bind("xUnit");
  --y-unit: v-bind("yUnit");
  .my-handler {
    @apply border-func-focus border-4;
    @apply bg-transparent;
    @apply transform;
  }
  .my-handler--east,
  .my-handler--west,
  .my-handler--north,
  .my-handler--south {
    @apply border-none;
  }
  .my-handler--west-north {
    @apply border-b-0 border-r-0;
    @apply translate-x-1/2 translate-y-1/2;
    @apply w-[30px];
  }
  .my-handler--east-north {
    @apply border-b-0 border-l-0;
    @apply -translate-x-1/2 translate-y-1/2;
    @apply w-[30px];
  }
  .my-handler--west-south {
    @apply border-t-0 border-r-0;
    @apply translate-x-1/2 -translate-y-1/2;
    @apply w-[30px];
  }
  .my-handler--east-south {
    @apply border-t-0 border-l-0;
    @apply -translate-x-1/2 -translate-y-1/2;
    @apply w-[30px];
  }
  .my-line {
    @apply bg-func-focus;
  }
  .vue-rectangle-stencil {
    @apply relative;
    &::before,
    &::after {
      @apply content-[""];
      @apply bg-func-focus;
      @apply absolute;
    }
    &::before {
      top: 0;
      left: var(--x-unit);

      @apply h-full w-[1px];
      @apply z-10;

      box-shadow: var(--x-unit) 0 0 0 var(--color-func-focus);

      @apply shadow-func-focus;
    }
    &::after {
      @apply h-[1px] w-full;

      top: var(--y-unit);
      left: 0;
      box-shadow: 0 var(--y-unit) 0 0 var(--color-func-focus);
    }
  }
}
</style>

<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  setup() {
    return {
    }
  },
})
</script>

<style lang="scss">
@import "@/styles/abstracts/quasar-variables";
</style>
<style lang="postcss" scoped>
$container-padding: 20px;
.container,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
}

@media (max-width: $breakpoint-xs-max) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 100%;
  }
}

@media (min-width: $breakpoint-sm-min) {
  .container,
  .container-sm {
    max-width: $breakpoint-xs - $container-padding;
  }
}

@media (min-width: $breakpoint-md-min) {
  .container,
  .container-sm,
  .container-md {
    max-width: $breakpoint-sm - $container-padding;
  }
}

@media (min-width: $breakpoint-lg-min) {
  .container,
  .container-sm,
  .container-md,
  .container-lg {
    max-width: $breakpoint-md - $container-padding;
  }
}

@media (min-width: $breakpoint-xl-min) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: $breakpoint-lg - $container-padding;
  }
}

@media (min-width: $breakpoint-xxl-min) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl,
  .container-xxl {
    max-width: $breakpoint-xl - $container-padding;
  }
}

@media screen and (width >=1600px) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl,
  .container-xxl {
    max-width: 1560px;
  }
}

@media screen and (width >=1800px) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl,
  .container-xxl {
    max-width: 1850px;
  }
}
</style>

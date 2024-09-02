<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          class="pic-404__parent"
          src="@/assets/images/404-images/404.png"
          alt="404"
        >
        <img
          class="left pic-404__child"
          src="@/assets/images/404-images/404-cloud.png"
          alt="404"
        >
        <img
          class="mid pic-404__child"
          src="@/assets/images/404-images/404-cloud.png"
          alt="404"
        >
        <img
          class="right pic-404__child"
          src="@/assets/images/404-images/404-cloud.png"
          alt="404"
        >
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline" />
        <div class="bullshit__info">
          Please check that the URL you entered is correct, or click the button
          below to return to the homepage.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({})
</script>

<style lang="postcss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;

  @apply absolute;
}
.wscn-http404 {
  @apply py-0 px-[20px] md:px-[50px] w-full md:w-[1200px] relative overflow-hidden;
}
.pic-404 {
  @apply w-full md:w-[600px] relative float-none md:float-left overflow-hidden;
  &__parent {
    @apply w-full;
  }
  &__child {
    @apply absolute opacity-0;
    &.left {
      @apply top-[10px] md:top-[17px] left-[60px] md:left-[220px] w-[60px] md:w-[80px];

      animation: cloudLeft 2s linear 1s forwards;
    }
    &.mid {
      @apply top-[5px] md:top-[10px] left-[120px] md:left-[420px] w-[36px] md:w-[46px];

      animation: cloudMid 2s linear 1.2s forwards;
    }
    &.right {
      @apply top-[50px] md:top-[100px] left-[180px] md:left-[500px] w-[42px] md:w-[62px];

      animation: cloudRight 2s linear 1s forwards;
    }
  }
}
.bullshit {
  @apply relative float-none md:float-left overflow-hidden py-[30px] px-0 w-full md:w-[300px] text-center md:text-left;
  &__oops {
    @apply font-bold text-[24px] md:text-[32px] leading-[30px] md:leading-[40px] mb-[15px] md:mb-[20px] text-blue-500 opacity-0;

    animation: slideUp 0.5s forwards;
  }
  &__headline {
    @apply font-bold text-[18px] md:text-[20px] leading-[22px] md:leading-[24px] mb-[8px] md:mb-[10px] text-slate-900 opacity-0;

    animation: slideUp 0.5s 0.1s forwards;
  }
  &__info {
    @apply text-[12px] md:text-[13px] leading-[18px] md:leading-[21px] mb-[20px] md:mb-[30px] text-gray-400 opacity-0;

    animation: slideUp 0.5s 0.2s forwards;
  }
  &__return-home {
    @apply h-[30px] md:h-[36px] w-[90px] md:w-[110px] block mx-auto md:mx-0 float-none md:float-left bg-blue-500 rounded-full text-white text-center text-[14px] leading-[30px] md:leading-[36px] cursor-pointer opacity-0;

    animation: slideUp 0.5s 0.3s forwards;
  }

  @keyframes slideUp {
    0% {
      transform: translateY(60px);

      @apply opacity-0;
    }
    100% {
      transform: translateY(0);

      @apply opacity-100;
    }
  }
}

@keyframes cloudLeft {
  0% {
    @apply opacity-0 top-[10px] md:top-[17px] left-[60px] md:left-[220px];
  }
  20% {
    @apply opacity-100 top-[20px] md:top-[33px] left-[50px] md:left-[188px];
  }
  80% {
    @apply opacity-100 top-[40px] md:top-[81px] left-[20px] md:left-[92px];
  }
  100% {
    @apply opacity-0 top-[50px] md:top-[97px] left-[10px] md:left-[60px];
  }
}

@keyframes cloudMid {
  0% {
    @apply opacity-0 top-[5px] md:top-[10px] left-[120px] md:left-[420px];
  }
  20% {
    @apply opacity-100 top-[20px] md:top-[40px] left-[100px] md:left-[360px];
  }
  70% {
    @apply opacity-100 top-[60px] md:top-[130px] left-[60px] md:left-[180px];
  }
  100% {
    @apply opacity-0 top-[80px] md:top-[160px] left-[40px] md:left-[120px];
  }
}

@keyframes cloudRight {
  0% {
    @apply opacity-0 top-[50px] md:top-[100px] left-[180px] md:left-[500px];
  }
  20% {
    @apply opacity-100 top-[60px] md:top-[120px] left-[160px] md:left-[460px];
  }
  80% {
    @apply opacity-100 top-[90px] md:top-[180px] left-[120px] md:left-[340px];
  }
  100% {
    @apply opacity-0 top-[100px] md:top-[200px] left-[100px] md:left-[300px];
  }
}
</style>

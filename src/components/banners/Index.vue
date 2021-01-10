<template>
  <div class="content">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in banners" :key="banner">
          <img :src="banner"/>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from 'vue'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default defineComponent({
  props: {
    banners: {
      type: Array as PropType<Array<string>>
    }
  },
  setup () {
    onMounted(() => {
      const newSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        effect: 'coverflow',
        slidesPerView: 2,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2,
          slideShadows: true
        }
      })
    })
  }
})
</script>

<style lang="scss" scoped>
.content {
  .swiper-container {
    width: 100%;
    height: auto;
    margin: 20px auto;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }

    /deep/.swiper-pagination-bullet {
      width: 6px;
      height: 6px;
    }
  }

  --swiper-theme-color: #ec4141; /* 设置 Swiper风格 */
  --swiper-navigation-color: #eee; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 16px; /* 设置按钮大小 */
}
</style>

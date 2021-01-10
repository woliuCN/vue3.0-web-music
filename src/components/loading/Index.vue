<template>
  <div v-if="show" class="loading">
    <div></div>
    <div></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'loading',
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  }
})
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%, -50%);

  > div {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ed4141;
    border-radius: 50%;
    opacity: 0.6;
    animation: loading 1.5s ease-in infinite;

    &:nth-child(2) {
      animation-delay: -0.8s;
    }
  }
}

@keyframes loading {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>

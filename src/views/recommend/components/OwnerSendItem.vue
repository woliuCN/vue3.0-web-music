<template>
  <div class="ownersend-item">
    <div class="item-top">
      <img
        :src="ownerSendItem.picUrl"
      />
      <div class="img-decorate">
        <i className="iconfont icon-play"></i>
      </div>
    </div>
    <p class="item-bottom">{{ownerSendItem.name}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    ownerSendItem: {
      type: Object as PropType<OwnerSendItem>,
      default: {}
    }
  }
})
</script>

<style lang="scss" scoped>
.ownersend-item {
  flex: 0 0 32%;
  cursor: pointer;

  .item-top {
    position: relative;
    width: 100%;

    > img {
      width: 100%;
      border-radius: 4px;
    }

    .img-decorate {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      background: rgba(18, 18, 18, 0.32);
      border: 1px solid #bebebe;
      border-radius: 50%;

      .icon-play {
        position: relative;
        top: -2px;
        left: 2px;
        font-size: 12px;
      }
    }
  }

  .item-bottom {
    height: 42px;
    font-size: 14px;
    line-height: 1.5;
    @include multipleNoWrap(2);
  }
}
</style>

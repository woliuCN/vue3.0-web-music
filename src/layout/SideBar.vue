<template>
  <div class="sidebar">
    <ul class="sidebar-menu">
      <li class="sidebar-menu_item active">发现音乐</li>
      <li class="sidebar-menu_item">视频</li>
      <li class="sidebar-menu_item">朋友</li>
      <li class="sidebar-menu_item">直播</li>
      <li class="sidebar-menu_item">私人FM</li>
    </ul>
    <h1 class="sidebar-title">我的音乐</h1>
    <ul class="sidebar-menu">
      <li class="sidebar-menu_item">
        <i class="iconfont icon-local-music"></i
        ><span class="name">本地音乐</span>
      </li>
      <li class="sidebar-menu_item">
        <i class="iconfont icon-download"></i><span class="name">下载管理</span>
      </li>
      <li class="sidebar-menu_item">
        <i class="iconfont icon-cloud"></i
        ><span class="name">我的音乐云盘</span>
      </li>
      <li class="sidebar-menu_item">
        <i class="iconfont icon-collect"></i><span class="name">我的收藏</span>
      </li>
    </ul>
    <h1 class="sidebar-title">创建的歌单</h1>
    <ul class="sidebar-menu">
      <li class="sidebar-menu_item">
        <i class="iconfont icon-like"></i><span class="name">我喜欢的音乐</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  width: $sidebar-width;
  padding: 10px;
  border-right: 1px solid #efefef;
  box-sizing: border-box;

  .sidebar-menu {
    .sidebar-menu_item {
      display: flex;
      height: 36px;
      padding-left: 8px;
      margin-bottom: 2px;
      font-size: 15px;
      line-height: 36px;
      color: #444;
      cursor: pointer;
      border-radius: 4px;
      align-items: center;

      .iconfont {
        font-size: 18px;
        color: #000;
        flex: 0 0 25px;
      }

      &:hover {
        background: rgb(246, 246, 247);
      }

      &.active {
        font-size: 18px;
        font-weight: bold;
        background: rgb(246, 246, 247);
      }
    }
  }

  .sidebar-title {
    padding: 10px;
    font-size: 13px;
    color: rgb(166, 166, 166);
  }
}
</style>

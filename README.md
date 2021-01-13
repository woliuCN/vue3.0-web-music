# Vue 仿网易云音乐客户端


## 项目整体结构与部分演示

### 基本结构

![结构](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fec9a43df5b74986a97ae98f2d1ab286~tplv-k3u1fbpfcp-watermark.image)


### 1、推荐模块与歌单相关模块部分

![歌单](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49109820b77d4c6fb82a5962054fcfef~tplv-k3u1fbpfcp-watermark.image)
    
### 2、歌手模块、排行榜与最新音乐部分

![歌手](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e026820685a64f15ac77da24336e9c1d~tplv-k3u1fbpfcp-watermark.image)
 
### 3、榜单与播放器部分

![播放器](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de4c5b11310848f28bba4572a23bb6da~tplv-k3u1fbpfcp-watermark.image)


### 4、搜索与视频相关部分

![搜索](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7109eeec91094b968964751fde5d0213~tplv-k3u1fbpfcp-watermark.image)


## 使用步骤

### 后台
1. [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)拉下代码，按照其说明跑起来即可

### 前端
1. 拉下代码后，如果想换成自己相关的歌曲榜单内容，需要先跑后端代码(一般为3000端口)，去[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)找到登录接口`/login/cellphone`，手机或者其他方式登录后，将生成cookie，将其复制到`/src/api/request.ts`文件的COOKIE即可
2. 跑项目
    ```
    npm install

    npm run serve
    ```



**参考链接**
- [vue3.0中文官网](https://www.vue3js.cn/docs/zh/)
- [让你30分钟快速掌握vue 3](https://juejin.cn/post/6887359442354962445)
- [快速使用Vue3最新的15个常用API](https://juejin.cn/post/6897030228867022856)
- [🚨万字警告 了不起的Vue3（上）](https://juejin.cn/post/6898120355781705736)
- [Element-plus](https://github.com/element-plus)

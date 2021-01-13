# Vue 仿网易云音乐客户端


## 使用步骤

### 后台
1. 去gitHub上[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)拉下代码，按照其说明跑起来即可

### 前端
1. 拉下代码后，如果想换成自己相关的歌曲榜单内容，需要先跑后端代码(一般为3000端口)，去[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)找到登录接口`/login/cellphone`，手机或者其他方式登录后，将生成cookie，将其复制到`/src/api/request.ts`文件的COOKIE即可
2. 跑项目
    ```
    npm install

    npm run serve
    ```


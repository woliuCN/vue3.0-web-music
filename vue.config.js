const path = require('path')

module.exports = {
  publicPath: './',
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        // 配置sass-resources定义全局css变量
        prependData: '@import "@/assets/css/_variables.scss";'
      },
      css: {
        // 定义命名规则，name对应的是文件名，第二个就是你局部样式的名称(如果有的话)，第三个就是根据算法自动生成的哈希值
        modules: {
          localIdentName: '[name]-[local]-[hash:8]'
        },
        localsConvention: 'camelCaseOnly'
      }
    },
    // CSS Modules 导入 预处理文件 无需加module
    requireModuleExtension: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.ts', '.tsx', '.js', '.vue']
    },
    devtool: 'source-map'
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ]
}

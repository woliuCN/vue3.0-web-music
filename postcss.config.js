module.exports = {
  plugins: [require('postcss-plugin-px2rem')({
    // 1rem 等于多少px 默认是1rem 等于100px
    // 这个值要根据你设计稿与根元素的自适应设置而定
    rootValue: 128,
    unitPrecision: 8,
    // 白名单，默认空数组不启用 匹配正则
    propWhiteList: [],
    // 黑名单，默认空数组不启用 匹配正则
    propBlackList: [],
    // 排除的目录 支持正则
    exclude: false,
    // 要忽略并保留为px的选择器
    selectorBlackList: [],
    ignoreIdentifier: false,
    replace: true,
    // 允许在媒体查询中转换px
    mediaQuery: false,
    // 设置要替换的最小像素值(1px会被转rem) 默认 0
    minPixelValue: 2
  })]
}

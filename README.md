# okrt-web

## 要求

- 脚手架基本配置

  - 统一字体
  - 支持骨架屏
    `page-skeleton-webpack-plugin + page-web-skeleton(谷歌)`
  - 打包速度快
    `npm i speed-measure-webpack-plugin -D // 打包速度分析`
    `hard-source-webpack-plugin`
    `thread-loader`
  - eventBus
    `Vue.prototype.$bus = new Vue()`
  - 明确打包环境
    - 开发，测试，线上 通过环境变量
  - 打包分析
    `build -- report`
  - 代码压缩
    `npm i -D compression-webpack-plugin@6.1.1`
    `nginx开启gzip这样就可以拿到压缩过后的文件`
  - 性能优秀
    <!-- 代码压缩，图片压缩，代码分包，代码分割 -->
  - 代码类型校验
  - 冗余校验
  <!-- cnpm install uglifyjs-webpack-plugin --save-dev -->
  - 无效代码校验
  - 重复代码校验
  - 模块划分明确，
  - 路由/文件匹配
  - 路由模块划分明确
  - 公共组件类型划分（弹窗/全局功能/公用组件）
  - iconfont 库
  - 路由切换过度样式
    `npm add nprogress`
  - 样式一致
    `npm install normalize.css -save`
  - 404 配置
  - 通用函数库按需加载 lodash
    `yarn add lodash-webpack-plugin babel-plugin-lodash --dev`
  - 图表按需加载
    `resize-detector`
    `npm install echarts --save`
  - mock 封装
  - 统一输出工具库
    `utils`
  - 统一封装指令

  # UI-vuetify 配置

  1.  安装 vuetify(vue-cli 安装法)
      `vue add vuetify`
  2.  按需加载
      ``
  3.  全局样式
      `less`
  4.  pc 多屏适配
      `common.css`

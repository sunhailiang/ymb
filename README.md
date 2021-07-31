# okr 运维平台

## 分支管理

> 分支对应：
> master，release，dev[n]，分别是线上，发布，开发。
> 类型说明：
> master：主分支，每次上线后并且没问题，最终代码会合到 master
> release.n：发布分支，也可以做预发布
> dev.n : 开发分支，开发完分支首先合并到该分支，提测
> 开发类型：

1.  功能块开发：该类型当以每个功能块为维度，拉分支
2.  线上 bug：该类型当以热更新状态为维度，拉分支
3.  优化问题: 该类型除紧急情况外，以时间维度拉一个分支

> 分支来源：
> master
> 分支命名场景：

1. 线上 bug
   命名方式：
   hotfix/日期/bug 描述/功能模块名称/姓名全拼
   例子：
   如登录错误: hotfix/20210419/login-error/user/sunhailiang
2. 周期内功能优化
   命名方式：
   优化版本号/日期/姓名全拼
   例子：
   本周内以优化为主 ：v1.8.1/20210419/sunhailiang
3. 新增功能
   命名方式：
   开始日期/kpi/姓名全拼
   例子：
   如果绩效模块：20210419/kpi/sunhailaing

> 开发完成后
> 1、将代码合并到 dev，然后发布测试环境
> 2、测试通过后如果要发版，则在云效提交合并请求，请求通过后代码会合并到 release 版本
> 3、release 通过后，提交合并请求到 master
> 4、发布正式环境：备份，发布

## 要求

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

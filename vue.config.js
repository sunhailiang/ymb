const CompressionPlugin = require('compression-webpack-plugin') // 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉打印，注释等多余代码
const { HashedModuleIdsPlugin } = require('webpack') // 只打包改变的文件
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin') // 按需加载lodash
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 开启构建缓存机制

const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
module.exports = {
  productionSourceMap: false,
  publicPath: './',
  outputDir: process.env.outputDir, // 生成文件的目录名称
  parallel: require('os').cpus().length > 1, // cpu大于1格式开启多线程打包
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 这个里面就是公共css的地址
        path.resolve(__dirname, 'src/assets/styles/common.less')
      ]
    }
  },
  configureWebpack: (config) => {
    const plugins = []
    // 打包生产时生效
    if (isProd) {
      plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: new RegExp('.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            parallel: true,
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 1000 * 60,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 1000 * 500,
        // 生成文件的最大体积
        maxAssetSize: 1000 * 1000,
        // 只给出 js 文件的性能提示
        assetFilter: (assetFilename) => {
          return assetFilename.endsWith('.js')
        }
      }
      config.optimization = {
        splitChunks: {
          // 分割代码块
          cacheGroups: {
            vendor: {
              // 第三方库抽离
              chunks: 'all',
              test: /node_modules/,
              name: 'vendor',
              minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数
              maxInitialRequests: 5,
              minSize: 0, // 大于0个字节
              priority: 100 // 权重
            },
            common: {
              // 公用模块抽离
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数
              maxInitialRequests: 5,
              minSize: 0, // 大于0个字节
              priority: 60
            },
            styles: {
              // 样式抽离
              name: 'styles',
              test: /\.(sa|sc|c|le)ss$/,
              chunks: 'all',
              enforce: true
            },
            runtimeChunk: {
              name: 'manifest'
            }
          }
        }
      }
    }
    // 通用
    plugins.push(new HashedModuleIdsPlugin())
    // 开启构建缓存，除了首次构建，开发时热刷新速度飞快
    plugins.push(new HardSourceWebpackPlugin())

    config.plugins = [...config.plugins, ...plugins]
  },

  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()

    // thread-loader
    config.module
      .rule('js')
      .test(/\.js$/)
      .use('thread-loader')
      .loader('thread-loader')
      .options({
        workers: 4,
        workerParallelJobs: 50,
        poolTimeout: 2000,
        poolParallelJobs: 50
      })
      .end()
    // eslint
    config.module.rule('eslint').use('eslint-loader')
    // 按需加载lodash
    if (process.env.NODE_ENV === 'production') {
      config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())
    }
  },
  // devServer: {
  //   disableHostCheck: true,
  //   proxy: {
  //     '/index.php': {
  //       target: 'http://106.55.173.177:8081/',
  //       pathRewrite: { '^/index.php': '' },
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
  transpileDependencies: ['vuetify']
  // 公共代码抽离
}

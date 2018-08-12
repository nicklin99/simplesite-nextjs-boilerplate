/**
 * 主要对样式进行配置
 * components 组件局部样式，css modules
 * styles 全局样式，难免会用到 normalize.css
 */
const path = require('path')
const langs = require('./packages/lang')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

const _cssLoaderOptions = {
  importLoaders: 1,
  localIdentName: "[local]_[hash:base64:5]",
}

const exportPathMap = function(defaultPathMap) {
  return getLangsPages(langs)
}

const isProd = process.env.NODE_ENV === 'production'

const config = {
  exportPathMap,
  assetPrefix: isProd ? '/out' : ''
}

const cssConfig = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        lessLoaderOptions = {}
      } = nextConfig
      // Support the user providing their own instance of ExtractTextPlugin.
      // If extractCSSPlugin is not defined we pass the same instance of ExtractTextPlugin to all css related modules
      // So that they compile to the same file in production
      let extractCSSPlugin =
        nextConfig.extractCSSPlugin || options.extractCSSPlugin

      if (!extractCSSPlugin) {
        extractCSSPlugin = new ExtractTextPlugin({
          filename: 'static/style.css',
          
        })
        config.plugins.push(extractCSSPlugin)
        options.extractCSSPlugin = extractCSSPlugin
        if (!isServer) {
          config = commonsChunkConfig(config, /\.less$/)
        }
      }

      options.defaultLoaders.less = cssLoaderConfig(config, extractCSSPlugin, {
        cssModules,
        cssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ]
      })

      config.module.rules.push({
        test: /\.less$/,
        use: options.defaultLoaders.less,
        include: path.resolve(__dirname, 'styles')
      })

      config.module.rules.push({
        test: /\.less$/,
        use: cssLoaderConfig(config, extractCSSPlugin, {
          cssModules: true,
          cssLoaderOptions: _cssLoaderOptions,
          dev,
          isServer,
          loaders: [
            {
              loader: 'less-loader',
              options: lessLoaderOptions
            }
          ]
        }),
        exclude: path.resolve(__dirname, 'styles')
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}

module.exports = cssConfig(config)

/* eslint-disable */
const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([
  [
    withAntdLess({
      // optional
      // modifyVars: { '@primary-color': '#04f' },
      // optional
      lessVarsFilePath: './src/styles/antd-custom.less',
      // optional https://github.com/webpack-contrib/css-loader#object
      cssLoaderOptions: {},

      // Other Config Here...

      webpack(config) {
        return config
      },
    }),
  ],
  [withBundleAnalyzer],
  // your other plugins here
])

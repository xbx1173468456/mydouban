const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '',
  productionSourceMap: false,
  devServer: {
    before: app => {}
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('base', resolve('src/base'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('store', resolve('src/store'))
  }
}

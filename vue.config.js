const path = require('path')
const px2rem = require('postcss-px2rem')
// 配置postcs-px2rem
const postcss = px2rem({
  remUnit: 37.5   //基准大小 baseSize，需要和rem.js中单位rem值占比一样相同
})

function resolve (dir) {
  return path.join(__dirname,  dir)
}
module.exports = {
  // 配置vue-cli3中使用template：默认3中是运行是没有编译的，需要配置该属性  或者使用render函数
  runtimeCompiler:true,
  // webpack的配置,配置简写引入
  configureWebpack:{
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        // 设置文件查找路径，可简写文件查找路径
        '@': resolve('src'),
      }
    }
  },
  lintOnSave: false,
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  // 配置代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: { //路径重写
          '^/api': '', // rewrite path
        }
      }
    }
  }
}
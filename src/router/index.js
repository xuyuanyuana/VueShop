import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
// 使用VueRouter
Vue.use(VueRouter)

// 创建路由器，是一个构造函数
export default new VueRouter({
  routes
})
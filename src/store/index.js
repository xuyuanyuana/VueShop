import Vuex from 'vuex'
import Vue from 'vue'

import shop from './shop-store'
import msite from './msite'
Vue.use(Vuex)

// 创建sotre对象，通过Vuex的Store构造函数
export default new Vuex.Store({
  modules:{
    shop,
    msite
  }
})
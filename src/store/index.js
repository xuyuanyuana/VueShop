import Vuex from 'vuex'
import Vue from 'vue'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

// 创建sotre对象，通过Vuex的Store构造函数
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
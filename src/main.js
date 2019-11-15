import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import './vee-vaildate'
import { Button } from 'mint-ui'
import './mock/mock'
import CartControl from './components/cartControl/CartControl.vue'

import * as API from './api'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$API = API
Vue.component(Button.name,Button)
Vue.component('CartControl',CartControl)
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,   //注册路由
  store  //注册使用vuex
})

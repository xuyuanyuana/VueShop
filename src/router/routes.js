import Msite from '../pages/msite/Msite.vue'
import Search from '../pages/search/Search.vue'
import Order from '../pages/order/Order.vue'
import Mine from '../pages/mine/Mine.vue'
import Login from '../pages/login/Login.vue'
import MsLogin from '../pages/msg-login/MsgLogin.vue'
import PwdLogin from '../pages/pwd-login/PwdLogin.vue'
export default [
  {
    path: '/msite',
    component: Msite
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/mine',
    component: Mine
  },
  {
    path: '/login',
    component: Login,
    children: [
      {
        path: '/login/MsgLogin',
        component: MsLogin
      },
      {
        path: '/login/PwdLogin',
        component: PwdLogin
      }
    ]
  }
]
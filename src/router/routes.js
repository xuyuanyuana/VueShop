import Msite from '../pages/msite/Msite.vue'
import Search from '../pages/search/Search.vue'
import Order from '../pages/order/Order.vue'
import Mine from '../pages/mine/Mine.vue'
import Login from '../pages/login/Login.vue'
export default [
  {
    path: '/msite',
    component: Msite,
    meta:{
      hasFooter:true
    }
  },
  {
    path: '/search',
    component: Search,
    meta:{
      hasFooter:true
    }
  },
  {
    path: '/order',
    component: Order,
    meta:{
      hasFooter:true
    }
  },
  {
    path: '/mine',
    component: Mine,
    meta:{
      hasFooter:true
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
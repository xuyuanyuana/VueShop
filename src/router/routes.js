import Msite from '../pages/msite/Msite.vue'
import Search from '../pages/search/Search.vue'
import Order from '../pages/order/Order.vue'
import Mine from '../pages/mine/Mine.vue'
import Login from '../pages/login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Good from '../pages/Shop/good/Good.vue'
import Rating from '../pages/Shop/rating/Rating.vue'
import Info from '../pages/Shop/info/Info.vue'

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
    path: '/shop',
    component: Shop,
    children:[
      {
        path: 'goods',
        component: Good
      },
      {
        path: 'rating',
        component: Rating
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      },
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
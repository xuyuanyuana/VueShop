import { reqShopData } from '../api'
import { 
  SAVE_SHOPDATA,
  SAVE_ADDFOOD,
  SAVE_DELFOOD
} from './mutations-type'
import Vue from 'vue'

const state = {
  shopData:{},
  carShop:[]
}
const mutations = {
  [SAVE_SHOPDATA](state,shopData){
    state.shopData = shopData
  },
  [SAVE_ADDFOOD](state,{food}){
    if(food.count){ //存在count就直接累加
      food.count++ 
    }else{ //如果不存在则 ：1.undefined 2.可能为0
      // 实现数据的动态代理
      Vue.set(food,'count', 1)
      state.carShop.push(food)
    }
  },
  [SAVE_DELFOOD](state,{food}){
    if(food.count){
      food.count--
      // 如果为0后，删除商品从carShop中
      if(!food.count){
        state.carShop.splice(state.carShop.indexOf(food),1)
      }
    }
  }
}
const actions = {
  async getShopData({commit}){
    let result = await reqShopData()
    if(result.code === 0){
      commit(SAVE_SHOPDATA,result.data)
    }
  }
}
const getters ={
  // 计算购物车中商品的数量
  cartCount(state){
    return state.carShop.reduce((pre,food) => 
          pre += food.count
      ,0)
  },
  // 购物车中商品的总价
  cartPrice(){
    return state.carShop.reduce((pre,food) => 
          pre += food.count*food.price
    ,0)
  }
}


export default {
    state,
    mutations,
    actions,
    getters
}
import {
  SAVE_ADDRESS,
  SAVE_CATEGORIES,
  SAVE_SHOPLIST
} from './mutations-type'

// 包含多个直接操作state的方法的对象
export default {
  [SAVE_ADDRESS](state,address){
    state.address = address
  },
  [SAVE_CATEGORIES](state,categories){
    state.categories = categories
  },
  [SAVE_SHOPLIST](state,shopList){
    state.shopList = shopList
  }
}
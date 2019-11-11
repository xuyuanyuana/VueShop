import {
  SAVE_ADDRESS,
  SAVE_CATEGORIES,
  SAVE_SHOPLIST
} from './mutations-type'

import {
  reqAddress,
  reqCategories,
  reqShopList
} from '../api'
// 包含多个间接操作state方法的对象
export default {
  async getAddress({commit,state}){
    // 1.执行异步任务
    let result = await reqAddress({latitude:state.latitude,longitude:state.longitude})
    if(result.code === 0){
    // 2.调用mutation更新数据
      commit(SAVE_ADDRESS,result.data)
    }
  },
  async getCategories({commit}){
    // 1.执行异步任务
    let result = await reqCategories()
    if(result.code === 0){
    // 2.调用mutation更新数据
      commit(SAVE_CATEGORIES,result.data)
    }
  },
  async getShopList({commit,state}){
    // 1.执行异步任务
    let { longitude,latitude} = state
    let result = await reqShopList(latitude,longitude)
    if(result.code === 0){
    // 2.调用mutation更新数据
      commit(SAVE_SHOPLIST,result.data)
    }
  }
}
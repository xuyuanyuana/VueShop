import {
  SAVE_ADDRESS,
  SAVE_CATEGORIES,
  SAVE_SHOPLIST,
  SAVE_USER,
  SAVE_TOKEN,
  LOGOUT
} from './mutations-type'

import {
  reqAddress,
  reqCategories,
  reqShopList,
  reqAutoLogin
} from '../api'

const state = {
  latitude:40.10038,
  longitude:116.36867,
  address:{},
  categories:[],
  shopList:[],
  user:{},
  token:''
}

const mutations = {
  [SAVE_ADDRESS](state,address){
    state.address = address
  },
  [SAVE_CATEGORIES](state,categories){
    state.categories = categories
  },
  [SAVE_SHOPLIST](state,shopList){
    state.shopList = shopList
  },
  [SAVE_USER](state,user){
    state.user = user
  },
  [SAVE_TOKEN](state,token){
    // 保存到本地local
    localStorage.setItem('TOKEN_KEY',token)
    state.token = token
  },
  [LOGOUT](state){
    // 清除vuex中的user和token
    state.user = {}
    state.token = ''
    localStorage.removeItem('TOKEN_KEY')
  }
}

const actions = {
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
  },
  getUser({commit},user){
    // 调用mutation更新数据
    commit(SAVE_TOKEN,user.token)
    delete user.token
    commit(SAVE_USER,user)
  },
  async getAutoLogin({commit}){
    let result = await reqAutoLogin()
    if(result.code === 0){
      commit(SAVE_USER,result.data)
    }
  }
}

const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters
}
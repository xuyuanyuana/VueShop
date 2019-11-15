import Mock from 'mockjs'
import ShopData from './data.json'

// (拦截的url，模板数据)
const baseUrl = '/api'
Mock.mock(`${baseUrl}/mock_shop`,{code:0,data:ShopData})
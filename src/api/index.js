// 请求接口的统一管理
import ajax from './ajax'

// 根据经纬度获取位置详情
export const reqAddress = ({latitude,longitude}) => 
  // 传递的是params参数类型的
  ajax({
    method:'GET',
    url:`/position/${latitude},${longitude}`
  })

// 获取食品分类列表
export const reqCategories = () => ajax('/index_category')

// 根据经纬度获取商铺列表
export const reqShopList = (latitude,longitude) => ajax({
  method: 'GET',
  url: '/shops',
  params: {
    latitude,
    longitude
  }
}) 
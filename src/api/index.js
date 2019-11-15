// 请求接口的统一管理
import ajax from './ajax'

// 根据经纬度获取位置详情
export const reqAddress = ({latitude,longitude}) => 
  // 传递的是params参数类型的
  ajax({
    method:'GET',
    url:`/position/${latitude},${longitude}`,
    headers: {
      hasToken:true
    }
  })

// 获取食品分类列表
export const reqCategories = () => ajax({
  url:'/index_category',
  headers: {
    hasToken:true
  }
})

// 根据经纬度获取商铺列表
export const reqShopList = (latitude,longitude) => ajax({
  method: 'GET',
  url: '/shops',
  params: {
    latitude,
    longitude
  },
  headers: {
    hasToken:true
  }
}) 

// 手机号验证码登陆
export const reqLoginWithSms = (phone,code) => ajax({
  url:'/login_sms',
  method:'POST',
  data: {
    phone,
    code
  }
})

// 用户名密码登陆
export const reqLoginWithPwd = (name,pwd,captcha) => ajax({
  url:'/login_pwd',
  method:'POST',
  data: {
    name,
    pwd,
    captcha
  }
})

// 发送验证码
export const reqSendCode = (phone) => ajax({
  url:'/sendcode',
  params: {
    phone
  }
})

// 自动登录
export const reqAutoLogin = () => ajax({
  url:'/auto_login',
  headers: {
    hasToken:true
  }
})

// mock数据
export const reqShopData = () => ajax({
  url:'/mock_shop'
})
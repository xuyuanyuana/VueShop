/* 
  axios的二次封装，对请求数据和响应数据进行统一的处理
*/
import axios from 'axios'
import qs from 'qs'
import router from '../router'

// axios的伪实例，有axios实例上的方法
const instance = axios.create({
  baseURL:'/api'
})

// 配置请求拦截器
instance.interceptors.request.use(
  config => {
    // 后台需要的是urlencoded形式参数，需要统一处理传递的参数，axios内部会把对象形式的参数转换为json形式的
    // 只有data中的数据需要转化，params中的默认就是
    // 只有参数为post时才需要   
    if(config.method.toUpperCase() === 'POST'&& config.data instanceof Object){
      // 利用qs转换为urlencoded形式
      config.data = qs.stringify(config.data)
    }
    // 判断是否需要token
    // 获取token
    let token = localStorage.getItem('TOKEN_KEY')
    if(config.headers.hasToken){
      // 添加token
      if(token){ //存在token
        config.headers.authorization = token
      }else{ //不存在token
        throw new Error('不存在token，请登录')
      }     
    }
    return config
  }
)

// 配置响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 有可能请求拦截器中拦截了未发送请求的问题
    if(!error.response){ //没有发送请求
      // 不存在token,不发请求，跳转登录页面（也有可能在登录页面）
      router.currentRoute.path !== '/login' && router.replace('/login')
    }else{
      // 1.token失效问题，清空local和跳转login
      if(error.response.status === 401){
        alert('token失效了')
        router.currentRoute.path !== '/login' && router.replace('/login')
      }else if(error.response.status === 404){
        // 2
        alert('请求资源不存在')
      }else{
        // 3.发送请求了。但是出错了
        alert('请求出错了')
      }
    }

    // 中断promise链，外部不需要在处理错误的信息
    return new Promise(()=>{})
  }
)

export default instance
/* 
  axios的二次封装，对请求数据和响应数据进行统一的处理
*/
import axios from 'axios'
import qs from 'qs'

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
    if(config.method.toUpperCase === 'POST'){
      // 利用qs转换为urlencoded形式
      config.data = qs.stringify(config.data)
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
    alert('请求出错了')
    // 中断promise链，外部不需要在处理错误的信息
    return new Promise(()=>{})
  }
)

export default instance
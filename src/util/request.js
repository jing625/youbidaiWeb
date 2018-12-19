import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import {getToken} from '@/util/cookie'
import router from '@/router'
import store from '@/store'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 20000 // 请求超时时间

})

// request拦截器
service.interceptors.request.use(
  config => {
    // store.commit('setLoading',true)
    if (getToken()) {
      config.headers['authorization'] = 'Bearer ' + getToken()
    }
    config.headers["X-Client-Id"] = "173fd104d933432bae87ad8d097441ba"
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    store.commit('setLoading',false)
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.code === 10000) {
      //  提示被迫下线，并跳转到登录页面
      store.dispatch('LogOut').then(() => {
        router.push('/auth/login')
      })
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
      })

    } else {
      if (res.code === 10002) {
        //  提示token失效，并跳转到登录页面
        router.push('/auth/login')
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      } else if (res.code !== 0) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        return Promise.reject(res)
      } else {
        return response.data.data
      }
    }
  },
  error => {
    store.commit('setLoading',false)
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    if (error.request) {
      if (error.request.readyState == 4 && error.request.status == 0) {
        //我在这里重新请求
        Message({
          message:'网络异常，请刷页面',
          type:'error',
          duration: 5*1000
        })
      }

    }

    return Promise.reject(error)
  }
)


export default service

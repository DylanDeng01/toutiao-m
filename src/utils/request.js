/**
 * 封装 axios 请求模块
 */

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 基础路径
  baseURL: 'http://geek.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 统一配置token身份认证
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // 注意：务必返回config配置，否则请求出不去
  return config
}, err => {
  // 如果请求出错（没有发出去），会进入这里
  return Promise.reject(err)
})

// 响应拦截器

export default request

/**
 * 用户相关的请求模块
 */

import request from '@/utils/request'

// 按需导出
/**
 * 登录请求
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

/**
 * 获取验证码
 * 1分钟只能发送一次验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的个人信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头
    // 该接口需要授权才能访问
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

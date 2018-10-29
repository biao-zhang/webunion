import http from './public'
const baseUrl = '/uc'

// 发送短消息
export const regist = (params) => {
  return http.fetchPost(`${baseUrl}/regist`,params)
}
// 登录
export const uclogin = (params) => {
  return http.fetchPost(`${baseUrl}/login`,params)
}

// 登录密码重置
export const pwdreset = (params) => {
  return http.fetchPost(`${baseUrl}/user/pwd/reset`,params)
}

// 个人资料获取
export const profileview = (params) => {
  return http.fetchPost(`${baseUrl}/user/profile/view`,params)
}




import http from './public'
const baseUrl = '/uc'

// 登陆
export const uclogin = (params) => {
  return http.fetchPost(`${baseUrl}/login`,params)
}

// 个人资料获取
export const profileview = (params) => {
  return http.fetchPost(`${baseUrl}/user/profile/view`,params)
}


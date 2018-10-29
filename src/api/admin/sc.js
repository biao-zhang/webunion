import http from './public'
const baseUrl = '/sc'

// 获取图形验证码凭证
export const captchaToken = (params) => {
  return http.fetchPost(`${baseUrl}/captcha/token`,params)
}
//获取图形验证码
export const captchaimage = (params) => {
  return http.fetchGet(`${baseUrl}/captcha/image`,params)
}

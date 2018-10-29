import http from './public'
const baseUrl = '/ms'

// 发送短消息
export const verifyCodeSend = (params) => {
  return http.fetchPost(`${baseUrl}/sms/verifyCode/send`,params)
}

// 验证短信验证码
export const verifyCodeverify = (params) => {
  return http.fetchPost(`${baseUrl}/sms/verifyCode/verify`,params)
}

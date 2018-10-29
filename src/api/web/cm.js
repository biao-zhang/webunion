import http from './public'
const baseUrl = '/cm'

// 广告列表
export const advlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/list`,params)
}

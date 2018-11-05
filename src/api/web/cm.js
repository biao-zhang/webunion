import http from './public'
const baseUrl = '/cm'

// 广告列表
export const advlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/list`,params)
}
//栏目列表
export const lanmulist = (params) => {
  return http.fetchPost(`${baseUrl}/class/list`,params)
}
//文章列表
export const articlelist = (params) => {
  return http.fetchPost(`${baseUrl}/article/list`,params)
}
//文章详情
export const articleinfo = (params) => {
  return http.fetchPost(`${baseUrl}/article/info`,params)
}

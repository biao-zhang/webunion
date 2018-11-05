import http from './public'
const baseUrl = '/cm'

// 广告添加
export const advadd = (params) => {
  return http.fetchPost(`${baseUrl}/adv/add`,params)
}

// 广告列表
export const advlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/list`,params)
}

// 广告查看
export const advinfo = (params) => {
  return http.fetchPost(`${baseUrl}/adv/info`,params)
}

// 广告修改
export const advedit = (params) => {
  return http.fetchPost(`${baseUrl}/adv/edit`,params)
}

// 广告删除
export const advdelete = (params) => {
  return http.fetchPost(`${baseUrl}/adv/delete`,params)
}

// 广告禁用
export const advavlstatus = (params) => {
  return http.fetchPost(`${baseUrl}/adv/avlstatus`,params)
}

// 栏目添加
export const classadd = (params) => {
  return http.fetchPost(`${baseUrl}/class/add`,params)
}

// 栏目列表
export const classlist = (params) => {
  return http.fetchPost(`${baseUrl}/class/list`,params)
}

// 栏目查看
export const classinfo = (params) => {
  return http.fetchPost(`${baseUrl}/class/info`,params)
}

// 栏目修改
export const classedit = (params) => {
  return http.fetchPost(`${baseUrl}/class/edit`,params)
}

// 栏目删除
export const classdelete = (params) => {
  return http.fetchPost(`${baseUrl}/class/delete`,params)
}

//查询文章列表
export const articlelist = (params) => {
  return http.fetchPost(`${baseUrl}/article/list`,params)
}
//文章添加
export const articleadd = (params) => {
  return http.fetchPost(`${baseUrl}/article/add`,params)
}
//文章删除
export const articledelete = (params) => {
  return http.fetchPost(`${baseUrl}/article/delete`,params)
}
//文章详情
export const articleinfo = (params) => {
  return http.fetchPost(`${baseUrl}/article/info`,params)
}
//文章修改
export const articleedit = (params) => {
  return http.fetchPost(`${baseUrl}/article/edit`,params)
}

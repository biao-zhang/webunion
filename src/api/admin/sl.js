import http from './public'
const baseUrl = '/sl'

// 查询班级列表
export const classall = (params) => {
  return http.fetchPost(`${baseUrl}/adv/class/list`,params)
}

// 单个班级广告列表
export const singleAdvclasslist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/advclass/singlelist`,params)
}
// 获取所有项目
export const projectsall = (params) => {
  return http.fetchPost(`${baseUrl}/common/projects/list`,params)
}
// 后台获取文字广告列表
export const textadvlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/textadv/list`,params)
}

// 班级组添加
export const add = (params) => {
  return http.fetchPost(`${baseUrl}/adv/classgroup/add`,params)
}

// 添加文字广告
export const addTextadv = (params) => {
  return http.fetchPost(`${baseUrl}/adv/textadv/add`,params)
}

//后台获取文字广告信息
export const textadvInfo = (params) => {
  return http.fetchPost(`${baseUrl}/adv/textadv/info`,params)
}

//更新文字广告信息
export const updateTextadv = (params) => {
  return http.fetchPost(`${baseUrl}/adv/textadv/edit`,params)
}

//后台获取图片广告列表
export const imageadvlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/imageadv/list`,params)
}
//添加图片广告
export const addImageadv = (params) => {
  return http.fetchPost(`${baseUrl}/adv/imageadv/add`,params)
}
//修改图片广告
export const updateImageadv = (params) => {
  return http.fetchPost(`${baseUrl}/adv/imageadv/edit`,params)
}
//后台获取图片广告信息
export const imageadvInfo = (params) => {
  return http.fetchPost(`${baseUrl}/adv/imageadv/info`,params)
}

// 多个班级广告列表
export const complexlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/class/complexlist`,params)
}

// 多个班级广告列表
export const advavlstatusedit = (params) => {
  return http.fetchPost(`${baseUrl}/adv/advavlstatus/edit`,params)
}

// 代理商列表
export const agentlist = (params) => {
  return http.fetchPost(`${baseUrl}/agent/list`,params)
}

// 代理商审核
export const agentauth = (params) => {
  return http.fetchPost(`${baseUrl}/agent/auth`,params)
}

// 代理商信息
export const agentinfo = (params) => {
  return http.fetchPost(`${baseUrl}/agent/info`,params)
}

// 代理商修改
export const agentedit = (params) => {
  return http.fetchPost(`${baseUrl}/agent/edit`,params)
}

// 代理商网站列表
export const agentsitelist = (params) => {
  return http.fetchPost(`${baseUrl}/agentsite/list`,params)
}

// 代理商审核
export const agentsiteauth = (params) => {
  return http.fetchPost(`${baseUrl}/agentsite/auth`,params)
}

// 代理商添加
export const agentadd = (params) => {
  return http.fetchPost(`${baseUrl}/agent/add`,params)
}



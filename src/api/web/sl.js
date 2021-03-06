import http from './public'
const baseUrl = '/sl'


// 根据广告类型返回第二级正常显示的项目
export const secondprojectlist = (params) => {
  return http.fetchPost(`${baseUrl}/common/secondproject/list`,params)
}
// 根据项目标识返回科目集合
export const subjectlist = (params) => {
  return http.fetchPost(`${baseUrl}/common/subject/list`,params)
}
// 根据项目标识返回班型集合
export const classtypelist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/classtype/list`,params)
}
// 获取所有项目
export const projectsall = (params) => {
  return http.fetchPost(`${baseUrl}/common/projects/list`,params)
}
// 文字广告列表
export const advtextlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/text/list`,params)
}
// 图片广告列表
export const advpiclist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/pic/list`,params)
}
// 课程广告列表
export const lessionlist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/lession/list`,params)
}
//课程列表广告列表
export const lessionslist = (params) => {
  return http.fetchPost(`${baseUrl}/adv/lessions/list`,params)
}
// 获取广告代码
export const advcode = (params) => {
  return http.fetchPost(`${baseUrl}/adv/code`,params)
}
//前端页面获取广告数据
export const advdata = (params) => {
  return http.fetchPost(`${baseUrl}/adv/data`,params)
}
//代理商网站列表
export const agentsitelist = (params) => {
  return http.fetchPost(`${baseUrl}/agentsite/list`,params)
}
//代理商网站添加
export const agentsiteadd = (params) => {
  return http.fetchPost(`${baseUrl}/agentsite/add`,params)
}
//获取代理商网站信息
export const agentsiteinfo = (params) => {
  return http.fetchPost(`${baseUrl}/agentsite/info`,params)
}
//代理商网站修改
export const agentsiteedit = (params) => {
  return http.fetchPost(`${baseUrl}/agentsite/edit`,params)
}
//代理商网站删除
export const agentsitedelete = (params) => {
  return http.fetchPost(`${baseUrl}/agentsite/delete`,params)
}
//当前代理商信息
export const agentsitecurrent = (params) => {
  return http.fetchPost(`${baseUrl}/agent/current`,params)
}
//代理商信息完善
export const agentedit = (params) => {
  return http.fetchPost(`${baseUrl}/agent/edit`,params)
}
//获取PVUV统计数据
export const advstatistics = (params) => {
  return http.fetchPost(`${baseUrl}/adv/statistics`,params)
}
//获取代理商统计信息
export const agentgetagentdata = (params) => {
  return http.fetchPost(`${baseUrl}/agent/getagentdata`,params)
}

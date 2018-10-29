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

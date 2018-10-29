import http from './public'
const baseUrl = '/file'

// 图片上传
export const upload = (params) => {
  let config={
    headers:{
      'Content-Type' : 'multipart/form-data'
    }
  }
  return http.fetchPost(`${baseUrl}/upload`,params,config)
}

import axios from 'axios'
axios.defaults.timeout = 10000
import qs from 'qs'
import global from '../../components/GLobal'


export default {
  fetchGet (url, params = {}, header) {
    // params = qs.stringify(params)
    //if (!header) params = qs.stringify(params)
    return new Promise((resolve, reject) => {
      axios.get(url, {params, header}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}, header) {

    //htp://../fileserver/api/file/download?path=2018/07/16/111111

    //服务地址
    if(url.indexOf("/file/download")==0||url.indexOf("/file/upload")==0){
      url = global.file_url + url
    }else{
      url = global.msa_url + url
    }

    //序列化
    if(!(params instanceof FormData)){
      params = qs.stringify(params);
    }
    /*if(!header){
      params = qs.stringify(params);
    }*/

    //TOKEN
    let token = window.localStorage.getItem('adminToken');
    if(token == null) token = '';
    url += "?TOKEN=" + token;


    // TOEKN 会话标识
    // greencard 绿卡
    // apiKey

    return new Promise((resolve, reject) => {
      axios.post(url, params, header).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

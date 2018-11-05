
import { profileview } from '@/api/web/uc'

const WEB_USERINFO = 'WEB_USERINFO'

const userInfo = {
  state: {
    arrUserInfo: []
  },
  mutations: {
    [WEB_USERINFO](state, payload) {

      state.arrUserInfo  = payload.data

    }
  },
  actions: {
    getUserInfo({commit}){

      profileview().then( res => {

        if (res.result === '000000') {

          commit('WEB_USERINFO', res)

        } else {

          localStorage.setItem('token', '')

        }

        console.log('个人信息', res)

      })
    }
  }
}

export default userInfo

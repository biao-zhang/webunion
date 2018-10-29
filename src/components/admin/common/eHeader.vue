<template>
  <div class="cont_lognbox" v-if="token">
    <img src="/static/images/h_tx.png" width="48" height="48" class="co_tx"/>
    <a href="javascript:void(0);" class="co_name">{{adminUser.userLoginname}}</a>
    <i class="quit" @click="quit"></i>
  </div>
</template>

<script>
  import { profileview } from '@/api/admin/uc'

  export default {
    name: "EHeader",
    data () {
      return {
        adminUser: {},
        token: '',
      }
    },
    mounted () {
      this.token = window.localStorage.getItem('adminToken')

      this._profileview()
    },
    methods: {
      quit () {

        window.localStorage.setItem('adminToken', '')

        this.$router.push('/')

      },
      _profileview () {
        profileview().then( res => {

          if (res.result === '000000') {

            this.adminUser = res.data

          } else {

            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              callback: () => {
               this.$router.push('/')
              }
            })

          }

          console.log('后台个人信息', res)

        })
      }
    }
  }
</script>

<style scoped>

</style>

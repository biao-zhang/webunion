<template>
  <div class="adm_lognbox">
    <div class="adm_logn">
      <div class="adm_tt">优路教育网站联盟后台管理系统</div>
      <div class="lorg_box">
        <!--<p class="errtip">格式错误</p>-->
        <div class="lorg_lab"><input v-model="userName" type="text" class="lo_user" placeholder="请输入用户名/邮箱" /></div>
        <div class="lorg_lab"><input v-model="pwd" type="password" class="lo_pass" placeholder="请输入密码" /></div>
        <div class="lorg_lab">
          <input class="lo_capt" v-model="captcha" type="text" placeholder="请输入图形验证码" />
          <captcha-image @captchaToken="captchaToken"></captcha-image>
        </div>
        <div class="lobn_box"><input type="button" value="登 录" class="lorg_btn" @click="login"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { uclogin} from '@/api/admin/uc'
  import CaptchaImage from './captchaImage'
  import { checkEmail } from '../../../static/js/utils'

  export default {
    name: "alogin",
    components: {
      CaptchaImage
    },
    data () {
      return {
        userName: '',
        userLoginname: '',
        userEmail: '',
        pwd: '',
        captcha: '',
        imgtoken: '',
      }
    },
    methods: {
      captchaToken (val) {
        this.imgtoken = val
      },
      login () {
        if (checkEmail(this.userName)) {

          this.userEmail = this.userName

        } else {

          this.userLoginname = this.userName

        }
        this._uclogin()
      },
      _uclogin () {
        let params = {
          userLoginname: this.userLoginname,
          userLoginpwd: this.pwd,
          userEmail: this.userEmail,
          captcha: {captchaToken:  this.imgtoken, captchaValue: this.captcha},
        }
        uclogin({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              localStorage.setItem('adminToken', res.data.token)

              this.$router.push('/admin/bannerListAll')

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });

            }

            console.log('后台用户登录', res)

          })
      }
    }
  }
</script>

<style scoped>
  .lo_capt {
    line-height: 54px;
    width: 300px;
    height: 54px;
    border-radius: 2px;
    border: 1px solid #dddddd;
    padding-left: 20px;
    font-size: 20px;
    outline: none;
    vertical-align: middle;
  }
</style>

<template>
  <div>
    <wheader></wheader>
    <div class="lm_lognbox">
      <div class="lm_logn">
        <div class="lorg_box">
          <div class="lmgn_tt"><span class="lmgn_sp"><i class="lmgn_fg"></i><strong>账号登录</strong></span></div>
          <!--<p class="errtip">格式错误</p>-->
          <div class="lorg_lab"><input v-model="userName" type="text" class="lo_user" placeholder="请输入用户名/手机号/邮箱" /></div>
          <div class="lorg_lab"><input v-model="pwd" type="password" class="lo_pass" placeholder="请输入密码" /></div>
          <div class="lorg_lab">
            <input class="lo_capt" v-model="captcha" type="text" placeholder="请输入图形验证码" />
            <captcha-image
              class="lo_img"
              :captcha-scene="scene"
              @tranferCaptchaToken="captchaToken"
            ></captcha-image>
          </div>
          <p class="lorg_go">
            <router-link to="/web/findPwd" class="lo_link">忘记密码？</router-link>
            <router-link to="/web/register" class="go_link">新用户注册</router-link>
          </p>
          <div class="lobn_box"><input type="button" value="登 录" class="lorg_btn" @click="login"></div>
        </div>
      </div>
    </div>
    <wfooter></wfooter>
  </div>
</template>

<script>

  import wheader from './common/wheader'
  import wfooter from './common/wfooter'
  import CaptchaImage from './captchaImage'
  import { checkEmail, checkPhone } from '../../../static/js/utils'
  import { uclogin } from '@/api/web/uc'

  export default {
    name: "login",
    components:{
      wheader,
      wfooter,
      CaptchaImage
    },
    data () {
      return {
        scene: 'uc_login',
        userName: '',
        userLoginname: '',
        userEmail: '',
        pwd: '',
        captcha: '',
        imgtoken: '',
      }
    },
    methods: {
      login () {
        if (checkEmail(this.userName)) {

          this.userEmail = this.userName

        } else if (checkPhone(this.userName)) {

          this.userMobile = this.userName

        } else {

          this.userLoginname = this.userName

        }
        this._uclogin()
      },
      captchaToken(val) {
        this.imgtoken = val
      },
      _uclogin () {
        let params = {
          userFlag: 'A', // 用户类型
          userMobile: this.userMobile,
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

              this.$router.push('/web')

              localStorage.setItem('token', res.data.token)

              // this.$store.dispatch('getUserInfo')

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });

            }

            console.log('前台用户登录', res)

          })
      }
    }
  }
</script>
<style>
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
  .lo_img {
    width: 120px;
    height: 54px;
    vertical-align: middle;
  }
</style>

<template>
  <div class="lm_lognbox">
    <div class="lm_logn">
      <div class="lorg_box">
        <p class="lorg_tt">忘记密码</p>
        <div class="lmzh_tt">
          <span class="active">手机验证</span>
          <span>重置密码</span>
        </div>
        <!--<p class="errtip">格式错误</p>-->
        <div class="lorg_lab">
          <input v-model="userMobile" type="text" class="lo_tel" placeholder="请输入手机号" />
        </div>
        <div class="lorg_lab">
          <input class="lo_capt" v-model="captcha" type="text" placeholder="请输入图形验证码" />
          <captcha-image
            class="lo_img"
            :captcha-scene="captchaScene"
            @tranferCaptchaToken="captchaToken"
          ></captcha-image>
        </div>
        <div class="lorg_lab">
          <input v-model="verifyCode" type="text" class="lo_yzm" placeholder="请输入验证码" />
          <get-tel-code
            style="position: relative"
            :tel-params="{userMobile: userMobile, captchaToken: imgtoken, captcha: captcha, sence: scene}"
          ></get-tel-code></div>
        <div class="lobn_box"><input type="button" value="下一步" class="lorg_btn" @click="next"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { verifyCodeverify } from '@/api/web/ms'
  import CaptchaImage from '../captchaImage'
  import GetTelCode from '../getTelCode'

  export default {
    name: "findPwdFst",
    components: {
      CaptchaImage,
      GetTelCode,
    },
    data () {
      return {
        userMobile: '',
        captcha:'', // 图形验证码
        imgtoken: '',
        scene: 'uc_user_pwd_reset',
        captchaScene:'ms_sms_verifyCode_send',//获取图片验证码场景
        verifyCode: '',
      }
    },
    created(){
      let $this = this;
      document.onkeydown=function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          $this.next();
        }
      }
    },
    methods: {
      captchaToken(val) {
        this.imgtoken = val
      },
      next () {
        this._verifyCodeverify()
      },
      _verifyCodeverify () {
        let params = {
          verifyPhone: this.userMobile,
          verifyScene: this.scene,
          verifyValue: this.verifyCode,
        }
        verifyCodeverify({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$emit('oldtype', {type: 2, verifyToken: res.data.verifyToken, userMobile: this.userMobile})

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              })

            }
            console.log('密码重置', res)

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
  .lo_img {
    width: 120px;
    height: 54px;
    vertical-align: middle;
  }
</style>

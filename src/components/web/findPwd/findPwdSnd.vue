<template>
  <div class="lm_lognbox">
    <div class="lm_logn">
      <div class="lorg_box">
        <p class="lorg_tt">忘记密码</p>
        <div class="lmzh_tt secd">
          <span class="active">手机验证</span>
          <span class="active">重置密码</span>
        </div>
        <!--<p class="errtip">格式错误</p>-->
        <div class="lorg_lab">
          <input v-model="userLoginpwd1" type="text" class="lo_pass" placeholder="请输入新密码" />
        </div>
        <div class="lorg_lab">
          <input v-model="userLoginpwd2" type="text" class="lo_pass" placeholder="请再次输入新密码" />
        </div>
        <div class="lobn_box"><input type="button" value="完 成" class="lorg_btn" @click="over"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { pwdreset } from '@/api/web/uc'

  export default {
    name: "findPwdSnd",
    data () {
      return {
        userLoginpwd1: '',
        userLoginpwd2: '',
      }
    },
    props: ['verifyToken', 'userMobile'],
    created(){
      let $this = this;
      document.onkeydown=function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          $this.over();
        }
      }
    },
    methods: {
      over () {
        if (this.userLoginpwd1 === this.userLoginpwd2) {

          this._pwdreset()

        } else {

          this.$alert('两次输入密码不一致', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })

        }

      },
      _pwdreset () {
        let params = {
          userMobile: this.userMobile,
          userFlag: 'A', // 用户类型
          userLoginpwd: this.userLoginpwd1,
          verify: {verifyToken: this.verifyToken},
        }
        pwdreset({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({
                type: 'success',
                message: '密码重置成功',
              })
              this.$router.push('/web/login')

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

</style>

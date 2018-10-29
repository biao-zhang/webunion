<template>
  <input type="button" class="rest_yzmbtn" @click="getTelCode" v-model="value" v-bind:disabled="flag"/>
</template>

<script>
  import { verifyCodeSend } from '@/api/web/ms'
    export default {
      name: "getTelCode",
      data() {
        return {
          userMobile:'',//手机号
          captcha:'',//图形验证码
          smstplNo:'010001',//短信模板编号
          scene:'',//注册场景
          captchaToken:'',//图片凭证编码
          value:'获取验证码',
          flag:false,
          t:'',
        }
      },
      props: ['telParams'],
      watch: {
        telParams: {
          handler(newValue, oldValue) {
           this.userMobile = newValue.userMobile;
           this.captcha = newValue.captcha;
           this.captchaToken = newValue.captchaToken;
           this.sence = newValue.sence;
          },
          deep: true
        }
      },
      methods:{
        getTelCode(){
          if(this.userMobile===''){
            this.$alert('请先输入手机号', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            return false;
          }
          if(this.captcha===''){
            this.$alert('请先输入验证码', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            return false;
          }
          this.countDown(60);
          this._verifyCodeSend();
        },
        _verifyCodeSend(){
          let params ={
            smsPhone:this.userMobile,//手机号
            smstplNo:this.smstplNo,//短信模板编号
            captcha:{captchaToken:this.captchaToken,captchaValue:this.captcha},//图形验证码
            scene:this.sence,//场景
          };
          verifyCodeSend({
            params: JSON.stringify(params)
          }).then( res => {
            console.log(res);
            if(res.result==='000000'){

            }else{
              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });
            }
          })
        },
        countDown(s){
          this.value = s+"s后重新获取";
          this.flag = true;
          if(s==0) {
            this.value = '获取验证码';
            this.flag = false;
            clearTimeout(this.t);
          }else{
            this.t=setTimeout(()=>{
              this.countDown(s-1);
            },1000);
          }

        }
      }
    }
</script>

<style scoped>

</style>

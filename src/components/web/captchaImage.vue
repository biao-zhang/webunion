<template>
  <img v-bind:src="imgUrl" @click="getImage" style="cursor: pointer;"/>
</template>

<script>
  import { captchaToken,captchaimage } from '@/api/web/sc'
    export default {
      name: "captchaImage",
      data () {
        return {
          imgUrl:'',
          captchaType:'RANDOMCODE',//图形验证码类型
          captchaToken:'',
          captchaImage:''
        }
      },
      props: ['captchaScene'],
      mounted(){
        this.getImage();
        this.captchaImage = this.GLOBAL.captchaImage;
      },
      methods:{
        getImage(){
          this._captchaToken();
        },
        _captchaToken(){
          let params ={
            captchaScene:this.captchaScene,//图形验证码场景
            captchaType:this.captchaType,//图形验证码类型
          };
          captchaToken({
            params: JSON.stringify(params)
          }).then( res => {
            console.log(res);
            if(res.result==='000000'){
              this.imgUrl = this.captchaImage+'?captchaToken='+res.data.captchaToken;
              this.$emit('tranferCaptchaToken',res.data.captchaToken);
            }else{
              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });
            }
          })
        },
      },
    }
</script>

<style scoped>

</style>

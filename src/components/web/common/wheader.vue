<template>
  <div class="lm_headerbox">
    <div class="lm_header">
      <div class="lmh_logo"><img src="@/assets/web/images/logo.png"/></div>
      <ul class="lmh_ul">
        <li :class="{active: tabIndex === 'web'}"><router-link to="/web">联盟首页</router-link></li>
        <li :class="{active: tabIndex === 'cooperAd'}"><a href="javascript:void(0)" @click="isLogin('cooperAd')">合作介绍</a></li>
        <li :class="{active: tabIndex === 'helpCenter'}"><router-link to="/web/helpCenter">帮助中心</router-link></li>
      </ul>
      <div class="lmh_login" v-if="!token">
        <router-link to="/web/login"  class="lmh_logn">登录</router-link>
        <span>|</span>
        <router-link to="/web/register" class="lmh_logn">注册</router-link>
      </div>
      <div class="lmh_login" v-else>
        <span class="lmh_logn" @click="userCenter" style="cursor: pointer">{{arrUserInfo.userLoginname}}</span>
        <span>|</span>
        <span class="lmh_logn" @click="quit" style="cursor: pointer;">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "wheader",
    data () {
      return {
        tabIndex: '',
        token: '',
      }
    },
    computed: mapState({
      arrUserInfo: state => state.userInfo.arrUserInfo
    }),
    mounted(){
      var arr = this.$route.path.split("/");
      this.tabIndex = arr[arr.length-1];
      if(this.tabIndex==='cooperAd') this.isLogin('cooperAd');

      this.token = window.localStorage.getItem('token');

      this.$store.dispatch('getUserInfo')
    },
    methods:{
      userCenter () {
        this.$router.push('/web/userCenter')
      },
      quit () {
        window.localStorage.setItem('token', '')
        this.token = window.localStorage.getItem('token');
      },
      isLogin(url){

        if(this.token){
          this.$router.push('/web/'+url);
        }else{
          this.$alert('请先登录', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              this.$router.push('/web/login');
            }
          });
        }
      },
    }
  }
</script>

<style scoped>
  .lm_headerbox{height: 100px;background: #fff;min-width: 1100px;-moz-box-shadow:2px 0px 5px #e8e7e7; -webkit-box-shadow:2px 0px 5px #e8e7e7; box-shadow:2px 0px 5px #e8e7e7;}
  .lm_header{width:1100px;margin:0 auto;position: relative;height: 100px;overflow:hidden;}
  .lmh_logo{padding:24px 0;width:270px;float: left;}
  .lmh_ul li{float: left;width:150px;text-align: center;}
  .lmh_ul li a{color: #333;font-size: 20px;line-height: 98px;width:100%;display: inline-block;border-top:2px solid #fff;}
  .lmh_ul li.active a,.lmh_ul li:hover a{border-top:2px solid #fc635e;color: #fc635e;}
  .lmh_login{line-height: 100px;position: absolute;right:0;top:0;}
  .lmh_login span{color: #333;font-size: 20px;padding:0 5px;}
  .lmh_logn{color: #333;font-size: 20px;}
  .lmh_logn:hover{color:#fc635e;}
</style>

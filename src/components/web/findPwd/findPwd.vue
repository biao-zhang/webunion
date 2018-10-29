<template>
  <div>
    <wheader></wheader>
    <findPwdSnd v-if="type === 2" :verify-token="verifyToken" :user-mobile="userMobile"></findPwdSnd>
    <findPwdFst @oldtype="oldtype" v-else></findPwdFst>
    <wfooter></wfooter>
  </div>
</template>

<script>
    import wheader from '../common/wheader'
    import findPwdFst from './findPwdFst'
    import findPwdSnd from './findPwdSnd'
    import wfooter from '../common/wfooter'
    export default {
      name: "findPwd",
      data:function(){
        return{
          type : '',
          verifyToken: '',
          userMobile: '',
        }
      },
      components:{
        wheader,
        findPwdFst,
        findPwdSnd,
        wfooter
      },
      methods: {
        oldtype (val) {

          this.type = val.type

          this.verifyToken = val.verifyToken

          this.userMobile = val.userMobile

        },
      }
    }
</script>

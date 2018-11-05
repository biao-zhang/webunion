<template>
  <div class="lmc_rt">
    <div class="lmc_basebox">
      <div class="lmcbs_tit">
        <div class="lmcbs_img"><img src="/static/images/lm_tx.png" width="85" height="85" /></div>
        <p>{{userInfo.userLoginname}}，欢迎您！</p>
      </div>
      <div class="lmcbs_con">
        <div class="lmcbs_item">
          <div class="lmcbs_tt"><span class="lmcbs_sp"><i class="lmcbs_fg"></i><strong>个人信息</strong></span></div>
          <div class="lmcbs_info">
            <label class="lmcb_lab">
              <span class="lmcp_sp1">真实姓名：</span>
              <span class="lmcp_sp2">{{userInfo.userName}}</span>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">邮&nbsp;&nbsp;箱：</span>
              <span class="lmcp_sp2">{{userInfo.userEmail}}</span>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">手 机 号：</span>
              <span class="lmcp_sp2">{{userInfo.userMobile}}</span>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">身份证号：</span>
              <span class="lmcp_sp2">{{userInfo.userIdcard}}</span>
            </label>
          </div>
        </div>
        <div class="lmcbs_item">
          <div class="lmcbs_tt"><span class="lmcbs_sp"><i class="lmcbs_fg"></i><strong>收款人信息</strong></span></div>
          <div class="lmcbs_info">
            <label class="lmcb_lab">
              <span class="lmcp_sp1">收 款 人：</span>
              <span class="lmcp_sp2">{{userInfo.agentReceiptperson}}</span>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">收款银行：</span>
              <span class="lmcp_sp2">{{userInfo.agentReceiptbankname}}</span>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">收款账户：</span>
              <span class="lmcp_sp2">{{userInfo.agentReceiptaccountno}}</span>
            </label>
          </div>
        </div>
        <div class="lmbg_btnbox">
          <input type="button" value="修 改" class="lmbg_btn" @click="modify">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userInfo",
    props: ['userInfo'],
    methods: {
      modify () {
        // this.$alert('暂时无法修改', '提示', {
        //   confirmButtonText: '确定',
        // })
        this.$router.push('/web/userCenter?curId=7');
        this.$emit("tranfCurId",'7');
      }
    }
  }
</script>

<style scoped>
  .lmbg_btn {
    cursor: pointer;
  }
</style>

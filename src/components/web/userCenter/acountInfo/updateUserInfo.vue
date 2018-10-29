<template>
  <div class="lmc_rt">
    <div class="lmc_basebox">
      <div class="lmcbs_tit">
        <div class="lmcbs_img">
          <img src="images/lm_tx.png" width="85" height="85" />
          <input type="file" class="lmcf_file">
          <span class="file_tip">点击头像可进行更改</span>
        </div>
        <p>188****4109，欢迎您！</p>
      </div>
      <div class="lmcbs_con">
        <div class="lmcbs_item">
          <div class="lmcbs_tt"><span class="lmcbs_sp"><i class="lmcbs_fg"></i><strong>个人信息</strong></span></div>
          <div class="lmcbs_info update">
            <div class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>真实姓名：</span>
              <input type="text" class="lmcp_inp" value="XXX" disabled="true" />
            </div>
            <label class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>邮&nbsp;&nbsp;箱：</span>
              <input type="text" class="lmcp_inp" value="452698321@qq.com"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">手 机 号：</span>
              <input type="text" class="lmcp_inp" value="18810934109"  disabled="true"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">身份证号：</span>
              <input type="text" class="lmcp_inp" value="411021199409015041"  disabled="true"/>
            </label>
          </div>
        </div>
        <div class="lmcbs_item">
          <div class="lmcbs_tt"><span class="lmcbs_sp"><i class="lmcbs_fg"></i><strong>收款人信息</strong></span></div>
          <div class="lmcbs_info update">
            <label class="lmcb_lab">
              <span class="lmcp_sp1">收 款 人：</span>
              <input type="text" class="lmcp_inp" value="田一朵"  disabled="true"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">收款银行：</span>
              <input type="text" class="lmcp_inp" value="招商银行"  disabled="true"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1">收款账户：</span>
              <input type="text" class="lmcp_inp" value="452698321456789110"  disabled="true"/>
            </label>
          </div>
        </div>
        <div class="lmbg_btnbox">
          <input type="button" value="提 交" class="lmbg_btn">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "updateUserInfo"
    }
</script>

<style scoped>

</style>

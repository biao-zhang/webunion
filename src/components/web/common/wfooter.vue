<template>
  <div class="lm_footerbox">
    <div class="lm_footer">
      <div class="lmf_top">
        <ul class="lmf_ul">
          <li><a href="">关于联盟</a></li>
          <li><a href="">合作介绍</a></li>
          <li><a href="">加入我们</a></li>
          <li><a href="">帮助中心</a></li>
          <li><a href="">联系我们</a></li>
          <li><a href="">法律声明</a></li>
        </ul>
        <div class="lmf_tel">
          <span class="lmft_sp">客服热线：</span>
          <span class="lmft_tel">400-861-8800</span>
        </div>
        <div class="clear"></div>
      </div>
      <div class="lmf_bm">
        <p>
          Copyright@2018   union.com&nbsp;&nbsp;|&nbsp;&nbsp;版权所有：北京环球优路教育科技股份有限公司&nbsp;&nbsp;|&nbsp;&nbsp;京ICP备05058880号&nbsp;&nbsp;|&nbsp;&nbsp;京公网安备11010802017987号&nbsp;&nbsp;|&nbsp;&nbsp;京ICP证150934号
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "wfooter"
    }
</script>

<style scoped>
  /*尾部*/
  .lm_footerbox{background: #191919;min-width: 1100px;}
  .lm_footer{width:1100px;margin:0 auto;}
  .lmf_top{margin:0 200px 0 300px;padding:20px 0;}
  .lmf_ul{width:230px;margin-right: 100px;float: left;}
  .lmf_ul li{width:115px;float: left;text-align: center;line-height: 38px;}
  .lmf_ul li a{color: #fdfdfd;font-size: 16px;}
  .lmf_tel{}
  .lmft_sp{color: #fdfdfd;font-size: 24px;display: block;padding:15px 0;}
  .lmft_tel{color: #fdfdfd;font-size: 30px;display: block;padding-top: 5px;}
  .lmf_bm{line-height: 60px;border-top: 1px solid #474747;clear: both;}
  .lmf_bm p{font-size: 14px;color: #a3a3a3;text-align: center;}
</style>

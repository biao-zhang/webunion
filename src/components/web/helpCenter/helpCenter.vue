<template>
  <div>
  <wheader></wheader>
  <div class="lm_content">
    <div class="lmc_lf">
      <ul>
        <li class="title"><a href="javascript:void(0);">帮助中心</a></li>
        <li><a href="javascript:void(0);">关于平台</a></li>
        <li><a href="javascript:void(0);">相关公告</a></li>
        <li><a href="javascript:void(0);">新手指南</a></li>
        <li class="active"><a href="javascript:void(0);">联系我们</a></li>
        <li class="li_erji" v-on:click="show = !show"><a href="javascript:void(0);">常见问题</a><i class="lmc_arr" :class="{ up: show }"></i>
          <dl v-show = "show">
            <dd><a href="javascript:void(0);">如何结算佣金</a></dd>
            <dd><a href="javascript:void(0);">如何成为代理商</a></dd>
            <dd><a href="javascript:void(0);">实名认证信息是否可以修改息是否可以修改</a></dd>
            <dd><a href="javascript:void(0);">收款账户是否可以修改</a></dd>
            <dd><a href="javascript:void(0);">订单奖励金什么时候可以看...</a></dd>
            <dd><a href="javascript:void(0);">实名认证信息是否可以修改...</a></dd>
            <dd><a href="javascript:void(0);">没有网站可否注册账号吗</a></dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="lmc_rt">
      <div class="lmc_help">
        <div class="lmch_tt"><span class="lmch_sp"><i class="lmch_fg"></i><strong>联系我们</strong></span></div>
        <div class="lmch_con">
          <p>联  系  人：申慧丽</p>
          <p>联系方式：13526985696/010-52368911</p>
          <p>邮       箱：123456789@qq.com</p>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
  <wfooter></wfooter>
  </div>
</template>

<script>
  import wheader from '../common/wheader'
  import wfooter from '../common/wfooter'
    export default {
        name: "helpCenter",
        data:function(){
          return{
            show : true
          }
        },
        components:{
          wheader,
          wfooter
        }
    }
</script>

<style scoped>

</style>

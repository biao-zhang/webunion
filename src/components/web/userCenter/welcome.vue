<template>
  <div class="lmc_rt">
    <div class="lmct_info">
      <div class="lmfo_top">
        <div class="lmfo_img">
          <img src="/static/images/lm_tx.png"/>
        </div>
        <div class="lmfo_p">
          <p class="lmfo_tit">{{userInfo.userLoginname}}，欢迎您！</p>
          <p class="lmfo_rz" v-if="userInfo.userName!==''&&userInfo.userName!==null&&userInfo.userIdcard!==''&&userInfo.userIdcard!==null">已认证</p>
          <p class="lmfo_rz" @click="modify" v-else>未实名认证</p>
        </div>
      </div>
      <div class="lmfp_p">
        <span class="lmfp_lf">账号状态：<strong v-if="userInfo.agentAvlstatus	==='Y'">正常</strong><strong v-else>不可用</strong></span>
        <span class="lmfp_cn">联盟ID：<strong>{{userInfo.agentId}}</strong></span>
        <span class="lmfp_rt">签约时间：<strong>{{userInfo.agentSigndate}}</strong></span>
        <div class="clear"></div>
      </div>
    </div>
    <div class="lm_ztll">
      <div class="ztll_tt"><span>昨天流量</span></div>
      <div class="ztll_con">
        <div class="ztll_item bg1">
          <span class="ztll_num">{{pv}}</span>
          <span class="ztll_sp">浏览量（PV）</span>
        </div>
        <div class="ztll_item bg2">
          <span class="ztll_num">{{uv}}</span>
          <span class="ztll_sp">独立访客（UV）</span>
        </div>
        <div class="ztll_item bg3">
          <span class="ztll_num">{{xzv}}</span>
          <span class="ztll_sp">新增用户（个）</span>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { agentgetagentdata } from '@/api/web/sl'
  export default {
    name: "welcome",
    props: ['userInfo'],
    data(){
      return {
        pv:'',//浏览量
        uv:'',//独立访客量
        xzv:''//新增用户量
      }
    },
    mounted(){
      this._agentgetagentdata();
    },
    methods:{
      modify () {
        this.$router.push('/web/userCenter?curId=7');
        this.$emit("tranfCurId",'7');
      },
      _agentgetagentdata() {
        agentgetagentdata().then(res => {
          //console.log(res);
          if (res.result === "000000") {
            this.pv = res.data.pv;
            this.uv = res.data.uv;
            this.xzv = res.data.xzv;
          } else {
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
    }
  }
</script>



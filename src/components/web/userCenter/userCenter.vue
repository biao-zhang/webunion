<template>
  <div>
    <wheader></wheader>
    <div class="lm_content">
      <div class="lmc_lf">
        <ul>
          <li @click="change('userCenter','1')" :class="{'active':curId === '1'}"><a href="javascript:void(0);">个人首页</a></li>
          <!--<li @click="change('userCenter','2')" :class="{'active':curId === '2'}"><a href="javascript:void(0);">用户信息</a></li>-->
          <li @click="change('userCenter','3')" :class="{'active':curId === '3'}"><a href="javascript:void(0);">推广效果</a></li>
          <li class="li_erji"><p v-on:click="show = !show"><a href="javascript:void(0);">账户信息</a><i class="lmc_arr" :class="{ up: show }"></i></p>
            <transition name="slide">
              <dl v-show = "show">
                <dd @click="change('userCenter','4')" :class="{'active':curId === '4'||curId === '7'}"><a href="javascript:void(0);">个人中心</a></dd>
                <dd @click="change('userCenter','5')" :class="{'active':curId === '5'}"><a href="javascript:void(0);">网站管理</a></dd>
                <!--<dd @click="change('userCenter','6')" :class="{'active':curId === '6'}"><a href="javascript:void(0);">客户申诉</a></dd>-->
              </dl>
            </transition>
          </li>
        </ul>
      </div>
      <welcome v-if="curId === '1'" :user-info="arrUserInfo" @tranfCurId="getCurId"></welcome>
      <extend-effect v-if="curId === '3'"></extend-effect>
      <user-info v-if="curId === '4'" :user-info="arrUserInfo" @tranfCurId="getCurId"></user-info>
      <web-manage v-if="curId === '5'"></web-manage>
      <make-appeal v-if="curId === '6'"></make-appeal>
      <update-user-info v-if="curId === '7'" :user-info="arrUserInfo" @tranfCurId="getCurId" @tranfStatus="getStatus"></update-user-info>
      <div class="clear"></div>
    </div>
    <wfooter></wfooter>
  </div>
</template>

<script>
  import { agentsitecurrent } from '@/api/web/sl'
  import wheader from '../common/wheader'
  import wfooter from '../common/wfooter'
  import welcome from './welcome'
  import userList from './userList'
  import extendEffect from './extendEffect'
  import userInfo from './acountInfo/userInfo'
  import updateUserInfo from './acountInfo/updateUserInfo'
  import webManage from './acountInfo/webManage'
  import makeAppeal from './acountInfo/makeAppeal'
  import { mapState } from 'vuex'
  export default {
    name: "userCenter",
    data:function(){
      return{
        curId : '1',
        show : true,
        arrUserInfo:'',//代理商信息
      }
    },
    components:{
      wheader,
      welcome,
      userList,
      extendEffect,
      userInfo,
      updateUserInfo,
      webManage,
      makeAppeal,
      wfooter
    },
    // computed: mapState({
    //   arrUserInfo: state => state.userInfo.arrUserInfo
    // }),
    mounted () {
      if(this.$route.query.curId){
        this.curId = this.$route.query.curId
      }
      console.log(this.curId);
      this.query();
      // this.$store.dispatch('getUserInfo')
    },
    methods:{
      query(){
        this._agentsitecurrent();
      },
      getCurId(msg){
        this.curId = msg;
      },
      getStatus(msg){
        if(msg==='success') this.query();
      },
      change (url,curId) {
        this.curId = curId
        this.$router.push({path: url, query:{curId: curId}});
        // location.reload()
      },
      _agentsitecurrent() {
        agentsitecurrent().then(res => {
          //console.log(res);
          if (res.result === "000000") {
            this.arrUserInfo = res.data;
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

<style scoped>
  .slide-enter-active {
    transition: all .3s linear;
  }
  .slide-leave-active {
    transition: all .3s linear;
  }
  .slide-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>

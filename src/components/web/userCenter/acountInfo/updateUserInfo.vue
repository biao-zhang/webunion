<template>
  <div class="lmc_rt">
    <div class="lmc_basebox">
      <div class="lmcbs_tit">
        <div class="lmcbs_img">
          <img src="/static/images/lm_tx.png" width="85" height="85" />
          <!--<input type="file" class="lmcf_file">-->
          <!--<span class="file_tip">点击头像可进行更改</span>-->
        </div>
        <p>{{userInfo.userLoginname}}，欢迎您！</p>
      </div>
      <div class="lmcbs_con">
        <div class="lmcbs_item">
          <div class="lmcbs_tt"><span class="lmcbs_sp"><i class="lmcbs_fg"></i><strong>个人信息</strong></span></div>
          <div class="lmcbs_info update">
            <div class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>真实姓名：</span>
              <input type="text" class="lmcp_inp" v-model="userName" :disabled="disabled"/>
            </div>
            <label class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>邮&nbsp;&nbsp;箱：</span>
              <input type="text" class="lmcp_inp" value="452698321@qq.com" v-model="userEmail"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>手 机 号：</span>
              <input type="text" class="lmcp_inp" value="18810934109" v-model="userMobile" :disabled="teldisabled"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>身份证号：</span>
              <input type="text" class="lmcp_inp" value="411021199409015041" v-model="userIdcard" :disabled="disabled"/>
            </label>
          </div>
        </div>
        <div class="lmcbs_item">
          <div class="lmcbs_tt"><span class="lmcbs_sp"><i class="lmcbs_fg"></i><strong>收款人信息</strong></span></div>
          <div class="lmcbs_info update">
            <label class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>收 款 人：</span>
              <input type="text" class="lmcp_inp"  v-model="agentReceiptperson" :disabled="disabled"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>收款银行：</span>
              <input type="text" class="lmcp_inp"  v-model="agentReceiptbankname" :disabled="disabled"/>
            </label>
            <label class="lmcb_lab">
              <span class="lmcp_sp1"><font>*</font>收款账户：</span>
              <input type="text" class="lmcp_inp"  v-model="agentReceiptaccountno" :disabled="disabled"/>
            </label>
          </div>
        </div>
        <div class="lmbg_btnbox">
          <input type="button" value="提 交" class="lmbg_btn" @click="update">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { agentedit } from '@/api/web/sl'
  export default {
    name: "updateUserInfo",
    props: ['userInfo'],
    data(){
      return {
        userName:'',//用户真实姓名
        userEmail:'',//邮箱
        userMobile:'',//手机号
        userIdcard:'',//身份证号
        agentReceiptperson:'',//收款人
        agentReceiptbankname:'',//收款银行
        agentReceiptaccountno:'',//收款账户
        disabled:false,//禁用状态
        teldisabled:true,//手机禁用状态
      }
    },
    watch: {
      userInfo() {
        this.init(this.userInfo);
      }
    },
    mounted(){
      this.init(this.userInfo);
    },
    methods:{
      init(val){
        this.userName = val.userName;//用户真实姓名
        this.userEmail = val.userEmail;//邮箱
        this.userMobile = val.userMobile;//手机号
        this.userIdcard = val.userIdcard;//身份证号
        this.agentReceiptperson = val.agentReceiptperson;//收款人
        this.agentReceiptbankname = val.agentReceiptbankname;//收款银行
        this.agentReceiptaccountno = val.agentReceiptaccountno;//收款账户
        console.log(val.agentAuthstatus);
        if(val.agentAuthstatus==='Y') this.disabled = true;
      },
      update(){
        if(this.userName===''){
          this.$alert('真实姓名不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if(this.userEmail===''){
          this.$alert('邮箱不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if(this.userIdcard===''){
          this.$alert('身份证号不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if(this.agentReceiptperson===''){
          this.$alert('收款人不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if(this.agentReceiptbankname===''){
          this.$alert('收款银行不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if(this.agentReceiptaccountno===''){
          this.$alert('收款账户不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        this._agentedit();
      },
      _agentedit(){
        let params = {
          userName:this.userName,//用户真实姓名
          userEmail:this.userEmail,//邮箱
          userMobile:this.userMobile,//手机号
          userIdcard:this.userIdcard,//身份证号
          agentReceiptperson:this.agentReceiptperson,//收款人
          agentReceiptbankname:this.agentReceiptbankname,//收款银行
          agentReceiptaccountno:this.agentReceiptaccountno//收款账户
        }
        agentedit({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.code==="0000"||res.result==="000000"){
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/web/userCenter?curId=4');
                this.$emit("tranfCurId",'4');
                this.$emit("tranfStatus",'success');
              }
            })
          }else{
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

</style>

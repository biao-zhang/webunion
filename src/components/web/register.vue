<template>
  <div>
    <wheader></wheader>
    <div class="lm_lognbox">
      <div class="lm_register">
        <form @keyup.enter="enter">
        <div class="rest_box">
          <div class="rest_tt"><span class="rest_sp"><i class="rest_fg"></i><strong>账号注册</strong></span></div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>用户账号：</span>
            <input type="text" class="rest_inp" placeholder="请输入用户名" v-model="userLoginname"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>代理商名称：</span>
            <input type="text" class="rest_inp" placeholder="请输入代理商名称" v-model="agentName"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>手 机 号：</span>
            <input type="text" class="rest_inp" placeholder="请输入手机号" v-model="userMobile"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>图形验证码：</span>
            <input type="text" class="rest_yzm" placeholder="请输入验证码" style="float: left;" v-model="captcha"/>
            <div style="float: left;padding:10px 0 0 10px;">
              <captcha-image @tranferCaptchaToken="getCaptchaToken" :captcha-scene="captchaScene"></captcha-image>
            </div>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>验 证 码：</span>
            <input type="text" class="rest_yzm" placeholder="请输入验证码" v-model="verifyCode"/>
            <get-tel-code :tel-params="{userMobile:userMobile,captchaToken:captchaToken,captcha:captcha,sence:sence}"></get-tel-code>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>密  码：</span>
            <input type="password" class="rest_inp" placeholder="请输入至少6位数密码" v-model="userLoginpwd"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>网站名称：</span>
            <input type="text" class="rest_inp" placeholder="请输入网站名称" v-model="agentsiteName"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>网站地址：</span>
            <input type="text" class="rest_inp" placeholder="请输入网站地址" v-model="agentsiteUrl"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name">网站介绍：</span>
            <textarea class="rest_area" placeholder="请用一句话介绍自己的网站，250字以内" v-model="agentsiteMemo"></textarea>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>邮 箱：</span>
            <input type="text" class="rest_inp" placeholder="请输入邮箱" v-model="userEmail"/>
          </div>
          <label class="rest_xybox">
            <Checkbox v-model="checked"></Checkbox>&nbsp;阅读并同意<a href="" class="rest_xy">《用户注册协议》</a></label>
          <div class="rest_btnbox">
            <input type="button" class="rest_btn" value="提 交" @click="regist"/>
          </div>
        </div>
        </form>
      </div>
    </div>
    <wfooter></wfooter>
  </div>
</template>

<script>
  import wheader from './common/wheader'
  import wfooter from './common/wfooter'
  import captchaImage from './captchaImage'
  import getTelCode from './getTelCode'
  import { Checkbox } from 'element-ui'
  import { regist } from '@/api/web/uc'
  export default {
    name: "register",
    components:{
      wheader,
      wfooter,
      captchaImage,
      getTelCode,
      Checkbox
    },
    data () {
      return {
        userLoginname:'',//用户名
        agentName:'',//代理商名称
        userLoginpwd:'',//登录密码
        userMobile:'',//用户手机号
        userFlag:'A',//用户类型：A代理商
        verifyCode:'',//短信验证码
        captcha:'',//图形验证码
        agentsiteName:'',//代理商网站名称
        agentsiteUrl:'',//代理商网站地址
        agentsiteMemo:'',//代理商网站描述
        userEmail:'',//用户邮箱
        checked:true,
        captchaToken:'',//图片凭证标识
        sence:'uc_regist',//发送短信场景
        captchaScene:'ms_sms_verifyCode_send',//获取图片验证码场景
      }
    },
    created(){
      // let $this = this;
      // document.onkeydown=function(e) {
      //   var key = window.event.keyCode;
      //   if (key == 13) {
      //     $this.regist();
      //   }
      // }
    },
    methods:{
      enter(){
        this.regist();
      },
      regist(){
        if(this.userLoginname===''){
          this.$alert('用户名不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if(this.agentName===''){
          this.$alert('代理商名称不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.userMobile==='') {
          this.$alert('手机号不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.verifyCode==='') {
          this.$alert('验证码不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.userLoginpwd==='') {
          this.$alert('密码不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.agentsiteName==='') {
          this.$alert('网站名称不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.agentsiteUrl==='') {
          this.$alert('网站地址不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.userEmail==='') {
          this.$alert('邮箱不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(!this.checked) {
          this.$alert('请先同意用户注册协议', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        this._regist();
      },
      getCaptchaToken(msg){
        this.captchaToken = msg;
      },
      _regist(){
        let params ={
          userLoginname:this.userLoginname,//用户名
          userLoginpwd:this.userLoginpwd,//登录密码
          userMobile:this.userMobile,//用户手机号
          userEmail:this.userEmail,//用户邮箱
          userFlag:this.userFlag,//用户类型：A代理商
          verify:{verifyValue:this.verifyCode},//短信验证码
          ext:{
            agentName:this.agentName,//代理商名称
            agentsites:[{
              agentsiteName:this.agentsiteName,//代理商网站名称
              agentsiteUrl:this.agentsiteUrl,//代理商网站地址
              agentsiteMemo:this.agentsiteMemo//代理商网站描述
            }]
          }
        };
        regist({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==='000000'){
            this.$alert('注册成功！', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/web/login');
              }
            });
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
          }
        })
      },
    }
  }
</script>

<template>
  <div>
    <div class="web_zz"></div>
    <div class="web_box">
      <div class="web_tt">
        <span>{{title}}</span>
        <i class="web_close" @click="transShow"></i>
      </div>
      <div class="web_con">
        <label class="web_lab">
          <span class="web_name">网站名称：</span>
          <input type="text" placeholder="如：优路教育联盟" class="web_inp" v-model="agentsiteName">
        </label>
        <label class="web_lab">
          <span class="web_name">网站地址：</span>
          <input type="text" placeholder="如：http//" class="web_inp" v-model="agentsiteUrl">
        </label>
        <label class="web_lab">
          <span class="web_name">网站描述：</span>
          <textarea placeholder="可以针对网站人群、网站作用、网站流量等介绍" class="web_area" v-model="agentsiteMemo"></textarea>
        </label>
        <label class="web_lab">
          <span class="web_name">备案信息：</span>
          <input type="text" placeholder="请输入您网站的ICP备案信息" class="web_inp" v-model="agentsiteIcp">
        </label>
        <div class="web_bm">
          <input type="button" value="保存" class="web_submit" @click="add">
          <input type="button" value="取消" class="web_cancel" @click="transShow">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { agentsiteadd,agentsiteinfo,agentsiteedit } from '@/api/web/sl'
  export default {
    name: "addWeb",
    data(){
      return{
        title:'新增网站',//标题
        agentsiteName:'',//代理商网站名称
        agentsiteUrl:'',//代理商网站URL
        agentsiteMemo:'',//代理商网站备注
        agentsiteIcp:'',//代理商网站ICP
      }
    },
    props:['webId','type'],
    mounted(){
      if(this.type === 'add'){
        this.title = '新增网站';
      }else{
        this.title = '修改网站';
        this.agentsiteId = this.webId;
        this._agentsiteinfo();
      }
    },
    methods: {
      add(){
        if(this.type === 'add') this._agentsiteadd();
        else this._agentsiteedit();
      },
      transShow() {
        this.$emit('transShow', false);
      },
      _agentsiteadd(){
        let params = {
          agentsiteName:this.agentsiteName,//栏目标识
          agentsiteUrl:this.agentsiteUrl,//文章标题
          agentsiteMemo:this.agentsiteMemo,//文章推荐状态
          agentsiteIcp:this.agentsiteIcp,	//文章热点状态
        }
        agentsiteadd({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.code==="0000"||res.result==="000000"){
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$emit('transShow', false);
                this.$emit('transStatus', 'success');
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
      _agentsiteinfo(){
        let params ={
          agentsiteId:this.agentsiteId//代理商网站标识
        };
        agentsiteinfo({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==="000000"){
            this.agentsiteName = res.data.agentsiteName;
            this.agentsiteUrl = res.data.agentsiteUrl;
            this.agentsiteMemo = res.data.agentsiteMemo;
            this.agentsiteIcp = res.data.agentsiteIcp;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
        })
      },
      _agentsiteedit(){
        let params = {
          agentsiteId:this.agentsiteId,//代理商网站标识
          agentsiteName:this.agentsiteName,//栏目标识
          agentsiteUrl:this.agentsiteUrl,//文章标题
          agentsiteMemo:this.agentsiteMemo,//文章推荐状态
          agentsiteIcp:this.agentsiteIcp,	//文章热点状态
        }
        agentsiteedit({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.code==="0000"||res.result==="000000"){
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$emit('transShow', false);
                this.$emit('transStatus', 'success');
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
    },
  }
</script>

<style scoped>

</style>

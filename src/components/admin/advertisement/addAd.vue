<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="back_btn" @click="back">返回</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="rest_box">
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>文字名称：</span>
            <input type="text" class="rest_inp"  v-model="advName"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>业务类型：</span>
            <get-projects  @transferProjectId="getProjectId" :project-name="projectName"></get-projects>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>地  址：</span>
            <input type="text" class="rest_inp" v-model="advLink"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name">状态：</span>
            <div style="line-height: 40px;">
            <Radio v-model="advAvlstatus" label="Y">启用</Radio>
            <Radio v-model="advAvlstatus" label="N">禁用</Radio>
            </div>
          </div>
          <div class="rest_btnbox" v-show ="!(type==='query')">
            <input type="button" class="rest_btn" value="提 交" @click="add" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import getProjects from './getProjects'
  import { Radio } from 'element-ui'
  import { addTextadv,textadvInfo,updateTextadv } from '@/api/admin/sl'

  export default {
    name: 'addAd',
    components: {
      EHeader,
      getProjects,
      Radio
    },
    data () {
      return {
        advName:'',
        projectId:'',
        projectName:'',
        advLink:'',
        advAvlstatus:'Y',
        type:this.$route.query.type,
        advId:this.$route.query.advId,
      }
    },
    mounted(){
      if(this.type==="query"||this.type==="update") this._textadvInfo();
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      add(){
        if(this.advName===''){
          this.$alert('广告名称不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.projectId===''){
          this.$alert('请先选择项目', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.advLink==='') {
          this.$alert('地址不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.type==="update") this._updateTextadv();
        else this._addTextadv();
      },
      getProjectId(msg){
        this.projectId = msg;
      },
      _addTextadv(){
        let params ={
          advName:this.advName,//文字广告名称
          projectId:this.projectId,//所属项目
          advLink:this.advLink,//地址
          advAvlstatus:this.advAvlstatus,//状态
        };
        addTextadv({
          params: JSON.stringify(params)
        }).then( res => {
          if(res.result==='000000'){
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/admin/adListAll');
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
      _updateTextadv(){
        let params ={
          advId:this.advId,//广告编号
          advName:this.advName,//文字广告名称
          projectId:this.projectId,//所属项目
          advLink:this.advLink,//地址
          advAvlstatus:this.advAvlstatus,//状态
        };
        updateTextadv({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==='000000'){
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/admin/adListAll');
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
      _textadvInfo(){
        let params ={
          advId:this.advId//文字广告名称
        };
        textadvInfo({
          params: JSON.stringify(params)
        }).then( res => {
          if(res.result==="000000"){
            console.log(res);
            this.advName = res.data.advName;
            this.projectId = res.data.projectId;
            this.projectName = res.data.projectName;
            this.advLink = res.data.advLink;
            this.advAvlstatus = res.data.advAvlstatus;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
        })
      }
    }
}
</script>

<style scoped>

</style>

<template>
  <div class="lm_adcon">
    <div class="lmad_tt">
      <div class="lma_lab">所属项目:
        <get-projects @transferProjectId="getProjectId"></get-projects>
      </div>
      <label class="lma_lab">图片名称：<input type="text" class="lma_inp" v-model="advName"></label>
      <input type="button" value="查询" class="lma_btn" @click="query">
    </div>
    <div class="lmad_con">
      <table>
        <tr>
          <th width="24%">编号</th>
          <th width="30%">文字广告名称</th>
          <th width="20%">所属项目</th>
          <th width="24%">操作</th>
        </tr>
        <tr v-if="count===0"><td colspan="4">暂无数据！</td></tr>
        <tr v-for="item in textadvlist" v-else>
          <td>{{item.advId}}</td>
          <td>{{item.advName}}</td>
          <td>{{item.projectName}}</td>
          <td><a href="javascript:void(0);" class="lma_a" @click="getAdCode(item.advId)">获取代码链接</a></td>
        </tr>
      </table>
      <div class="page" v-show="count>pageSize">
        <pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="count"
        ></pagination>
      </div>
    </div>
    <ad-code :transAdvId="advId" :transAdvType="advType" v-if="show" @transShow="getShow"></ad-code>
  </div>
</template>

<script>
  import {Select, Option,Pagination} from 'element-ui'
  import getProjects from './getProjects'
  import adCode from './adCode'
  import { advtextlist } from '@/api/web/sl'
  export default {
    name: "adWord",
    components:{
      Select,
      Option,
      getProjects,
      Pagination,
      adCode,
    },
    data(){
      return{
        value:'',
        advType:'1',//广告类型：1文字广告
        advName:'',//广告名称
        pageIndex:1,//当前页码
        pageSize:8,//每页显示数量
        count:0,//总数量
        textadvlist:'',//
        projectId:'',//所属项目Id
        advId:'',//广告编号
        show:false,
      }
    },
    mounted(){
      this.query();
    },
    methods:{
      query(){
        this._advtextlist();
      },
      getAdCode(val){
        this.advId = val;
        this.show = true;
      },
      _advtextlist(){
        let params = {
          advName : this.advName, //文字广告名称
          projectId : this.projectId, //所属项目
          pageIndex:this.pageIndex,//页码
          pageSize : this.pageSize,//每页显示数量
        }
        advtextlist({
          params: JSON.stringify(params)
        }).then( res => {
          if(res.result!="000000"){
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }else{
            this.count = res.data.count;
            this.textadvlist = res.data.data;
            console.log('文字广告列表', res);
          }
        })
      },
      getProjectId(msg){
        this.projectId = msg;
      },
      handleCurrentChange(val){
        this.pageIndex = val;
        this.query();
      },
      getShow(msg){
        this.show = msg;
      },
    }
  }
</script>

<style scoped>

</style>

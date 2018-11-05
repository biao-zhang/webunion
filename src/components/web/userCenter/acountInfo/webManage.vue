<template>
  <div class="lmc_rt">
    <div class="lmc_basebox">
      <div class="webm_tit">
        <a href="javascript:void(0);" class="webm_sp" @click="add('add')">添加网站</a>
      </div>
      <div class="webm_con">
        <table>
          <tr>
            <th width="10%">网站 ID</th>
            <th width="12%">网站名称</th>
            <th width="20%">网站地址</th>
            <th width="15%">登记时间</th>
            <th width="12%">审核状态</th>
            <th width="20%">网站介绍</th>
            <th width="10%">操作</th>
          </tr>
          <tr v-if="count===0"><td colspan="7">暂无数据！</td></tr>
          <tr v-for="item in webList">
            <td>{{item.agentsiteId}}</td>
            <td>{{item.agentsiteName}}</td>
            <td><a v-bind:href=item.agentsiteUrl  class="webm_a">{{item.agentsiteUrl}}</a></td>
            <td>{{item.agentsiteCreatetime}}</td>
            <td v-if="item.agentsiteAuthstatus==='Y'">通过</td>
            <td v-else>未通过</td>
            <td><p>{{item.agentsiteMemo}}</p></td>
            <td>
              <a href="javascript:void(0);" class="webm_del" @click="add('update',item.agentsiteId)">修改</a>
              <a href="javascript:void(0);" class="webm_del" @click="del(item.agentsiteId)">删除</a>
            </td>
          </tr>
        </table>
      </div>
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
    <add-web v-if="show" @transShow="getShow" @transStatus="getStatus" :webId="webId" :type="type"></add-web>
  </div>
</template>

<script>
  import { agentsitelist,agentsitedelete } from '@/api/web/sl'
  import addWeb from './addWeb'
  import {Pagination} from 'element-ui'
  export default {
    name: "webManage",
    components:{
      Pagination,
      addWeb
    },
    data(){
      return{
        webList:'',
        pageIndex:0,//当前页
        pageSize :8,//每页数量
        count:0,//总数量
        show:false,
        webId:'',//网站id
        type:'',//操作类型
      }
    },
    mounted(){
      this.query();
    },
    methods:{
      del(agentsiteId){
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._agentsitedelete(agentsiteId);
        }).catch(() => {
        });
      },
      query(){
        this._agentsitelist();
      },
      _agentsitelist() {
        let params = {
          pageIndex: this.pageIndex, //广告Id
          pageSize: this.pageSize,//广告类型
        }
        agentsitelist({
          params: JSON.stringify(params)
        }).then(res => {
          console.log(res);
          if (res.result === "000000") {
            this.count = res.data.count;
            this.webList = res.data.data;
          } else {
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _agentsitedelete(agentsiteId){
        let params = {
          agentsiteId : agentsiteId,//代理商网站标识
        }
        agentsitedelete({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.code==="0000"||res.result==="000000"){
            this.query();
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      handleCurrentChange(val){
        this.pageIndex = (val-1)*this.pageSize;
        this.query();
      },
      getShow(msg){
        this.show = msg;
      },
      getStatus(msg){
        if(msg==='success') this.query();
      },
      add(type,id){
        this.type = type
        this.webId = id;
        this.show = true;
      },

    },
  }
</script>

<style scoped>

</style>

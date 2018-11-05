<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="add_btn" @click="addConsult('add')">添加资讯</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="lmad_tt">
          <label class="lma_lab">标题：<input type="text" class="lma_inp" v-model="articleTitle"></label>
          <label class="lma_lab">所属栏目：
            <div style="display: inline-block;position: relative;">
              <lanmu-select @tranfLanmuId="getLanmuId"></lanmu-select>
            </div>
          </label>
          <label class="lma_lab">状态：
            <div style="display: inline-block;position: relative;">
              <Select v-model="articleAvlstatus" placeholder="请选择">
                <Option
                  :key="item.value"
                  v-for="item in articleAvlstatusOptions"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </label>
          <label class="lma_lab secd">创建时间：
            <date-picker
              v-model="startInputertime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期">
            </date-picker>
            <span class="lma_tsp">至</span>
            <date-picker
              v-model="endInputertime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束日期">
            </date-picker>
          </label>
          <input type="button" value="查询" class="lma_btn" @click="query">
        </div>
        <div class="lma_box">
          <div class="lmad_con">
            <table>
              <tr>
                <th width="18%">编号</th>
                <th width="20%">标题</th>
                <th width="15%">所属栏目</th>
                <th width="8%">点击量</th>
                <th width="9%">前台显示状态</th>
                <th width="8%">创建人</th>
                <th width="12%">创建时间</th>
                <th width="10%">操作</th>
              </tr>
              <tr v-if="count===0"><td colspan="8">暂无数据！</td></tr>
              <tr v-for="item in articleList" v-else>
                <td>{{item.articleId}}</td>
                <td>{{item.articleTitle}}</td>
                <td>{{item.CLASSNAME}}</td>
                <td>{{item.articleHits}}</td>
                <td v-if="item.articleAvlstatus==='Y'">正常</td>
                <td v-else>禁用</td>
                <td>{{item.articleInputer}}</td>
                <td>{{item.articleInputertime}}</td>
                <td>
                  <a href="javascript:void(0);" class="lma_a" @click="addConsult('update',item.articleId)">修改</a>
                  <a href="javascript:void(0);" class="lma_a" @click="del(item.articleId)">删除</a>
                </td>
              </tr>
            </table>
          </div>
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
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import {articlelist,articledelete} from '@/api/admin/cm'
  import lanmuSelect from './lanmuSelect'
  import { Select, Option, Pagination,DatePicker } from 'element-ui'

  export default {
    name: "consultList",
    components: {
      EHeader,
      Select,
      Option,
      Pagination,
      DatePicker,
      lanmuSelect
    },
    data(){
      return{
        articleTitle:'',//文章标题
        classId:'',//栏目标识
        articleAvlstatus:'',//文章可用状态
        articleDelstatus:'Y',//文章删除状态
        startInputertime:'',//开始时间
        endInputertime:'',//结束时间
        articleAvlstatusOptions:[{value:"Y",label:"正常"},{value:"N",label:"禁用"}],
        pageIndex:0,//当前页
        pageSize:8,//每页显示数量
        count:0,//总数量
        articleList:[],
        articleId:''//文章编号
      }
    },
    mounted(){
      this.query();
    },
    methods: {
      query(){
        this._articlelist();
      },
      del(articleId){
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._articledelete(articleId);
        }).catch(() => {
        });
      },
      addConsult (type,id) {
        if(type==="add"){
          this.$router.push('/admin/addConsultAll');
        }else{
          this.$router.push({path:'/admin/addConsultAll',query:{type:type,articleId:id}});
        }
      },
      getLanmuId(msg){
        this.classId = msg;
      },
      _articlelist(){
        let params = {
          articleTitle : this.articleTitle,//文章标题
          classId : this.classId,//栏目标识
          articleAvlstatus : this.articleAvlstatus,//文章可用状态
          articleDelstatus:this.articleDelstatus,//文章删除状态
          startInputertime:this.startInputertime,//开始时间
          endInputertime:this.endInputertime,//结束时间
          pageIndex:this.pageIndex,//当前页
          pageSize:this.pageSize,//每页显示数量
        }
        articlelist({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.code==="0000"||res.result==="000000"){
            this.count = res.data.count;
            this.articleList = res.data.data;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _articledelete(articleId){
        let params = {
          articleId : articleId,//文章标题
        }
        articledelete({
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
      }
    }
  }
</script>

<style scoped>

</style>

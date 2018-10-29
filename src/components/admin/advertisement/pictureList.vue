<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="add_btn" @click="addPicture('add')">添加图片广告</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="lmad_tt">
          <label class="lma_lab">图片广告名称：<input type="text" class="lma_inp" v-model="advName"></label>
          <div class="lma_lab">所属项目：
            <get-projects @transferProjectId="getProjectId"></get-projects>
          </div>
          <label class="lma_lab">地址：<input type="text" class="lma_inp" v-model="advLink"></label>
          <label class="lma_lab">状态：
            <div style="display: inline-block;position: relative;">
              <Select v-model="advAvlstatus" placeholder="请选择">
                <Option
                  :key="item.value"
                  v-for="item in advStatusOptions"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </label>
          <label class="lma_lab secd">创建时间：
            <date-picker
              v-model="adv_StartDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期">
            </date-picker>
            <span class="lma_tsp">至</span>
            <date-picker
              v-model="adv_EndDate"
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
                <th width="14%">编号</th>
                <th width="10%">图片广告名称</th>
                <th width="12%">所属业务类型</th>
                <th width="10%">图片尺寸</th>
                <th width="10%">预览</th>
                <th width="18%">地址</th>
                <th width="6%">状态</th>
                <th width="10%">创建时间</th>
                <th width="10%">操作</th>
              </tr>
              <tr v-if="count===0"><td colspan="9">暂无数据！</td></tr>
              <tr  v-for="item in imageadvlist" v-else>
                <td>{{item.advId}}</td>
                <td>{{item.advName}}</td>
                <td>{{item.projectName}}</td>
                <td>{{item.advPicsize}}</td>
                <td><img v-bind:src=file_imgSrc+item.advPicpath class="lma_img"></td>
                <td>{{item.advLink}}</td>
                <td v-if="item.advAvlstatus==='Y'">正常</td>
                <td v-else>禁用</td>
                <td>{{item.advCreatetime}}</td>
                <td>
                  <a href="javascript:void(0);" class="lma_a" @click="addPicture('query',item.advId)">查看</a>
                  <a href="javascript:void(0);" class="lma_a" @click="addPicture('update',item.advId)">修改</a>
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
  import getProjects from './getProjects'
  import { imageadvlist } from '@/api/admin/sl'
  import { Select, Option, Pagination,DatePicker } from 'element-ui'

  export default {
    name: 'pictureList',
    components: {
      EHeader,
      Select,
      Option,
      Pagination,
      DatePicker,
      getProjects
    },
    data () {
      return {
        advName:'',
        projectId:'',
        advLink:'',
        adv_StartDate:"",
        adv_EndDate:"",
        advAvlstatus:'',
        advStatusOptions:[{value:"Y",label:"正常"},{value:"N",label:"禁用"}],
        pageIndex:1,
        pageSize:8,
        imageadvlist:[{
          advId:'0526389',
          advName:'优路教育网',
          projectName:'一级建造师',
          advPicsize:'960*90',//广告图片尺寸
          advPicpath:'path',//广告图片地址
          advLink:'www.niceloo.com',
          advAvlstatus:'启用',
          advCreatetime:'2018-08-27 10:45'
        }],
        count:0,
        file_imgSrc:'',
      }
    },
    mounted () {
      this.query();
      this.file_imgSrc = this.GLOBAL.file_imgSrc;
    },
    methods: {
      addPicture (type,id) {
        if(type==="add") {
          this.$router.push('/admin/addPictureAll')
        }else{
          this.$router.push({path:'/admin/addPictureAll',query:{type:type,advId:id}});
        }
      },
      query () {
        if(this.adv_StartDate>this.adv_EndDate){
          this.$alert('结束时间不能小于开始时间', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        this._imageadvlist()
      },
      _imageadvlist(){
        let params = {
          advName : this.advName, //图片广告名称
          projectId : this.projectId, //所属项目
          advLink : this.advLink, //地址
          advAvlstatus:this.advAvlstatus, //状态
          adv_StartDate:this.adv_StartDate, //开始时间
          adv_EndDate:this.adv_EndDate, //结束时间
          pageIndex:this.pageIndex,//页码
          pageSize : this.pageSize,//每页显示数量
        }
        imageadvlist({
          params: JSON.stringify(params)
        }).then( res => {
          console.log('图片广告列表', res);
          if(res.result==="000000"){
            console.log('图片广告列表', res);
            this.count = res.data.count;
            this.imageadvlist = res.data.data;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      getProjectId(msg){
        this.projectId = msg;
      },
      handleCurrentChange(val){
        this.pageIndex = val;
        this.query();
      }
    }
}
</script>

<style scoped>

</style>

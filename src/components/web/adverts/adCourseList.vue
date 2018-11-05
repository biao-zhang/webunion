<template>
  <div>
    <get-items :advType="advType"  @dataList="getClassList" :tranfpageIndex="pageIndex" :pageSize="pageSize"></get-items>
    <div class="lm_adcon">
      <div class="lmad_con">
        <table>
          <tr>
            <th width="25%">编号</th>
            <th width="30%">课程名称</th>
            <th width="15%">价格</th>
            <th width="15%">操作</th>
          </tr>
          <tr v-if="count===0"><td colspan="5">暂无数据！</td></tr>
          <template v-for="items in lessionsList">
            <tr v-for="(item, index) in items.classList">
              <td v-bind:rowspan="items.classList.length" v-if="index===0">{{items.advId}}</td>
              <td>{{item.className}}</td>
              <td>{{item.classPrice}}</td>
              <td  v-bind:rowspan="items.classList.length" v-if="index===0"><a href="javascript:void(0);" class="lma_a" @click="getAdCode(item.advId)">获取代码链接</a></td>
            </tr>
          </template>
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
    </div>
    <ad-code :transAdvId="advId" :transAdvType="advType" v-if="show" @transShow="getShow"></ad-code>
  </div>
</template>

<script>
  import getItems from './getItems'
  import adCode from './adCode'
  import {Pagination} from 'element-ui'
  export default {
    name: "adCourseList",
    components:{
      getItems,
      adCode,
      Pagination
    },
    data(){
      return{
        advType:'4',//班级列表
        lessionsList:'',
        pageIndex:0,//当前页
        pageSize :8,//每页数量
        count:0,//总数量
        advId:'',//广告编号
        show:false,
      }
    },
    mounted(){

    },
    methods:{
      getClassList(msg) {
        this.count = msg.count;
        this.lessionsList = msg.data;

        console.log('msg',msg);
        console.log(this.count);
        console.log(this.lessionsList);
      },
      getAdCode(val){
        this.advId = val;
        this.show = true;
      },
      handleCurrentChange(val){
        this.pageIndex = (val-1)*this.pageSize;
      },
      getShow(msg){
        this.show = msg;
      },
    }
  }
</script>

<style scoped>

</style>

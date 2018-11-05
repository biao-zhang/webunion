<template>
    <div>
      <get-items :advType="advType"  @dataList="getClassList" :tranfpageIndex="pageIndex" :pageSize="pageSize"></get-items>
      <div class="lm_adcourse">
        <div v-if="count===0" style="height: 100px;text-align:center;"><p>暂无数据！</p></div>
        <div class="adcurs_item" v-for="item in lessionList" v-else>
          <div class="dcur_img">
            <img  v-bind:src=file_imgSrc+item.classPic width="310" height="200"/>
          </div>
          <div class="dcur_info">
            <p class="dcur_tt">{{item.className}}</p>
            <p class="dcur_p">
              <span class="dcur_pri">{{item.classPrice}}</span>
              <!--<span class="dcur_yj">佣金比例：<font>{{item.classRebateval}}</font></span>-->
            </p>
            <a href="javascript:void(0);" class="dcur_a" @click="getAdCode(item.advId)">获取广告代码</a>
          </div>
        </div>
        <div class="clear"></div>
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
      <ad-code :transAdvId="advId" :transAdvType="advType" v-if="show" @transShow="getShow"></ad-code>
    </div>
</template>

<script>
  import getItems from './getItems'
  import adCode from './adCode'
  import {Pagination} from 'element-ui'
  export default {
    name: "adCourse",
    components:{
      getItems,
      adCode,
      Pagination,
    },
    data(){
      return{
        advType:'3',//单个班级
        lessionList:'',
        pageIndex:0,//当前页
        pageSize :9,//每页数量
        count:0,//总数量
        advId:'',//广告编号
        show:false,
      }
    },
    mounted(){
      this.file_imgSrc = this.GLOBAL.file_imgSrc;
    },
    methods:{
      getClassList(msg) {
        this.count = msg.count;
        this.lessionList = msg.data;
        console.log(this.count);
        console.log(this.lessionList);
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

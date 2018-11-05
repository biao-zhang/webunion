<template>
  <div class="lmc_rt">
    <div class="lmc_exten">
      <ul class="exten_tab">
        <li @click="dateChange('1')" class="first" :class="{'active':dateType === '1'}"><a href="javascript:void(0);">今天</a></li>
        <li @click="dateChange('2')" :class="{'active':dateType === '2'}"><a href="javascript:void(0);">昨天</a></li>
        <li @click="dateChange('3')" :class="{'active':dateType === '3'}"><a href="javascript:void(0);">本周</a></li>
        <li @click="dateChange('4')" class="end" :class="{'active':dateType === '4'}"><a href="javascript:void(0);">本月</a></li>
      </ul>
      <div class="exten_con">
        <ul class="xsjb_tab">
          <li @click="typeChange('P')" class="first" :class="{'active':type === 'P'}"><a href="javascript:void(0);">浏览量（PV）</a></li>
          <li @click="typeChange('U')" class="end" :class="{'active':type === 'U'}"><a href="javascript:void(0);">独立访客（UV）</a></li>
        </ul>
        <my-echarts :datas="{typeName:typeName,xdata:xdata,ydata:ydata}"></my-echarts>
      </div>
    </div>
  </div>
</template>

<script>
  import { advstatistics } from '@/api/web/sl'
  import myEcharts from './myEcharts'
  export default {
    name: "extendEffect",
    components:{
      myEcharts
    },
    data:function(){
      return{
        dateType : '1',
        type : 'P',
        show : true,
        typeName:'小时',
        xdata:[],
        ydata:[],
        // xdata:['0','4', '8', '12', '16', '20','24'],
        // ydata:[2500, 2000, 4823, 3200, 3212, 6320,4532],
      }
    },
    mounted(){
      this._advstatistics();
    },
    methods:{
      dateChange(val){
        if(val==='3'||val==='4') this.typeName='天';
        else this.typeName = '小时';
        this.dateType = val;
        this._advstatistics();
      },
      typeChange(val){
        this.type = val;
        this._advstatistics();
      },
      _advstatistics() {
        let params = {
          dateType:this.dateType,//栏目标识
          type: this.type, //文章可用状态
        }
        advstatistics({
          params: JSON.stringify(params)
        }).then(res => {
          //console.log(res);
          if (res.result === "000000") {
            this.xdata = res.data.xdata;
            this.ydata = res.data.ydata;
          } else {
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

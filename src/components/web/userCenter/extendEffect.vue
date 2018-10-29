<template>
  <div class="lmc_rt">
    <div class="lmc_exten">
      <ul class="exten_tab">
        <li @click="curId = 1" class="first" :class="{'active':curId === 1}"><a href="javascript:void(0);">今天</a></li>
        <li @click="curId = 2" :class="{'active':curId === 2}"><a href="javascript:void(0);">昨天</a></li>
        <li @click="curId = 3" :class="{'active':curId === 3}"><a href="javascript:void(0);">本周</a></li>
        <li @click="curId = 4" class="end" :class="{'active':curId === 4}"><a href="javascript:void(0);">本月</a></li>
      </ul>
      <div class="exten_con">
        <ul class="xsjb_tab">
          <li @click="type = 1" class="first" :class="{'active':type === 1}"><a href="javascript:void(0);">浏览量（PV）</a></li>
          <li @click="type = 2" class="end" :class="{'active':type === 2}"><a href="javascript:void(0);">独立访客（UV）</a></li>
        </ul>
        <my-echarts  :typeName="typeName" :chartDatas="chartDatas"></my-echarts>
      </div>
    </div>
  </div>
</template>

<script>
  import myEcharts from './myEcharts'
  export default {
    name: "extendEffect",
    components:{
      myEcharts
    },
    data:function(){
      return{
        curId : 1,
        type : 1,
        show : true,
        typeName:'浏览量',
        chartDatas:[2500, 2000, 4823, 3200, 3212, 6320,4532],
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>

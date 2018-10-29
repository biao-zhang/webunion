<template>
  <div>
    <a v-bind:href=datalist.advLink><img v-bind:src=file_imgSrc+datalist.advPicpath /></a>
    <get-adv-data :advId="advId" :advType="advType" :agentId="agentId" @transData="getdata"></get-adv-data>
  </div>
</template>

<script>
  import getAdvData from './getAdvData'
  export default {
    name: "pictheme",
    data(){
      return{
        advId: this.$route.query.advId, //广告Id
        advType: this.$route.query.advType,//广告类型
        agentId:this.$route.query.agentId,//代理编号
        datalist:'',
        file_imgSrc:'',
      }
    },
    components:{
      getAdvData
    },
    mounted(){
      this.file_imgSrc = this.GLOBAL.file_imgSrc;
    },
    methods:{
      getdata(msg){
        this.datalist = msg;
      }
    },

  }
</script>

<style scoped>

</style>

<template>
  <div class="theme_item">
    <a v-bind:href="classlist.advLink+'&referer='+referer" target="_blank">
      <div class="dcur_img">
        <img v-bind:src=file_imgSrc+classlist.advPicpath width="310" height="200"/>
      </div>
      <div class="dcur_info">
        <p class="dcur_tt">{{classlist.className}}</p>
        <p class="dcur_p">
          <span class="dcur_pri">￥{{classlist.classPrice}}</span>
        </p>
      </div>
    </a>
    <get-adv-data :advId="advId" :advType="advType" :agentId="agentId" @transData="getdata"></get-adv-data>
  </div>
</template>

<script>
  import getAdvData from './getAdvData'
  export default {
    name: "classtheme",
    data(){
      return{
        advId: this.$route.query.advId, //广告Id
        advType: this.$route.query.advType,//广告类型
        agentId:this.$route.query.agentId,//代理编号
        referer:this.$route.query.referer,
        classlist:'',
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
        this.classlist = msg.classInfo;
      }
    },

  }
</script>

<style scoped>

</style>

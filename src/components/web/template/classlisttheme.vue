<template>
  <div class="classlist_theme">
    <table>
      <tr>
        <th width="33%">文字名称</th>
        <th width="20%">价格</th>
      </tr>
      <tr v-for="item in classList">
        <td><a v-bind:href="item.advLink+'&referer='+referer" target="_blank">{{item.className}}</a></td>
        <td>{{item.classPrice}}</td>
      </tr>
    </table>
    <get-adv-data :advId="advId" :advType="advType" :agentId="agentId" @transData="getdata"></get-adv-data>
  </div>
</template>

<script>
  import getAdvData from './getAdvData'
  export default {
    name: "classlisttheme",
    data(){
      return{
        advId: this.$route.query.advId, //广告Id
        advType: this.$route.query.advType,//广告类型
        agentId:this.$route.query.agentId,//代理编号
        referer:this.$route.query.referer,
        classList:[],
      }
    },
    components:{
      getAdvData
    },
    methods:{
      getdata(msg){
        this.classList = msg.classList;
      }
    },
  }
</script>

<style scoped>

</style>

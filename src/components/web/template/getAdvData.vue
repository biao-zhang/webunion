<template>
</template>

<script>
  import { advdata } from '@/api/web/sl'
  export default {
    name: "getAdvData",
    data(){
      return{
      }
    },
    props:['advId','advType','agentId'],
    mounted(){
      this._advdata();
    },
    methods:{
      _advdata() {
        let params = {
          advId: this.advId, //广告Id
          advType: this.advType,//广告类型
          agentId:this.agentId,//代理编号
        }
        advdata({
          params: JSON.stringify(params)
        }).then(res => {
          console.log(res);
          if (res.result === "000000") {
            this.$emit('transData',res.data);
          } else {
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>

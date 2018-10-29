<template></template>
<script>
  import { secondprojectlist } from '@/api/web/sl'
  export default {
    name: "secondProject",
    data(){
      return{
        advType:'',
      }
    },
    props:['transAdvType'],
    mounted(){
      this.advType = this.transAdvType;
      this._secondprojectlist();
    },
    methods:{
      _secondprojectlist(){
        let params ={
          advType:this.advType//广告类型
        };
        secondprojectlist({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==="000000"){
            console.log(res);
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>

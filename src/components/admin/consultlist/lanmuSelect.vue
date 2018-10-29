<template>
  <Select v-model="lanmuId" :placeholder="placeholder" @change="handleChange">
    <Option
      :key="item.value"
      v-for="item in lanmuList"
      :label="item.label"
      :value="item.value"
    ></Option>
  </Select>
</template>

<script>
  import { classlist } from '@/api/admin/cm'
  import { Select, Option } from 'element-ui'
  export default {
    name: "lanmuSelect",
    components: {
      Select,
      Option,
    },
    data(){
      return{
        placeholder:'请选择',
        lanmuId:'',
        lanmuList:[],
      }
    },
    props: ['transClassName'],
    watch: {
      transClassName(newValue, oldValue) {
        this.placeholder = newValue;
      }
    },
    mounted(){
      this._classlist();
    },
    methods: {
      _classlist(){
        let params = {
          classAvlstatus : 'Y',
          classDelstatus : 'Y',
        }
        classlist({
          params: JSON.stringify(params)
        }).then( res => {
          if(res.result==="000000"||res.code==="0000"){
            let arr = [];
            let data = res.data.datas;
            for(let i=0;i<data.length;i++){
              arr.push({
                value: data[i].classId,
                label: data[i].className
              });
            }
            this.lanmuList = arr;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      handleChange() {
        this.$emit('tranfLanmuId',this.lanmuId);
      },
    }
  }
</script>

<style scoped>

</style>

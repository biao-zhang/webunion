<template>
  <div class="lm_sxk">
    <div class="sxk_item">
      <span>项目:</span>
      <div class="sxk_con">
        <a href="javascript:void(0);" :class="{active :projectId===''}" @click="query('project','')">全选</a>
        <a href="javascript:void(0);" v-for="item in projectList" :class="{active :projectId===item.projectId}" @click="query('project',item.projectId)">{{item.projectName}}</a>
      </div>
      <div class="clear"></div>
    </div>
    <div class="sxk_item">
      <span>科目:</span>
      <div class="sxk_con">
        <a href="javascript:void(0);" :class="{active :subjectId===''}" @click="query('subject','')">全选</a>
        <a href="javascript:void(0);" v-for="item in subjectlist" :class="{active :subjectId===item.subjectId}" @click="query('subject',item.subjectId)">{{item.subjectName}}</a>
      </div>
      <div class="clear"></div>
    </div>
    <div class="sxk_item">
      <span>班型:</span>
      <div class="sxk_con">
        <a href="javascript:void(0);" :class="{active :classType===''}" @click="query('class','')">全选</a>
        <a href="javascript:void(0);" v-for="item in classTypeList" :class="{active :classType===item.classtypeId}" @click="query('class',item.classtypeId)">{{item.classtypeName}}</a>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import { secondprojectlist,subjectlist,classtypelist,lessionlist,lessionslist} from '@/api/web/sl'
  export default {
    name: "getItems",
    data(){
      return{
        projectList:'',//项目
        projectId:'',//项目标识
        subjectlist:'',//科目
        classTypeList:'',//班型
        subjectId:'',//科目标识
        classType:'',//班型
      }
    },
    props:['advType','tranfpageIndex','pageSize'],
    watch: {
      tranfpageIndex(newValue, oldValue) {
        this.pageIndex = newValue;
        this.typequery();
      }
    },
    mounted(){
      this.pageIndex = this.tranfpageIndex;
      this._secondprojectlist();
      this.typequery();
    },
    methods:{
      query(type,val){
        switch(type){
          case 'project':{
            this.projectId = val;
            if(val===''){
              this.subjectId = '';
              this.classType = '';
              this.subjectlist = '';
              this.classTypeList = '';
            }else{
              this._subjectlist();
              this._classtypelist();
            }
          }
            break;
          case 'subject':this.subjectId = val;break;
          case 'class':this.classType = val;break;
          default:;break;
        }
        this.typequery();
      },
      typequery(){
        switch(this.advType){
          case '3':this._lessionlist();break;
          case '4':this._lessionslist();break;
          default:;break;
        }
      },
      _secondprojectlist(){
        let params = {
          advType : this.advType, //广告类型
        }
        secondprojectlist({
          params: JSON.stringify(params)
        }).then( res => {
          //console.log(res);
          if(res.result==="000000"){
            this.projectList = res.data.data;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _subjectlist(){
        let params = {
          projectId : this.projectId, //项目id
          advType : this.advType, //广告类型
        }
        subjectlist({
          params: JSON.stringify(params)
        }).then( res => {
          //console.log(res);
          if(res.result==="000000"){
            this.subjectlist = res.data.data;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _classtypelist(){
        let params = {
          projectId : this.projectId, //项目id
          advType : this.advType, //广告类型
        }
        classtypelist({
          params: JSON.stringify(params)
        }).then( res => {
          //console.log(res);
          if(res.result==="000000"){
            this.classTypeList = res.data.data;
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _lessionlist(){
        let params = {
          projectId : this.projectId, //项目标识
          subjectId : this.subjectId,//科目编号
          classType : this.classType,//班型
          pageIndex : this.pageIndex,//当前页
          pageSize : this.pageSize,//每页数量
        }
        lessionlist({
          params: JSON.stringify(params)
        }).then( res => {
          if(res.result==="000000"){
            this.$emit('dataList',res.data);
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _lessionslist(){
        let params = {
          projectId : this.projectId, //项目标识
          subjectId : this.subjectId,//科目编号
          classType : this.classType,//班型
          pageIndex : this.pageIndex,//当前页
          pageSize : this.pageSize,//每页数量
        }
        lessionslist({
          params: JSON.stringify(params)
        }).then( res => {
          if(res.result==="000000"){
            this.$emit('dataList',res.data);
          }else{
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

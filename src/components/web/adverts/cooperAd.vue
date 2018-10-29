<template>
  <div>
    <wheader></wheader>
    <div class="lm_content">
      <div class="lm_adtab">
        <ul>
          <li @click="change('cooperAd','1')" :class="{'active':curId==='1'}"><a href="javascript:void(0);">文字广告</a></li>
          <li @click="change('cooperAd','2')" :class="{'active':curId==='2'}"><a href="javascript:void(0);">图片广告</a></li>
          <li @click="change('cooperAd','3')" :class="{'active':curId==='3'}"><a href="javascript:void(0);">课程广告</a></li>
          <li @click="change('cooperAd','4')" :class="{'active':curId==='4'}"><a href="javascript:void(0);">课程列表广告</a></li>
        </ul>
      </div>
      <ad-word  v-if="curId==='1'"></ad-word>
      <ad-picture v-if="curId==='2'"></ad-picture>
      <ad-course v-if="curId==='3'"></ad-course>
      <ad-course-list v-if="curId==='4'"></ad-course-list>
    </div>
    <wfooter></wfooter>
  </div>
</template>

<script>
  import wheader from '../common/wheader'
  import adWord from './adWord'
  import adPicture from './adPicture'
  import adCourse from './adCourse'
  import adCourseList from './adCourseList'
  import wfooter from '../common/wfooter'
    export default {
        name: "cooperAd",
        data:function(){
          return{
            curId : '1'
          }
        },
        components:{
          wheader,
          adWord,
          adPicture,
          adCourse,
          adCourseList,
          wfooter
        },
        mounted () {
          if(this.$route.query.curId){
            this.curId = this.$route.query.curId
          }

        },
        methods:{
          change (url,curId) {
            this.curId = curId
            this.$router.push({path: url, query:{curId: curId}});
          },
        }
    }
</script>

<style scoped>

</style>

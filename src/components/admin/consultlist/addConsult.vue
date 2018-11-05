<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="back_btn" @click="back">返回</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="rest_box">
          <div class="rest_lab">
            <span class="rest_name">标  题：</span>
            <input type="text" class="rest_inp" v-model="articleTitle"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name">所属栏目：</span>
            <div style="display: inline-block;position: relative;">
              <lanmu-select @tranfLanmuId="getLanmuId" :transClassName="className"></lanmu-select>
            </div>
          </div>
          <div class="rest_lab">
            <span class="rest_name">排序编号：</span>
            <input type="text" class="rest_inp" v-model="articleSeq"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name">创建人：</span>
            <input type="text" class="rest_inp" v-model="articleInputer"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name">外部链接：</span>
            <div style="line-height: 40px;">
              <Radio v-model="articleTurnurlStatus" label="Y">是</Radio>
              <Radio v-model="articleTurnurlStatus" label="N">否</Radio>
            </div>
          </div>
          <div class="rest_lab" v-show="articleTurnurlStatus==='Y'">
            <span class="rest_name">链接地址：</span>
            <input type="text" class="rest_inp" v-model="articleTurnurl"/>
          </div>
          <div class="rest_lab" v-show="articleTurnurlStatus==='N'">
            <span class="rest_name">正  文：</span>
            <div class="edit_box">
              <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
            </div>
            <div class="clear"></div>
          </div>
          <div class="rest_lab">
            <span class="rest_name">前台显示：</span>
            <div style="line-height: 40px;">
              <Radio v-model="articleAvlstatus" label="Y">是</Radio>
              <Radio v-model="articleAvlstatus" label="N">否</Radio>
            </div>
          </div>
          <div class="rest_btnbox">
            <input type="button" class="rest_btn" value="提 交" @click="add"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import UE from '../common/UE'
  import lanmuSelect from './lanmuSelect'
  import { Select, Option, Radio } from 'element-ui'
  import {articleadd,articleinfo,articleedit} from '@/api/admin/cm'

  export default {
    name: 'addConsult',
    components: {
      EHeader,
      UE,
      Select,
      Option,
      Radio,
      lanmuSelect
    },
    data() {
      return {
        classId:'',//栏目标识
        articleTitle:'',//文章标题
        articleRecommendstatus:'',//文章推荐状态
        articleHotstatus:'',	//文章热点状态
        articleTurnurl:'',//外部链接地址
        articleCopyfrom:'',	//文章来源
        articleInputer:'',//文章录入者
        articleAuthor:'',//文章作者
        articleCreatetime:'',	//文章创建时间
        articleSubscribe:'',	//文章摘要
        articleContent:'',//文章内容
        articlePicpath:'',	//文章图片路径
        articleHits:'',	//文章点击量
        articleSeotitle:'',//	文章优化标题
        articleSeokeywords:'',//	文章优化关键词
        articleSeomemo:'',//	文章优化描述
        articleAvlstatus:'Y',//前台是否显示-文章可用状态
        articleDelstatus:'Y',	//文章删除状态
        articleShowstatuswap:'Y',//	文章显示状态WAP
        articleShowstatuspc:'Y',//	文章显示状态PC
        articleShowstatusapp:'Y',//	文章显示状态APP
        articleSeq:'',//排序编号
        articleTurnurlStatus:'N',//是否是外部链接

        type:this.$route.query.type,
        articleId:this.$route.query.articleId,
        className:'',//栏目名称
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 200
        }

      }
    },
    mounted(){
      if(this.type==="update") this._articleinfo();
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      add(){
        if(this.articleTurnurlStatus==='N'){
          this.getUEContent();
          this.articleTurnurl = '';
        }
        if(this.type==="update") this._articleedit();
        else this._articleadd();
      },
      getLanmuId(msg){
        this.classId = msg;
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.articleContent = content;
      },
      setUEContent(val) {
        this.$refs.ue.setUEContent(val);
      },
      _articleadd(){
        let params = {
          classId:this.classId,//栏目标识
          articleTitle:this.articleTitle,//文章标题
          articleRecommendstatus:this.articleRecommendstatus,//文章推荐状态
          articleHotstatus:this.articleHotstatus,	//文章热点状态
          articleTurnurl:this.articleTurnurl,//是否外部链接
          articleCopyfrom:this.articleCopyfrom,	//文章来源
          articleInputer:this.articleInputer,//文章录入者
          articleAuthor:this.articleAuthor,//文章作者
          articleCreatetime:this.articleCreatetime,	//文章创建时间
          articleSubscribe:this.articleSubscribe,	//文章摘要
          articleContent:this.articleContent,//文章内容
          articlePicpath:this.articlePicpath,	//文章图片路径
          articleHits:this.articleHits,	//文章点击量
          articleSeotitle:this.articleSeotitle,//	文章优化标题
          articleSeokeywords:this.articleSeokeywords,//	文章优化关键词
          articleSeomemo:this.articleSeomemo,//	文章优化描述
          articleAvlstatus:this.articleAvlstatus,//前台是否显示-文章可用状态
          articleDelstatus:this.articleDelstatus,	//文章删除状态
          articleShowstatuswap:this.articleShowstatuswap,//	文章显示状态WAP
          articleShowstatuspc:this.articleShowstatuspc,//	文章显示状态PC
          articleShowstatusapp:this.articleShowstatusapp,//	文章显示状态APP
          articleSeq:this.articleSeq,//排序编号
        }
        articleadd({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.code==="0000"||res.result==="000000"){
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/admin/consultListAll');
              }
            })
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _articleinfo(){
        let params ={
          articleId:this.articleId//文字广告名称
        };
        articleinfo({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==="000000"){
            this.articleTitle = res.data.articleTitle;
            this.classId = res.data.classId;
            this.articleSeq = res.data.articleSeq;
            this.articleAuthor = res.data.articleAuthor;
            this.articleTurnurl = res.data.articleTurnurl;
            if(this.articleTurnurl==='') {
              this.articleTurnurlStatus = 'N';
              this.defaultMsg = res.data.articleContent;
            }else{
              this.articleTurnurlStatus = 'Y';
            }
            this.articleAvlstatus = res.data.articleAvlstatus;
            this.className = res.data.CLASSNAME;
            console.log(this.className);
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
        })
      },
      _articleedit(){
        let params = {
          articleId:this.articleId,//文章标识
          classId:this.classId,//栏目标识
          articleTitle:this.articleTitle,//文章标题
          articleRecommendstatus:this.articleRecommendstatus,//文章推荐状态
          articleHotstatus:this.articleHotstatus,	//文章热点状态
          articleTurnurl:this.articleTurnurl,//是否外部链接
          articleCopyfrom:this.articleCopyfrom,	//文章来源
          articleInputer:this.articleInputer,//文章录入者
          articleAuthor:this.articleAuthor,//文章作者
          articleCreatetime:this.articleCreatetime,	//文章创建时间
          articleSubscribe:this.articleSubscribe,	//文章摘要
          articleContent:this.articleContent,//文章内容
          articlePicpath:this.articlePicpath,	//文章图片路径
          articleHits:this.articleHits,	//文章点击量
          articleSeotitle:this.articleSeotitle,//	文章优化标题
          articleSeokeywords:this.articleSeokeywords,//	文章优化关键词
          articleSeomemo:this.articleSeomemo,//	文章优化描述
          articleAvlstatus:this.articleAvlstatus,//前台是否显示-文章可用状态
          articleDelstatus:this.articleDelstatus,	//文章删除状态
          articleShowstatuswap:this.articleShowstatuswap,//	文章显示状态WAP
          articleShowstatuspc:this.articleShowstatuspc,//	文章显示状态PC
          articleShowstatusapp:this.articleShowstatusapp,//	文章显示状态APP
          articleSeq:this.articleSeq,//排序编号
        }
        articleedit({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.code==="0000"||res.result==="000000"){
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/admin/consultListAll');
              }
            })
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

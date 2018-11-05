<template>
  <div>
  <wheader></wheader>
  <div class="lm_content">
    <div class="lmc_lf">
      <ul>
        <li class="title"><a href="javascript:void(0);">帮助中心</a></li>
        <li
          v-for="(items,index) in lanmulist" v-if="items.articlelist"
          :class="{li_erji:items.classArticlenum>1,active:curIndex===items.articlelist[0].articleId}">
          <p @click="change('li',items)"><a href="javascript:void(0);">{{items.className}}</a>
          <i class="lmc_arr" :class="{ up: items.show }" v-show="items.classArticlenum>1"></i></p>
          <transition name="slide">
            <dl v-if="items.classArticlenum>1" v-show="items.show">
              <dd v-for="item in items.articlelist" @click="change('dl',item.articleId)" :class="{active:curIndex===item.articleId}">
                <a href="javascript:void(0);">{{item.articleTitle}}</a>
              </dd>
            </dl>
          </transition>
        </li>
      </ul>
    </div>
    <div class="lmc_rt">
      <div class="lmc_help">
        <div class="lmch_tt"><span class="lmch_sp"><i class="lmch_fg"></i><strong>{{articleinfo.articleTitle}}</strong></span></div>
        <div class="lmch_con" v-html="articleinfo.articleContent">
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
  <wfooter></wfooter>
  </div>
</template>

<script>
  import wheader from '../common/wheader'
  import wfooter from '../common/wfooter'
  import { lanmulist,articlelist,articleinfo } from '@/api/web/cm'
  export default {
    name: "helpCenter",
    data:function(){
      return{
        show : true,
        curIndex:0,
        classlist:'',
        lanmulist:'',//栏目列表
        articlelist:'',//文章列表
        classId:'',//栏目标识
        articleinfo:'',//文章详情
        articleId:'',//文章id
        curId:'',
      }
    },
    components:{
      wheader,
      wfooter
    },
    created(){
      this._lanmulist();
      if(this.$route.query.curId){
        this.curId = this.$route.query.curId;
      }
    },
    mounted(){

    },
    methods:{
      change(type,item){
        if(type==='li'){
          item.show = !item.show;
          if(item.classArticlenum===1) {
            this.articleId = item.articlelist[0].articleId;
            this.curIndex = this.articleId;
            this._articleinfo();
            this.$router.push({path: '/web/helpCenter',query:{ curId:this.articleId}});
          }
        }else{
          this.articleId =  item;
          this.curIndex = item;
          this._articleinfo();
          this.$router.push({path: '/web/helpCenter',query:{ curId:this.articleId}});
        }
      },
      _lanmulist() {
        let params = {
          classAvlstatus: 'Y', //栏目可用状态
          classDelstatus: 'Y',//栏目删除状态
        }
        lanmulist({
          params: JSON.stringify(params)
        }).then(res => {
          console.log(res);
          if (res.result === "000000") {
            this.classlist = res.data.datas;
            this.classId = this.classlist[0].classId;
            for(let i=0;i<this.classlist.length;i++){
              this.classId = this.classlist[i].classId;
              this.$set(this.classlist[i], 'show', false);
              this._articlelist(i);
            }
           this.lanmulist = this.classlist;
            console.log('lanmulist',this.lanmulist);
            console.log('lanmulist.articlelist',this.lanmulist[0].articlelist);
          } else {
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _articlelist(index) {
        let params = {
          classId:this.classId,//栏目标识
          articleAvlstatus: 'Y', //文章可用状态
          articleDelstatus: 'Y',//文章删除状态
        }
        articlelist({
          params: JSON.stringify(params)
        }).then(res => {
          if (res.result === "000000") {
           if(index===0){
             if(this.curId) this.articleId =this.curId;
             else  this.articleId = res.data.data[0].articleId;
             this.curIndex = this.articleId;
             this._articleinfo();
            }
            this.$set(this.classlist[index], 'articlelist', res.data.data);
          } else {
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      },
      _articleinfo() {
        let params = {
          articleId:this.articleId,//栏目标识
          articleAvlstatus: 'Y', //文章可用状态
          articleDelstatus: 'Y',//文章删除状态
        }
        articleinfo({
          params: JSON.stringify(params)
        }).then(res => {
          //console.log(res);
          if (res.result === "000000") {
            this.articleinfo = res.data;
          } else {
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
  .slide-enter-active {
    transition: all .3s linear;
  }
  .slide-leave-active {
    transition: all .3s linear;
  }
  .slide-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>

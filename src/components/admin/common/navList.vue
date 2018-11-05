<template>
  <div class="cont_lf">
    <div class="logo_img"><img src="/static/images/logo.png"/></div>
    <ul class="cont_ul">
      <li>
        <p @click="show.bannerListAll = !show.bannerListAll"><i class="h_fg h_fg1"></i><a href="javascript:void(0);">内容</a><i class="ul_arr"  :class="{ up: show.bannerListAll }"></i></p>
        <transition name="slide">
          <dl v-show = "show.bannerListAll">
            <dd :class="{active: tabIndex === 'bannerListAll'||tabIndex === 'addBannerAll'}"><a href="javascript:void(0)" @click="navList('bannerListAll')">Banner列表</a></dd>
            <dd :class="{active: tabIndex === 'lanmuListAll'||tabIndex === 'addLanmuAll'}"><a href="javascript:void(0)" @click="navList('lanmuListAll')">栏目列表</a></dd>
            <dd :class="{active: tabIndex === 'consultListAll'||tabIndex === 'addConsultAll'}"><a href="javascript:void(0)" @click="navList('consultListAll')">资讯列表</a></dd>
          </dl>
        </transition>
      </li>
      <li>
        <p @click="show.agentListAll = !show.agentListAll"><i class="h_fg h_fg2"></i><a href="javascript:void(0);">代理商</a><i class="ul_arr"  :class="{ up: show.agentListAll }"></i></p>
        <transition name="slide">
          <dl v-show = "show.agentListAll">
            <dd :class="{active: tabIndex === 'agentListAll'||tabIndex === 'addAgentAll'}"><a href="javascript:void(0)" @click="navList('agentListAll')">代理商列表</a></dd>
          </dl>
        </transition>
      </li>
      <li>
        <p @click="show.singleClassAll = !show.singleClassAll"><i class="h_fg h_fg3"></i><a href="javascript:void(0);">合作项目</a><i class="ul_arr"  :class="{ up: show.singleClassAll }"></i></p>
        <transition name="slide">
          <dl v-show = "show.singleClassAll">
            <dd :class="{active: tabIndex === 'singleClassAll'}"><a href="javascript:void(0)" @click="navList('singleClassAll')">单个班级</a></dd>
            <dd :class="{active: tabIndex === 'multiClassAll'||tabIndex === 'addCourse'}"><a href="javascript:void(0)" @click="navList('multiClassAll')">组合班级</a></dd>
          </dl>
        </transition>
      </li>
      <li>
        <p @click="show.adListAll = !show.adListAll"><i class="h_fg h_fg4"></i><a href="javascript:void(0);">广告</a><i class="ul_arr"  :class="{ up: show.adListAll }"></i></p>
        <transition name="slide">
          <dl v-show = "show.adListAll">
            <dd :class="{active: tabIndex === 'adListAll'||tabIndex === 'addAdAll'}"><a href="javascript:void(0)" @click="navList('adListAll')">文字广告</a></dd>
            <dd :class="{active: tabIndex === 'pictureListAll'||tabIndex === 'addPictureAll'}"><a href="javascript:void(0)" @click="navList('pictureListAll')">图片广告</a></dd>
          </dl>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tabIndex: '',
      show: {bannerListAll:true,agentListAll:true,singleClassAll:true,adListAll:true},
    }
  },
  mounted:function(){
    var arr = this.$route.path.split("/");
    this.tabIndex = arr[arr.length-1];
  },
  methods:{
    navList (val) {

      this.tabIndex = val

      if (val === 'bannerListAll') {

        this.$router.push('/admin/bannerListAll')

      } else if (val === 'lanmuListAll') {

        this.$router.push('/admin/lanmuListAll')

      } else if (val === 'consultListAll') {

        this.$router.push('/admin/consultListAll')

      } else if (val === 'agentListAll') {

        this.$router.push('/admin/agentListAll')

      } else if (val === 'singleClassAll') {

        this.$router.push('/admin/singleClassAll')

      }  else if (val === 'multiClassAll') {

        this.$router.push('/admin/multiClassAll')

      } else if (val === 'adListAll') {

        this.$router.push('/admin/adListAll')

      } else if (val === 'pictureListAll') {

        this.$router.push('/admin/pictureListAll')

      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

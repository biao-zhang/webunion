<template>
  <div style="background: #fff;">
    <!-- 联盟优势 -->
    <div class="lm_advanbox">
      <div class="lmvn_tt">
        <h1>联盟优势</h1>
        <h4>Alliance advantage</h4>
      </div>
      <div class="lmvn_con">
        <div class="lmvn_item">
          <div class="lmvn_fg">
            <i class="lmfg_cn1"></i>
          </div>
          <div class="lmvn_info">
            <h2>知名品牌</h2>
            <p>优路教育已成为建设工程领域各类执业/职业资格培训比较出名的品牌，是一家13年以来专注辅导培训的综合性教育服务机构。</p>
          </div>
        </div>
        <div class="lmvn_item">
          <div class="lmvn_fg">
            <i class="lmfg_cn2"></i>
          </div>
          <div class="lmvn_info">
            <h2>服务优秀</h2>
            <p>公司致力于让学员获得更有价值的学习体验，融入先进技术研发教学模式，汇聚专业师资打造精致产品，为学员提供“一站式”服务。</p>
          </div>
        </div>
        <div class="lmvn_item">
          <div class="lmvn_fg">
            <i class="lmfg_cn3"></i>
          </div>
          <div class="lmvn_info">
            <h2>产品多样</h2>
            <p>公司主营工程、教师、财经等行业准入类职业(执业)资格认证培训业务，从业资格。具体包括：建造师、消防工程师等19个项目。</p>
          </div>
        </div>
        <div class="lmvn_item">
          <div class="lmvn_fg">
            <i class="lmfg_cn4"></i>
          </div>
          <div class="lmvn_info">
            <h2>交易方便</h2>
            <p>优路教育已成为建设工程领域各类执业/职业资格培训比较出名的品牌，是一家13年以来专注辅导培训的综合性教育服务机构。</p>
          </div>
        </div>
        <div class="lmvn_item">
          <div class="lmvn_fg">
            <i class="lmfg_cn5"></i>
          </div>
          <div class="lmvn_info">
            <h2>成单简单</h2>
            <p>优路教育已成为建设工程领域各类执业/职业资格培训比较出名的品牌，是一家13年以来专注辅导培训的综合性教育服务机构。</p>
          </div>
        </div>
        <div class="lmvn_item">
          <div class="lmvn_fg">
            <i class="lmfg_cn6"></i>
          </div>
          <div class="lmvn_info">
            <h2>赚钱666</h2>
            <p>优路教育已成为建设工程领域各类执业/职业资格培训比较出名的品牌，是一家13年以来专注辅导培训的综合性教育服务机构。</p>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- 通栏广告 -->
    <div class="lm_jmag">
      <!--<a href="javascript:void(0);" style="background:url(msg) no-repeat center center;"></a>-->
      <a
        v-for="item in picture"
        :href="item.advLinkurl"
        :style="{ background: 'url('+ file_imgSrc + item.advPicpath +') no-repeat center center'}"
      ></a>
    </div>
    <!-- 合作流程 -->
    <div class="lm_cooper">
      <div class="lmvn_tt">
        <h1>合作流程</h1>
        <h4>Cooperation process</h4>
      </div>
      <div class="cooper_con">
        <i class="cooper_fg"></i>
        <div class="cooper_lf">
          <div class="cooper_item" style="margin-top:161px;">
            <i class="copr_fg"></i>
            <div class="copr_con">
              <span class="copr_sp">02</span>
              <h2>获取广告</h2>
              <p>获取广告的推广链接或广告代码，添加广告进行推广；</p>
            </div>
          </div>
          <div class="cooper_item" style="margin-top:210px;">
            <i class="copr_fg"></i>
            <div class="copr_con">
              <span class="copr_sp">04</span>
              <h2>收益信息</h2>
              <p>根据课程所获得的提成于每月中下旬进行结算；</p>
            </div>
          </div>
        </div>
        <div class="cooper_rt">
          <div class="cooper_item">
            <i class="copr_fg"></i>
            <div class="copr_con">
              <span class="copr_sp">01</span>
              <h2>注册账号</h2>
              <p>填写代理商以及网站信息，提交注册，后台管理员审核；</p>
            </div>
          </div>
          <div class="cooper_item" style="margin-top:200px;">
            <i class="copr_fg"></i>
            <div class="copr_con">
              <span class="copr_sp">03</span>
              <h2>购买课程</h2>
              <p>用户点击该广告跳转至网站下单，并完成支付；</p>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="cooper_bm">
        <span>END</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { advlist } from '@/api/web/cm'

  export default {
    name: "wcontent",
    data:function () {
      return {
        file_imgSrc: this.GLOBAL.file_imgSrc,
        pageIndex: 1,
        pageSize: 1,  // 按需设置广告数
        url : require('@/assets/web/images/ad.jpg'),
        fontSize: 30,
        advboardId: 'ADVBOARD20181026010000000001', // 中部图片
        picture: [], // 中部图片集合
      }
    },
    mounted () {
      this._advlist(this.advboardId)
    },
    methods: {
      _advlist (id) {
        let params = {
          advboardId: id,
          advAvlstatus: 'Y',
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        advlist({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.picture = res.data.datas

            } else {

              this.$alert(res.msg, '提示', {

                confirmButtonText: '确定',

                type: 'warning'

              })

            }

            console.log('中部广告图片', res)

          })
      }
    }
  }

</script>

<style scoped>

</style>

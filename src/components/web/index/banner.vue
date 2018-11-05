<template>
  <div class="lm_Banner">
    <div class="banner">
      <Carousel v-if="picture" :interval="5000" arrow="always"  class="slide">
        <Carousel-item  v-for="(item,index) in picture" :key="index">
          <a
            :href="item.advLinkurl"
            target="_blank"
            :style="{ background: 'url('+ file_imgSrc + item.advPicpath +') no-repeat center center'}"
          ></a>
        </Carousel-item>
      </Carousel>
    </div>

  </div>
</template>

<script>
  import { advlist } from '@/api/web/cm'
  import {Carousel,CarouselItem} from 'element-ui'

  export default {
    name: "banner",
    components:{
      Carousel,
      CarouselItem
    },
    data () {
      return{
        file_imgSrc: this.GLOBAL.file_imgSrc,
        banList:[
          {url:'javascript:void(0);',src:require('@/assets/web/images/ban1.jpg')},
          {url:'javascript:void(0);',src:require('@/assets/web/images/ban2.jpg')}
        ],
        advboardId: 'ADVBOARD20181024010000000002', // 顶部图片
        picture: [], // 顶部图片集合
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
          advDelstatus: 'Y',
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

            console.log('顶部广告图片', res)

          })
      }
    }
  }
</script>
<style>
  .el-carousel__indicators{bottom:20px;}
  .el-carousel{height: 100%;width:100%;}
  .el-carousel__container{height: 100%;width:100%;}
  .el-carousel__item{height: 100%;width:100%;}
  .el-carousel__item a{
    display: block;height: 100%;width:100%;}
  .el-carousel__button{background: none;}
  </style>

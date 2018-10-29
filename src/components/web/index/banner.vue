<template>
  <div class="lm_Banner">
    <div class="banner">
      <ul id="slides" class="slide">
        <li v-for="item in picture">
          <a
            :href="item.advLinkurl"
            target="_blank"
            :style="{ background: 'url('+ file_imgSrc + item.advPicpath +') no-repeat center center'}"
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import "@/assets/web/js/jquery.js"
  import "@/assets/web/js/banner.js"
  import { advlist } from '@/api/web/cm'

  export default {
    name: "banner",
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


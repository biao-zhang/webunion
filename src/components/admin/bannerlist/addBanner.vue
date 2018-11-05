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
            <span class="rest_name">广告类型：</span>
            <label class="stk_lab" :class="{check: tabIndex === 'T'}" @click="singleBtn('T')">图片广告</label>
            <label class="stk_lab" :class="{check: tabIndex === 'H'}" @click="singleBtn('H')">幻灯广告</label>
          </div>
          <div class="rest_lab">
            <span class="rest_name">广告位置：</span>
            <label class="stk_lab" :class="{check: pos === 'ADVBOARD20181024010000000002'}" @click="position('ADVBOARD20181024010000000002')">顶部</label>
            <label class="stk_lab" :class="{check: pos === 'ADVBOARD20181026010000000001'}" @click="position('ADVBOARD20181026010000000001')">中部</label>
          </div>
          <div class="rest_lab">
            <span class="rest_name">广告名称：</span>
            <input type="text" class="rest_inp" v-model="advName" />
          </div>
          <div class="rest_lab">
            <span class="rest_name">图片要求：</span>
            <span class="rest_name" style="text-align: left">2000*400</span>
          </div>
          <div class="rest_lab">
            <span class="rest_name">上传图片：</span>
            <!--<label class="file_lab">上传图片<input type="file" class="rest_file" ref="file"/></label>-->
            <upload
              :width="picWidth"
              :height="picHeight"
              :imgSrc="imgSrc"
              :maxUploadNumber="1"
              @uploadItems="getInputItems"
              @uploadUrls="getInput"
              ref="child1"
            > </upload>
          </div>
          <!--<p class="errtip">格式错误</p>-->
          <div class="rest_btnbox">
            <input v-if="type !== 'query'" type="button" class="rest_btn" value="提 交" @click="submit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import { upload } from '@/api/admin/file'
  import Upload from '@/components/admin/common/upload'
  import { advadd, advinfo, advedit } from '@/api/admin/cm'

  export default {
    name: 'addBanner',
    components: {
      EHeader,
      Upload
    },
    data () {
      return {
        tabIndex: 'T',
        pos: 'ADVBOARD20181024010000000002',
        picWidth: '180px',
        picHeight: '180px',
        imgSrc: require('@/assets/admin/images/upload.png'),

        filePath: '', // 图片路径
        type: '',  // 来源
        advId: '', // id
        advName: '', // 广告名称

        adLook: [], // 广告查看
        serverSrc: this.GLOBAL.file_imgSrc
      }
    },
    mounted () {
      this.type = this.$route.query.type
      this.advId = this.$route.query.advId

      if (this.advId) this._advinfo()

      console.log('type', this.type, 'advId', this.advId)
    },
    methods: {
      position (val) {
        this.pos = val
      },
      submit () {
        if (this.type === 'update') {

          this._advedit()

        } else {

          if (this.advName === '') {

            this.$alert('请输入广告名称', '提示', {

              confirmButtonText: '确定',

              type: 'warning'

            })

          } else if (this.filePath === '') {

            this.$alert('图片错误', '提示', {

              confirmButtonText: '确定',

              type: 'warning'

            })

          } else {

            this._advadd()

          }

        }
      },
      singleBtn (val) {
        this.tabIndex = val
      },
      back () {
        this.$router.go(-1)
      },
      getInputItems(a){

        // setTimeout(() => this.driving_card = a[0], 500)

        console.log('base64编码', a)

      },
      getInput(b){

        let oMyForm = new FormData()

        oMyForm.append('file', b[0])

        upload(oMyForm).then( res => {

          if (res.code === '0000') {

            this.filePath = res.data.filePath

            this.$alert('上传图片成功', '提示', {

              confirmButtonText: '确定',

              type: 'warning'

            })

          } else {

            this.$alert(res.msg, '提示', {

              confirmButtonText: '确定',

              type: 'warning'

            })

          }

          console.log('上传图片', res)

        })

        console.log('文件对象', b)

      },
      // 添加
      _advadd () {
        let params = {
          advboardId: this.pos,
          advName: this.advName,
          advLinkurl: '',
          advPicpath: this.filePath,
          advType: this.tabIndex,
        }

        console.log('params', params)

        advadd({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({
                type: 'success',
                message: '添加成功!'
              })

              this.$router.push('/admin/bannerListAll')

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

            console.log('广告添加', res)

          })
      },
      // 查看
      _advinfo () {
        let params = {
          advId: this.advId
        }
        advinfo({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.adLook = res.data

              this.advName = this.adLook.advName

              this.filePath = this.adLook.advPicpath

              this.imgSrc = this.serverSrc + this.adLook.advPicpath

            } else {

              this.$alert(res.msg, '提示', {

                confirmButtonText: '确定',

                type: 'warning'

              })

            }

            console.log('广告查看', res)

          })
      },
      // 修改
      _advedit () {
        let params = {
          advId: this.advId,
          advboardId: this.pos,
          advName: this.advName,
          advPicpath: this.filePath,
          advAvlstatus: 'Y',
          advDelstatus: 'Y', // 广告删除状态
        }
        advedit({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({

                type: 'success',

                message: '修改成功'

              })

              this.$router.push('/admin/bannerListAll')

            } else {

              this.$alert(res.msg, '提示', {

                confirmButtonText: '确定',

                type: 'warning'

              })

            }

            console.log('广告修改', res)

          })
      }
    }
}
</script>

<style scoped>

</style>

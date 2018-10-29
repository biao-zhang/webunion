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
            <span class="rest_name">栏目名称：</span>
            <input type="text" class="rest_inp" v-model="lanmuName" />
          </div>
          <div class="rest_lab">
            <span class="rest_name">前台显示：</span>
            <label class="stk_lab" :class="{check: tabIndex === 'Y'}" @click="singleBtn('Y')">是</label>
            <label class="stk_lab" :class="{check: tabIndex === 'N'}" @click="singleBtn('N')">否</label>
          </div>
          <!--<p class="errtip">格式错误</p>-->
          <div class="rest_btnbox">
            <input type="button" class="rest_btn" value="保 存" @click="serve" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import { classadd, classinfo, classedit } from '@/api/admin/cm'

  export default {
    name: 'addLanmu',
    components: {
      EHeader
    },
    data () {
      return {
        tabIndex: 'Y',
        lanmuName: '',
        classId: '',
        type: '',
        lanmuLook: [],
      }
    },
    mounted () {
      this.type = this.$route.query.type
      this.classId = this.$route.query.classId

      if (this.classId) this._classinfo()

      console.log('type', this.type, 'advId', this.advId)
    },
    methods: {
      serve () {
        if (this.type === 'update') {

          this._classedit()

        } else {

          if (this.lanmuName === '') {

            this.$alert('请输入栏目名称', '提示', {

              confirmButtonText: '确定',

              type: 'warning'

            })

          } else {

            this._classadd()

          }

        }

      },
      singleBtn (val) {
        this.tabIndex = val
      },
      back () {
        this.$router.go(-1)
      },
      // 添加
      _classadd () {
        let params = {
          className: this.lanmuName,
          classAvlstatus: this.tabIndex,
        }

        console.log('params', params)

        classadd({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({
                type: 'success',
                message: '添加成功!'
              })

              this.$router.push('/admin/lanmuListAll')

            } else {

              this.$alert(res.msg, '提示', {

                confirmButtonText: '确定',

                type: 'warning'

              })

            }

            console.log('栏目添加', res)

          })
      },
      // 查看
      _classinfo () {
        let params = {
          classId: this.classId
        }
        classinfo({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.lanmuLook = res.data

              this.lanmuName = this.lanmuLook.className

              this.tabIndex = this.lanmuLook.classAvlstatus


            } else {

              this.$alert(res.msg, '提示', {

                confirmButtonText: '确定',

                type: 'warning'

              })

            }

            console.log('栏目查看', res)

          })
      },
      // 修改
      _classedit () {
        let params = {
          classId: this.classId,
          className: this.className,
          classAvlstatus: this.tabIndex,
        }
        classedit({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({

                type: 'success',

                message: '修改成功'

              })

              this.$router.push('/admin/lanmuListAll')

            } else {

              this.$alert(res.msg, '提示', {

                confirmButtonText: '确定',

                type: 'warning'

              })

            }

            console.log('栏目修改', res)

          })
      }
    }
}
</script>

<style scoped>

</style>

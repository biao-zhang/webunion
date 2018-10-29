<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="back_btn" @click="back">返回</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="rest_box">
          <!--<div class="rest_lab">-->
            <!--<span class="rest_name"><font>*</font>联盟ID：</span>-->
            <!--<input type="text" class="rest_inp" value="035869" />-->
          <!--</div>-->
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>代理商名称：</span>
            <input type="text" class="rest_inp" value="天天招生网" v-model="agentName" />
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>用 户 账 号：</span>
            <input type="text" class="rest_inp" value="ttzsw" v-model="userLoginname" />
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>手 机 号：</span>
            <input type="text" class="rest_inp" value="18859623498" v-model="userMobile"/>
          </div>
         <!-- <div class="rest_lab">
            <span class="rest_name"><font>*</font>密  码：</span>
            <input type="password" class="rest_inp" value="******" />
          </div>-->
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>邮 箱：</span>
            <input type="text" class="rest_inp" value="11163709569@qq.com" v-model="userEmail"/>
          </div>
          <!--<div class="rest_lab">-->
            <!--<span class="rest_name"><font>*</font>账户余额：</span>-->
            <!--<input type="text" class="rest_inp" value="126.00" />-->
          <!--</div>-->
          <!--<div class="rest_lab">-->
            <!--<span class="rest_name">提成比例：</span>-->
            <!--<input type="text" class="rest_inp" value="20%" />-->
          <!--</div>-->
          <div class="rest_lab">
            <span class="rest_name">有 效 期：</span>
            <input type="text" class="rest_inp" value="2019-09-27   10:45" v-model="agentSignexpiredate" />
          </div>
          <div class="rest_lab">
            <span class="rest_name">状  态：</span>
            <div>
              <label class="stk_lab" :class="{check: agentAuthstatus === 'W'}" @click="review('W')">待审核</label>
              <label class="stk_lab" :class="{check: agentAuthstatus === 'Y'}" @click="review('Y')">审核通过</label>
              <label class="stk_lab" :class="{check: agentAuthstatus === 'N'}" @click="review('N')">审核失败</label>
            </div>
          </div>
          <!--<p class="errtip">格式错误</p>-->
          <div class="rest_btnbox" v-if="type !== 'look'">
            <input type="button" class="rest_btn" value="提 交" @click="submit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import { agentinfo, agentedit } from '@/api/admin/sl'
  import { agentadd } from '@/api/admin/uc'

  export default {
    name: 'addAgent',
    components: {
      EHeader
    },
    data () {
      return {
        type: '',
        agentId: '',
        arrAgentInfo: {},
        agentName: '',
        userLoginname: '',
        userMobile: '',
        userEmail: '',
        agentSignexpiredate: '',
        agentAuthstatus: 'W',
      }
    },
    mounted () {
      this.type = this.$route.query.type
      this.agentId = this.$route.query.agentId

      if (this.type) this._agentinfo()
    },
    methods: {
      review (val) {
        this.agentAuthstatus = val
      },
      submit () {
        if (this.type === 'modify') {

          this._agentedit()

        } else {

          // TODO

        }

      },
      back () {
        this.$router.go(-1)
      },
      _agentinfo () {
        let params = {
          agentId: this.agentId
        }
        agentinfo({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.arrAgentInfo = res.data

              this.agentName = res.data.agentName

              this.userLoginname = res.data.userLoginname

              this.userMobile = res.data.userMobile

              this.userEmail = res.data.userEmail

              this.agentSignexpiredate = res.data.agentSignexpiredate

              this.agentAuthstatus = res.data.agentAuthstatus

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

            console.log('代理商信息', res)

          })
      },
      _agentedit () {
        let params = {
          agentId: this.agentId,
          agentName: this.agentName,
          userLoginname: this.userLoginname,
          userMobile: this.userMobile,
          userEmail: this.userEmail,
          agentSignexpiredate: this.agentSignexpiredate,
          agentAuthstatus: this.agentAuthstatus
        }
        agentedit({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({
                type: 'success',
                message: '修改成功'
              })

              this.$router.push('/admin/agentListAll')

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

            console.log('代理商修改', res)

          })
      },
      _agentadd () {
        let params = {
          userName: '',
          userLoginname: '',
        }
        agentadd({
          params: JSON.stringify(params)
        })
          .then( res => {

            console.log('代理商添加', res)

          })
      }
    }
}
</script>

<style scoped>

</style>

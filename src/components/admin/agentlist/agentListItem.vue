<template>
  <tr>
    <td><span class="ch_fg" :class="{check: checked}" @click="select"></span></td>
    <td>{{ itemChildren.agentName }}</td>
    <td>{{ itemChildren.userLoginname }}</td>
    <td>{{ itemChildren.userMobile }}</td>
    <td>{{ itemChildren.userEmail }}</td>
    <td>{{ itemChildren.agentSignexpiredate }}</td>
    <td v-if="itemChildren.agentAuthstatus === 'W'">待审核</td>
    <td v-if="itemChildren.agentAuthstatus === 'Y'">审核成功</td>
    <td v-if="itemChildren.agentAuthstatus === 'N'">审核失败</td>
    <td>{{ itemChildren.agentAvlstatus === 'Y' ? '启用' : '禁用'}}</td>
    <td>{{ itemChildren.agentCreatetime }}</td>
    <td>
      <a href="javascript:void(0);" class="lma_a" @click="operate('look', itemChildren.agentId)">查看</a>
      <!--<a href="javascript:void(0);" class="lma_a">禁用</a>-->
      <a href="javascript:void(0);" class="lma_a" @click="operate('modify', itemChildren.agentId)">修改</a>
      <a href="javascript:void(0);" class="lma_a" @click="webInfo">网站信息</a>
    </td>
    <Dialog
      title="网站信息"
      :visible.sync="dialogVisible"
      width="50%"
      center
    >
      <div class="lmad_con">
        <table>
          <tr>
            <th width="10%">网站id</th>
            <th width="5%">网站名称</th>
            <th width="8%">网站地址</th>
            <th width="10%">登记时间</th>
            <th width="10%">审核状态</th>
            <th width="5%">网站介绍</th>
            <th width="12%">操作</th>
          </tr>
          <!--<tr v-if="count===0"><td colspan="10">暂无数据！</td></tr>-->
          <tr v-for="item in arrAgentsite">
            <td>{{item.agentsiteId}}</td>
            <td>{{item.agentsiteName}}</td>
            <td>{{item.agentsiteUrl}}</td>
            <td>{{item.agentsiteCreatetime}}</td>
            <td v-if="item.agentsiteAuthstatus === 'W'">待审核</td>
            <td v-if="item.agentsiteAuthstatus === 'Y'">审核成功</td>
            <td v-if="item.agentsiteAuthstatus === 'N'">审核失败</td>
            <td>{{item.agentsiteMemo}}</td>
            <td>
              <a href="javascript:void(0);" class="lma_a" @click="reviewOper">审核</a>
            </td>
            <Dialog
              title="审核"
              :visible.sync="innerVisible"
              width="30%"
              center
              append-to-body
            >
              <div style="text-align: center">
                <label class="stk_lab" :class="{check: tabIndex === 'Y'}" @click="review('Y')">审核通过</label>
                <label class="stk_lab" :class="{check: tabIndex === 'N'}" @click="review('N')">审核不通过</label>
              </div>
              <div slot="footer" class="rest_btnbox" style="text-align: center; padding: 0">
                <input type="button" class="rest_btn" value="提 交" @click="submit" />
              </div>
            </Dialog>
          </tr>
        </table>
      </div>
    </Dialog>
  </tr>
</template>

<script>
  import { Dialog } from 'element-ui'
  import { agentsitelist, agentsiteauth } from '@/api/admin/sl'

  export default {
    name: 'agentListItem',
    components: {
      Dialog,
    },
    data () {
      return {
        tabIndex: 'Y',
        innerVisible: false,
        dialogVisible: false,
        checked: false,
        arrAgentsite: '',
      }
    },
    props: ['itemChildren'],
    methods: {
      submit () {
        this._agentsiteauth()
      },
      review (val) {
        this.tabIndex = val
      },
      reviewOper () {
        this.innerVisible = true
      },
      webInfo () {
        this.dialogVisible = true
        this._agentsitelist()
      },
      operate (val1, val2) {

        if (val1 === 'look') {

          this.$router.push({path: '/admin/addAgentAll', query: {type: 'look', agentId: val2}})

        } else if (val1 === 'modify') {

          this.$router.push({path: '/admin/addAgentAll', query: {type: 'modify', agentId: val2}})

        }

      },
      controlSelect () {
        this.checked = true
      },
      cancelSelect () {
        this.checked = false
      },
      select () {
        this.checked = !this.checked
        this.$emit('singleSelect', {checked: this.checked})
      },
      _agentsitelist () {
        let params = {
          agentId: this.itemChildren.agentId,
        }
        agentsitelist({
          params: JSON.stringify(params),
        })
          .then( res => {

            if (res.result === '000000') {

              this.arrAgentsite = res.data.data

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
              })

            }

            console.log('代理商网站列表', res)

          })
      },
      _agentsiteauth () {
        let params = {
          agentsiteIds: this.itemChildren.agentId,
          agentsiteAuthstatus: this.tabIndex,
          agentsiteAuthmemo: '',
        }
        agentsiteauth({
          params: JSON.stringify(params),
        })
          .then( res => {

            if (res.result === '000000') {

              this.innerVisible = false

              this._agentsitelist()

              this.$message({
                type: 'success',
                message: '审核成功'
              })

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
              })

            }

            console.log('代理商网站审核', res)

          })
      }
    }
}
</script>

<style scoped>

</style>

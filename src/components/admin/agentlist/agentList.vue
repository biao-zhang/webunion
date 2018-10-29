<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="add_btn" @click="addAgent">添加代理商</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="lmad_tt">
          <label class="lma_lab">代理商：<input type="text" class="lma_inp" v-model="agentName"></label>
          <label class="lma_lab">手机号：<input type="text" class="lma_inp" v-model="userMobile"></label>
          <label class="lma_lab">状态：
            <div style="display: inline-block;position: relative; width: 150px">
              <Select v-model="value1" placeholder="请选择">
                <Option
                  :key="item.value"
                  v-for="item in options1"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </label>
          <label class="lma_lab secd">创建时间：
            <date-picker
              v-model="adv_StartDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
            >
            </date-picker>
            <span class="lma_tsp">至</span>
            <date-picker
              v-model="adv_EndDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="结束日期"
            >
            </date-picker>
          </label>
          <input type="button" value="查询" class="lma_btn" @click="query">
        </div>
        <div class="lma_box">
          <input type="button" value="批量审核" class="sh_btn" @click="batchreview">
          <Dialog
            title="审核"
            :visible.sync="dialogVisible"
            width="30%"
            center
          >
            <div style="text-align: center">
              <label class="stk_lab" :class="{check: tabIndex === 'Y'}" @click="review('Y')">审核通过</label>
              <label class="stk_lab" :class="{check: tabIndex === 'N'}" @click="review('N')">审核不通过</label>
            </div>
            <div slot="footer" class="rest_btnbox" style="text-align: center; padding: 0">
              <input type="button" class="rest_btn" value="提 交" @click="submit" />
            </div>
          </Dialog>
          <div class="lmad_con">
            <table>
              <tr>
                <th width="5%"><span class="ch_fg" :class="{check: allchecked}" @click="allSelect"></span>&nbsp;全选</th>
                <th width="10%">代理商名称</th>
                <th width="5%">用户账号</th>
                <th width="8%">手机号</th>
                <th width="10%">邮箱</th>
                <th width="10%">有效期</th>
                <th width="5%">审核状态</th>
                <th width="5%">运行状态</th>
                <th width="10%">创建时间</th>
                <th width="12%">操作</th>
              </tr>
              <tr v-if="count===0"><td colspan="10">暂无数据！</td></tr>
              <agent-list-item
                v-for="(item, index) in arrAgentList"
                :key="index"
                :item-children="item"
                ref="agentItem"
                @singleSelect="singleSelect"
              ></agent-list-item>
            </table>
          </div>
        </div>
        <div class="page" v-if="count > pageSize">
          <pagination
            background
            layout="prev, pager, next"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="count"
            @current-change="handleCurCha"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import AgentListItem from './agentListItem'
  import { Select, Option, Pagination, DatePicker, Dialog } from 'element-ui'
  import { agentlist, agentauth } from '@/api/admin/sl'

  export default {
    name: 'agentList',
    components: {
      EHeader,
      Select,
      Option,
      Pagination,
      DatePicker,
      Dialog,
      AgentListItem,
    },
    data () {
      return {
        allchecked: false, // 全选
        tabIndex: 'Y',
        dialogVisible: false,
        pageIndex: 1,
        pageSize: 10,
        count: 0, // 总条目数
        adv_StartDate: '',
        adv_EndDate: '',
        agentName: '',
        userMobile: '',
        value1: '', // 审核状态
        options1: [{
          value: 'W',
          label: '待审核'
        }, {
          value: 'Y',
          label: '审核成功',

        },{
          value: 'N',
          label: '审核失败',

        }],
        arrId: [],  // 单个数据id
        arrAgentList: []
      }
    },
    mounted () {
      this._agentlist()
    },
    methods: {
      query () {

        this._agentlist()


      },
      singleSelect (val) {
        if (!val.checked)  {

          this.allchecked = false

        } else {

          let selectcount = 0

          this.$refs.agentItem.map( item => {

            if (item.checked === true) {

              selectcount += 1

            }

          })

          if (selectcount === this.$refs.agentItem.length) {

            this.allchecked = true

          }

        }
      },
      allSelect () {

        if (this.allchecked) {

          this.allchecked = false

          this.$refs.agentItem.map( item => item.cancelSelect())

        } else {

          this.allchecked = true

          this.$refs.agentItem.map( item => item.controlSelect())

        }

      },
      submit () {

        this.arrId = []

        this.$refs.agentItem.map( item => {

          if (item.checked === true) {

            this.arrId.push(item.itemChildren.agentId)

          }

        })

        this._agentauth()

        console.log(this.arrId)

      },
      review (val) {
        this.tabIndex = val
      },
      batchreview () {
        this.dialogVisible = true
      },
      addAgent () {
        this.$router.push('/admin/addAgentAll')
      },
      // 代理商列表
      _agentlist () {
        let params = {
          agentName: this.agentName,
          userMobile: this.userMobile,
          agentAuthstatus: this.value1,
          agentCreatetime_start: this.adv_StartDate,
          agentCreatetime_end: this.adv_EndDate,
        }
        agentlist({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.arrAgentList = res.data.data

              this.count = res.data.count

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

            console.log('代理商列表', res)

          })
      },
      // 代理商审核
      _agentauth () {
        let params = {
          agentIds: this.arrId.join(','),
          agentAuthstatus: this.tabIndex,
        }
        agentauth({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.dialogVisible = false

              this._agentlist()

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })


            }

            console.log('代理商审核', res)

          })
      },
    }
}
</script>

<style scoped>

</style>

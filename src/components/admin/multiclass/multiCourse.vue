<template>
  <div  class="cont_rt">
    <div class="cont_top">
      <a href="javascript:void(0);" class="add_btn" @click="createLesson">添加组合班级</a>
      <EHeader></EHeader>
    </div>
    <div class="cont_con">
      <div class="lmad_tt">
        <label class="lma_lab">班级名称：<input v-model="className" type="text" class="lma_inp"></label>
        <label class="lma_lab">状态：
          <div style="display: inline-block;position: relative;">
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
        <label class="lma_lab">授课方式：
          <div style="display: inline-block;position: relative;">
            <Select v-model="value2" placeholder="请选择">
              <Option
                :key="item.value"
                v-for="item in options2"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </label>
        <input type="button" value="查询" class="lma_btn" @click="query">
      </div>
      <div class="lma_box">
        <div class="lmad_con">
          <table>
            <tr>
              <th width="10%">编号</th>
              <th width="30%">班级名称</th>
              <th width="10%">价格</th>
              <th width="10%">授课方式</th>
              <th width="10%">前台显示</th>
              <th width="10%">操作</th>
            </tr>
            <tr v-if="count === 0"><td colspan="6">暂无数据</td></tr>
            <template v-for="items in arrMutiClass">
              <tr v-for="(item, index) in items.class">
                <td v-bind:rowspan="items.class.length" v-if="index===0">{{items.advId}}</td>
                <td>{{item.className}}</td>
                <td>{{item.classPrice}}</td>
                <td v-if="item.classTeachmethod === 'W'">网络</td>
                <td v-if="item.classTeachmethod === 'Z'">直播</td>
                <td v-if="item.classTeachmethod === 'H'">面网结合</td>
                <td v-bind:rowspan="items.class.length" v-if="index===0">{{items.advAvlstatus === 'Y' ? '是' : '否'}}</td>
                <td v-bind:rowspan="items.class.length" v-if="index===0">
                  <a href="javascript:void(0);" class="lma_a" @click="operate(items)">{{items.advAvlstatus !== 'Y' ? '是' : '否'}}</a>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
      <div class="page" v-if="count > pageSize">
        <pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="count"
          @current-change="handleCurCha"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import { Select, Option, Pagination } from 'element-ui'
  import { complexlist, advavlstatusedit } from '@/api/admin/sl'

  export default {
    name: "MultiCourse",
    components : {
      EHeader,
      Select,
      Option,
      Pagination,
    },
    data () {
      return {
        className: '',
        pageIndex: 0,
        pageSize: 6,

        isFront: true,
        // isOperate: '否',
        value1: '',
        options1: [{
          value: 'Y',
          label: '是'
        }, {
          value: 'N',
          label: '否',

        }],
        value2: '',
        options2: [{
          value: 'W',
          label: '网络'
        }, {
          value: 'Z',
          label: '直播',
        }, {
          value: 'H',
          label: '面网结合'
        }],
        arrMutiClass: [], // 多个班级广告列表
        count: 0,
      }
    },
    mounted () {
      this._complexlist()
    },
    methods: {
      query () {
        this._complexlist()
      },
      createLesson () {
        this.$router.push('/admin/addCourse')
      },
      operate (val) {
        if (val.advAvlstatus === 'Y') {
          this.$confirm('取消前台显示', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this._advavlstatusedit(val.advId, 'N')

            this._complexlist()

          })
        } else {
          this.$confirm('确定前台显示', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this._advavlstatusedit(val.advId, 'Y')

            this._complexlist()

          })
        }

      },
      _complexlist () {
        let params = {
          advAvlstatus: this.value1 ? this.value1 : 'A',
          classTeachmethod: this.value2 ? this.value2 : 'A',
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          className: this.className
        }

        console.log('params', params)

        complexlist({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.arrMutiClass = res.data.data

              this.count = res.data.count

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

            console.log('多个班级广告列表', res)

          })
      },
      _advavlstatusedit (m, n) {
        let params = {
          advId: m,
          advAvlstatus: n,
        }
        advavlstatusedit({
          params: JSON.stringify(params)
        })
          .then( res => {

            this.$message({
              type: 'success',
              message: '修改成功!'
            })

            console.log('广告状态', res)

          })
      },

      handleCurCha (val) {
        this.pageIndex = (val-1)*this.pageSize
        this._complexlist()
      }
    }
  }
</script>
<style scoped>

</style>

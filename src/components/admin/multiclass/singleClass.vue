<template>
  <div  class="cont_rt">
    <div class="cont_top">
      <div class="back_btn" @click="back">返回</div>
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
            <tr v-if="count === 0"><td colspan="6">暂无数据！</td></tr>
            <tr v-for="item in arrSingleClass">
              <td>{{item.advId}}</td>
              <td>{{item.className}}</td>
              <td>{{item.classPrice}}</td>
              <td v-if="item.classTeachmethod === 'W'">网络</td>
              <td v-if="item.classTeachmethod === 'Z'">直播</td>
              <td v-if="item.classTeachmethod === 'H'">面网结合</td>
              <td>{{item.advAvlstatus === 'Y' ? '是' : '否'}}</td>
              <td>
                <a href="javascript:void(0);" class="lma_a" @click="operate(item)">{{item.advAvlstatus !== 'Y' ? '是' : '否'}}</a>
              </td>
            </tr>
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
</template>

<script>
import EHeader from '../common/eHeader'
import { classall, singleAdvclasslist, advavlstatusedit } from '@/api/admin/sl'
import { Select, Option, Pagination } from 'element-ui'

export default {
    name: "SingleClass",
    components : {
      EHeader,
      Select,
      Option,
      Pagination
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        advAvlstatus: '',
        className: '',
        classTeachmethod: '',
        pageIndex: 0,
        pageSize: 10,

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
        arrSingleClass: [],
        count: '',
      }
    },
    mounted () {
      this._singleAdvclasslist()
    },
    methods: {
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
      query () {
        this._singleAdvclasslist()
      },
      back() {

        this.$router.go(-1)

      },
      _singleAdvclasslist () {

        let params = {
          className: this.className,  // 	班级名称
          advAvlstatus: this.value1, // 广告状态
          classTeachmethod: this.value2, // 授课方式
          pageIndex: this.pageIndex, // 当前页
          pageSize: this.pageSize, // 页面大小
        }

        console.log(params)

        singleAdvclasslist({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.arrSingleClass = res.data.data

              this.count = res.data.count

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

            console.log('单个班级广告列表', res)

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

            console.log('广告状态', res)

          })
      },

      handleCurCha (val) {
        this.pageIndex = (val-1)*this.pageSize
        this._singleAdvclasslist()
      },

    }

}
</script>

<template>
  <div>
    <div class="cont_rt">
        <div class="cont_top">
          <a href="javascript:void(0)" class="add_btn" @click="addBanner">添加banner广告</a>
          <EHeader></EHeader>
        </div>
        <div class="cont_con">
          <div class="lmad_tt">
            <label class="lma_lab">广告名称：<input type="text" class="lma_inp" v-model="advName"></label>
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
            <div class="lmad_con">
              <table>
                <tr>
                  <th width="10%">编号</th>
                  <th width="20%">广告名称</th>
                  <th width="15%">图片</th>
                  <th width="10%">广告类型</th>
                  <th width="10%">前台显示状态</th>
                  <th width="10%">创建人</th>
                  <th width="15%">创建时间</th>
                  <th width="10%">操作</th>
                </tr>
                <tr v-if="count===0"><td colspan="8">暂无数据！</td></tr>
                <tr v-for="item in arrBanner">
                  <td>{{item.advId}}</td>
                  <td>{{item.advName}}</td>
                  <td><img :src="file_imgSrc + item.advPicpath" class="lma_img"></td>
                  <td>图片广告</td>
                  <td>{{ item.advAvlstatus === 'Y' ? '是' : '否' }}</td>
                  <td>shl</td>
                  <td>{{item.advCreatedate}}</td>
                  <td>
                    <a href="javascript:void(0);" class="lma_a" @click="operate('lookList', item.advId)">查看</a>
                    <a href="javascript:void(0);" class="lma_a" @click="operate('yon', item.advId, item.advAvlstatus)">{{ item.advAvlstatus !== 'Y' ? '是' : '否' }}</a>
                    <a href="javascript:void(0);" class="lma_a" @click="operate('delList', item.advId)">删除</a>
                    <a href="javascript:void(0);" class="lma_a" @click="operate('modifyList', item.advId)">修改</a>
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
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import { Select, Option, Pagination, DatePicker } from 'element-ui'
  import { advlist, advedit, advdelete } from '@/api/admin/cm'

  export default {
    name: "bannerList",
    components : {
      EHeader,
      Select,
      Option,
      Pagination,
      DatePicker,
    },
    data () {
      return {
        file_imgSrc: this.GLOBAL.file_imgSrc,
        pageIndex: 1,
        pageSize: 10,
        adv_StartDate: '',
        adv_EndDate: '',
        value1: '', // 广告禁用状态
        options1: [{
          value: 'Y',
          label: '是'
        }, {
          value: 'N',
          label: '否',

        }],

        advName: '', // 广告名称
        arrBanner: [],
        count: 0, // 总条目数
      }
    },
    mounted () {
      this._advlist()
    },
    methods: {
      operate (val1, val2, status) {
        switch (val1) {
          case 'lookList':
            this.$router.push({path: '/admin/addBannerAll', query: {type: 'query', advId: val2}});
            break;
          case 'yon':
            {
              if (status === 'Y') {
                this.$confirm('取消前台显示', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  this._advedit(val2, 'N')

                  this._advlist()

                })
              } else {
                this.$confirm('确定前台显示', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  this._advedit(val2, 'Y')

                  this._advlist()


                })
              }
            }
            break;
          case 'delList':
            {
              this.$confirm('确定要删除此条广告？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

                this._advdelete(val2)

                this._advlist()

              })
            }
            break;
          case 'modifyList':
              this.$router.push({path: '/admin/addBannerAll', query: {type: 'update', advId: val2}});
            break;
        }
      },
      addBanner () {
        this.$router.push('/admin/addBannerAll')
      },
      query () {
        this._advlist()
      },
      // 广告列表
      _advlist () {
        let params = {
          advboardId: 'ADVBOARD20181024010000000002', // 广告位置
          advName: this.advName,
          advAvlstatus: this.value1,
          advCreatedate_start: this.adv_StartDate,
          advCreatedate_end: this.adv_EndDate,
          advDelstatus: 'Y', // 广告删除状态
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        console.log('params', params)
        advlist({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.count = res.data.count

              this.arrBanner = res.data.datas

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }
            console.log('广告列表', res)

          })
      },
      // 是否前台显示
      _advedit (id, av) {
        let params = {
          advId: id,
          advboardId: 'ADVBOARD20181024010000000002', // 广告标识
          advAvlstatus: av, // 广告启用状态
        }
        advedit({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({
                type: 'success',
                message: '修改成功!'
              })

            } else {

              this.$message({
                type: 'warn',
                message: res.msg
              })

            }

            console.log('是否前台显示', res)

          })
      },
      // 广告删除
      _advdelete (id) {
        let params = {
          advId: id
        }
        advdelete({
          params: JSON.stringify(params)
        })
          .then( res => {

            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            console.log('广告删除', res)

          })
      },
      handleCurCha (val) {
        this.pageIndex = val
        this._advlist()
      }
    }
  }
</script>

<style scoped>

</style>

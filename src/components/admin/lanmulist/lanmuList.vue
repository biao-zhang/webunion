<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="add_btn" @click="addLanmu">添加栏目</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="lmad_tt">
          <label class="lma_lab">栏目标题：<input type="text" class="lma_inp" v-model="lanmuName"></label>
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
              v-model="class_StartDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
            >
            </date-picker>
            <span class="lma_tsp">至</span>
            <date-picker
              v-model="class_EndDate"
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
                <th width="20%">栏目名称</th>
                <th width="15%">前台状态</th>
                <th width="15%">创建人</th>
                <th width="20%">创建时间</th>
                <th width="20%">操作</th>
              </tr>
              <tr v-if="count===0"><td colspan="6">暂无数据！</td></tr>
              <tr v-for="item in arrLanmu">
                <td>{{item.classId}}</td>
                <td>{{item.className}}</td>
                <td>{{item.classAvlstatus === 'Y' ? '是' : '否'}}</td>
                <td>{{item.classCreater}}</td>
                <td>{{item.classCreatetime}}</td>
                <td>
                  <a href="javascript:void(0);" class="lma_a" @click="operate('modifyList', item.classId)">编辑</a>
                  <a href="javascript:void(0);" class="lma_a" @click="operate('delList', item.classId)">删除</a>
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
  import { classlist, classedit, classdelete } from '@/api/admin/cm'

  export default {
    name: "lanmuList",
    components: {
      EHeader,
      Select,
      Option,
      Pagination,
      DatePicker,
    },
    data () {
      return {
        pageIndex: 1,
        pageSize: 10,
        class_StartDate: '',
        class_EndDate: '',
        value1: '', // 广告禁用状态
        options1: [{
          value: 'Y',
          label: '是'
        }, {
          value: 'N',
          label: '否',

        }],

        lanmuName: '', // 栏目名称
        arrLanmu: [],
        count: 0, // 总条目数
      }
    },
    mounted () {
      this._classlist()
    },
    methods: {
      query () {
        this._classlist()
      },
      addLanmu () {
        this.$router.push('/admin/addLanmuAll')
      },
      operate (val1, val2, status) {
        switch (val1) {

          case 'delList':
          {
            this.$confirm('确定要删除此栏目？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this._classedit(val2)

              this._classlist()

            })
          }
            break;
          case 'modifyList':
            this.$router.push({path: '/admin/addLanmuAll', query: {type: 'update', classId: val2}});
            break;
        }
      },
      // 栏目列表
      _classlist () {
        let params = {
          className: this.lanmuName,
          classAvlstatus: this.value1,
          classDelstatus: 'Y',
          startCreatetime: this.class_StartDate,
          endCreatetime: this.class_EndDate,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        console.log('params', params)
        classlist({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.count = res.data.count

              this.arrLanmu = res.data.datas

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }
            console.log('栏目列表', res)

          })
      },
      // 删除
      _classedit (classId) {
        let params = {
          classId: classId,
          classDelstatus: 'N'
        }
        classedit({
          params: JSON.stringify(params)
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({

                type: 'success',

                message: '删除成功'

              })

              this.$router.push('/admin/lanmuListAll')

            } else {

              this.$alert(res.msg, '提示', {

                confirmButtonText: '确定',

                type: 'warning'

              })

            }

            console.log('栏目删除', res)

          })
      },
      handleCurCha (val) {
        this.pageIndex = val
        this._classlist()
      }
    }
  }
</script>

<style scoped>

</style>

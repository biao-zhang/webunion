<template>
  <div>
    <div class="cont_rt">
      <div class="cont_top">
        <a href="javascript:void(0)" class="back_btn" @click="back">返回</a>
        <e-header></e-header>
      </div>
      <div class="cont_con">
        <div class="lmad_tt">
          <label class="lma_lab">班级名称：<input type="text" class="lma_inp" v-model="className"></label>
          <input type="button" value="查询" class="lma_btn" @click="query">
        </div>
        <div class="add_course">
          <div class="adcur_lf">
            <div class="adcur_tit"><span>待选班级</span></div>
            <div class="adcur_con">
              <checkbox-group v-model="check1" @change="handleCheckedCitiesChange1">
                <checkbox
                  class="cur_lab"
                  :key="index"
                  :label="item"
                  v-for="(item, index) in classNameList"
                >{{item}}</checkbox>
              </checkbox-group>

            </div>
            <div class="adcur_bm">
              <checkbox
                class="cur_lab"
                :indeterminate="isIndeterminate1"
                v-model="checkAll1"
                @change="handleCheckAllChange1"
              >全选</checkbox>
            </div>
          </div>
          <div class="adcur_btnbox">
            <input type="button" class="adcur_btn" value="<<添加选中" @click="addPitch"/>
            <!--<input type="button" class="adcur_btn" value="全部添加"/>-->
            <input type="button" class="adcur_btn" value="删除选中>>" @click="delPitch"/>
          </div>
          <div class="adcur_lf">
            <div class="adcur_tit"><span>已选班级</span></div>
            <div class="adcur_con">
              <checkbox-group v-model="check2" @change="handleCheckedCitiesChange2">
                <checkbox
                  class="cur_lab"
                  :key="index"
                  :label="item"
                  v-for="(item, index) in itemNameArr"
                >{{item}}</checkbox>
              </checkbox-group>
            </div>
            <div class="adcur_bm">
              <checkbox
                class="cur_lab"
                :indeterminate="isIndeterminate2"
                v-model="checkAll2"
                @change="handleCheckAllChange2"
              >全选</checkbox>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="acur_subbox">
          <input type="button" value="提 交" class="rest_btn" @click="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import { classall, add } from '@/api/admin/sl'
  import { array_diff, removeObj } from "../../../config/mUtils"
  import { Checkbox, CheckboxGroup } from 'element-ui'

  export default {
    name: "addClass",
    components : {
      EHeader,
      Checkbox,
      CheckboxGroup,
    },
    data () {
      return {
        checkAll1: false,
        checkAll2: false,
        isIndeterminate1: true,
        isIndeterminate2: true,
        check1: [], // 待选全选
        check2: [], // 已选全选
        className: '',
        classList: [], // 待选班级列表（id+name）
        itemNameArr: [], // 已选班级列表
        classNameList: [], // 待选班级名字列表
        classIdList: [], // 已选班级id列表
      }
    },
    methods: {
      handleCheckAllChange1 (val) {

        this.check1 = val ? this.classNameList : []

        this.isIndeterminate1 = false

      },
      handleCheckedCitiesChange1 (value) {
        let checkedCount = value.length;
        this.checkAll1 = checkedCount === this.classNameList.length;
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.classNameList.length;
      },

      handleCheckAllChange2(val) {

        this.check2 = val ? this.itemNameArr : []

        this.isIndeterminate2 = false

      },
      handleCheckedCitiesChange2 (value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.itemNameArr.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.itemNameArr.length;
      },
      submit () {

        this.itemNameArr.map( item1 => {

          this.classList.map( item2 => {

            if (item1 === item2.className) {

              this.classIdList.push({classId: item2.classId})

              removeObj(this.classIdList, 'classId')

            }

          })

        })
        console.log('this.classIdList', this.classIdList)

        this._add()

      },
      addPitch () {
        console.log('check1', this.check1)
        this.itemNameArr = this.check1
        console.log('this.itemNameArr', this.itemNameArr)
      },
      delPitch () {
        array_diff(this.itemNameArr, this.check2)
      },
      back() {

        this.$router.go(-1)

      },
      query () {

        if (this.className === '') {

          this.$alert('班级名称不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })

        } else {

          this._classall()

        }


      },
      _classall () {

        let params = {className: this.className}

        classall({
          params: JSON.stringify(params),
        })
          .then(res => {

            console.log('班级列表', res)

            if (res.result === '000000') {

              this.classList = res.data.data.data

              this.classList.map( item => this.classNameList.push(item.className))

              if (this.classList.length === 0) {

                this.$alert('暂无查询结果', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })

              }

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

          })
      },
      _add () {

        let params = this.classIdList

        add({
          params: JSON.stringify({data:params})
        })
          .then( res => {

            if (res.result === '000000') {

              this.$message({
                type: 'success',
                message: '添加成功!'
              })

              this.$router.push('/admin/multiClassAll')

            } else {

              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

            }

            console.log('班级组添加', res)

          })
      }
    }

  }
</script>

<style scoped>
  .adcur_con >>> .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
</style>

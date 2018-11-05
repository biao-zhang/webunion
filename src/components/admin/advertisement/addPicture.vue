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
            <span class="rest_name"><font>*</font>图片名称：</span>
            <input type="text" class="rest_inp"  v-model="advName"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>业务类型：</span>
            <get-projects @transferProjectId="getProjectId" :projectName="projectName"></get-projects>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>地  址：</span>
            <input type="text" class="rest_inp"  v-model="advLink"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name"><font>*</font>图片尺寸：</span>
            <input type="number" class="rest_num"  v-model="advWidth" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" min="0"/>
            <span>*</span>
            <input type="number" class="rest_num"  v-model="advHeight" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" min="0"/>
          </div>
          <div class="rest_lab">
            <span class="rest_name">上传图片：</span>
            <!--<label class="file_lab">上传图片<input type="file" class="rest_file"/></label>-->
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
          <div class="rest_lab">
            <span class="rest_name">状态：</span>
            <div style="line-height: 40px;">
              <Radio v-model="advAvlstatus" label="Y">启用</Radio>
              <Radio v-model="advAvlstatus" label="N">禁用</Radio>
            </div>
          </div>
          <div class="rest_btnbox" v-show ="!(type==='query')">
            <input type="button" class="rest_btn" value="提 交" @click="add"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EHeader from '../common/eHeader'
  import getProjects from './getProjects'
  import { Radio } from 'element-ui'
  import { addImageadv,updateImageadv,imageadvInfo } from '@/api/admin/sl'
  import { upload } from '@/api/admin/file'
  import Upload from '@/components/admin/common/upload'

  export default {
    name: 'addPicture',
    components: {
      EHeader,
      getProjects,
      Radio,
      Upload
    },
    data () {
      return {
        advName:'',
        projectId:'',
        projectName:'',
        advLink:'',
        advAvlstatus:'Y',
        advPicpath:'',
        advWidth:'',
        advHeight:'',
        type:this.$route.query.type,
        advId:this.$route.query.advId,
        picWidth: '180px',
        picHeight: '180px',
        imgSrc: require('@/assets/admin/images/upload.png'),
        file_imgSrc:'',
      }
    },
    mounted(){
      if(this.type==="query"||this.type==="update") this._imageadvInfo();
      this.file_imgSrc = this.GLOBAL.file_imgSrc;
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      add(){
        if(this.advName===''){
          this.$alert('广告名称不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.projectId===''){
          this.$alert('请先选择项目', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.advLink===''){
          this.$alert('地址不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.advWidth===''||this.advHeight===''){
          this.$alert('广告尺寸不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.advPicpath===''){
          this.$alert('请先上传图片', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if(this.type==="update") this._updateImageadv();
        else this._addImageadv();
      },
      getProjectId(msg){
        this.projectId = msg;
      },
      _addImageadv(){
        let params ={
          advName:this.advName,//文字广告名称
          projectId:this.projectId,//所属项目
          advLink:this.advLink,//地址
          advPicpath:this.advPicpath,//广告图片
          advPicsize:this.advWidth+'*'+this.advHeight,//广告图片尺寸
          advAvlstatus:this.advAvlstatus,//状态
        };
        addImageadv({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==='000000'){
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/admin/pictureListAll');
              }
            });
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
          }
        })
      },
      _updateImageadv(){
        let params ={
          advId:this.advId,//广告编号
          advName:this.advName,//文字广告名称
          projectId:this.projectId,//所属项目
          advLink:this.advLink,//地址
          advPicpath:this.advPicpath,//广告图片
          advPicsize:this.advWidth+'*'+this.advHeight,//广告图片尺寸
          advAvlstatus:this.advAvlstatus,//状态
        };
        updateImageadv({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==='000000'){
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                this.$router.push('/admin/pictureListAll');
              }
            });
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
          }
        })
      },
      _imageadvInfo(){
        let params ={
          advId:this.advId//文字广告名称
        };
        imageadvInfo({
          params: JSON.stringify(params)
        }).then( res => {
          console.log(res);
          if(res.result==="000000"){
            console.log(res);
            this.advName = res.data.advName;
            this.projectId = res.data.projectId;
            this.projectName = res.data.projectName;
            this.advLink = res.data.advLink;
            this.advAvlstatus = res.data.advAvlstatus;
            this.imgSrc = this.file_imgSrc+res.data.advPicpath;
            this.advPicpath = res.data.advPicpath;
            let arr = res.data.advPicsize.split('*');
            this.advWidth = arr[0];
            this.advHeight = arr[1];
          }else{
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
        })
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

            this.advPicpath = res.data.filePath

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
    }
}
</script>

<style scoped>

</style>

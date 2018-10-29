<template>
    <div>
      <div class="adcode_zz"></div>
      <div class="adcode_box">
        <div class="web_tt">
          <span>广告代码</span>
          <i class="adcode_close" @click="transShow"></i>
        </div>
        <div class="adcode_con">
          <div class="adcode_top">
            <span class="adcode_sp">推广链接：</span>
            <input type="text" v-model="advLink" class="adcode_inp" id="advLink">
            <input type="button" value="复制链接" class="adcode_btn" data-clipboard-target="#advLink" @click="copy">
          </div>
          <div class="adcode_bm">
            <p class="adcode_p">广告代码：</p>
            <textarea class="adcode_area" v-model="advCode" id="advCode"></textarea>
            <input type="button" value="复制代码" class="adcode_btn" data-clipboard-target="#advCode" @click="copy">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { advcode } from '@/api/web/sl'
  import Clipboard from 'clipboard'
    export default {
      name: "adCode",
      data() {
        return {
          advLink: '',//广告链接
          advCode: '',//广告编码
          advId: '',//广告Id
          advType: '',//广告类型
        }
      },
      props: ['transAdvId', 'transAdvType'],
      mounted() {
        this.advId = this.transAdvId;
        this.advType = this.transAdvType;
        this._advcode();
      },
      methods: {
        _advcode() {
          let params = {
            advId: this.advId, //广告Id
            advType: this.advType,//广告类型
          }
          advcode({
            params: JSON.stringify(params)
          }).then(res => {
            console.log(res);
            if (res.result === "000000") {
              this.advLink = res.data.advLink;
              this.advCode = res.data.advCode;
            } else {
              this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
            }
          })
        },
        transShow() {
          this.$emit('transShow', false);
        },
        copy() {
          let clipboard = new Clipboard('.adcode_btn');
          clipboard.on('success', e => {
            this.$alert('复制成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            clipboard.destroy(); //使用destroy可以清楚缓存
          });
          clipboard.on('error', e => {
            this.$alert('复制失败', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            clipboard.destroy(); //使用destroy可以清楚缓存
          });
        }
      }
    }
</script>

<style scoped>

</style>

<template>
    <div>
      <script id="editor" type="text/plain"></script>
    </div>
</template>

<script>
    export default {
      name: "UE",
      data(){
        return{
          editor: null,
          Content:'',
          flag:false,
        }
      },
      props: {
        defaultMsg: {
          type: String
        },
        config: {
          type: Object
        }
      },
      watch:{
        defaultMsg(){
          this.Content = this.defaultMsg;
          if(this.flag) this.editor.setContent(this.Content);
        },
      },
      mounted() {
        const _this = this;
        this.Content = this.defaultMsg
        this.editor = UE.getEditor('editor', this.config); // 初始化UE
        this.editor.addListener("ready", function () {
          _this.flag = true;
          _this.editor.setContent(_this.Content); // 确保UE加载完成后，放入内容。
        });
      },
      methods: {
        getUEContent() { // 获取内容方法
          return this.editor.getContent()
        }
      },
      destroyed() {
        this.editor.destroy();
      }
    }
</script>

<style scoped>

</style>

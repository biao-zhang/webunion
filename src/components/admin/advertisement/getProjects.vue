<template>
  <cascader
    :options="project"
    v-model="selectedOptions"
    :show-all-levels="false"
    :placeholder="value"
    @change="handleChange">
  </cascader>
</template>

<script>
  import { Cascader } from 'element-ui'
  import { projectsall } from '@/api/admin/sl'
    export default {
      name: "getProjects",
      components: {
        Cascader
      },
      data() {
        return {
          project: [],
          value:'请选择',
          selectedOptions: [],
        }
      },
      props: ['projectName'],
      watch: {
        projectName(newValue, oldValue) {
          this.value = newValue;
        }
      },
      mounted() {
        this._projectsall()
      },
      methods:{
        _projectsall () {
          projectsall().then( res => {
            let arr = [];
            //console.log(res);
            this.project = arr;
            if(res.data !== "" && res.data !== null){
              let data = res.data.data;
              //console.log('获取全部项目列表', res.data.data)
              for (let i=0;i<data.length;i++) {
                if (data[i].projectLevelcode <= 10) {
                  arr.push({
                    value: data[i].projectId,
                    label: data[i].projectName,
                    id: data[i].projectLevelcode,
                    children: []
                  });
                } else {
                  for (let j = 0; j < arr.length; j++) {
                    if (arr[j].id === data[i].projectLevelcode.substr(0, 10)) {
                      arr[j].children.push({value: data[i].projectId, label: data[i].projectName});
                      break;
                    }
                  }
                }
              }
            }
            this.project = arr;
            console.log(this.project);
          })
        },
        handleChange() {
          //console.log(this.selectedOptions);
          this.$emit('transferProjectId',this.selectedOptions[1]);
        },
      }
    }
</script>

<style scoped>

</style>

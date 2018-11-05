<template>
  <div class="exten_chart" id="exchart">
  </div>
</template>

<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts')
    // 引入折线图
    require('echarts/lib/chart/line')
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
      name: "myEcharts",
      data() {
        return {
          xAxisName : '',
          xAxisDate : '',
          yAxisDate : '',
        }
      },
      props:['datas'],
      watch:{
        datas: {
          handler() {
            this.init();
          },
          deep: true
        }
      },
      mounted() {
        this.init();
      },
      methods: {
        init(){
          this.xAxisName = this.datas.typeName;
          this.xAxisDate = this.datas.xdata;
          this.yAxisDate = this.datas.ydata;
          this.drawLine();
        },
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('exchart'))
          // 绘制图表
          myChart.setOption({
            tooltip: {},
            xAxis: {
              name:this.xAxisName,
              type : 'category',
              boundaryGap: false,
              data:this.xAxisDate,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#666',
                  fontSize:'14'
                }
              },
              nameTextStyle:{
                color : '#666',
                fontSize : '16'
              }
            },
            yAxis: {
              name:'浏览量',
              type: 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#666',
                  fontSize:'14'
                }

              },
              nameTextStyle:{
                color : '#666',
                fontSize : '16',
              },
              splitLine: {
                show: true,
                //  改变轴线颜色
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['#e5e5e5']
                }
              }
            },
            series: [{
              data: this.yAxisDate,
              type: 'line',
              itemStyle: {
                color: '#fc706c'
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  color:'#333333',
                  fontSize:'16'
                }
              },
              areaStyle: {
                normal: {
                  color: '#fd9693'
                }
              }
            }]
          });
        }
      }
    }
</script>

<style scoped>

</style>

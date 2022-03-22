<template>
  <div class="home">
       <div class="card" >
         <div class="all sell" v-for="(arr,index) in list" :key=index>
           <p>{{arr.title}}</p>
           <div class="num">{{arr.current}}</div>
           <hr>
           <span>今天销售额：{{arr.total}}</span>
         </div>
         <!-- <div class="all visited">
           <p>访问量：</p>
           <div class="num">9999999</div>
           <hr>
           <span>今天销售额：1765</span>
         </div>
         <div class="all allpay">
           <p>支付总量：</p>
           <div class="num">9999999</div>
           <hr>
           <span>今天销售额：1765</span>
         </div>
         <div class="all collection">
           <p>收藏量：</p>
           <div class="num">9999999</div>
           <hr>
           <span>今天销售额：1765</span>
         </div> -->
       </div>
       <div id="main" style="width: 600px;height:400px;background:#fff;margin:20px auto"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list:[],
    }
  },
  created() {
    this.$api.statistical().then(res =>{
      this.list = res.data.list
    })
    this.$api.sellTotal().then(res =>{
      console.log(res.data.info.xResult);
      
      // 获取X轴数据
      let xDate = res.data.info.date
      let xResult = res.data.info.xResult
      let pname = []
      let sellCount = []
      xResult.forEach(pn => {
          pname.push(pn.xName)
          pn.data.forEach(sc => {
            sellCount.push(sc.num)
          })
      })
      console.log('---',xDate);
      console.log('---',pname);
      console.log('---',sellCount);
      this.linerecharts(xDate,pname,sellCount.slice(0,6),sellCount.slice(6,12),sellCount.slice(12,18))
    })
  },
  mounted(){
    
  },
  methods: {
    linerecharts(data,pname,Furniture,mobile,jiadian) {
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
          title: {
            text: '月销售额'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: pname
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data,
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '家具',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(128, 255, 165)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: Furniture
            },
            {
              name: '手机',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0, 221, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(77, 119, 255)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data:mobile
            },
            {
              name: '家电',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(55, 162, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(116, 21, 219)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: jiadian
            },
          ]
      };
              // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
    }
  }
}
</script>

<style scoped lang="less">
.home {
   margin-top: 20px;
  .card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .all{
      position: relative;
      width: 200px;
      height: 100px;
      border-radius: 10px;
      p {
        display: inline-block;
        margin:10px 0 0 10px;
        color:#fff
      }
      span {
        position: absolute;
        left: 10px;
        bottom: 0;
        line-height: 30px;
        color:#fff;
        font-size: 10px;
      }
      hr{
        position: absolute;
        top: 66px;
        color:#fff;
        width: 195px;
        z-index: 1;
        text-align: center;
      }
      .num {
        margin-left: 20px;
        margin-top: 5px;
        color:#fff;
        font-size: 17px;
      }
    }
    .sell {
      background: linear-gradient(135deg,#f0a1a1,#cc6600);
    }
    .visited {
      background: linear-gradient(135deg,rgb(162, 113, 236),rgb(124, 13, 235));
    }
    .allpay {
      background: linear-gradient(135deg,rgb(228, 48, 213),rgb(182, 37, 138));
    }
    .collection {
      background: linear-gradient(135deg,rgb(82, 178, 223),rgb(37, 153, 182));

    }
  }
}
</style>
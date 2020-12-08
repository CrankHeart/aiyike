<!--部门工作效率echarts表-->
<template>
	<div class="workeff">
		<section>
			<div class="header">
			<span class="middle text">部门饱和度</span>
			<el-select v-model="timeOption" placeholder="请选择" @change="timeChange" class="date-select" style="width: 80px;" v-sicon1>
				<el-option
						v-for="item in timeOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="lengend">
			<span>部门饱和度</span>
			<span>其它工时</span>
		</div>
		<div class="util">
			<span class="ratio">%</span>
			<span class="h">h</span>
		</div>
		<div :id="[obtainChartId()]" class="psnworkEffChart"></div>
		</section>
	</div>
</template>

<script>
import Resize from "@/utils/resize.js";
let echartsPromise = (() => import("echarts"))();
let echarts = null;

export default {
  name: "DepartmentalWorkEfficiency",
  props: {
    pin: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      timeOptions: [
        {
          value: 1,
          label: "本周"
        },
        {
          value: 2,
          label: "上周"
        },
        {
          value: 3,
          label: "本月"
        },
        {
          value: 4,
          label: "上月"
        }
      ],
      staffSaturation: [],
      otherWorkingHours: [],
      ret: [],
      retN: [],
      timeOption: 1,
      date: new Date(),
      psnworkEffChart: null,
      currentActiveIndex: -1
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      const el = document.getElementById(this.obtainChartId());
      const psnworkEffChartLoadInterval = setInterval(() => {
        if (el.offsetWidth > 0) {
          this.$parent.resizeWidth && this.$parent.resizeWidth();
          echartsPromise.then(ec => {
            echarts = ec;
            this.loadChart();
          });
          clearInterval(psnworkEffChartLoadInterval);
        }
      }, 0);
      this.getWorkEfficiency();
    });
  },
  computed: {
    opt() {
      let that = this;
      let obj = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            let result = "";
            let f = "";
            params.forEach(function(item) {
              if (item.seriesIndex == 0) {
                f = "%";
              }
              if (item.seriesIndex == 1) {
                f = "h";
              }
              result +=
                item.marker + item.seriesName + ": " + item.value + f + "<br>";
            });
            return result;
          }
        },
        grid: {
          top: "3%",
          left: "0%",
          right: "0%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "black"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.2)"
              }
            },
            data: this.obtainXData()
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "black"
            },
            splitLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.2)"
              }
            }
          },
          {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "black"
            },
            splitLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.2)"
              },
              show:false
            }
          }
        ],
        series: [
          {
            name: "部门饱和度",
            barGap: 0,
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#295dcf"
              }
            },
            data: this.otherWorkingHours
          },
          {
            name: "其它工时",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#d3def4"
              }
            },
            yAxisIndex: 1,
            data: this.staffSaturation
          }
        ]
      };
      return obj;
    }
  },
  methods: {
    obtainChartId() {
      return `${this.pin}psnworkEffChart`;
    },
    timeChange() {
      this.getWorkEfficiency();
    },
    bindChartMouseOver() {
      let _self = this;
      this.psnworkEffChart.on("mouseover", function(params) {
        _self.currentActiveIndex = params.dataIndex;
        _self.loadChart();
      });
      this.psnworkEffChart.on("mouseout", function(params) {
        _self.currentActiveIndex = -1;
        _self.loadChart();
      });
    },
    obtainXData() {
      if (this.currentActiveIndex == -1) {
        return this.retN;
      } else {
        this.ret[this.currentActiveIndex]["textStyle"]["color"] =
          "rgba(31, 31, 31, 1)";
        return this.ret;
      }
    },
    getWorkEfficiency() {
      let data = {
        flag: this.timeOption
      };
      this.$http
        .post("/api/workbench/queryRateOfContributionByDepart", data, {
          emulateJSON: true
        })
        .then(res => {
          let workEfficiencyList = res.data.result;
          this.loading = false;
          // this.staffSaturation = workEfficiencyList.map(v =>
          //   (v.rate * 100).toFixed(2)
          // );
          // this.otherWorkingHours = workEfficiencyList.map(v => v.overHour);
          this.staffSaturation = workEfficiencyList.map(v => v.overHour) ;
          this.otherWorkingHours = workEfficiencyList.map(v =>
            (v.rate * 100).toFixed(2)
          );;
          this.retN = workEfficiencyList.map(v => v.userName);
          let arr = [].concat(workEfficiencyList);
          this.ret = arr.map(v => {
            return {
              value: v.userName,
              textStyle: {
                color: "rgba(187,187,187,0.42)",
                fontFamily: "PingFangSC-Medium"
              }
            };
          });
          this.loadChart();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    loadChart() {
      if (!this.psnworkEffChart) {
        this.psnworkEffChart = echarts.init(
          document.getElementById(this.obtainChartId())
        );
        Resize.on(document.getElementById(this.obtainChartId()), () => {
          this.psnworkEffChart.resize();
        });
        this.bindChartMouseOver();
      }
      this.psnworkEffChart.setOption(this.opt, true);
      this.psnworkEffChart.resize();
    }
  }
};
</script>

<style scoped>
.util {
  margin-top: 15px;
  margin-bottom: 6px;
}

.util span {
  color: black;
  font-size: 12px;
}

.util .h {
  float: right;
}

.lengend span {
  font-size: 12px;
  color: #a6a6a6;
  margin-right: 26px;
}

.lengend span:before {
  position: relative;
  vertical-align: middle;
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 6px;
}

.lengend span:nth-of-type(1):before {
  background: #1b53cc;
}

.lengend span:nth-of-type(2):before {
  background: #d3def4;
}

.workeff {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.workeff > section {
  padding: 18px 18px 18px;
  background: #fff;
}
.header {
  height: 34px;
}

.header .text {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
  font-size: 14px;
  color: #333333;
}

.date-select {
  float: right;
}

.psnworkEffChart {
  height: 180px;
  width: 100%;
}
</style>
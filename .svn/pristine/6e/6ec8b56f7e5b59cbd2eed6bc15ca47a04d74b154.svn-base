<!--部门工作效率echarts表-->
<template>
	<div class="workeff">
		<section>
			<div class="header">
			<span class="middle text">部门饱和度</span>
			<el-select v-model="value" placeholder="请选择" @change="dateHandler" class="date-select" style="width: 80px;" v-sicon1>
				<el-option
						v-for="item in options"
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
		<div :id="[obtainCharId()]" class="cfppsnworkEffChart"></div>
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
      options: [
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
      value: 1,
      date: new Date(),
      cfppsnworkEffChart: null,
      currentActiveIndex: -1,
      otherHours: [],
      depaSaturation: [],
      ret: [],
      retN: []
    };
  },
  components: {},
  mounted: function() {
    this.$nextTick(() => {
      let _self = this;
      const el = document.getElementById(this.obtainCharId());
      let cfppsnworkEffChartLoadInterval = requestAnimationFrame(
        function req() {
          if (el.offsetWidth > 0) {
            cancelAnimationFrame(cfppsnworkEffChartLoadInterval);
            echartsPromise.then(ec => {
              echarts = ec;
              _self.loadChart();
            });
          } else {
            cfppsnworkEffChartLoadInterval = requestAnimationFrame(req);
          }
        }
      );
      if (this.pin === "dir") {
        this.getDirData();
      } else if (this.pin === "man") {
        this.getManData();
      } else if (this.pin === "vp") {
        this.getVpData();
      } else {
        return;
      }
    });
  },
  methods: {
    obtainCharId() {
      return `${this.pin}cfppsnworkEffChart`;
    },
    dateHandler(val) {
      this.retN = [];
      this.ret = [];
      this.otherHours = [];
      this.depaSaturation = [];
      if (this.pin === "dir") {
        this.getDirData();
      } else if (this.pin === "man") {
        this.getManData();
      } else if (this.pin === "vp") {
        this.getVpData();
      } else {
        return;
      }
    },
    getDirData() {
      let data = {
        flag: this.value
      };
      this.$http
        .post("/api/workbench/queryRateOfContributionByDeparts", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          for (let i in result) {
            this.otherHours.push(result[i].overHour);
          }
          for (let i in result) {
            this.depaSaturation.push((result[i].rate * 100).toFixed(2));
          }
          for (let i in result) {
            this.retN.push(result[i].departName);
          }
          for (let i in result) {
            this.ret.push({
              value: result[i].departName,
              textStyle: {
                color: "rgba(187,187,187,0.42)",
                fontFamily: "PingFangSC-Medium"
              }
            });
          }
          this.loadChart();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getManData() {
      let data = {
        flag: this.value
      };
      this.$http
        .post("/api/workbench/queryRateOfContributionByDeparts", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          for (let i in result) {
            this.otherHours.push(result[i].overHour);
          }
          for (let i in result) {
            this.depaSaturation.push((result[i].rate * 100).toFixed(2));
          }
          for (let i in result) {
            this.retN.push(result[i].departName);
          }
          for (let i in result) {
            this.ret.push({
              value: result[i].departName,
              textStyle: {
                color: "rgba(187,187,187,0.42)",
                fontFamily: "PingFangSC-Medium"
              }
            });
          }
          this.loadChart();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getVpData() {
      let data = {
        flag: this.value
      };
      this.$http
        .post("/api/workbench/queryRateOfContributionByDeparts", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          for (let i in result) {
            this.otherHours.push(result[i].overHour);
          }
          for (let i in result) {
            this.depaSaturation.push((result[i].rate * 100).toFixed(2));
          }
          for (let i in result) {
            this.retN.push(result[i].departName);
          }
          for (let i in result) {
            this.ret.push({
              value: result[i].departName,
              textStyle: {
                color: "rgba(187,187,187,0.42)",
                fontFamily: "PingFangSC-Medium"
              }
            });
          }
          this.loadChart();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    bindChartMouseOver() {
      let _self = this;
      this.cfppsnworkEffChart.on("mouseover", function(params) {
        _self.currentActiveIndex = params.dataIndex;
        _self.loadChart();
      });
      this.cfppsnworkEffChart.on("mouseout", function(params) {
        _self.currentActiveIndex = -1;
        _self.loadChart();
      });
    },
    obtainXData() {
      if (this.currentActiveIndex == -1) {
        return this.retN;
      } else {
        this.ret[this.currentActiveIndex]["textStyle"]["color"] =
          "rgba(51, 51, 51, 1)";
        return this.ret;
      }
    },
    loadChart() {
      if (!this.cfppsnworkEffChart) {
        this.cfppsnworkEffChart = echarts.init(
          document.getElementById(this.obtainCharId())
        );
        Resize.on(document.getElementById(this.obtainCharId()), () => {
          this.cfppsnworkEffChart.resize();
        });
        this.bindChartMouseOver();
      }
      this.cfppsnworkEffChart.setOption({
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
            data: this.depaSaturation
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
            data: this.otherHours
          }
        ]
      });
      this.cfppsnworkEffChart.resize();
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

.cfppsnworkEffChart {
  height: 180px;
  width: 100%;
}
</style>
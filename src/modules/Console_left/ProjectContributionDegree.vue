<!--部门工作效率echarts表-->
<template>
	<div class="workeff">
		<section>
			<div class="header">
        <span class="middle text">项目贡献度</span>
        <el-select v-model="timeOption" placeholder="请选择" @change="timeChange" class="date-select" style="width: 80px;" v-sicon1>
          <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
		  </div>
      
 
      <div class="util">
      </div>
      <div id="ech" style="height:350px"></div>

      

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
      pcdworkEffChart: null,
      EffChart: null,
      currentActiveIndex: -1,
      timeOption: 3,
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
      depaNames: [],
      projectNames: [],
      seriesArr: [],
      sourceArr: [],
      dimensionsArr: ["product"]
    };
  },
  computed: {
    opt() {
      let obj = {
        legend: {
          left: "left",
          itemWidth : 5,
          itemHeight :5
        },
        tooltip: {
          formatter: function(params) {
            let result = "";
            let f = "%";
            result =
              params.seriesName +
              ": " +
              params.value[params.seriesName] +
              f +
              "<br>";
            return result;
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          containLabel: true
        },
        dataset: {
          dimensions: this.dimensionsArr,
          source: this.sourceArr
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
                color: "rgba(187,187,187,0.42)"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name : '项目贡献度（%）',
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
              color: "rgba(187,187,187,0.42)"
            },
            splitLine: {
              show: true
            }
          }
        ],
        series: this.seriesArr
      };
      return obj;
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      const el2 = document.getElementById("ech");
      const EffChartLoadInterval = setInterval(() => {
        if (el2.offsetWidth > 0) {
          this.$parent.resizeWidth && this.$parent.resizeWidth();
          echartsPromise.then(ec => {
            echarts = ec;
            this.loadChart();
            if (this.pin === "pj") {
              this.getPjContributionData();
            }
          });
          clearInterval(EffChartLoadInterval);
        }
      }, 0);
    });
  },
  beforeUpdate() {},
  created() {},
  methods: {
    obtainCharId() {
      return `${this.pin}pcdworkEffChart`;
    },
    bindChartMouseOver2() {
      let _self = this;
      this.EffChart.on("mouseover", function(params) {
        _self.currentActiveIndex = params.dataIndex;
        _self.loadChart();
      });
      this.EffChart.on("mouseout", function(params) {
        _self.currentActiveIndex = -1;
        _self.loadChart();
      });
    },
    timeChange() {
      this.depaNames = [];
      this.projectNames = [];
      this.seriesArr = [];
      this.sourceArr = [];
      this.dimensionsArr = ["product"];
      this.EffChart.clear();
      let data = {
        flag: this.timeOption
      };
      this.$http
        .post("/api/workbench/queryRateOfContributionByPm", data, {
          emulateJSON: true
        })
        .then(res => {
          let arr = res.data.result;
          if (arr.length !== 0) {
            //部门数组
            for (let i in arr) {
              this.depaNames.push(arr[i].departName);
            }
            //所有项目名称列表去重
            for (let i in arr) {
              for (let ii in arr[i].dateList) {
                this.projectNames.push(arr[i].dateList[ii].item_name);
              }
            }
            this.projectNames = this.unique(this.projectNames);
            var project_length = this.projectNames.length;
            //series数组
            let obj = {
              type: "bar",
              barWidth: 20
            };
            for (let i = 0; i < project_length; i++) {
              this.seriesArr.push(obj);
            }
            //dimensions数组
            for (let i in this.projectNames) {
              this.dimensionsArr.push(this.projectNames[i]);
            }
            //source数组
            for (let i in arr) {
              this.sourceArr[i] = {
                product: arr[i].departName
              };
              for (let ii in arr[i].dateList) {
                this.sourceArr[i][arr[i].dateList[ii].item_name] = (
                  arr[i].dateList[ii].rate * 100
                ).toFixed(2);
              }
            }
            this.EffChart.setOption(this.opt);
            this.EffChart.resize();
          } else {
            this.EffChart.clear();
            this.EffChart.resize();
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },

    unique(array) {
      var n = [];
      for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
      }
      return n;
    },
    getPjContributionData() {
      let data = {
        flag: this.timeOption
      };
      this.$http
        .post("/api/workbench/queryRateOfContributionByPm", data, {
          emulateJSON: true
        })
        .then(res => {
          let arr = res.data.result;
          if (arr.length !== 0) {
            //部门数组
            for (let i in arr) {
              this.depaNames.push(arr[i].departName);
            }
            //所有项目名称列表去重
            for (let i in arr) {
              for (let ii in arr[i].dateList) {
                this.projectNames.push(arr[i].dateList[ii].item_name);
              }
            }
            this.projectNames = this.unique(this.projectNames);
            var project_length = this.projectNames.length;
            //series数组
            let obj = {
              type: "bar",
              barWidth: 20
            };
            for (let i = 0; i < project_length; i++) {
              this.seriesArr.push(obj);
            }
            //dimensions数组
            for (let i in this.projectNames) {
              this.dimensionsArr.push(this.projectNames[i]);
            }
            //source数组
            for (let i in arr) {
              this.sourceArr[i] = {
                product: arr[i].departName
              };
              for (let ii in arr[i].dateList) {
                this.sourceArr[i][arr[i].dateList[ii].item_name] = (
                  arr[i].dateList[ii].rate * 100
                ).toFixed(2);
              }
            }
            this.EffChart.setOption(this.opt);
            this.EffChart.resize();
          } else {
            this.EffChart.clear();
            this.EffChart.resize();
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    loadChart() {
      if (!this.EffChart) {
        this.EffChart = echarts.init(document.getElementById("ech"));
        Resize.on(document.getElementById("ech"), () => {
          this.EffChart.resize();
        });
        this.bindChartMouseOver2();
      }
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
  color: #dcdcdc;
  font-size: 12px;
}

.util .h {
  float: right;
}

.util .ratio {
  margin-left: 80px;
}

.lengend {
  font-size: 12px;
  color: #444;
  margin: 40px 0 0 0px;
}
/* .lengend span {
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
  background: #7ca0f0;
}
.lengend span:nth-of-type(3):before {
  background: #d3def4;
} */

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

.pcdworkEffChart {
  height: 180px;
  width: 100%;
}
</style>
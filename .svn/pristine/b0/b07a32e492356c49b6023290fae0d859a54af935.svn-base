<template>
	<div class="ProfitLossDialog">
		<el-dialog class="ProfitLossDialogel" title="同类型项目" :visible.sync="dialogVisible" @close="closeHandler">
			<div class="profitloss-sub">
				<el-button class="backbtn smalltext" @click="backClick">返回</el-button>
			</div>
			<el-row :gutter="20" class="rowt">
				<el-col :span="12" class="colr">
					<span class="profitlUtil">元</span>
					<span class="profitrUtil">%</span>
					<div id="profitBarChart">
					</div>
				</el-col>
				<el-col :span="12" class="colr">
					<span class="profitlUtil">元</span>
					<span class="profitrUtil">%</span>
					<div id="lossBarChart">
					</div>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
import { bus } from "@/utils/bus.js";
let echartsPromise = (() => import("echarts"))();
let echarts = null;

export default {
  name: "SameTypeDialog",
  props: {
    visible: {
      type: Boolean
    },
    back: {
      type: Boolean
    }
  },
  data() {
    return {
      dialogVisible: false,
      profitBarChart: null,
      lossBarChart: null,
      profitList: [],
      profitRatesList: [],
      delayDaysList: [],
      delayRatesList: []
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      if (val) {
        this.init();
      }
      this.$emit("update:visible", val);
    }
  },
  components: {
    bus
  },
  mounted() {
    bus.$on("sameTypeEvent", this.getSameTypeData);
  },
  methods: {
    getSameTypeData(val) {
      this.profitList = [];
      this.profitRatesList = [];
      this.delayDaysList = [];
      this.delayRatesList = [];
      let data = val;
      this.$http
        .post("/api/statistics/compareWithSameType", data, {
          emulateJSON: true
        })
        .then(res => {
          console.log("getSameTypeData result:", res.data.result);
          let result = res.data.result;
          for (let i in result) {
            this.profitList.push(result[i].profit);
            this.profitRatesList.push(result[i].profitRate);
            this.delayDaysList.push(result[i].delayDays);
            this.delayRatesList.push(result[i].rateOfDelay);
          }

          this.loadLossChart();
          this.loadProfitChart();
        })
        .catch(err => {});
    },
    init() {
      this.$nextTick(() => {
        const profitel = document.getElementById("profitBarChart");
        const profitBarChartLoadInterval = setInterval(() => {
          if (profitel.offsetWidth > 0) {
            echartsPromise.then(ec => {
              echarts = ec;
              this.loadProfitChart();
            });
            clearInterval(profitBarChartLoadInterval);
          }
        }, 0);
        const lossel = document.getElementById("lossBarChart");
        const loadLossChartLoadInterval = setInterval(() => {
          if (lossel.offsetWidth > 0) {
            echartsPromise.then(ec => {
              echarts = ec;
              this.loadLossChart();
            });
            clearInterval(loadLossChartLoadInterval);
          }
        }, 0);
      });
    },
    closeHandler() {},
    backClick() {
      this.$emit("update:back", true);
      this.dialogVisible = false;
    },
    loadLossChart() {
      if (!this.lossBarChart) {
        this.lossBarChart = echarts.init(
          document.getElementById("lossBarChart")
        );
      }
      this.lossBarChart.setOption({
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
        legend: {
          data: ["利润", "利润率"]
        },
        grid: {
          top: "18%",
          left: "0%",
          right: "1%",
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
              color: "rgba(187,187,187,0.42)"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.42)"
              }
            },
            data: this.projectNameList
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              color: "rgba(187,187,187,0.42)"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.42)"
              }
            }
          },
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              color: "rgba(187,187,187,0.42)"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.42)"
              }
            }
          }
        ],
        series: [
          {
            name: "利润",
            barGap: 0,
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#F5BF3C"
              }
            },
            data: this.profitList
          },
          {
            name: "利润率",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#FBE7B8"
              }
            },
            yAxisIndex: 1,
            data: this.profitRatesList
          }
        ]
      });
      this.lossBarChart.resize();
    },
    loadProfitChart() {
      if (!this.profitBarChart) {
        this.profitBarChart = echarts.init(
          document.getElementById("profitBarChart")
        );
      }
      this.profitBarChart.setOption({
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
        legend: {
          data: ["延期天数", "延期天数占比"]
        },
        grid: {
          top: "18%",
          left: "0%",
          right: "1%",
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
              color: "rgba(187,187,187,0.42)"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.42)"
              }
            },
            data: this.projectNameList
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              color: "rgba(187,187,187,0.42)"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.42)"
              }
            }
          },
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              color: "rgba(187,187,187,0.42)"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "rgba(187,187,187,0.42)"
              }
            }
          }
        ],
        series: [
          {
            name: "延期天数",
            barGap: 0,
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#295dcf"
              }
            },
            data: this.delayDaysList
          },
          {
            name: "延期天数占比",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#d3def4"
              }
            },
            yAxisIndex: 1,
            data: this.delayRatesList
          }
        ]
      });
      this.profitBarChart.resize();
    }
  }
};
</script>

<style scoped>
.colr {
  position: relative;
}

.profitlUtil,
.profitrUtil {
  position: absolute;
  opacity: 0.47;
  font-size: 12px;
  color: #bbbbbb;
  letter-spacing: 0;
}

.profitlUtil {
  left: 10px;
  top: 14px;
}

.profitrUtil {
  top: 14px;
  right: 14px;
}

#profitBarChart {
  width: 100%;
  height: 247px;
}

#lossBarChart {
  width: 100%;
  height: 247px;
}

.chartutil {
  opacity: 0.47;
  font-size: 12px;
  color: #bbbbbb;
  letter-spacing: 0;
  position: absolute;
  top: 112px;
  left: 26px;
}

.profitloss-sub {
  margin-top: 4px;
  position: relative;
}

.backbtn {
  background: #f2f2f2;
  border-radius: 2px;
  border: none;
  width: 60px;
  height: 24px;
  padding: 0;
  font-size: 10px;
  color: #666666;
  position: absolute;
  right: 54px;
  top: -46px;
}

.rowt {
  margin-top: 36px;
}

.lenged {
  position: absolute;
  top: -12px;
}

.lenged .item {
  font-size: 12px;
  color: #999999;
  margin-right: 24px;
}

.lenged .item:before {
  position: relative;
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 6px;
}

.lenged1 .item:nth-child(1):before {
  background: #295dcf;
}

.lenged1 .item:nth-child(2):before {
  background: #d3def4;
}

.lenged2 {
  position: absolute;
  right: ;
}

.lenged2 .item:nth-child(1):before {
  background: #f5bf3c;
}

.lenged2 .item:nth-child(2):before {
  background: #fbe7b8;
}

#profitlosschart {
  height: 187px;
  width: 568px;
}
</style>
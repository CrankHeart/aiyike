<!--项目管理-项目详情页-工时成本模块-->
<template>
	<div class="ptb">
		<el-row :gutter="40">
			<el-col :span="8">
				<div class="implquota_area">
					<div class="implquota-text">
						<p class="num">{{implquotaText}}%</p>
						<p class="dsc">额度使用率</p>
					</div>
					<div class="title">
						实施额度
					</div>
					<div id="implquota_chart" class="implquota_chart">

					</div>
					<div class="chart-dsc clearfix">
						<section class="l">
							<p class="num">{{implquotaTotalAmount}}</p>
							<p class="dsc">总实施额度</p>
						</section>
						<section class="l">
							<p class="num">{{implquotaTotalCost}}</p>
							<p class="dsc">已使用实施额度</p>
						</section>
					</div>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="execquota-area">
					<div class="title">
						{{departName}}额度使用
					</div>
					<ul class="lenged">
						<li state="已使用实施额度">已使用实施额度</li>
						<li state="总实施额度">总实施额度</li>
						<li state="超出实施额度">超出实施额度</li>
					</ul>
					<div class="tooltip">
						元
					</div>
					<div id="execquota_chart" class="execquota_chart">

					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="40" class="mt24">
			<el-col :span="8">
				<div class="hour_ratio">
					<div class="title">
						工时比例
					</div>
					<div class="tooltip total">
						总工时
					</div>
					<div class="tooltip overtime">
						其它工时
					</div>
					<div class="hous-text total">
						{{totalHourText}}<span>h</span>
					</div>
					<div class="hous-text overtime">
						{{totalOverHourText}}<span>h</span>
					</div>
					<div class="total_hours mt100">
						<div id="hours_chart" class="hours_chart">

						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="exechour_ratio">
					<div class="title">
						{{departName}}工时比例
					</div>
					<ul class="lenged">
						<li state="其它工时">其它工时</li>
						<li state="总工时">总工时</li>
					</ul>
					<div class="tooltip">
						工时(h)
					</div>
					<div id="exechour_ratio_chart" class="exechour_ratio_chart"></div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Resize from "@/utils/resize.js";
import FloatTool from "@/utils/FloatTool.js";
let echartsPromise = (() => import("echarts"))();
let echarts = null;
export default {
  name: "Hour_Cost",
  data() {
    return {
      departName: "",
      implquotaChart: null,
      implquotaText: 0,
      implquotaTotalCost: 0,
      implquotaTotalAmount: 0,
      execquotaChart: null,
      hoursChart: null,
      totalHourText: 0,
      totalOverHourText: 0,
      exechourRatioChart: null,
      chartData: {}
    };
  },
  watch: {
    chartData: function() {
      this.init();
    }
  },
  components: {},
  mounted: function() {
    this.obtainChartData();
  },
  methods: {
    obtainChartData() {
      this.$http
        .post(
          "/api/item/queryTimeCost",
          {
            itemId: +this.$route.params.id.split("-")[0],
            isDepart: 0
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          var data = res.data;
          if (data.success) {
            this.chartData = data.result;
            this.departName = data.result.departName;
          }
        })
        .catch(err => {});
    },
    init() {
      this.$nextTick(() => {
        let _self = this;
        const el = document.getElementById("implquota_chart");
        let implquota_chartInterval = requestAnimationFrame(function fn() {
          if (el.offsetWidth > 0) {
            cancelAnimationFrame(implquota_chartInterval);
            echartsPromise.then(ec => {
              echarts = ec;
              _self.loadImplquotaChart();
            });
          } else {
            implquota_chartInterval = requestAnimationFrame(fn);
          }
        });
      });
      this.$nextTick(() => {
        let _self = this;
        const el = document.getElementById("execquota_chart");
        let execquota_chartLoadInterval = requestAnimationFrame(function fn() {
          if (el.offsetWidth > 0) {
            cancelAnimationFrame(execquota_chartLoadInterval);
            echartsPromise.then(ec => {
              echarts = ec;
              _self.loadExecquotaChart();
            });
          } else {
            execquota_chartLoadInterval = requestAnimationFrame(fn);
          }
        });
      });
      this.$nextTick(() => {
        let _self = this;
        const el = document.getElementById("hours_chart");
        let total_hours_chartLoadInterval = requestAnimationFrame(
          function fn() {
            if (el.offsetWidth > 0) {
              cancelAnimationFrame(total_hours_chartLoadInterval);
              echartsPromise.then(ec => {
                echarts = ec;
                _self.loadhoursChart();
              });
            } else {
              total_hours_chartLoadInterval = requestAnimationFrame(fn);
            }
          }
        );
      });
      this.$nextTick(() => {
        let _self = this;
        const el = document.getElementById("exechour_ratio_chart");
        let execquota_ratio_chartLoadInterval = requestAnimationFrame(
          function fn() {
            if (el.offsetWidth > 0) {
              cancelAnimationFrame(execquota_ratio_chartLoadInterval);
              echartsPromise.then(ec => {
                echarts = ec;
                _self.loadExechourRatioChart();
              });
            } else {
              execquota_ratio_chartLoadInterval = requestAnimationFrame(fn);
            }
          }
        );
      });
    },
    loadhoursChart() {
      if (!this.hoursChart) {
        this.hoursChart = echarts.init(document.getElementById("hours_chart"));
      }
      let hour = this.chartData.hour;
      let [totalHour, totalOverHour] = ([
        this.totalHourText,
        this.totalOverHourText
      ] = [hour.totalHour, hour.totalOverHour]);
      var getMaxHour = () => {
        return totalHour + totalOverHour;
      };
      this.hoursChart.setOption({
        grid: {
          left: "0%",
          right: "0%"
        },
        xAxis: {
          type: "value",
          max: function(value) {
            return getMaxHour();
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: [""]
        },
        series: [
          {
            name: "总工时",
            type: "bar",
            barWidth: "6",
            itemStyle: {
              normal: {
                color: "#D3DEF4"
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: [totalHour]
          },
          {
            name: "其它工时",
            type: "bar",
            barGap: "1700%",
            barWidth: "6",
            itemStyle: {
              normal: {
                color: "#295DCF"
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: [totalOverHour]
          }
        ]
      });
    },
    loadExechourRatioChart() {
      if (!this.exechourRatioChart) {
        this.exechourRatioChart = echarts.init(
          document.getElementById("exechour_ratio_chart")
        );
        Resize.on(document.getElementById("exechour_ratio_chart"), () => {
          this.exechourRatioChart.resize();
        });
      }
      let [names, total_hours, total_over_hours, departHourRatio] = [
        [],
        [],
        [],
        []
      ];
      departHourRatio = this.chartData.hour.departHourRatio;
      for (let i in departHourRatio) {
        names.push(departHourRatio[i].name);
        total_hours.push(departHourRatio[i].total_hour);
        total_over_hours.push(departHourRatio[i].total_over_hour);
      }
      this.exechourRatioChart.setOption({
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
                f = "h";
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
          left: "1%",
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
                color: "rgba(187,187,187,0.42)"
              }
            },
            data: names
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "b"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "black"
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
            name: "总工时",
            type: "bar",
            barWidth: 15,
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: "#d3def4"
              }
            },
            z: 0,
            data: total_hours
          },
          {
            name: "其它工时",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#295dcf"
              }
            },
            z: 1,
            data: total_over_hours
          }
        ]
      });
    },
    loadExecquotaChart() {
      if (!this.execquotaChart) {
        this.execquotaChart = echarts.init(
          document.getElementById("execquota_chart")
        );
        Resize.on(document.getElementById("execquota_chart"), () => {
          this.execquotaChart.resize();
        });
      }
      let [names, overCosts, totalAmounts, totalCosts, listData] = [
        [],
        [],
        [],
        [],
        []
      ];
      listData = this.chartData.amount.listData;
      for (let i in listData) {
        names.push(listData[i].name);
        overCosts.push(listData[i].overCost < 0 ? 0 : listData[i].overCost);
        totalAmounts.push(listData[i].totalAmount);
        totalCosts.push(listData[i].totalCost);
      }
      this.execquotaChart.setOption({
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
                f = "元";
              }
              if (item.seriesIndex == 1) {
                f = "元";
              }
              result +=
                item.marker + item.seriesName + ": " + item.value + f + "<br>";
            });
            return result;
          }
        },
        grid: {
          top: "3%",
          left: "1%",
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
                color: "rgba(187,187,187,0.42)"
              }
            },
            data: names
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              color: "black"
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
            name: "已使用实施额度",
            type: "bar",
            barWidth: 15,
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: "#295dcf"
              }
            },
            data: totalCosts
          },
          {
            name: "总实施额度",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#d3def4"
              }
            },
            z: 0,
            data: totalAmounts
          },
          {
            name: "超出实施额度",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#F5BF3C"
              }
            },
            z: 1,
            data: overCosts
          }
        ]
      });
    },
    loadImplquotaChart() {
      if (!this.implquotaChart) {
        this.implquotaChart = echarts.init(
          document.getElementById("implquota_chart")
        );
      }
      let amount = this.chartData.amount;
      let [totalCost, totalAmount, noUse] = [
        amount.totalCost,
        amount.totalAmount,
        amount.totalAmount - amount.totalCost
      ];
      this.implquotaTotalCost = totalCost;
      this.implquotaTotalAmount = totalAmount;

      if (totalAmount !== null && totalAmount !== 0) {
        this.implquotaText = ( FloatTool.divide(totalCost, totalAmount) * 100 ).toFixed(2);
      } else if(totalAmount === 0){
        this.implquotaText=100;
      }else {
        this.implquotaText = 0;
      }
      this.implquotaChart.setOption({
        grid: {
          top: "0%",
          left: "0%",
          right: "0%",
          bottom: "0%"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["80%", "90%"],
            hoverOffset: 4,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: totalCost,
                name: "已使用实施额度",
                itemStyle: {
                  normal: {
                    color: "#295DCF"
                  }
                }
              },
              {
                value: noUse,
                name: "未使用实施额度",
                itemStyle: {
                  normal: {
                    color: "#D3DEF4"
                  }
                }
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.mt100 {
  margin-top: 100px;
}

.title {
  font-size: 14px;
  color: #000000;
}

.ptb {
  padding-top: 25px;
  padding-bottom: 25px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.implquota_area {
  position: relative;
}

.implquota_chart {
  margin: 34px auto 0 auto;
  width: 130px;
  height: 130px;
}

.chart-dsc {
  margin-top: 16px;
}

.chart-dsc .l {
  width: 50%;
  display: inline-block;
  float: left;
  text-align: center;
}

.chart-dsc .l .num {
  font-size: 24px;
  color: #333333;
}

.chart-dsc .l .dsc {
  font-size: 12px;
  color: #cacaca;
}

.implquota-text {
  position: absolute;
  left: 20px;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  margin-top: -5px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  right: 20px;
  display: block;
  width: auto;
}

.implquota-text .num {
  font-size: 28px;
  color: #000000;
}

.implquota-text .dsc {
  font-size: 12px;
  color: #cacaca;
}
.hour_ratio {
  /*padding-right: 40px;*/
}
.execquota-area .lenged,
.exechour_ratio .lenged {
  margin-top: 22px;
}

.execquota-area .lenged li,
.exechour_ratio .lenged li {
  font-size: 12px;
  color: #999999;
  margin-right: 28px;
  display: inline-block;
}

.execquota-area .lenged li[state="已使用实施额度"]:before {
  background: #295dcf;
}
.execquota-area .lenged li[state="总实施额度"]:before {
  background: #d3def4;
}
.execquota-area .lenged li[state="超出实施额度"]:before {
  background: #f5bf3c;
}
.execquota-area .lenged li:before,
.exechour_ratio .lenged li:before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 6px;
}

.execquota_chart {
  height: 180px;
  width: 100%;
}

.execquota-area .tooltip,
.exechour_ratio .tooltip {
  margin-top: 10px;
  opacity: 0.47;
  font-size: 12px;
  color: black;
}

.mt24 {
  margin-top: 24px;
}

.exechour_ratio_chart {
  height: 180px;
  width: 100%;
}

.exechour_ratio .lenged li[state="其它工时"]:before {
  background: #295dcf;
}

.exechour_ratio .lenged li[state="总工时"]:before {
  background: #d3def4;
}

.exechour_ratio .tooltip {
  margin-left: -26px;
}

.hours_chart {
  width: 100%;
  height: 120px;
}

.hour_ratio {
  position: relative;
}

.hour_ratio .tooltip {
  position: absolute;
  font-size: 12px;
  color: #cacaca;
}
.hour_ratio .tooltip.total {
  top: 66px;
}
.hour_ratio .tooltip.overtime {
  top: 170px;
}
.hour_ratio .hous-text.total {
  top: 86px;
}
.hour_ratio .hous-text.overtime {
  top: 192px;
}
.hour_ratio .hous-text {
  font-size: 24px;
  color: #000000;
  position: absolute;
}

.hour_ratio .hous-text span {
  font-size: 12px;
  color: #cacaca;
  letter-spacing: 0;
  line-height: 33px;
  margin-left: 4px;
}
</style>
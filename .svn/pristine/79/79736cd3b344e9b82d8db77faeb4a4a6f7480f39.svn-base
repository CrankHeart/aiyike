<!--企业利润echarts模块-->
<template>
	<div class="enterprise-profit" :class="['type' + type]">
		<section>
			<div class="header">
				<span class="middle text">运营数据</span>
				<el-date-picker @change="dateHandler" format="yyyy年" class="date-select" v-model="date" align="right" type="year" placeholder="选择年">
				</el-date-picker>
				<span class="groupS">
					<GroupSelect class="my-input" v-model="group" :treeData="treeData" placeholder="所属部门"></GroupSelect>
				</span>
			</div>
			<ul class="lenged clearfix">
				<li class="middle">到款额</li>
				<li class="middle">运营成本</li>
				<li class="middle">毛利率</li>
				<li class="middle">净利率</li>
			</ul>
			<div class="tips-utils">
				<div style="float: left;">
					金额(元)
				</div>
				<div style="float: right;">
					利润率(%)
				</div>
			</div>
			<div :id="[obtainCharId()]" class="enterprise-profit-charts" :class="['type' + type]"></div>
		</section>
	</div>
</template>

<script>
let GroupSelect = () => import("@/components/select/GroupSelect.vue");
let echartsPromise = (() => import("echarts"))();
let echarts = null;

export default {
  name: "EnterpriseProfit",
  props: {
    type: {
      type: String,
      default: function() {
        return "1";
      }
    },
    pin: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      projectChart: null,
      date: new Date(),
      tabsIndex: null,
      backTabsIndex: null,
      options: [
        {
          value: "1",
          label: "公司整体"
        },
        {
          value: "2",
          label: "高端定制事业部群"
        },
        {
          value: "3",
          label: "行业发展事业部群"
        },
        {
          value: "4",
          label: "用户体验事业部"
        }
      ],
      companyModules: "1",
      treeData: [],
      group: {
        id: 54
      },
      realAmounts: [],
      operAmounts: [],
      mRates: [],
      nRates: [],
      months: [],
      groupType: 1
    };
  },
  watch: {
    group(val, oldVal) {
      if (val.id === 54) {
        this.groupType = 1;
      } else {
        this.groupType = 2;
      }
      this.months = [];
      this.realAmounts = [];
      this.operAmounts = [];
      this.mRates = [];
      this.nRates = [];
      this.getEchartData();
    }
  },
  mounted: function() {
    let that = this;
    window.addEventListener("resize", function() {
      that.projectChart.resize();
    });
    if (this.type == 2) {
      this.tabsIndex = 0;
    }
    this.getEchartData();
    this.$nextTick(() => {
      this.getDepartmentData();
      const el = document.getElementById(this.obtainCharId());
      const projectchartsInterval = setInterval(() => {
        if (el.offsetWidth > 0) {
          echartsPromise.then(ec => {
            echarts = ec;
            this.loadChart();
          });
          clearInterval(projectchartsInterval);
        }
      }, 0);
    });
  },
  components: {
    GroupSelect
  },
  methods: {
    obtainCharId() {
      return `${this.pin}EnterpriseProfit`;
    },
    clearTabsIndex() {
      this.tabsIndex = null;
    },
    tabsClick(type, index) {
      this.tabsIndex = index;
      this.$emit("tabsClick", type, index, "EnterpriseProfit");
    },
    dateHandler(val) {
      if (this.group.id === 54) {
        this.groupType = 1;
      } else {
        this.groupType = 2;
      }
      this.months = [];
      this.realAmounts = [];
      this.operAmounts = [];
      this.mRates = [];
      this.nRates = [];
      this.getEchartData();
    },
    getDepartmentData() {
      this.$http
        .post("/api/depart/departTree", {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          result.pop();
          this.treeData = result;
        })
        .catch(err => {});
    },
    getEchartData() {
      let date = this.date.format("yyyy");
      let data = {
        year: date,
        departId: this.group.id,
        type: this.groupType
      };
      this.$http
        .post("/api/operate/enterpriseProfit", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          for (let i in result) {
            this.months.push(result[i].month);
          }
          for (let i in result) {
            this.realAmounts.push(result[i].the_amount);
          }
          for (let i in result) {
            this.operAmounts.push(result[i].oper_amount);
          }
          for (let i in result) {
            this.mRates.push(result[i].m_rate);
          }
          for (let i in result) {
            this.nRates.push(result[i].n_rate);
          }
        })
        .catch(err => {});
    },
    bindChartMouseOver() {
      let _self = this;
      this.projectChart.on("mouseover", function(params) {
        _self.backTabsIndex = _self.tabsIndex;
        _self.tabsIndex = params.dataIndex;
      });
      this.projectChart.on("mouseout", function(params) {
        _self.tabsIndex = _self.backTabsIndex;
      });
    },
    loadChart() {
      this.projectChart = echarts.init(
        document.getElementById(this.obtainCharId())
      );
      this.bindChartMouseOver();
      this.projectChart.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.9)",
          borderRadius: 4,
          padding: 10,
          textStyle: {
            color: "rgba(255,255,255,.9)"
          },
          axisPointer: {
            type: "shadow"
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
              if (item.seriesIndex == 2) {
                f = "%";
              }
              if (item.seriesIndex == 3) {
                f = "%";
              }
              result +=
                item.marker + item.seriesName + ": " + item.value + f + "<br>";
            });
            return result;
          }
        },
        grid: {
          left: "1%",
          right: "3%",
          bottom: "3%",
          top: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "rgba(187,187,187,0.42)",
            formatter: function(value) {
              return value + "月";
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(187,187,187,0.42)"
            }
          },
          data: this.months
        },
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
              color: "rgba(187,187,187,0.42)",
              formatter: "{value}"
            }
          },
          {
            type: "value",
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "rgba(187,187,187,0.42)",
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "到款额",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#295DCF"
              }
            },
            yAxisIndex: 0,
            data: this.realAmounts
          },
          {
            name: "运营成本",
            type: "line",
            stack: "运营成本",
            itemStyle: {
              normal: {
                color: "#1ABF69"
              }
            },
            yAxisIndex: 0,
            data: this.operAmounts
          },
          {
            name: "毛利率",
            type: "line",
            stack: "毛利率",
            itemStyle: {
              normal: {
                color: "#EE5A5A"
              }
            },
            yAxisIndex: 1,
            data: this.mRates
          },
          {
            name: "净利率",
            type: "line",
            stack: "净利率",
            itemStyle: {
              normal: {
                color: "#F5BF3C"
              }
            },
            yAxisIndex: 1,
            data: this.nRates
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.tips-utils {
  height: 20px;
  opacity: 0.47;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
  font-size: 12px;
  color: #bbbbbb;
  margin-bottom: 10px;
}
/* .tips-utils > div:nth-of-type(1) {
}
.tips-utils > div:nth-of-type(2) {
} */
.lenged li {
  display: inline-block;
  height: 40px;
  font-size: 12px;
  color: #999999;
  margin-right: 20px;
}
.lenged li:nth-last-of-type(1) {
  margin-right: 0;
}
.lenged li:before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 4px;
}
.lenged li:nth-of-type(1):before {
  background: #295dcf;
}
.lenged li:nth-of-type(2):before {
  background: #1abf69;
}
.lenged li:nth-of-type(3):before {
  background: #ee5a5a;
}
.lenged li:nth-of-type(4):before {
  background: #f5bf3c;
}
span {
  transition: none;
}

.status-tabs {
  margin-top: 26px;
  text-align: center;
}

.status-tabs .item {
  display: inline-block;
  width: 80px;
  height: 22px;
  font-size: 12px;
  color: #666666;
  line-height: 22px;
  background: #f8f9fb;
  border-radius: 2px;
  text-align: center;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
}

.status-tabs .item.active:before {
  content: "";
  display: inline-block;
  position: absolute;
  height: 0;
  border-right: 8px solid transparent;
  border-top: 8px solid #ee5a5a;
  border-left: 8px solid transparent;
  bottom: -8px;
  left: 30px;
  right: 40px;
}

.status-tabs .item.active {
  background: #ee5a5a;
  color: #fff;
}

.status-tabs .item:nth-last-of-type(1) {
  margin-right: 0;
}

.status-item {
  display: inline-block;
  margin-top: 35px;
  margin-left: 55px;
}

.status-item > p .tips:nth-of-type(1) {
  position: relative;
  width: 60px;
  display: inline-block;
}

.status-item > p .tips:nth-of-type(1):before {
  content: "";
  display: inline-block;
  position: relative;
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-right: 8px;
  border-radius: 100%;
}

.status-tabs .item.active[status="正常"] {
  background: #1abf69;
  color: #fff;
}

.status-tabs .item.active[status="正常"]:before {
  border-right: 8px solid transparent;
  border-top: 8px solid #1abf69;
  border-left: 8px solid transparent;
}

.status-tabs .item.active[status="延期"] {
  background: #f5bf3c;
  color: #fff;
}

.status-tabs .item.active[status="延期"]:before {
  border-right: 8px solid transparent;
  border-top: 8px solid #f5bf3c;
  border-left: 8px solid transparent;
}

.status-tabs .item.active[status="挂起"] {
  background: #ee5a5a;
  color: #fff;
}

.status-tabs .item.active[status="挂起"]:before {
  border-right: 8px solid transparent;
  border-top: 8px solid #ee5a5a;
  border-left: 8px solid transparent;
}

.status-tabs .item.active[status="待立项"] {
  background: #295dcf;
  color: #fff;
}

.status-tabs .item.active[status="待立项"]:before {
  border-right: 8px solid transparent;
  border-top: 8px solid #295dcf;
  border-left: 8px solid transparent;
}

.status-item > p .tips:nth-of-type(1)[status="正常"]:before {
  background: #1abf69;
}

.status-item > p .tips:nth-of-type(1)[status="延期"]:before {
  background: #f5bf3c;
}

.status-item > p .tips:nth-of-type(1)[status="挂起"]:before {
  background: #ee5a5a;
}

.status-item > p .tips:nth-of-type(1)[status="待立项"]:before {
  background: #295dcf;
}

.status-item > p {
  margin-top: 18px;
}

.status-item > p .tips {
  font-size: 12px;
}

.status-item > p span {
  color: #838383;
}

.status-item .active {
  color: #000000;
}

.date-select {
  float: right;
}

.enterprise-profit.type1 {
  position: relative;
}

.enterprise-profit.type2 {
  position: relative;
}

.enterprise-profit > section {
  padding: 20px 20px;
  background: #fff;
}

.el-date-editor {
  width: 110px;
}

.unfinished-num.type1 {
  display: inline-block;
  left: 21%;
  width: 171.6px;
  text-align: center;
  position: absolute;
  top: 156px;
}

.unfinished-num.type2 {
  display: inline-block;
  left: 0;
  right: 0;
  text-align: center;
  position: absolute;
  top: 140px;
}

.unfinished-num .text {
  font-size: 24px;
}

.unfinished-num .tips {
  font-size: 12px;
  color: #969696;
}

.header {
  height: 34px;
}
.header .middle {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
  font-size: 14px;
  color: #000;
  font-weight: 600;
}
.enterprise-profit-charts {
  width: 100%;
  height: 235px;
}

.groupS {
  width: 131px;
  margin-right: 10px;
  float: right;
}
</style>
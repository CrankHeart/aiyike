<template>
	<div class="ProfitLossDialog">
		<el-dialog class="ProfitLossDialogel" :title="projectName" :visible.sync="dialogVisible">
			<div class="profitloss-sub">
				<span class="tip">盈亏</span>
				<span class="price">{{profit}}</span>
				<span class="util">元</span>&nbsp;
				<span class="tip">到款额</span>
				<span class="price">{{arrivalAmount}}</span>
				<span class="util">元</span>
				<el-button type="primary" class="matchbtn" @click="matchClick">同类型项目匹配</el-button>
			</div>
			<span class="chartutil">万元</span>
			<div id="profitlosschart" ref="profitchart">
			</div>
		</el-dialog>
		<SameTypeDialog :visible.sync="sameTypeVisible" :back.sync="backFlag"></SameTypeDialog>
	</div>
</template>

<script>
import { bus } from "@/utils/bus.js";
let echartsPromise = (() => import("echarts"))();
let echarts = null;
let SameTypeDialog = () => import("@/modules/SameTypeDialog.vue");

export default {
  name: "ProfitLossDialog",
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      dialogVisible: false,
      profitchart: null,
      sameTypeVisible: false,
      backFlag: false,
      profit: 0,
      roleType: "",
      projectName: "",
      itemId: "",
      arrivalAmount: null,
      monthsList: [],
      normalCostList: [],
      projecRelatedList: []
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
    },
    sameTypeVisible(val) {
      if (!val && this.backFlag) {
        this.dialogVisible = true;
        this.backFlag = false;
      }
    }
  },
  components: {
    SameTypeDialog,
    bus
  },
  mounted() {
    bus.$on("profitEvent", this.getProfitData);
  },
  methods: {
    matchClick() {
      this.sameTypeVisible = true;
      this.dialogVisible = false;
      let data = {
        role: this.roleType,
        itemId: this.itemId
      };
      bus.$emit("sameTypeEvent", data);
    },
    getProfitData(val) {
      this.monthsList = [];
      this.normalCostList = [];
      this.projecRelatedList = [];
      this.roleType = val.role;
      this.itemId = val.itemId;
      if (this.roleType === "pm") {
        this.isLegendBoss = false;
      } else if (this.roleType === "majordomo") {
        this.isLegendBoss = false;
      } else if (this.roleType === "ba") {
        this.isLegendBoss = false;
      } else if (this.roleType === "pmo") {
        this.isLegendBoss = true;
      } else if (this.roleType === "vp") {
        this.isLegendBoss = true;
      } else if (this.roleType === "vManager") {
        this.isLegendBoss = true;
      } else {
        return;
      }
      let data = {
        role: val.role,
        itemId: val.itemId
      };
      this.profit = val.profit;
      this.$http
        .post("/api/statistics/profitAndLossTrend", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          this.projectName = result.itemName;
          this.arrivalAmount = result.arrival;
          let list = result.listData;
          for (let i in list) {
            this.monthsList.push(list[i].ym);
            this.normalCostList.push(list[i].cost);
            this.projecRelatedList.push(list[i].itemRelay);
          }
          this.loadChart();
        })
        .catch(err => {});
    },
    init() {
      this.$nextTick(() => {
        const el = document.getElementById("profitlosschart");
        const profitchartsInterval = setInterval(() => {
          if (el.offsetWidth > 0) {
            echartsPromise.then(ec => {
              echarts = ec;
              this.loadChart();
            });
            clearInterval(profitchartsInterval);
          }
        }, 0);
      });
    },
    loadChart() {
      if (!this.profitchart) {
        this.profitchart = echarts.init(
          document.getElementById("profitlosschart")
        );
      }
      this.profitchart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "cross",
            axis: "x",
            snap: false,
            lineStyle: {
              width: 0
            },
            crossStyle: {
              color: "#ee5a5a"
            }
          },
          showContent: true,
          formatter: function(params) {
            let ret = "";
            let month = params[0].name;
            for (let i = 1; i < params.length; i++) {
              ret +=
                "<br>" + params[i].seriesName + " : " + params[i].value + "元";
            }
            return month + ret;
          }
        },
        legend: {
          data: this.isLegendBoss
            ? ["正常人力执行成本", "项目相关"]
            : ["已使用实施额度", "实施额度"],
          left: "left"
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "3%",
          top: "20%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#e0e0e0"
            }
          },
          axisTick: {
            show: false
          },
          data: this.monthsList
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#e0e0e0"
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              },
              emphasis: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              }
            },
            data: [0, 200]
          },
          {
            name: this.isLegendBoss ? "正常人力执行成本" : "已使用实施额度",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#295DCF"
              }
            },
            data: this.normalCostList
          },
          {
            name: this.isLegendBoss ? "项目相关" : "实施额度",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#F5BF3C"
              }
            },
            data: this.projecRelatedList
          }
        ]
      });
      this.profitchart.resize();
    }
  }
};
</script>

<style scoped>
.tip {
  font-size: 12px;
  color: #666666;
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

.profitloss-sub .tips {
  font-size: 12px;
  color: #666666;
}

.profitloss-sub .price {
  font-size: 12px;
  color: #1abf69;
}

.profitloss-sub .util {
  font-size: 12px;
  color: #000000;
  letter-spacing: 0;
  line-height: 17px;
}

.matchbtn {
  background: #295dcf;
  border-radius: 2px;
  width: 96px;
  height: 24px;
  padding: 0;
  font-size: 12px;
  color: #fff;
  position: absolute;
  right: 54px;
  top: -12px;
}

.lenged {
  margin-top: 24px;
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

.lenged .item:nth-child(1):before {
  background: #295dcf;
}

.lenged .item:nth-child(2):before {
  background: #f5bf3c;
}

.lenged .item:nth-child(3):before {
  background: #1abf69;
}

#profitlosschart {
  height: 187px;
  width: 568px;
  margin-top: 20px;
}
</style>
<!--未完结项目echarts模块-->
<template>
	<div class="unfinished-project" :class="['type' + type]">
		<div class="header">
			<span class="middle text">未完结项目</span>
    	<!-- <el-date-picker @change="dateHandler" format="yyyy年全年" class="date-select unfinished_date" v-model="date" align="right" type="year" placeholder="选择年">
				</el-date-picker> -->
		</div>
		<div class="project-charts" :id="[obtainCharId()]" :class="['type' + type]"></div>
		<div class="status-item" v-if="type == '1'">
			<p :class="[0 == tabsIndex?'active':'']">
				<span class="tips" status="正常">正常</span><span class="num">{{normal}}</span><span class="tips">&nbsp;个</span>
			</p>
			<p :class="[1 == tabsIndex?'active':'']">
				<span class="tips" status="延期">延期</span><span class="num">{{delay}}</span><span class="tips">&nbsp;个</span>
			</p>
			<p :class="[2 == tabsIndex?'active':'']">
				<span class="tips" status="挂起">挂起</span><span class="num">{{hangUp}}</span><span class="tips">&nbsp;个</span>
			</p>
			<p :class="[3 == tabsIndex?'active':'']">
				<span class="tips" status="待立项">待立项</span><span class="num">{{waitBuid}}</span><span class="tips">&nbsp;个</span>
			</p>
		</div>
		<div class="unfinished_num_div">
			<div class="unfinished-num" :class="['type' + type]">
				<p class="text">{{total}}</p>
				<p class="tips">未完结项目(个)</p>
			</div>
		</div>
		<div class="status-tabs" v-if="type == '2'">
			<span class="item" status="正常" :class="[0 == tabsIndex?'active':'']" @click="tabsClick(0)">正常 {{normal}}个</span>
			<span class="item" status="延期" :class="[1 == tabsIndex?'active':'']" @click="tabsClick(1)">延期 {{delay}}个</span>
			<span class="item" status="挂起" :class="[2 == tabsIndex?'active':'']" @click="tabsClick(2)">挂起 {{hangUp}}个</span>
			<span class="item" status="待立项" :class="[3 == tabsIndex?'active':'']" @click="tabsClick(3)">待立项 {{waitBuid}}个</span>
		</div>
	</div>
</template>

<script>
import { bus } from "@/utils/bus.js";
let echartsPromise = (() => import("echarts"))();
let echarts = null;

export default {
  name: "UnfinishedProjectChart",
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
      tabsIndex: null,
      backTabsIndex: null,
      normal: 0,
      delay: 0,
      hangUp: 0,
      waitBuid: 0,
      total: 0,
      date:""
    };
  },
  watch: {},
  components: {
    bus
  },
  mounted: function() {
    this.$nextTick(() => {
      if (this.type == 2) {
        this.tabsIndex = 0;
      }
      const el = document.getElementById(this.obtainCharId());
      const projectchartsInterval = setInterval(() => {
        if (el.offsetWidth > 0) {
          this.$parent.resizeWidth && this.$parent.resizeWidth();
          echartsPromise.then(ec => {
            echarts = ec;
            this.loadChart();
          });
          clearInterval(projectchartsInterval);
        }
      }, 0);
      this.getUnfinishedData();
      bus.$on('fiTabsEvent',this.clearTabsIndex);
    });
  },
  computed: {
    opt() {
      let obj = {
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
                value: this.normal,
                name: "正常",
                itemStyle: {
                  normal: {
                    color: "#1abf69"
                  }
                }
              },
              {
                value: this.delay,
                name: "延期",
                itemStyle: {
                  normal: {
                    color: "#f5bf3c"
                  }
                }
              },
              {
                value: this.hangUp,
                name: "挂起",
                itemStyle: {
                  normal: {
                    color: "#ee5a5a"
                  }
                }
              },
              {
                value: this.waitBuid,
                name: "待立项",
                itemStyle: {
                  normal: {
                    color: "#295dcf"
                  }
                }
              }
            ]
          }
        ]
      };
      return obj;
    }
  },
  methods: {

    obtainCharId() {
      return `${this.pin}project-charts`;
    },
    clearTabsIndex() {
      this.tabsIndex = null;
    },
    tabsClick(index) {
      let status = "";
      this.tabsIndex = index;
      switch (parseInt(index)) {
        case 0:
          status = "正常";
          break;
        case 1:
          status = "延期";
          break;
        case 2:
          status = "挂起";
          break;
        case 3:
          status = "待立项";
          break;
        default:
          alert("project state unknow");
          break;
      }
      this.$emit("tabsClick", status, index, this.pin);
      bus.$emit("loadMoreUnfinishEvent", status);
      bus.$emit('unTabsEvent');
    },

    bindChartMouseOver() {
      let _self = this;
      this.projectChart.on("mouseover", function(params) {
        _self.backTabsIndex = _self.tabsIndex;
        _self.tabsIndex = params.dataIndex;
        _self.tabsClick(_self.tabsIndex);
      });
    },
    loadChart() {
      this.projectChart = echarts.init(
        document.getElementById(this.obtainCharId())
      );
      this.bindChartMouseOver();
      this.projectChart.setOption(this.opt, true);
      this.projectChart.resize();
    },
    getUnfinishedData() {
      let roleType;
      if (this.pin === "pj") {
        roleType = "pm";
      } else if (this.pin === "pmo") {
        roleType = "pmo";
      } else if (this.pin === "vp") {
        roleType = "vp";
      } else if (this.pin === "dir") {
        roleType = "majordomo";
      } else if (this.pin === "man") {
        roleType = "vManager";
      } else if (this.pin === "ba") {
        roleType = "ba";
      } else {
        return;
      }
      let data = {
        role: roleType,
      };
      this.$http
        .post("/api/workbench/countUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          this.normal = result.normalNum;
          this.delay = result.delayNum;
          this.hangUp = result.hangUpNum;
          this.waitBuid = result.waitBuidNum;
          this.total = result.totalNum;
          this.projectChart.setOption(this.opt, true);
          this.projectChart.resize();
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
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
  left: 33px;
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
  margin-top: 40px;
  margin-left: 50px;
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
.unfinished-project {
}
.unfinished-project.type1 {
  padding: 20px 20px 36px;
  background: #fff;
  position: relative;
  overflow: hidden;
  height: 245px;
}
.unfinished-project.type2 {
  padding: 20px 20px 27px;
  background: #fff;
  position: relative;
  overflow: hidden;
}
.el-date-editor {
  width: 110px;
}
.project-charts.type1 {
  position: relative;
  width: 171.6px;
  height: 171.6px;
  margin-left: 19%;
  margin-right:-5px;
  margin-top: 39px;
  float: left;
  z-index: 10;
}
.project-charts.type2 {
  position: relative;
  width: 171.6px;
  height: 171.6px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 21px;
  z-index: 10;
}
.unfinished_num_div {
  position: relative;
  width: 100%;
  height: 0;
}
.unfinished-num.type1 {
  display: inline-block;
  left: 19%;
  width: 171.6px;
  text-align: center;
  position: absolute;
  top: -104px;
}
.unfinished-num.type2 {
  display: inline-block;
  left: 0;
  right: 0;
  text-align: center;
  position: absolute;
  top: -119px;
  z-index: 1;
}
.unfinished-num .text {
  font-size: 32px;
  color: #000;
}

.unfinished-num .tips {
  font-size: 12px;
  color: #969696;
}

.header {
  height: 34px;
}
span.text {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}
.status-item > p .num {
}
.status-item > p.active span {
  color: #000;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}
</style>
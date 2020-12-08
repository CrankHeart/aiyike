<!--完结项目echarts模块-->
<template>
	<div class="finished-project" :class="['type' + type]">
		<div class="header">
			<span class="middle text">已完结项目</span>
      <el-date-picker v-model="endTime" @change="timeChange2" class="date-select unfinished_date" type="month" placeholder="结束时间"></el-date-picker>
      <el-date-picker v-model="startTime" @change="timeChange1" class="date-select unfinished_date" type="month" placeholder="开始时间"></el-date-picker>
		</div>
		<div :id="[obtainCharId()]" class="fproject-charts" :class="['type' + type]"></div>
		<div class="status-item" v-if="type == '1'">
			<p :class="[0 == tabsIndex?'active':'']">
				<span class="tips" status="盈利 ">盈利</span><span class="num">{{gain}}</span><span class="tips">&nbsp;个</span>
			</p>
		  <p :class="[1 == tabsIndex?'active':'']">
				<span class="tips" status="亏损">亏损</span><span class="num">{{loss}}</span><span class="tips">&nbsp;个</span>
			</p>
			<p :class="[2 == tabsIndex?'active':'']">
				<span class="tips" status="持平">持平</span><span class="num">{{hold}}</span><span class="tips">&nbsp;个</span>
			</p>
		</div>
		<div class="unfinished_num_div">
			<div class="unfinished-num" :class="['type' + type]">
				<p class="text">{{total}}</p>
				<p class="tips">已完结项目(个)</p>
			</div>
		</div>
		<div class="status-tabs" v-if="type == '2'">
			<span class="item" status="盈利 " :class="[0 == tabsIndex?'active':'']" @click="tabsClick(0)">盈利 {{gain}}个</span>
			<span class="item" status="亏损 " :class="[1 == tabsIndex?'active':'']" @click="tabsClick(1)">亏损 {{loss}}个</span>
			<span class="item" status="持平 " :class="[2 == tabsIndex?'active':'']" @click="tabsClick(2)">持平 {{hold}}个</span>
		</div>
	</div>
</template>

<script>
import { bus } from "@/utils/bus.js";
let echartsPromise = (() => import("echarts"))();
let echarts = null;
export default {
  name: "FinishedProjectChart",
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
      year: "",
      gain: 0,
      loss: 0,
      hold: 0,
      total: 0,
      startTime: new Date().format("yyyy")+'-01-01',
      endTime: new Date().format("yyyy-MM")+"-01",
      roleType: ""
    };
  },
  watch: {},
  mounted: function() {
    this.$nextTick(() => {
      if (this.pin === "pj") {
        this.roleType = "pm";
      } else if (this.pin === "pmo") {
        this.roleType = "pmo";
      } else if (this.pin === "dir") {
        this.roleType = "majordomo";
      } else if (this.pin === "man") {
        this.roleType = "vManager";
      } else if (this.pin === "ba") {
        this.roleType = "ba";
      } else if (this.pin === "vp") {
        this.roleType = "vp";
      } else {
        return;
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
      this.getFinishedData();
      bus.$on('unTabsEvent',this.clearTabsIndex);
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
                value: this.gain,
                name: "盈利",
                itemStyle: {
                  normal: {
                    color: "#1abf69"
                  }
                }
              },
              {
                value: this.loss,
                name: "亏损",
                itemStyle: {
                  normal: {
                    color: "#ee5a5a"
                  }
                }
              },
              {
                value: this.hold,
                name: "持平",
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
  components: {
    bus
  },
  methods: {
    timeChange1(val) {
      this.startTime = val+"-01";
      let data = {
        startTime : this.startTime,
        endTime : this.endTime
      };
      this.getChangeFinishedData(data);
    },
    timeChange2(val) {
      this.endTime = val +"-01";
      let data = {
        startTime : this.startTime,
        endTime : this.endTime
      };
      this.getChangeFinishedData(data);
    },
    obtainCharId() {
      return `${this.pin}fproject-charts`;
    },
    clearTabsIndex() {
      this.tabsIndex = null;
    },
    tabsClick(index) {
      let status = "";
      this.tabsIndex = index;
      switch (parseInt(index)) {
        case 0:
          status = "盈利";
          break;
        case 1:
          status = "亏损";
          break;
        case 2:
          status = "持平";
          break;
        default:
          alert("project state unknow");
          break;
      }
      this.$emit("tabsClick", status, index, this.pin);
      bus.$emit("loadMorefinishEvent", status);
      bus.$emit('fiTabsEvent');
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
      this.projectChart.setOption(this.opt);
      this.projectChart.resize();
    },
    getFinishedData() {
      //项目经理pj pmo 商务经理ba 副总经理vManager 事业部总监majordomo vp

      let data = {
        role: this.roleType,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.$http
        .post("/api/workbench/countfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          this.gain = result.gainNum;
          this.hold = result.holdNum;
          this.loss = result.lossNum;
          this.total = result.totalNum;
          this.projectChart.setOption(this.opt);
          this.projectChart.resize();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getChangeFinishedData(obj) {
      let objData = obj;
      bus.$emit("timeFinishEvent",objData);
      let data = {
        role: this.roleType,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.$http
        .post("/api/workbench/countfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          this.gain = result.gainNum;
          this.hold = result.holdNum;
          this.loss = result.lossNum;
          this.total = result.totalNum;
          this.projectChart.setOption(this.opt);
          this.projectChart.resize();
        })
        .catch(err => {
          this.loading = false;
        });
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
  margin-top: 50px;
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
.status-tabs .item.active[status="盈利 "] {
  background: #1abf69;
  color: #fff;
}
.status-tabs .item.active[status="盈利 "]:before {
  border-right: 8px solid transparent;
  border-top: 8px solid #1abf69;
  border-left: 8px solid transparent;
}
.status-tabs .item.active[status="亏损 "] {
  background: #ee5a5a;
  color: #fff;
}
.status-tabs .item.active[status="亏损 "]:before {
  border-right: 8px solid transparent;
  border-top: 8px solid #ee5a5a;
  border-left: 8px solid transparent;
}
.status-tabs .item.active[status="持平 "] {
  background: #295dcf;
  color: #fff;
}
.status-tabs .item.active[status="持平 "]:before {
  border-right: 8px solid transparent;
  border-top: 8px solid #295dcf;
  border-left: 8px solid transparent;
}
.status-item > p .tips:nth-of-type(1)[status="盈利 "]:before {
  background: #1abf69;
}
.status-item > p .tips:nth-of-type(1)[status="亏损"]:before {
  background: #ee5a5a;
}
.status-item > p .tips:nth-of-type(1)[status="持平"]:before {
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
  margin-left: 10px;
}
.finished-project.type1 {
  padding: 20px 20px 36px;
  background: #fff;
  position: relative;
  overflow: hidden;
  height: 245px;
}
.finished-project.type2 {
  padding: 20px 20px 27px;
  background: #fff;
  position: relative;
  overflow: hidden;
}
.el-date-editor {
  width: 110px;
}
.finished-project {
}
.fproject-charts.type1 {
  position: relative;
  width: 171.6px;
  height: 171.6px;
  margin-left: 19%;
  margin-top: 39px;
  float: left;
  z-index: 10;
}
.fproject-charts.type2 {
  position: relative;
  width: 171.6px;
  height: 171.6px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 21px;
  z-index: 10;
}
.unfinished-num.type1 {
  display: inline-block;
  left: 19%;
  width: 171.6px;
  text-align: center;
  position: absolute;
  top: -89px;
  z-index: 1;
}
.unfinished-num.type2 {
  display: inline-block;
  left: 0;
  right: 0;
  text-align: center;
  position: absolute;
  top: -119px;
}
.unfinished-num .text {
  font-size: 32px;
  color: #000;
}

.unfinished-num .tips {
  font-size: 12px;
  color: #969696;
}
.unfinished_num_div {
  position: relative;
  width: 100%;
  height: 0;
}
.header {
  height: 34px;
}
span.text {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}
.status-item > p .num {
  font-size: 20px;
}
.status-item > p.active span {
  color: #000;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}
@media only screen and (max-width: 1366px) {
  .status-item {
    margin-left: 40px;
  }
}
</style>
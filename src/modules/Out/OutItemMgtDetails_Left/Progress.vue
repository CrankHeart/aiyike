<!--项目管理-未完结项目详情-左侧模块-->
<template>
	<dl class="layout">
		<dt class="header">
			<!--<dt class="header"  v-if="HasPermission('statusAndName')">-->
			<div class="state-tag-area">
				<span class="state-tag" :state="projectStatusText"><span>{{projectStatusText}}</span></span>
			</div>
			<div class="title">
				{{leftDetail.itemName | nullformat}}
			</div>
			<!--<div class="dropdown_menu_btn" @click.stop="opendsc">
				<span class="el-icon-icon-moreunfold" :class="[dscIconIsShow?'el-icon-icon-less':'']"></span>
			</div>-->
			<div class="line"></div>
		</dt>
		<!--<dd class="content" v-if="ioApplyComplete && HasPermission('progressAndCycle')">-->
			<dd class="content" v-if="ioApplyComplete">
			<!--<ProjectDsc :show="dscIconIsShow" :details="leftDetail"></ProjectDsc>-->
			<div id="project-details-progess-charts">
			</div>
			<div class="project-projess-text">
				<p class="num">{{progressText}}%</p>
				<p class="dsc">项目进度</p>
			</div>
			<div class="chart-dsc clearfix">
				<section class="l">
					<p class="num">{{leftDetail.residualCycle | nullformat}}</p>
					<p class="dsc">剩余周期(天)</p>
				</section>
				<section class="l">
					<p class="num">{{profitText | nullformat('0')}}</p>
					<p class="dsc">已付款项(元)</p>
				</section>
			</div>
		</dd>
	</dl>
</template>

<script>
let echartsPromise = (() => import("echarts"))();
let echarts = null;
let ProjectDsc = () => import("./ProjectDsc.vue");
import pjdetailsMinxins from "@/mixin/pjdetails.js";

export default {
  mixins: [pjdetailsMinxins],
  name: "Progress",
  data() {
    return {
      leftDetail: {},
      state: this.$store.state,
      progessChart: null,
      showInter: null,
      dscIconIsShow: false,
      progressData: {}
    };
  },
  watch: {
    "state.outItemProgressLeftDetails": {
      deep: true,
      handler(val) {
        this.progressData = val;
      }
    },
    "state.outItemLeftDetails": {
      deep: true,
      handler(val) {
        this.leftDetail = val;

      }
    }
  },
  components: {
    ProjectDsc
  },
  mounted: function() {
  	this.progressData = this.$store.getters.outItemProgressLeftDetails || {};
  	this.leftDetail = this.$store.getters.outItemLeftDetails || {};
    this.$nextTick(() => {
      this.loadProgessRatioChartDec();
    });
    this.documentClick();
  },
  computed: {
    profitText() {
      if (Object.isEmpty(this.leftDetail.receive)) {
        return "";
      }
      let p = `${this.leftDetail.receive}`;
      if (p.indexOf("-") == -1) {
        return "+" + p;
      }
      return p;
    },
    progressText() {
      let ret;
      if (this.sameBusId()) {
        ret = this.progressData.progress;
      } else {
        ret = this.leftDetail.completed / this.leftDetail.hour * 100;
      }
      ret = +parseFloat(ret).toFixed(0);
      if (Object.isEmpty(ret)) {
        ret = "0";
      }
      return ret;
    },
    projectStatusText() {
      let ret = "";
      if (Number.isNaN(parseInt(this.leftDetail.status))) {
      	console.log(this.leftDetail,999)
        return "-";
      }
      switch (parseInt(this.leftDetail.status)) {
        case 1:
          ret = "总监审批";
          break;
        case 2:
          ret = "采购审批";
          break;
        case 3:
          ret = "邀请外围团队";
          break;
        case 4:
          ret = "外围团队评估";
          break;
        case 5:
          ret = "采购选标";
          break;
        case 6:
          ret = "副总审批";
          break;
        case 7:
          ret = "总经理审批";
          break;
        case 8:
          ret = "VP以上审批";
          break;
        case 9:
          ret = "填写付款计划";
          break;
        case 10:
          ret = "正常";
          break;
        case 11:
          ret = "挂起";
          break;
        case 12:
          ret = "中止";
          break;
        case 13:
          ret = "结项";
          break;
        default:
          alert("out StatusText unknow status");
          break;
      }
      return ret;
    },
	ioApplyComplete() {
				let state = this.$route.params.id.split("-")[1]
				if (Object.isEmpty(state)) {
					state = this.$store.getters.outItemItem.status
				}
				if (state == 10) {
					return true
				}
				if (state == 11) {
					return true
				}
				if (state == 12) {
					return true
				}
				if (state == 13) {
					return true
				}
				return false
	}
  },
  methods: {
    sameBusId() {
      let cbusId = this.$store.getters.loginInfo.bus.id;
      let lbusId = this.$store.getters.outItemItem.busId;
      if (lbusId == cbusId) {
        return true;
      }
      return false;
    },
    loadProgessRatioChartDec() {
      let _self = this;
      const el = document.getElementById("project-details-progess-charts");
      let progesschartsInterval = requestAnimationFrame(function fn() {
        if (el.offsetWidth > 0) {
          echartsPromise.then(ec => {
            echarts = ec;
            _self.loadProgessRatioChart();
          });
          cancelAnimationFrame(progesschartsInterval);
        } else {
          progesschartsInterval = requestAnimationFrame(fn);
        }
      });
    },
    documentClick() {
      let _self = this;
      document.addEventListener(
        "click",
        function() {
          _self.dscIconIsShow = false;
        },
        false
      );
    },
    opendsc() {
      this.dscIconIsShow = !this.dscIconIsShow;
    },
    loadProgessRatioChart() {
      if (!this.progessChart) {
        this.progessChart = echarts.init(
          document.getElementById("project-details-progess-charts")
        );
      }
      var getData = () => {
        let completed, uncompleted;
        if (this.sameBusId()) {
          completed = this.progressData.progress || 0;
          uncompleted = 100 - completed;
        } else {
          completed = this.leftDetail.completed || 0;
          uncompleted = (this.leftDetail.hour || 0) - completed;
        }
        let ret = [
          {
            value: completed,
            name: "已完成",
            itemStyle: {
              normal: {
                color: "#295DCF"
              }
            }
          },
          {
            value: uncompleted,
            name: "未完成",
            itemStyle: {
              normal: {
                color: "#D3DEF4"
              }
            }
          }
        ];
        return ret;
      };
      this.progessChart.setOption({
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
            data: getData()
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.mt20 {
  margin-top: 20px;
}

.mt14 {
  margin-top: 14px;
}

.mb14 {
  margin-bottom: 14px;
}

.mt10 {
  margin-top: 10px;
}

.mb10 {
  margin-bottom: 10px;
}

#project-details-progess-charts {
  width: 128px;
  height: 128px;
  margin: 20px auto 12px auto;
  position: relative;
  z-index: 10;
}

.state-tag {
  border-radius: 2px;
  font-size: 12px;
  letter-spacing: 0;
  text-align: center;
  padding: 2px 8px;
  display: inline-block;
  line-height: 18px;
}
/*.state-tag[state="进行中"] {
		border: 1px solid #1ABF69;
		color: #1ABF69;
	}*/
/*.state-tag[state="待立项"] {
		background: #F9F9F9;
		color: #295DCF;
	}*/
.state-tag {
  background: #f9f9f9;
  color: #295dcf;
}
.state-tag span {
  transform: scale(0.8333333);
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}

.dropdown_menu_btn {
  position: absolute;
  width: 22px;
  height: 22px;
  background: #f6f7f9;
  border-radius: 100%;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  line-height: 24px;
}

.dropdown_menu_btn .el-icon-icon-moreunfold {
  transform: scale(0.833333);
  color: #000000;
}

.layout .header .dropdown_menu_btn {
  right: 20px;
  top: 29px;
}

.layout {
  position: relative;
  background: #fff;
}

.layout .header {
  position: relative;
  min-height: 85px;
  padding: 20px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.layout .header .line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0px;
  opacity: 0.26;
  border-bottom: 1px solid #d5d5d5;
}

.layout .header .title {
  font-size: 16px;
  color: #000000;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
  padding-top: 6px;
}

.lenged-not-depart li,
.lenged-depart li {
  display: inline-block;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  margin-right: 4px;
}

.lenged-not-depart li:nth-last-of-type(1),
.lenged-depart li:nth-last-of-type(1) {
  margin-right: 0;
}

.lenged-not-depart li:before,
.lenged-depart li:before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 100%;
  vertical-align: baseline;
  margin-right: 5px;
}

.lenged-not-depart li:nth-child(1):before,
.lenged-depart li:nth-child(1):before {
  background: #d3def4;
}

.lenged-not-depart li:nth-child(2):before,
.lenged-depart li:nth-child(2):before {
  background: #295dcf;
}

.lenged-not-depart li:nth-child(3):before,
.lenged-depart li:nth-child(3):before {
  background: #f5bf3c;
}
.lenged-depart li:nth-child(4):before {
  background: #00ced1;
}
.layout .content {
  padding: 10px 20px 20px 20px;
  position: relative;
}

.layout .content .project-projess-text {
  position: absolute;
  left: 20px;
  text-align: center;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  right: 20px;
  display: block;
  width: auto;
  z-index: 1;
  top: 65px;
}

.layout .content .project-projess-text .num {
  font-size: 32px;
  color: #000000;
}

.layout .content .project-projess-text .dsc {
  font-size: 12px;
  color: #cacaca;
}

.layout .content .chart-dsc .l {
  width: 50%;
  display: inline-block;
  float: left;
  text-align: center;
}

.layout .content .chart-dsc .num {
  font-size: 24px;
  color: #333333;
}

.layout .content .chart-dsc .dsc {
  font-size: 12px;
  color: #cacaca;
}

.project-state {
  background: #f8f9fb;
  border-radius: 2px;
  width: 64px;
  height: 30px;
  font-size: 12px;
  color: #666666;
  text-align: center;
  margin: 0px auto 14px auto;
  line-height: 30px;
}
</style>
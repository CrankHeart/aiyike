<template>
	<div class="">
		<template v-if="type === '正常'">
			<div class="header-title">
				<span class="title middle">{{type}}项目 {{normalTotal}}个</span>
			</div>
			<div class="project-list">
				<div class="project-item" v-for="(item, index) in normalList" @click="jumpDetail(item)">
					<p class="title project-name">{{item.name}}</p>
					<div class="table">
						<el-row :gutter="78">
							<el-col :span="5">
								<p class="tip">实施额度</p>
								<p class="data">{{item.total_amount}} <span class="util">元</span></p>
							</el-col>
							<el-col :span="5">
								<p class="tip">已使用实施额度</p>
								<p class="data">{{item.allCostByItem}} <span class="util">元</span></p>
							</el-col>
							<el-col v-if="item.team.length !== 0" :span="9" class="bl-area">
								<p class="tip">执行部门
								</p>
                <div class="team subline">
                  	<span class="tag" icon="type1" v-for="bus in item.team" :key="bus.busName">{{bus.busName}}</span>
								</div>
							</el-col>
              <el-col v-if="item.team.length === 0" :span="9" class="bl-area">
								<p class="tip">执行部门
		
								</p>
								<p class="data tea">
                  <span>无</span>
                </p>
							</el-col>
							<el-col :span="5" class="bl-area">
								<p class="tip">项目状态</p>
								<p class="data" >{{statusMap.get(item.status)}}</p>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</template>
		<template v-if="type === '延期'">
			<div class="header-title">
				<span class="title middle">{{type}}项目 {{delayTotal}}个</span>
			</div>
			<div class="project-list">
				<div class="project-item" v-for="(item, index) in delayList" @click="jumpDetail(item)">
					<p class="title project-name">{{item.name}}</p>
					<div class="table">
						<el-row :gutter="78">
							<el-col :span="5">
								<p class="tip">实施额度</p>
								<p class="data">{{item.total_amount}} <span class="util">元</span></p>
							</el-col>
							<el-col :span="5">
								<p class="tip">已使用实施额度</p>
								<p class="data">{{item.allCostByItem}} <span class="util">元</span></p>
							</el-col>
								<el-col v-if="item.team.length !== 0" :span="9" class="bl-area">
								<p class="tip">执行部门
		
								</p>
								<div class="team subline">
                  	<span class="tag" icon="type1" v-for="bus in item.team" :key="bus.busName">{{bus.busName}}</span>
								</div>
							</el-col>
              <el-col v-if="item.team.length === 0" :span="9" class="bl-area">
								<p class="tip">执行部门
		
								</p>
								<p class="data tea">
                  <span>无</span>
                </p>
							</el-col>
							<el-col :span="5" class="bl-area">
								<p class="tip">项目状态</p>
								<!-- <p class="data" >{{statusMap.get(item.status)}}</p> -->
								<p class="data" >延期</p>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</template>
		<template v-if="type === '挂起'">
			<div class="header-title">
				<span class="title middle">{{type}}项目 {{hangUpTotal}}个</span>
			</div>
			<div class="project-list">
				<div class="project-item" v-for="(item, index) in hangUpList" @click="jumpDetail(item)">
					<p class="title project-name">{{item.name}}</p>
					<div class="table">
						<el-row :gutter="78">
							<el-col :span="5">
								<p class="tip">实施额度</p>
								<p class="data">{{item.total_amount}} <span class="util">元</span></p>
							</el-col>
							<el-col :span="5">
								<p class="tip">已使用实施额度</p>
								<p class="data">{{item.allCostByItem}} <span class="util">元</span></p>
							</el-col>
							<el-col v-if="item.team.length !== 0" :span="9" class="bl-area">
								<p class="tip">执行部门
		
								</p>
								<div class="team subline">
                  	<span class="tag" icon="type1" v-for="bus in item.team" :key="bus.busName">{{bus.busName}}</span>
								</div>
							</el-col>
              <el-col v-if="item.team.length === 0" :span="9" class="bl-area">
								<p class="tip">执行部门
		
								</p>
								<p class="data tea">
                  <span>待定</span>
                </p>
							</el-col>
							<el-col :span="5" class="bl-area">
								<p class="tip">项目状态</p>
								<p class="data" >{{statusMap.get(item.status)}}</p>
                
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</template>
		
		<template v-if="type === '待立项'">
			<div class="header-title">
				<span class="title middle">{{type}}项目 {{waitBuidTotal}}个</span>
			</div>
			<div class="project-list">
				<div class="project-item" v-for="(item, index) in waitBuidList" @click="jumpDetail(item)">
					<p class="title project-name">{{item.name}}</p>
					<div class="table">
						<el-row :gutter="78">
							<el-col :span="5">
								<p class="tip">实施额度</p>
								<p class="data">{{item.total_amount}} <span class="util">元</span></p>
							</el-col>
							<el-col :span="5">
								<p class="tip">已使用实施额度</p>
								<p class="data">{{item.allCostByItem}} <span class="util">元</span></p>
							</el-col>
							<el-col :span="9" class="bl-area">
								<p class="tip">执行部门

								</p>
								<div class="team subline">
                  	<span class="tag" icon="type1" v-for="bus in item.team" :key="bus.busName">{{bus.busName}}</span>
								</div>
							</el-col>
							<el-col :span="5" class="bl-area">
								<p class="tip">项目状态</p>
								<p class="data" >{{statusMap.get(item.status)}}</p>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</template>

    <template v-if="type === '盈利'">
      <div class="header-title">
				<span class="title middle">{{type}}项目 {{gainTotal}}个</span>
			</div>
			<div class="project-list">
				<div class="project-item" v-for="(item, index) in gainList" @click="jumpDetail(item)">
					<p class="title project-name">{{item.itemName}}</p>
					<div class="table">
						<el-row :gutter="78">
							<el-col :span="5" v-if="HasPermission('projectManager')||HasPermission('baWork')||HasPermission('ChiefInspectorWork')">
								<p class="tip">实施额度</p>
								<p class="subline price">{{item.exeQuota}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="5" v-if="HasPermission('PMOWork')||HasPermission('VPWork')||HasPermission('ViceGeneralManagerWork')">
								<p class="tip">合同金额</p>
								<p class="subline price">{{item.contractMoney}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="5">
								<p class="tip">盈亏</p>
								<p class="subline profit-gain">{{item.profit}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="11">
								<p class="tip">执行团队</p>
								<div class="team subline">
                  	<span class="tag" icon="type1" v-for="bus in item.team" :key="bus">{{bus}}</span>
								</div>
							</el-col>
							<el-col :span="3" class="bl-area">
								<el-button type="primary" icon="" class="bl-btn" @click="profitClick(item)" v-on:click.stop="jumpDetail()"><i class="el-icon-icon-yingkuiqushi"></i>盈亏趋势</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</template>
    <template v-if="type === '亏损'">
       <div class="header-title">
				<span class="title middle">{{type}}项目 {{lossTotal}}个</span>
			</div>
			<div class="project-list">
        <div class="project-item" v-for="(item, index) in lossList" @click="jumpDetail(item)">
					<p class="title project-name">{{item.itemName}}</p>
					<div class="table">
						<el-row :gutter="78">
							<el-col :span="5" v-if="HasPermission('projectManager')||HasPermission('baWork')||HasPermission('ChiefInspectorWork')">
								<p class="tip">实施额度/p>
								<p class="subline price">{{item.exeQuota}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="5" v-if="HasPermission('PMOWork')||HasPermission('VPWork')||HasPermission('ViceGeneralManagerWork')">
								<p class="tip">合同金额</p>
								<p class="subline price">{{item.contractMoney}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="5">
								<p class="tip">盈亏</p>
								<p class="subline profit-loss">{{item.exeQuota}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="11">
								<p class="tip">执行团队</p>
								<div class="team subline">
                  <span class="tag" icon="type1" v-for="bus in item.team" :key="bus">{{bus}}</span>
								</div>
							</el-col>
							<el-col :span="3" class="bl-area">
								<el-button type="primary" icon="" class="bl-btn" @click="profitClick(item)" v-on:click.stop="jumpDetail()"><i class="el-icon-icon-yingkuiqushi"></i>盈亏趋势</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</template>
    <template v-if="type === '持平'">
       <div class="header-title">
				<span class="title middle">{{type}}项目 {{hangTotal}}个</span>
			</div>
			<div class="project-list">
        <div class="project-item" v-for="(item, index) in hangList" @click="jumpDetail(item)">
					<p class="title project-name">{{item.itemName}}</p>
					<div class="table">
						<el-row :gutter="78">
							<el-col :span="5" v-if="HasPermission('projectManager')||HasPermission('baWork')||HasPermission('ChiefInspectorWork')">
								<p class="tip">实施额度</p>
								<p class="subline price">{{item.exeQuota}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="5" v-if="HasPermission('PMOWork')||HasPermission('VPWork')||HasPermission('ViceGeneralManagerWork')">
								<p class="tip">合同金额</p>
								<p class="subline price">{{item.contractMoney}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="5">
								<p class="tip">盈亏</p>
								<p class="subline profit-loss">{{item.exeQuota}}<span class="util">元</span></p>
							</el-col>
							<el-col :span="11">
								<p class="tip">执行团队</p>
								<div class="team subline">
                  <span class="tag" icon="type1" v-for="bus in item.team" :key="bus">{{bus}}</span>
								</div>
							</el-col>
							<el-col :span="3" class="bl-area">
								<el-button type="primary" icon="" class="bl-btn" @click="profitClick(item)" v-on:click.stop="jumpDetail()"><i class="el-icon-icon-yingkuiqushi"></i>盈亏趋势</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</template>
		
		<ProfitLossDialog :visible.sync="profitLossVisible"></ProfitLossDialog>
		<LoadMore :isloading.sync="isloading" v-if="showLoading"></LoadMore>
    
	</div>
</template>

<script>
import { bus } from "@/utils/bus.js";
let LoadMore = () => import("@/components/load-more/LoadMore.vue");
let ProfitLossDialog = () => import("@/modules/ProfitLossDialog.vue");

export default {
  name: "ProjectList",
  data() {
    return {
      profitLossVisible: false,
      listData: [],
      normalList: [],
      delayList: [],
      hangUpList: [],
      waitBuidList: [],
      gainList: [],
      lossList: [],
      hangList: [],
      normalTotal: 0,
      delayTotal: 0,
      hangUpTotal: 0,
      waitBuidTotal: 0,
      normalCurPage: 1,
      delayCurpage: 1,
      hangUpCurpage: 1,
      waitBuidCurpage: 1,
      gainCurpage: 1,
      lossCurpage: 1,
      hangCurpage: 1,
      gainTotal: 0,
      lossTotal: 0,
      hangTotal: 0,
      isloading: false,
      showLoading: false,
      timeData: {
        startTime: "",
        endTime: ""
      },
      roleType: "",
      statusMap: new Map([
        [1, "待PMO审核"],
        [2, "待立项"],
        [3, "驳回"],
        [4, "待PMO审核"],
        [5, "驳回"],
        [6, "待分配部门"],
        [7, "正常"],
        [8, "挂起"],
        [9, "中止"],
        [10, "结项"]
      ])
    };
  },
  computed: {},
  props: {
    type: {
      type: String,
      default: "正常"
    },
    pin: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  components: {
    ProfitLossDialog,
    bus,
    LoadMore
  },
  watch: {
    isloading(val) {
      if (val) {
        if (this.type === "正常") {
          setTimeout(() => {
            this.getNormalLoadMore();
            this.isloading = false;
          }, 500);
        }
        if (this.type === "延期") {
          setTimeout(() => {
            this.getDelayLoadMore();
            this.isloading = false;
          }, 500);
        }
        if (this.type === "挂起") {
          setTimeout(() => {
            this.getHangUpLoadMore();
            this.isloading = false;
          }, 500);
        }
        if (this.type === "待立项") {
          setTimeout(() => {
            this.getWaitBuidLoadMore();
            this.isloading = false;
          }, 500);
        }
        if (this.type === "盈利") {
          setTimeout(() => {
            this.getGainLoadMore();
            this.isloading = false;
          }, 500);
        }
        if (this.type === "亏损") {
          setTimeout(() => {
            this.getLossLoadMore();
            this.isloading = false;
          }, 500);
        }
        if (this.type === "持平") {
          setTimeout(() => {
            this.getHangLoadMore();
            this.isloading = false;
          }, 500);
        }
      }
    }
  },
  mounted: function() {
    bus.$on("loadMoreUnfinishEvent", this.isLoadUnfinish);
    bus.$on("loadMorefinishEvent", this.isLoadFinish);
    bus.$on("timeFinishEvent", this.getFinishData);
    if (this.pin === "pj") {
      this.roleType = "pm";
    } else if (this.pin === "pmo") {
      this.roleType = "pmo";
    } else if (this.pin === "vp") {
      this.roleType = "vp";
    } else if (this.pin === "dir") {
      this.roleType = "majordomo";
    } else if (this.pin === "man") {
      this.roleType = "vManager";
    } else if (this.pin === "ba") {
      this.roleType = "ba";
    } else {
      return;
    }
    this.getNormalData();
    this.getGainData();
    this.getLossData();
    this.getHangData();
  },
  methods: {
    
    jumpDetail(item) {
      console.log(item,123)
      let listData = item;
      if(this.pin === 'pmo' || this.pin === 'vp' || this.pin === 'man'){
        this.$store.commit("setUnFinishAuthType", 'upall');
      }else if(this.pin === 'dir'){
        this.$store.commit("setUnFinishAuthType", 'updepart');
      }else if(this.pin === 'pj'){
        this.$store.commit("setUnFinishAuthType", 'upmgr');
      }else if(this.pin === 'ba'){
        this.$store.commit("setUnFinishAuthType", 'upba');
      }
      this.$store.commit("setPjManageUnFinishedItem",listData);
      this.$router.push({
        path: `/businessaffairs/pj/details/${listData.id}-${listData.status}`
      });
    },
    profitClick(val) {
      this.profitLossVisible = true;
      let data = {
        role: this.roleType,
        itemId: val.itemId,
        profit: val.profit
      };
      bus.$emit("profitEvent", data);
    },
    isLoadUnfinish(val) {
      if (val === "正常") {
        this.normalCurPage = 1;
        this.getNormalData();
      } else if (val === "延期") {
        this.delayCurPage = 1;
        this.getDelayData();
      } else if (val === "挂起") {
        this.hangUpCurPage = 1;
        this.getHangUpData();
      } else if (val === "待立项") {
        this.waitBuidCurpage = 1;
        this.getWaitBuidData();
      } else {
        return;
      }
    },
    isLoadFinish(val) {
      if (val === "盈利") {
        this.gainCurpage = 1;
        this.getGainData();
      } else if (val === "亏损") {
        this.lossCurpage = 1;
        this.getLossData();
      } else if (val === "持平") {
        this.hangCurpage = 1;
        this.getHangData();
      } else {
        return;
      }
    },
    getNormalData() {
      //刷新时间更新  正常  项目列表
      let data = {
        role: this.roleType,
        curPage: this.normalCurPage,
        genre: 7
        // pageSize:5
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let isNull = res.data.result;
            if (isNull !== null) {
              let result = res.data.result.content;
              let total = res.data.result.total;
              if (result !== null && result.length > 0) {
                if (result.length === 10) {
                  this.showLoading = true;
                  this.normalCurPage += 1;
                } else {
                  this.showLoading = false;
                }
                this.normalList = result;
                this.normalTotal = total;
              } else {
                this.showLoading = false;
                this.normalTotal = 0;
                this.normalList = [];
              }
            } else {
              this.showLoading = false;
              this.normalTotal = 0;
              this.normalList = [];
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getDelayData() {
      //刷新时间更新  延期  项目列表
      let data = {
        role: this.roleType,
        curPage: this.delayCurpage,
        genre: 1
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let isNull = res.data.result;
            if (isNull !== null) {
              let result = res.data.result.content;
              let total = res.data.result.total;
              if (result !== null && result.length > 0) {
                if (result.length === 10) {
                  this.showLoading = true;
                  this.delayCurpage += 1;
                } else {
                  this.showLoading = false;
                }
                this.delayList = result;
                this.delayTotal = total;
              } else {
                this.showLoading = false;
                this.delayTotal = 0;
                this.delayList = [];
              }
            } else {
              this.showLoading = false;
              this.delayTotal = 0;
              this.delayList = [];
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getHangUpData() {
      //刷新时间更新  挂起  项目列表
      let data = {
        role: this.roleType,
        curPage: this.hangUpCurpage,
        genre: 8
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let isNull = res.data.result;
            if (isNull !== null) {
              let result = res.data.result.content;
              let total = res.data.result.total;
              if (result !== null && result.length > 0) {
                if (result.length === 10) {
                  this.showLoading = true;
                  this.hangUpCurpage += 1;
                } else {
                  this.showLoading = false;
                }
                this.hangUpList = result;
                this.hangUpTotal = total;
              } else {
                this.showLoading = false;
                this.hangUpTotal = 0;
                this.hangUpList = [];
              }
            } else {
              this.showLoading = false;
              this.hangUpTotal = 0;
              this.hangUpList = [];
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getWaitBuidData() {
      //刷新时间更新  待立项  项目列表
      let data = {
        role: this.roleType,
        curPage: this.waitBuidCurpage,
        genre: 2
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let isNull = res.data.result;
            if (isNull !== null) {
              let result = res.data.result.content;
              let total = res.data.result.total;
              if (result !== null && result.length > 0) {
                if (result.length === 10) {
                  this.showLoading = true;
                  this.waitBuidCurpage += 1;
                } else {
                  this.showLoading = false;
                }
                this.waitBuidList = result;
                this.waitBuidTotal = total;
              } else {
                this.showLoading = false;
                this.waitBuidTotal = total;
                this.waitBuidList = [];
              }
            } else {
              this.showLoading = false;
              this.waitBuidTotal = total;
              this.waitBuidList = [];
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getNormalLoadMore() {
      //加载  正常  项目列表
      let data = {
        role: this.roleType,
        curPage: this.normalCurPage,
        genre: 7
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let result = res.data.result.content;
            let total = res.data.result.total;
            let isFull = total / this.normalCurPage === 10 ? true : false;
            if (result !== null && result.length > 0) {
              if (result.length === 10 && !isFull) {
                this.showLoading = true;
                this.normalCurPage += 1;
              } else {
                this.showLoading = false;
              }
              this.normalList = this.normalList.concat(result);
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getDelayLoadMore() {
      //加载  延期  项目列表
      let data = {
        role: this.roleType,
        curPage: this.delayCurpage,
        genre: 1
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let result = res.data.result.content;
            let total = res.data.result.total;
            let isFull = total / this.delayCurpage === 10 ? true : false;
            if (result !== null && result.length > 0) {
              if (result.length === 10 && !isFull) {
                this.showLoading = true;
                this.delayCurpage += 1;
              } else {
                this.showLoading = false;
              }
              this.delayList = this.delayList.concat(result);
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getHangUpLoadMore() {
      //加载  挂起  项目列表
      let data = {
        role: this.roleType,
        curPage: this.hangUpCurpage,
        genre: 8
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let result = res.data.result.content;
            let total = res.data.result.total;
            let isFull = total / this.hangUpCurpage === 10 ? true : false;
            if (result !== null && result.length > 0) {
              if (result.length === 10 && !isFull) {
                this.showLoading = true;
                this.hangUpCurpage += 1;
              } else {
                this.showLoading = false;
              }
              this.hangUpList = this.hangUpList.concat(result);
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getWaitBuidLoadMore() {
      //加载  挂起  项目列表
      let data = {
        role: this.roleType,
        curPage: this.waitBuidCurpage,
        genre: 2
      };
      this.$http
        .post("/api/workbench/workNewBeachUnfinishItem", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let result = res.data.result.content;
            let total = res.data.result.total;
            let isFull = total / this.waitBuidCurpage === 10 ? true : false;
            if (result !== null && result.length > 0) {
              if (result.length === 10 && !isFull) {
                this.showLoading = true;
                this.waitBuidCurpage += 1;
              } else {
                this.showLoading = false;
              }
              this.waitBuidList = this.waitBuidList.concat(result);
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getGainData() {
      let startTime, endTime;
      if (this.timeData.startTime === "" && this.timeData.endTime === "") {
        let date = new Date();
        startTime = date.format("yyyy") + "-01-01";
        endTime = date.format("yyyy-MM" + "-01");
      } else {
        startTime = this.timeData.startTime;
        endTime = this.timeData.endTime;
      }
      let data = {
        role: this.roleType,
        status: 0,
        curPage: this.gainCurpage,
        startTime: startTime,
        endTime: endTime
      };
      this.$http
        .post("/api/statistics/statisticsOfFinish", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let isNull = res.data.result;
            if (isNull !== null) {
              let result = res.data.result.content;
              let total = res.data.result.total;
              if (result !== null && result.length > 0) {
                if (result.length === 10) {
                  this.showLoading = true;
                  this.gainCurpage += 1;
                } else {
                  this.showLoading = false;
                }
                this.gainList = result;
                this.gainTotal = total;
              } else {
                this.showLoading = false;
                this.gainTotal = 0;
                this.gainList = [];
              }
            } else {
              this.showLoading = false;
              this.gainTotal = 0;
              this.gainList = [];
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getLossData() {
      let startTime, endTime;
      if (this.timeData.startTime === "" && this.timeData.endTime === "") {
        let date = new Date();
        startTime = date.format("yyyy") + "-01-01";
        endTime = date.format("yyyy-MM") + "-01";
      } else {
        startTime = this.timeData.startTime;
        endTime = this.timeData.endTime;
      }
      let data = {
        role: this.roleType,
        status: 1,
        curPage: this.lossCurpage,
        startTime: startTime,
        endTime: endTime
      };
      this.$http
        .post("/api/statistics/statisticsOfFinish", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let isNull = res.data.result;
            if (isNull !== null) {
              let result = res.data.result.content;
              let total = res.data.result.total;
              if (result !== null && result.length > 0) {
                if (result.length === 10) {
                  this.showLoading = true;
                  this.lossCurpage += 1;
                } else {
                  this.showLoading = false;
                }
                this.lossList = result;
                this.lossTotal = total;
              } else {
                this.showLoading = false;
                this.lossTotal = 0;
                this.lossList = [];
              }
            } else {
              this.showLoading = false;
              this.lossTotal = 0;
              this.lossList = [];
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getHangData() {
      let startTime, endTime;
      if (this.timeData.startTime === "" && this.timeData.endTime === "") {
        let date = new Date();
        startTime = date.format("yyyy") + "-01-01";
        endTime = date.format("yyyy-MM") + "-01";
      } else {
        startTime = this.timeData.startTime;
        endTime = this.timeData.endTime;
      }
      let data = {
        role: this.roleType,
        status: 2,
        curPage: this.hangCurpage,
        startTime: startTime,
        endTime: endTime
      };
      this.$http
        .post("/api/statistics/statisticsOfFinish", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let isNull = res.data.result;
            if (isNull !== null) {
              let result = res.data.result.content;
              let total = res.data.result.total;
              if (result !== null && result.length > 0) {
                if (result.length === 10) {
                  this.showLoading = true;
                  this.lossCurpage += 1;
                } else {
                  this.showLoading = false;
                }
                this.lossList = result;
                this.lossTotal = total;
              } else {
                this.showLoading = false;
                this.lossTotal = 0;
                this.lossList = [];
              }
            } else {
              this.showLoading = false;
              this.lossTotal = 0;
              this.lossList = [];
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },

    getGainLoadMore() {
      //加载 盈利 列表
      let startTime, endTime;
      if (this.timeData.startTime === "" && this.timeData.endTime === "") {
        let date = new Date();
        startTime = date.format("yyyy") + "-01-01";
        endTime = date.format("yyyy-MM") + "-01";
      } else {
        startTime = this.timeData.startTime;
        endTime = this.timeData.endTime;
      }
      let data = {
        role: this.roleType,
        curPage: this.gainCurpage,
        status: 0,
        startTime: startTime,
        endTime: endTime
      };
      this.$http
        .post("/api/statistics/statisticsOfFinish", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let result = res.data.result.content;
            let total = res.data.result.total;
            let isFull = total / this.gainCurpage === 10 ? true : false;
            if (result !== null && result.length > 0) {
              if (result.length === 10 && !isFull) {
                this.showLoading = true;
                this.gainCurpage += 1;
              } else {
                this.showLoading = false;
              }
              this.gainList = this.gainList.concat(result);
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getLossLoadMore() {
      //加载 亏损 列表
      let startTime, endTime;
      if (this.timeData.startTime === "" && this.timeData.endTime === "") {
        let date = new Date();
        startTime = date.format("yyyy") + "-01-01";
        endTime = date.format("yyyy-MM") + "-01";
      } else {
        startTime = this.timeData.startTime;
        endTime = this.timeData.endTime;
      }
      let data = {
        role: this.roleType,
        curPage: this.lossCurpage,
        status: 0,
        startTime: startTime,
        endTime: endTime
      };
      this.$http
        .post("/api/statistics/statisticsOfFinish", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let result = res.data.result.content;
            let total = res.data.result.total;
            let isFull = total / this.lossCurpage === 10 ? true : false;
            if (result !== null && result.length > 0) {
              if (result.length === 10 && !isFull) {
                this.showLoading = true;
                this.lossCurpage += 1;
              } else {
                this.showLoading = false;
              }
              this.lossList = this.lossList.concat(result);
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getHangLoadMore() {
      let startTime, endTime;
      if (this.timeData.startTime === "" && this.timeData.endTime === "") {
        let date = new Date();
        startTime = date.format("yyyy") + "-01-01";
        endTime = date.format("yyyy-MM") + "-01";
      } else {
        startTime = this.timeData.startTime;
        endTime = this.timeData.endTime;
      }
      let data = {
        role: this.roleType,
        curPage: this.hangCurpage,
        status: 0,
        startTime: startTime,
        endTime: endTime
      };
      this.$http
        .post("/api/statistics/statisticsOfFinish", data, {
          emulateJSON: true
        })
        .then(res => {
          let flag = res.data.success;
          if (flag) {
            let result = res.data.result.content;
            let total = res.data.result.total;
            let isFull = total / this.hangCurpage === 10 ? true : false;
            if (result !== null && result.length > 0) {
              if (result.length === 10 && !isFull) {
                this.showLoading = true;
                this.hangCurpage += 1;
              } else {
                this.showLoading = false;
              }
              this.hangList = this.hangList.concat(result);
            }
          } else {
            this.$message({
              customClass: "error",
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getFinishData(data) {
      this.timeData = data;
      console.log("timeData:::", this.timeData);
      this.gainList = [];
      this.lossList = [];
      this.hangList = [];
      this.isLoadFinish();
    }
  }
};
</script>

<style scoped>
.project-item {
  cursor: pointer;
}

.project-list .project-item {
  margin-bottom: 14px;
}

.project-list .project-item:nth-last-of-type(1) {
  margin-bottom: 0;
}

.project-item {
  padding: 18px 20px;
  background: #fff;
}

.project-item .title {
  font-size: 16px;
  color: #000000;
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}

.project-item .table {
  margin-top: 15px;
}

.project-item .table .tip {
  font-size: 12px;
  color: #c1c1c1;
  text-align: left;
}

.project-item .table .subline {
  padding-top: 4px;
  vertical-align: baseline;
}

.project-item .table .team {
  padding-top: 0px;
}

.project-item .table .team .tag {
  margin-top: 4px;
}

.project-item .table .price {
  font-size: 18px;
  color: #333333;
}

.project-item .table .profit-loss {
  font-size: 18px;
  color: #ee5a5a;
  font-weight: bold;
}

.project-item .table .profit-gain {
  font-size: 18px;
  color: #1abf69;
  font-weight: bold;
}

.project-item .table .profit-hang {
  font-size: 18px;
  color: #295dcf;
  font-weight: bold;
}

.project-item .table .util {
  font-size: 12px;
  color: #151515;
}

.project-item .table .tag {
  display: inline-block;
  font-size: 10px;
  color: #666666;
  background: #f8f9fb;
  padding: 4px 14px;
  margin-right: 12px;
  position: relative;
}

.project-item .table .tag[icon="type1"]:before {
  content: "";
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url(../assets/img/icon-star.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  top: 1px;
  margin-right: 4px;
}

.project-item .table .team .tag:nth-last-of-type(1) {
  margin-right: 0;
}

.project-item .data {
  text-align: left;
  margin-top: 4px;
  font-size: 18px;
  color: #333333;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}

.project-item .tip {
  font-size: 12px;
  color: #c1c1c1;
}

.project-item .util {
  font-size: 12px;
  color: #151515;
  letter-spacing: 0;
  line-height: 25px;
}

.bl-area {
  position: relative;
  /* text-align: right; */
  padding-right: 40px;
}

.bl-btn {
  position: absolute;
  right: 40px;
  top: -10px;
  width: 100px;
  height: 30px;
  line-height: 1;
  padding: 0;
  border-radius: 2px;
}
.bl-btn i {
  display: inline-block;
  margin-right: 5px;
  font-size: 10px;
}
.header-title .title {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}

.tea span {
  font-size: 18px;
  margin-right: 5px;
}
.loadmore-block {
  margin-bottom: 26px;
}

.project-name {
  font-size: 18px;
  font-weight: bold;
}
</style>
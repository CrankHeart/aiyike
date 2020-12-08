<!--项目管理-历史项目模块-->
<template>
	<section>
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：项目管理</el-breadcrumb-item>
			<el-breadcrumb-item>新邀请</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="list-wrap">
			<el-form :inline="true" class="newinvitefrom clearfix" :model="searchParam" label-width="62px" label-position="left">
				<el-form-item label="项目名称：" class="mb12">
					<el-autocomplete :trigger-on-focus="false" v-model="searchParam.itemName" :fetch-suggestions="querySearchAsync" placeholder="请选择"></el-autocomplete>
				</el-form-item>
				<el-form-item class="searchbtn-area">
					<el-button type="primary" class="searchbtn" @click="search">搜索</el-button>
				</el-form-item>
				<el-form-item label="申请日期：" class="mb24">
					<el-date-picker type="date" placeholder="选择日期" v-model="searchParam.startcycle"></el-date-picker>
				</el-form-item>
			</el-form>
			<el-table v-loading="loading" @row-click="rowclick" :data="tableData" class="historyTable">
				<el-table-column prop="itemName" label="项目名称">
				</el-table-column>
				<!--<el-table-column prop="tAmount" label="外围总价（元）" align="right">
					<template slot-scope="props">
						<span>{{ props.row.tAmount | moneyformat }}</span>
					</template>
				</el-table-column>-->
				<el-table-column prop="labels" label="业务范围" width="320">
					<template slot-scope="props">
						<span class="ayk-listtag" v-if="index < 2" v-for="(item, index) in props.row.labels" :key="index">
						<span>{{item.name}}</span>
						</span>
						<div v-if="props.row.labels.length > 2" class="more" @mouseenter="moreover(props.row.labels)" @mouseleave="moreout($event)">
							<span>...</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="manager" label="艾艺负责人" align="center">
				</el-table-column>
	<!--			<el-table-column prop="status" label="项目状态" align="center">
					<template slot-scope="props">
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 0">未投标</span>
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 2">已投标</span>
					</template>
				</el-table-column>-->
				
				<el-table-column prop="status1" label="项目状态" align="center" ></el-table-column>
				<el-table-column prop="creatTime" :formatter="fmtDateCreateTime" label="申请日期" align="center">
				</el-table-column>
			</el-table>
			<el-pagination class="mt10" small @current-change="handleCurrentChange" :current-page.sync="pagination.curPage" :page-size="pagination.pageSize" layout="prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
			<Tooltip :tipData="tipData" :tipStatus="tipStatus" targetClass="more"></Tooltip>
			<el-dialog class="newinvite-dialog"
				title="提示!"
				:visible.sync="dialogVisible"
				size="tiny"
				center>
				<span style="text-align:center">首次登陆，请先完善团队信息</span>
				<span slot="footer" class="dialog-footer comTea">
					<el-button class="longbtn" type="primary" @click="completeTeam" size="">完善团队信息</el-button>
				</span>
			</el-dialog>
		</div>
	</section>
</template>

<script>
let Tooltip = () => import("@/components/Tooltip.vue");
export default {
  name: "NewInviteSearch",
  data() {
    return {
      searchParam: {
        name: "",
        startcycle: new Date()
      },
      pagination: {
        total: 0,
        pagesize: 0,
        curPage: 1
      },
      loading: false,
      tipData: [],
      tipStatus: false,
      tableData: [],
      restaurants: [
        {
          value: "三全鲜食（北新泾店）",
          address: "长宁区新渔路144号"
        },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        }
      ],
      dialogVisible: false
    };
  },
  watch: {
    tipStatus(val) {}
  },
  components: {
    Tooltip
  },
  mounted: function() {
    this.$nextTick(() => {
      this.isOutFirst();
      this.link2Page(1);
    });
  },
  beforeDestroy() {},
  methods: {
    completeTeam() {
      let itemId = this.$store.getters.loginInfo.bus.id;
      this.$router.push({
        path: `/out/outMgt/tedit/${itemId}`
      });
      this.dialogVisible = false;
    },
    isOutFirst() {
      let roleType = this.$store.getters.loginInfo.roleList[0].code;
      let id = this.$store.getters.loginInfo.uc.id;
      let data = {
        ucId: id
      };
      let is_first = sessionStorage.getItem("is_first");
      console.log(is_first+"   爱神的箭发动机拉法兰江岸粮食");
      if (is_first === "false" || is_first === "true") {
        this.dialogVisible = false;
      } else {
        this.$http
          .post("/api/loginLog/findLoginLogById", data, {
            emulateJSON: true
          })
          .then(res => {
            let result = res.data.result;
            sessionStorage.setItem("is_first", result);
            if (roleType === "out" && !result) {
              this.dialogVisible = true;
            } else {
              this.dialogVisible = false;
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      }
    },
    createTimeFm(row, column, cellValue) {
      return cellValue;
    },
    search() {
      this.reload();
    },
    reload() {
      this.link2Page(1);
    },
    handleCurrentChange(val) {
      this.link2Page(val);
    },
    link2Page(curPage) {
      this.loading = true;
      this.searchParam.curPage = curPage;
      this.$http
        .post("/api/ioApply/queryNewInvite", this.searchParam, {
          emulateJSON: true
        })
        .then(res => {
          let content = !!res.data.result.content
            ? res.data.result.content
            : [];
          content.forEach((item, index) => {
            if (Object.isEmpty(item.labels)) {
              item.labels = [];
            }
            if (String.isString(item.labels)) {
              item.labels = JSON.parse(item.labels);
            }
          });
          this.tableData = content;
          this.pagination.total = res.data.result.total;
          this.pagination.pageSize = res.data.result.helper.pageSize;
          this.pagination.curPage = res.data.result.helper.curPage;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    moreover(labels) {
      this.tipData = [];
      labels.forEach((item, index) => {
        this.tipData.push(item.name);
      });
      this.tipStatus = true;
    },
    moreout(e) {
      this.tipStatus = false;
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return state.value.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    fmtDateCreateTime: function(row) {
      let creatTime = row.creatTime || null;
      return new Date(creatTime).format("yyyy-MM-dd");
    },
    fmtItemStatus: function(row) {
      let status = row.status;
      if (status == 1) {
        return "总监审批";
      } else if (status == 2) {
        return "采购审批";
      } else if (status == 3) {
        return "邀请外围团队";
      } else if (status == 4) {
        return "外围团队评估";
      } else if (status == 5) {
        return "采购选标";
      } else if (status == 6) {
        return "副总审批";
      } else if (status == 7) {
        return "总经理审批";
      } else if (status == 8) {
        return "VP以上审批";
      } else if (status == 9) {
        return "填写付款计划";
      } else if (status == 10) {
        return "正常";
      } else if (status == 11) {
        return "挂起";
      } else if (status == 12) {
        return "中止";
      } else if (status == 13) {
        return "结项";
      } else {
        return "未知";
      }
    },
    rowclick(row, event, column) {
      this.tipStatus = false;
      this.$nextTick(() => {
        this.$store.commit("outItemItem", row);
        this.$router.push({ path: `/out/outMgt/details/${row.id}` });
      });
    }
  }
};
</script>

<style scoped>
.more {
  text-align: center;
  width: 40px;
  height: 23px;
  display: inline-block;
  background: #f8f9fb;
  color: #666666;
  cursor: pointer;
  position: relative;
}

.more-area {
  position: absolute;
  left: 40px;
  min-height: 126px;
  width: 340px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.more-area li {
  margin-bottom: 10px;
}

.more-area li:nth-of-type(3n) {
  margin-right: 0;
}

.more-area:before {
  position: absolute;
  content: "";
  display: inline-block;
  border-top: 6px solid transparent;
  border-right: 6px solid rgba(0, 0, 0, 0.8);
  border-bottom: 6px solid transparent;
  left: -6px;
  top: 57px;
}
.more span {
  position: relative;
  top: -2px;
}

.state-text.type0 {
  font-size: 12px;
  color: #295dcf;
}

.state-text.type1 {
  font-size: 12px;
  color: #1abf69;
}

.searchbtn-area {
  float: right;
}

.mb12 {
  margin-bottom: 2px;
}

.mb24 {
  margin-bottom: 20px;
}

.el-date-editor.el-input {
  width: 109px;
}
</style>
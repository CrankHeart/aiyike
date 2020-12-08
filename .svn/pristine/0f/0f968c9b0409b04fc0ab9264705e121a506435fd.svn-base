<!--项目管理-已合作-->
<template>
	<section class="layout-o">
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：项目管理</el-breadcrumb-item>
			<el-breadcrumb-item>已合作</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="list-wrap">
			<el-form :inline="true" class="newinvitefrom clearfix" :model="searchParam" label-width="62px" label-position="left">
				<el-form-item label="项目名称：" class="mb12">
					<el-autocomplete :trigger-on-focus="false" v-model="searchParam.itemName" :fetch-suggestions="querySearchAsync" placeholder="请选择"></el-autocomplete>
				</el-form-item>
				<el-form-item label="项目状态：" class="mb12">
					<el-select v-model="searchParam.status" placeholder="请选择" v-sicon1>
						<el-option v-for="item in projectStatus" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="searchbtn-area">
					<el-button type="primary" class="searchbtn" @click="searchBtn">搜索</el-button>
				</el-form-item>
				<el-form-item label="申请日期：" class="mb24">
					<el-date-picker type="date" placeholder="选择日期" v-model="searchParam.startTime"></el-date-picker>
				</el-form-item>
			</el-form>
			<el-table @cell-mouse-enter="cellenter" @row-click="rowclick" :data="tableData" class="historyTable" style="width: 100%">
				<el-table-column prop="itemName" label="项目名称">
				</el-table-column>
				<el-table-column prop="tAmount" label="外围总价（元）" align="right">
					<template slot-scope="props">
						<span>{{ props.row.tAmount | moneyformat }}</span>
					</template>
				</el-table-column>
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
				<!--		<el-table-column prop="status" label="项目状态" align="center">
					<template slot-scope="props">
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 0">已挂起</span>
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 1">进行中</span>
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 2">已延期</span>
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 3">已終止</span>
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 4">已完成</span>
					</template>
				</el-table-column>-->
				<el-table-column prop="status" label="项目状态" align="center" :formatter="fmtItemStatus"></el-table-column>
				<el-table-column prop="creatTime" label="申请日期" :formatter="fmtDateCreateTime" align="center">
				</el-table-column>
			</el-table>
			<el-pagination class="mt10" small @current-change="handleCurrentChange" :current-page.sync="pagination.curPage" :page-size="pagination.pageSize" layout="prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
			<Tooltip :tipData="tipData" :tipStatus="tipStatus" targetClass="more"></Tooltip>
		</div>
	</section>
</template>

<script>
let Tooltip = () => import("@/components/Tooltip.vue");
export default {
  name: "AlReadyCpSearch",
  data() {
    return {
      searchParam: {
        name: "",
        startTime: ""
      },
      pagination: {
        total: 0,
        pagesize: 0,
        curPage: 1
      },
      tipData: [],
      loading: false,
      tipStatus: false,
      comming: false,
      tipPosition: {},
      row: {},
      moreArea: false,
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
      projectStatus: [
        {
          value: "10",
          label: "进行中"
        },
        {
          value: "11",
          label: "挂起"
        },
        {
          value: "12",
          label: "中止"
        },
        {
          value: "13",
          label: "结项"
        },
        {
          value: "14",
          label: "已延期"
        }
      ]
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
      this.link2Page(1);
    });
  },
  beforeDestroy() {},
  methods: {
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
      this.searchParam.startTime = !!this.searchParam.startTime
        ? new Date(this.searchParam.startTime).format("yyyy-MM-dd")
        : "";
      this.$http
        .post("/api/itemOut/queryCooperateByOut", this.searchParam, {
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
    getScrollTop() {
      var scrollPos;
      if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
      } else if (document.compatMode && document.compatMode != "BackCompat") {
        scrollPos = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollPos = document.body.scrollTop;
      }
      return scrollPos;
    },
    cellenter(row, column, cell, event) {
      this.row = row;
    },
    getStyle(obj, attr) {
      return document.defaultView.getComputedStyle(obj, null)[attr];
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
    searchBtn() {
      this.searchParam.startTime = !!this.searchParam.startTime
        ? new Date(this.searchParam.startTime).format("yyyy-MM-dd hh:mm:ss")
        : "";
      this.reload();
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
      } else if(status == 14){
		  return "已延期";
	  }else {
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

.state-text.type2 {
  font-size: 12px;
  color: #f5bf3c;
}

.state-text.type3 {
  font-size: 12px;
  color: #ee5a5a;
}

.state-text.type4 {
  font-size: 12px;
  color: #666666;
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
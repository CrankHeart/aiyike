<!--运营数据-->
<template>
	<div class="wrap">
		<section class="table-area mt24">
			<div class="header">
				<span class="middle title">企业月度数据</span>
				<el-select v-model="years" placeholder="选择" class="fr" style="width: 80px;" v-sicon1 @change="searchYearData">
            <el-option
                    v-for="item in yearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
			</div>
			<el-table :data="comMonthData" style="width: 100%" class="tablePadd20">
				<el-table-column prop="year" label="年份" align="left">
				</el-table-column>
				<el-table-column prop="month" label="月份" align="left">
				</el-table-column>
				<el-table-column prop="planAmount" label="目标到款额 (元)" align="left">
				</el-table-column>
				<el-table-column prop="realAmount" label="实际到款额 (元)" align="left">
				</el-table-column>
				<el-table-column prop="otherAmount" label="其它到款额 (元)" align="left">
				</el-table-column>
				<el-table-column prop="avgAmount" label="平均人力成本 (元)" align="left">
				</el-table-column>
				<el-table-column prop="operAmount" label="运营成本 (元)" align="left">
				</el-table-column>
				<el-table-column prop="mRate" label="毛利率 (元)" align="left">
				</el-table-column>
				<el-table-column prop="nRate" label="净利率 (元)" align="left">
				</el-table-column>
			</el-table>
		</section>
		<section class="table-area mt24">
			<div class="header">
				<span class="middle title">执行部门月度数据</span>
        <div class="fr label-text">
          <span>
            部门名称：
          </span>
          <span>
            <GroupSelect class="my-input" v-model="impOption" :treeData="treeData" placeholder="选择或输入执行部门"></GroupSelect>
          </span>
        </div>
			</div>
			<el-table :data="impMonthData" style="width: 100%" class="tablePadd20">
				<el-table-column prop="year" label="年份" align="left">
				</el-table-column>
				<el-table-column prop="amount" label="平摊成本 (元)" align="left">
				</el-table-column>
				<el-table-column prop="dAvgAmount" label="日常成本 (元)" align="left">
				</el-table-column>
				<el-table-column prop="total" label="人力成本总和 (元)" align="left">
				</el-table-column>
				<el-table-column prop="operAmount" label="运营成本 (元)" align="left">
				</el-table-column>
				<el-table-column prop="mRate" label="毛利率 (元)" align="left">
				</el-table-column>
				<el-table-column prop="nRate" label="净利率 (元)" align="left">
				</el-table-column>
				
			</el-table>
		</section>
		<section class="table-area mt24">
			<div class="header">
				<span class="middle title">事业部月度数据</span>
        <div class="fr label-text">
          <span class="">
            部门名称：
          </span>
          <span>
            <GroupSelect class="my-input" v-model="busOption" :treeData="treeData" placeholder="选择或输入事业部"></GroupSelect>
          </span>
        </div>
			</div>
			<el-table :data="busMonthData" style="width: 100%" class="tablePadd20">
				<el-table-column prop="year" label="年份" align="left">
				</el-table-column>
				<el-table-column prop="month" label="月份" align="left">
				</el-table-column>
				<el-table-column prop="planAmount" label="目标到款额 (元)" align="left">
				</el-table-column>
				<el-table-column prop="realAmount" label="实际到款额 (元)" align="left">
				</el-table-column>
			</el-table>
		</section>
		
		
	</div>
</template>

<script>
import { bus } from "@/utils/bus";

let GroupSelect = () => import("@/components/select/GroupSelect.vue");

export default {
  name: "OperateData",
  data() {
    return {
      names: 0,
      years: 2018,
      dataList: JSON.parse(Cache.local(Config.Login)),
      impOption: "",
      busOption: "",
      treeData: [],
      busOptions: [
        {
          label: "用户体验事业部",
          value: 0
        },
        {
          label: "创意事业部",
          value: 1
        },
        {
          label: "移动事业部",
          value: 2
        },
        {
          label: "web事业部",
          value: 3
        }
      ],
      impOptions: [],
      yearOptions: (() => {
        var arr = [];
        for (var i = 1970; i <= 2060; i++) {
          arr.push({
            value: i,
            label: i
          });
        }
        return arr;
      })(),
      comMonthData: [],
      busMonthData: [],
      impMonthData: []
    };
  },
  watch: {
    impOption: function(val, oldVal) {
      let data = {
        type: 3,
        departId: val.id
      };
      this.$http
        .post("/api/operate/queryOperateByAll", data, {
          emulateJSON: true
        })
        .then(res => {
          this.impMonthData = res.data.result.impMonthData;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    busOption: function(val, oldVal) {
      let data = {
        type: 2,
        departId: val.id
      };
      this.$http
        .post("/api/operate/queryOperateByAll", data, {
          emulateJSON: true
        })
        .then(res => {
          this.busMonthData = res.data.result.busMonthData;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  components: {
    GroupSelect,
    bus
  },
  mounted: function() {
    this.$nextTick(() => {
      this.getOperateData();
      this.getDepartmentData();
    });
  },
  created() {
    bus.$on("operateEvent", this.getOperateData);
    bus.$on("switchOperateEvent", this.getOperateData);
  },
  beforeDestroy() {},
  methods: {
    getDepartmentData() {
      this.$http
        .post(
          "/api/depart/departTree",
          {},
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let ar = res.data.result;
          Object.isNotEmpty(ar) ? ar.pop() : void 0;
          this.treeData = ar || [];
        })
        .catch(err => {});
    },
    getOperateData() {
      this.$http
        .post("/api/operate/queryOperateByAll", {
          emulateJSON: true
        })
        .then(res => {
          this.comMonthData = res.data.result.comMonthData;
          this.busMonthData = res.data.result.busMonthData;
          this.impMonthData = res.data.result.impMonthData;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    searchYearData(val) {
      let data = {
        type: 1,
        year: val
      };
      this.$http
        .post("/api/operate/queryOperateByAll", data, {
          emulateJSON: true
        })
        .then(res => {
          this.comMonthData = res.data.result.comMonthData;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.label-text {
  font-size: 12px;
  color: #666666;
  letter-spacing: 0;
  margin-top: 19px !important;
}

.label-text span {
  display: inline-block;
}
.single-input i {
  margin-top: 5px;
}
.wrap {
  height: auto;
}

.mt24 {
  margin-top: 24px;
}

.table-area {
  background: #fff;
  padding: 0px 20px 20px 20px;
}

.header {
  height: 58px;
}

.header .title {
  font-size: 14px;
  color: #000000;
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}
.fr {
  margin-top: 16px;
}
</style>
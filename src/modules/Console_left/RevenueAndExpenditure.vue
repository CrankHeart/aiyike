<template>
	<div class="SectorIndicators-wrap incomeAndExpenditure">
		<section>
			<div class="header clearfix ">
				<span class="middle text">收支情况</span>
				<el-date-picker v-model="nowMonth" type="month" placeholder="" @change="dateHandler" class="date-select" style="width:100px">
				</el-date-picker>
				<span style="width: 131px; margin-right: 10px;float:right">
					<GroupSelect class="my-input" v-model="group" :treeData="treeData" placeholder="所属部门"></GroupSelect>
				</span>
			</div>
			<div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="depart_name" label="部门">
					</el-table-column>
					<el-table-column prop="real_amount" align="left" label="到款额 (元)">
					</el-table-column>
					<el-table-column prop="total" align="left" label="人员成本总和 (元)">
					</el-table-column>
					<el-table-column prop="totalCost" align="left" label="总成本 (元)">
					</el-table-column>
					<el-table-column prop="monthlyOutput" align="left" label="平均月产出 (元)">
					</el-table-column>
				</el-table>
			</div>
		</section>
	</div>
</template>

<script>
let GroupSelect = () => import("@/components/select/GroupSelect.vue");

export default {
  name: "",
  data() {
    return {
      value: "",
      alignPosition: "right",
      nowMonth: new Date(),
      tableData: [],
      group:  {
        id:this.$store.getters.loginInfo.depart.id
      },
      treeData: []
    };
  },
  components: {
    GroupSelect
  },
  watch: {
    group(val, oldVal) {
      this.getIncomeAndExpenditureData();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getIncomeAndExpenditureData();
      this.getDepartmentData();
    });
  },
  methods: {
    dateHandler(val) {
      this.getIncomeAndExpenditureData();
    },
    getDepartmentData() {
      this.$http
        .post("/api/depart/departTree", {
          emulateJSON: true
        })
        .then(res => {
          let arr = res.data.result;
          arr.pop();
          this.treeData = arr;
        })
        .catch(err => {});
    },
    getIncomeAndExpenditureData() {
      let time = this.nowMonth.format("yyyy-MM-dd");
      let data = {
        date: time,
        departId: this.group.id,
      };
      console.log
      this.$http
        .post("/api/operate/incomeExpenditure", data, {
          emulateJSON: true
        })
        .then(res => {
          let result = res.data.result;
          this.tableData = result;
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>

.incomeAndExpenditure > section{
	height:600px;
}

.SectorIndicators-wrap {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.SectorIndicators-wrap > section {
  padding: 18px 20px 18px;
  background: #fff;
}

.header {
  height: 34px;
}

.header .text {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
  font-size: 14px;
  color: #333333;
  font-weight: 600;
}

.date-select {
  float: right;
}

.profit-margin {
  color: #1abf69;
}
</style>
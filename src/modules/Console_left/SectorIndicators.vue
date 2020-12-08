<template>
	<div class="SectorIndicators-wrap">
		<section>
			<div class="header clearfix">
				<span class="middle text">部门指标</span>
				<el-date-picker v-model="nowMonth" type="month" placeholder="选择月" @change="dateHandler" class="date-select" style="width:100px">
				</el-date-picker>
			</div>
			<div>
				<el-table :data="tableData" style="width: 100%" class="green-td">
					<el-table-column prop="departName" label="部门">
					</el-table-column>
					<el-table-column prop="indicator" align="left" label="指标 (元)">
					</el-table-column>
					<el-table-column prop="completeQuota" align="left" label="完成额度 (元)">
					</el-table-column>
					<el-table-column prop="arrivalQuota" align="left" label="到款总额 (元)">
					</el-table-column>
					<el-table-column prop="grossProfit" align="left" label="毛利率">
					</el-table-column>
					<el-table-column prop="totalCost" align="left" label="总人力执行成本 (元)">
					</el-table-column>
					<el-table-column prop="normalCost" align="left" label="正常人力执行成本 (元)">
					</el-table-column>
				</el-table>
			</div>
		</section>
	</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      value: "",
      alignPosition: "right",
      nowMonth: new Date(),
      tableData: []
    };
  },
  components: {},
  mounted() {
    this.$nextTick(() => {
      this.getSectorIndicatorData();
    });
  },
  methods: {
    dateHandler() {
      this.getSectorIndicatorData();
    },
    getSectorIndicatorData() {
      let time = this.nowMonth.format("yyyy-MM-dd");
      let data = {
        time: time
      };
      this.$http
        .post("/api/workbench/departIndicator", data, {
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
.SectorIndicators-wrap {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.SectorIndicators-wrap > section {
  padding: 18px 18px 18px;
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
}

.date-select {
  float: right;
}

.profit-margin {
  color: #1abf69;
}
</style>
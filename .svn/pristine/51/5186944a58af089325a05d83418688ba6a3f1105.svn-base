<template>
	<div class="wrap container">
		<tabs v-model="activeName" @tab-click="handleClick" right="82">
			<!--工作台(PMO)-->
			<tab-pane label="工作台" name="PMOWork" v-if="HasPermission('PMOWork')">
				<div class="header-title">
					<span class="title middle">绩效管理</span>
				</div>
				<el-row :gutter="22" class="noprow">
					<el-col :span="12">
						<unfinished-project-chart pin="pmo"></unfinished-project-chart>
					</el-col>
					<el-col :span="12">
						<finished-project-chart pin="pmo"></finished-project-chart>
					</el-col>
				</el-row>
				<departmental-work-efficiency class="eff-chart" pin="pmo"></departmental-work-efficiency>
			</tab-pane>

			<!--工作台(部门经理)-->
			<tab-pane label="工作台" name="DivisionManagerWork" v-if="HasPermission('DivisionManagerWork')">
				<div class="header-title" v-if="unprojectviewName!='details'">
					<span class="title middle">当前项目进度统计</span>
				</div>
				<ProjectScheduleStatistics></ProjectScheduleStatistics>
				<personnel-work-efficiency class="eff-chart" pin="bus"></personnel-work-efficiency>
			</tab-pane>

			<!--工作台(部门总监)-->
			<tab-pane label="工作台" name="ChiefInspectorWork" v-if="HasPermission('ChiefInspectorWork')">
				<div class="header-title">
					<span class="title middle">绩效管理</span>
				</div>
				<el-row :gutter="22" class="noprow">
					<el-col :span="12">
						<doing-project-chart pin="dir"></doing-project-chart>
					</el-col>
					<el-col :span="12">
						<finished-project-chart pin="dir"></finished-project-chart>
					</el-col>
				</el-row>
				<sector-indicators class="sector-indicators"></sector-indicators>
				<chiefInspector-personnel-work-efficiency pin="dir" class="eff-chart"></chiefInspector-personnel-work-efficiency>
			</tab-pane>
			<!--工作台(副总经理)-->
			<tab-pane label="工作台" name="ViceGeneralManagerWork" v-if="HasPermission('ViceGeneralManagerWork')">
				<div class="header-title">
					<span class="title middle">绩效管理</span>
				</div>
				<el-row :gutter="22" class="noprow">
					<el-col :span="12">
						<doing-project-chart pin="man"></doing-project-chart>
					</el-col>
					<el-col :span="12">
						<finished-project-chart pin="man"></finished-project-chart>
					</el-col>
				</el-row>
				<sector-indicators pin="man" class="sector-indicators"></sector-indicators>
				<chiefInspector-personnel-work-efficiency pin="man" class="eff-chart"></chiefInspector-personnel-work-efficiency>
			</tab-pane>
			<!--工作台(VP)-->
			<tab-pane label="工作台" name="VPWork" v-if="HasPermission('VPWork')">
				<el-row :gutter="22" class="vp-projects-charts noprow">
					<el-col :span="12">
						<enterprise-profit class="enterprise-profit" pin="vp"></enterprise-profit>
					</el-col>
					<el-col :span="12">
						<rate-of-completion class="rate-of-completion" pin="vp"></rate-of-completion>
					</el-col>
				</el-row>
				<revenue-and-expenditure class="Revenue-and-expenditure" pin="vp"></revenue-and-expenditure>
				<el-row :gutter="22" class="vp-projects-charts noprow">
					<el-col :span="12">
						<unfinished-project-chart pin="vp"></unfinished-project-chart>
					</el-col>
					<el-col :span="12">
						<finished-project-chart pin="vp"></finished-project-chart>
					</el-col>
				</el-row>
				<sector-indicators class="sector-indicators" pin="vp"></sector-indicators>
				<chiefInspector-personnel-work-efficiency pin="vp" class="eff-chart" style="margin-bottom: 70px;"></chiefInspector-personnel-work-efficiency>
			</tab-pane>
			<!--工作台(财务)-->
			<tab-pane label="工作台" name="financeWork" v-if="HasPermission('financeWork')">
				<el-row :gutter="22" class="vp-projects-charts noprow">
					<el-col :span="12">
						<enterprise-profit class="enterprise-profit" pin="finance"></enterprise-profit>
					</el-col>
					<el-col :span="12">
						<rate-of-completion class="rate-of-completion" pin="finance"></rate-of-completion>
					</el-col>
				</el-row>
				<revenue-and-expenditure class="Revenue-and-expenditure" pin="finance"></revenue-and-expenditure>
			</tab-pane>
			<!--工作台(项目经理)-->
			<tab-pane label="工作台" name="projectManager" v-if="HasPermission('projectManager')">
				<div class="header-title">
					<span class="title middle">绩效管理</span>
				</div>
				<el-row :gutter="22" class="noprow">
					<el-col :span="12">
						<unfinished-project-chart pin="pj"></unfinished-project-chart>
					</el-col>
					<el-col :span="12">
						<finished-project-chart pin="pj"></finished-project-chart>
					</el-col>
				</el-row>
				<!--<sector-indicators class="sector-indicators" pin="pj"></sector-indicators>
				<revenue-and-expenditure class="Revenue-and-expenditure" pin="pj"></revenue-and-expenditure>-->
				<project-contribution-degree class="eff-chart" pin="pj"></project-contribution-degree>
			</tab-pane>
			<template slot="right">
				<!-- <ExportButton class="export_btn"></ExportButton> -->
			</template>
		</tabs>
		<Todo class="todo-module" v-if="HasPermission('WorkBenchRight')"></Todo>
	</div>
</template>

<script>
function syncComponent(path) {
  return () => import("@/" + path + ".vue");
}

let Todo = syncComponent("modules/Console_right/Todo");
let Tabs = syncComponent("components/tabs/Tabs");
let TabPane = syncComponent("components/tabs/TabPane");
let UnfinishedProjectChart = syncComponent(
  "modules/Console_left/UnfinishedProjectChart"
);
let DoingProjectChart = syncComponent("modules/Console_left/DoingProjectChart");
let FinishedProjectChart = syncComponent(
  "modules/Console_left/FinishedProjectChart"
);
let DepartmentalWorkEfficiency = syncComponent(
  "modules/Console_left/DepartmentalWorkEfficiency"
);
let PersonnelWorkEfficiency = syncComponent(
  "modules/Console_left/PersonnelWorkEfficiency"
);
let ChiefInspectorPersonnelWorkEfficiency = syncComponent(
  "modules/Console_left/ChiefInspector_PersonnelWorkEfficiency"
);
let ProjectScheduleStatistics = syncComponent(
  "modules/Console_left/ProjectScheduleStatistics"
);
let SectorIndicators = syncComponent("modules/Console_left/SectorIndicators"); //部门指标
let RevenueAndExpenditure = syncComponent(
  "modules/Console_left/RevenueAndExpenditure"
); //收支情况
let ProjectContributionDegree = syncComponent(
  "modules/Console_left/ProjectContributionDegree"
); //项目贡献度
let EnterpriseProfit = syncComponent("modules/Console_left/EnterpriseProfit"); //企业利润
let RateOfCompletion = syncComponent("modules/Console_left/RateOfCompletion"); //到款额完成率

let PjManagementUnFinishedDetails = () =>
  import("@/page/BusinessAffairs/PjManagement_UnFinished_Details.vue");
// let ExportButton = () =>
// 	import("@/modules/Export_Button.vue");

export default {
  name: "WorkBench",
  data() {
    return {
      auditView: "todo",
      state: this.$store.state,
      unprojectviewName: "",
      activeName: null
    };
  },
  watch: {
    "state.projectAuditState"(val) {
      if (val) {
        this.showProjectAudit();
      } else {
        this.hideProjectAudit();
      }
      this.$store.dispatch("RESIZE_PANE");
    }
  },
  components: {
    Todo,
    Tabs,
    TabPane,
    UnfinishedProjectChart,
    FinishedProjectChart,
    DoingProjectChart,
    DepartmentalWorkEfficiency,
    PersonnelWorkEfficiency,
    ChiefInspectorPersonnelWorkEfficiency,
    ProjectScheduleStatistics,
    SectorIndicators,
    RevenueAndExpenditure,
    ProjectContributionDegree,
    EnterpriseProfit,
    RateOfCompletion,
    PjManagementUnFinishedDetails
    // ExportButton
  },
  mounted: function() {
    this.$store.dispatch("SHOW_PROJECT_AUDIT");
  },
  methods: {
    handleClick(tab, event) {},
    showProjectAudit() {
      this.tabClass = "tabss";
    },
    hideProjectAudit() {
      this.tabClass = "";
    }
  }
};
</script>

<style scoped>
.noprow {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.noprow .el-col:nth-child(1) {
  padding-left: 0px !important;
}

.noprow .el-col:nth-child(2) {
  padding-right: 0px !important;
}

.eff-chart {
  margin-top: 24px;
}

.worktab > .el-tabs__header {
  background: #f8f9fb;
}

.tabs {
  margin-right: 336px;
}

.todo-module {
  position: absolute;
  top: 0;
  right: 0;
}

.el-row {
  height: auto;
}

.sector-indicators {
  margin-top: 20px;
}

.export_btn {
  position: absolute;
  right: 0px;
  top: 14px;
}

.Revenue-and-expenditure {
  margin-top: 20px;
}

.vp-projects-charts {
  margin-top: 20px;
}

.header-title .title {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}
</style>
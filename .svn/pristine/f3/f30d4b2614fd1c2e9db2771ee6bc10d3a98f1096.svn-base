<!--项目管理-统计页-->
<template>
	<div class="wrap">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item>当前位置：项目管理</el-breadcrumb-item>
			<el-breadcrumb-item>统计</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row :gutter="22" class="mt24">
			<el-col :span="12">
        <!-- pmo -->
				<unfinished-project-chart ref="UnfinishedProjectChart" type="2" pin="pmo" @tabsClick="tabsClick" v-if="HasPermission('PMOWork')"></unfinished-project-chart>
        <!-- 部门总监 -->
				<unfinished-project-chart ref="UnfinishedProjectChart" type="2" pin="dir" @tabsClick="tabsClick" v-if="HasPermission('ChiefInspectorWork')"></unfinished-project-chart>
        <!-- 商务经理 -->
				<unfinished-project-chart ref="UnfinishedProjectChart" type="2" pin="ba" @tabsClick="tabsClick" v-if="HasPermission('baWork')"></unfinished-project-chart>
        <!-- 副总 -->
				<unfinished-project-chart ref="UnfinishedProjectChart" type="2" pin="man" @tabsClick="tabsClick" v-if="HasPermission('ViceGeneralManagerWork')"></unfinished-project-chart>
        <!-- VP -->
				<unfinished-project-chart ref="UnfinishedProjectChart" type="2" pin="vp" @tabsClick="tabsClick" v-if="HasPermission('VPWork')"></unfinished-project-chart>
        <!-- 项目经理 -->
				<unfinished-project-chart ref="UnfinishedProjectChart" type="2" pin="pj" @tabsClick="tabsClick" v-if="HasPermission('projectManager')"></unfinished-project-chart>
			</el-col>
			<el-col :span="12">
				<finished-project-chart ref="FinishedProjectChart" type="2" pin="pmo" @tabsClick="tabsClick" v-if="HasPermission('PMOWork')"></finished-project-chart>
				<finished-project-chart ref="FinishedProjectChart" type="2" pin="dir" @tabsClick="tabsClick" v-if="HasPermission('ChiefInspectorWork')"></finished-project-chart>
				<finished-project-chart ref="FinishedProjectChart" type="2" pin="ba" @tabsClick="tabsClick" v-if="HasPermission('baWork')"></finished-project-chart>
				<finished-project-chart ref="FinishedProjectChart" type="2" pin="man" @tabsClick="tabsClick" v-if="HasPermission('ViceGeneralManagerWork')"></finished-project-chart>

				<!-- <finished-project-chart ref="FinishedProjectChart" type="2" pin="zj" @tabsClick="tabsClick" v-if="HasPermission('ZJWork')"></finished-project-chart> -->

				<finished-project-chart ref="FinishedProjectChart" type="2" pin="vp" @tabsClick="tabsClick" v-if="HasPermission('VPWork')"></finished-project-chart>
				<finished-project-chart ref="FinishedProjectChart" type="2" pin="pj" @tabsClick="tabsClick" v-if="HasPermission('projectManager')"></finished-project-chart>
			</el-col>
		</el-row>
		<ProjectList :type="listType" pin="pmo" v-if="HasPermission('PMOWork')"></ProjectList>
		<ProjectList :type="listType" pin="dir" v-if="HasPermission('ChiefInspectorWork')"></ProjectList>
		<ProjectList :type="listType" pin="ba" v-if="HasPermission('baWork')"></ProjectList>
		<ProjectList :type="listType" pin="man" v-if="HasPermission('ViceGeneralManagerWork')"></ProjectList>
		<!-- <ProjectList :type="listType" pin="zj" v-if="HasPermission('ZJWork')"></ProjectList> -->
		<ProjectList :type="listType" pin="vp" v-if="HasPermission('VPWork')"></ProjectList>
		<ProjectList :type="listType" pin="pj" v-if="HasPermission('projectManager')"></ProjectList>
	</div>
</template>

<script>
let UnfinishedProjectChart = () =>
  import("@/modules/Console_left/UnfinishedProjectChart.vue");
let FinishedProjectChart = () =>
  import("@/modules/Console_left/FinishedProjectChart.vue");
let ProjectList = () => import("@/modules/ProjectList.vue");

export default {
  name: "PjManagement_Count",
  data() {
    return {
      listType: "正常"
    };
  },
  props: {
    // pin: {
    //   type: String,
    //   default: function() {
    //     return "";
    //   }
    // }
  },
  watch: {},
  components: {
    UnfinishedProjectChart,
    FinishedProjectChart,
    ProjectList
  },
  mounted: function() {},
  beforeDestroy() {},
  methods: {
    handleCurrentChange: function(val) {
      this.loading = true;
    },
    tabsClick(type, index, name) {
      console.log("type",type);
      console.log("index",index);
      console.log("name",name);
      this.listType = type;
      if (name == "normalProject") {
        this.$refs["FinishedProjectChart"].clearTabsIndex();
      }
      if (name == "delayProject") {
        this.$refs["UnfinishedProjectChart"].clearTabsIndex();
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  height: auto;
}
.mt24 {
  margin-top: 24px;
}
</style>
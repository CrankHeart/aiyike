<template>
	<div>
		<div class="rowdiv">

			<div v-for="item in items">
				<div class="itemx">
					<span class="itemx_title">{{item.titlex}}</span>
					<div v-model="content in item.contents" @change="handleCheckedCitiesChange">
					    <el-checkbox v-for="content in item.contents" :label="content" :key="content">{{content}}</el-checkbox>
					</div>
				</div>
			</div>	

		</div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return{
				items:[
					{
						titlex: "数据统计",
						isIndeterminate: true,
						contents: ["工作台","运营数据录入","指标设置","工作台","底层数据录入","项目款项录入"],
						conts: ["工作台","运营数据录入","指标设置","工作台","底层数据录入","项目款项录入"]
					},
					{
						titlex: "周报管理",
						isIndeterminate: true,
						contents: ["填写周报","审核下级周报"],
						conts: ["填写周报","审核下级周报"]
					},
					{
						titlex: "日志管理",
						isIndeterminate: true,
						contents: ["项目日志","非执行项目日志","审核下级日志"],
						conts: ["项目日志","非执行项目日志","审核下级日志"]
					},
					{
						titlex: "项目管理",
						isIndeterminate: true,
						contents: ["项目日志","项目进度审核","申请外围","里程碑评审","需求变更"],
						conts: ["项目日志","项目进度审核","申请外围","里程碑评审","需求变更"]
					},
					{
						titlex: "人事管理",
						isIndeterminate: true,
						contents: ["员工管理","岗位管理","组织架构管理","假期设置"],
						conts: ["员工管理","岗位管理","组织架构管理","假期设置"]
					}
				]
			}
		},
		methods:{
			handleCheckedCitiesChange(value) {

		    }
		}
	}
</script>

<style scoped>
	.rowdiv{
		display: flex;
	}
	.rowdiv .itemx{
		width: 20%;
		padding-left: 10px;
		padding-right: 10px;
	}
	.rowdiv .itemx_title{
		display: block;
		font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 14px;
		color: #000;
		letter-spacing: 0;
		padding-bottom: 24px;
	}
</style>
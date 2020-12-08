<template>
	<div class="todo">
		<tabs ref="tabs" v-model="activeName" @tab-click="handleClick" :isroute="false" :tabsType="2" :right="0" :hgoptions="{
			paddingLeft: '20px',
			paddingRight: '0px',
		}">
			<tab-pane label="日志" name="log" :tips="logTips" v-if="HasPermission('Logs')">
				<LogWrap @obtainTipsLen="obtainLogTipsLen"></LogWrap>
			</tab-pane>
			<tab-pane label="周报" name="weekly" :tips="weeklyTips" v-if="HasPermission('Weekly')">
				<WeeklyWrap @obtainTipsLen="obtainWeeklyTipsLen"></WeeklyWrap>
			</tab-pane>
			<tab-pane label="项目" name="project" :tips="projectTips" v-if="HasPermission('Project')">
				<ProjectWrap @obtainTipsLen="obtainProjectTipsLen"></ProjectWrap>
			</tab-pane>
			<tab-pane label="外围" name="out" :tips="outTips" v-if="HasPermission('Periphery')">
				<OutApplyWrap @obtainTipsLen="obtainOutTipsLen"></OutApplyWrap>
			</tab-pane>
		</tabs>
	</div>
</template> 

<script>
	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')
	let WeeklyWrap = () =>
		import('@/modules/Audit/WeeklyWrap.vue')
	let OutApplyWrap = () =>
		import('@/modules/Audit/OutApplyWrap.vue')
	let ProjectWrap = () =>
		import('@/modules/Audit/ProjectWrap.vue')
	let LogWrap = () =>
		import('@/modules/Audit/LogWrap.vue')

	export default {
		name: 'Todo',
		data() {
			return {
				activeName: null,
				logTips: 0,
				weeklyTips: 0,
				outTips: 0,
				projectTips: 0
			}
		},
		components: {
			Tabs,
			TabPane,
			WeeklyWrap,
			OutApplyWrap,
			ProjectWrap,
			LogWrap
		},
		mounted: function() {},
		methods: {
			obtainLogTipsLen(value) {
				this.logTips = value
			},
			obtainWeeklyTipsLen(value) {
				this.weeklyTips = value
			},
			obtainProjectTipsLen(value) {
				this.projectTips = value
			},
			obtainOutTipsLen(value) {
				this.outTips = value
			},
			handleClick(tab, event) {
			}
		}
	}
</script>

<style scoped>
	.todo-item .btn {
		font-size: 14px;
		margin-top: 12px;
		width: 90px;
		height: 30px;
		padding: 0;
		background-color: #295DCF;
		border-color: #295DCF;
	}
	
	
	.todo-item {
		padding-top: 26px;
		padding-bottom: 26px;
		padding-right: 39px;
		border-bottom: 1px solid #F0F0F0;
	}
	
	.todo-item .title .content {
		display: block;
		position: relative;
		left: 10px;
		font-size: 16px;
		color: #000;
		top: 0px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.todo-item .dsc {
		margin-top: 8px;
		color: #b9b9b9;
		font-size: 12px;
	}
	
	.dsc:nth-of-type(2) {
		margin-top: 14px;
	}
	
	.middle {
		vertical-align: center;
	}
	
	.todo {
		background: #fff;
		height: 100%;
		width: 336px;
		overflow: hidden;
	}
	
	.todo-wrap {
		height: 100%;
	}
	
	.primary-tag {
		font-size: 10px;
		border-radius: 2px;
		border: 1px solid #3e6dd4;
		display: inline-block;
		color: #3e6dd4;
		float: left;
		padding: 1px 6px;
	}
</style>
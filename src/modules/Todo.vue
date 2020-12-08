<template>
	<div class="todo">
		<tabs ref="tabs" v-model="activeName" @tab-click="handleClick" :isroute="false" :tabsType="2" :right="0" :hgoptions="{
			paddingLeft: '20px',
			paddingRight: '0px',
		}">
			<tab-pane label="日志" name="Journal" :tips="8">
				<JournalTodo @getWhetherVisible="getWhetherVisible"></JournalTodo>
			</tab-pane>
			<!--<tab-pane label="周报" name="weekly" :tips="5">
				<WeeklyTodo></WeeklyTodo>
			</tab-pane>-->
			<!--<tab-pane label="项目" name="my" :tips="11">-->
				<!--<ProjectTodo></ProjectTodo>-->
			<!--</tab-pane>-->
			<!--<tab-pane label="外围" name="peripheral" :tips="2">-->
				<!--<PeripheralTodo></PeripheralTodo>-->
			<!--</tab-pane>-->
		</tabs>
		<LogDetails :visible.sync="logDetailsVisible"></LogDetails>
	</div>
</template>

<script>

    function syncComponent(path) {
        return () => import('@/' + path + '.vue')
    }

	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')
    let LogDetails = () =>
		import('@/modules/LogManagement/LogDetails.vue')

    let JournalTodo = syncComponent('modules/Console_right/Journal_Todo')
    let ProjectTodo = syncComponent('modules/Console_right/Project_Todo')
    let WeeklyTodo = syncComponent('modules/Console_right/Weekly_Todo')
    let PeripheralTodo = syncComponent('modules/Console_right/Peripheral_Todo')



	export default {
		name: 'Todo',
		data() {
			return {
				activeName: null,
                logDetailsVisible:false
			}
		},
		components: {
			Tabs,
			TabPane,
            JournalTodo,
            ProjectTodo,
            WeeklyTodo,
            PeripheralTodo,
            LogDetails,
		},
		mounted: function() {},
		methods: {
			handleClick(tab, event) {},
            getWhetherVisible(val){
			    this.logDetailsVisible = val;
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
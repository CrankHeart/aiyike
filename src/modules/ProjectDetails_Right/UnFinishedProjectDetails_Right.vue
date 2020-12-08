<!--项目管理-未完结项目详情页-->
<template>
	<tabs ref="tabs" class="projectdetailstab" v-model="activeName" @tab-click="handleClick" :iswrap="iswrap" :isroute="false">
		<tab-pane label="工时成本" name="hourcost" v-if="HasPermission('hourcost')">
			<component :is="hourcost_view"></component>
		</tab-pane>
		<tab-pane label="工时成本" name="hourcostdepart" v-if="HasPermission('hourcostdepart')">
			<component :is="hourcostdepart_view"></component>
		</tab-pane>
		<tab-pane label="日志" name="log" v-if="HasPermission('log')">
			<component :is="log_view" :itemId="$route.params.id"></component>
		</tab-pane>
		<tab-pane label="项目周报" name="pweekly" v-if="HasPermission('pweekly')">
			<component :is="pweekly_view" :rightWeeklyList = "rightWeeklyList" @reloadProjectList = 'reloadProjectList'></component>
		</tab-pane>
		<tab-pane label="项目成员" name="pmember" v-if="HasPermission('pmember')">
			<component :is="pmember_view" :itemId="$route.params.id"></component>
		</tab-pane>
		<tab-pane label="项目奖金" name="pbonus" v-if="HasPermission('pbonus')">
			<component :is="pbonus_view"></component>
		</tab-pane>
		<tab-pane label="操作记录" name="operation_record" v-if="HasPermission('operationRecord')">
			<component :is="operation_record_view"></component>
		</tab-pane>
	</tabs>
</template>

<script>
	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')
	let HourCostDepart = () =>
		import('./Hour_Cost_Depart.vue')
	let HourCost = () =>
		import('./Hour_Cost.vue')
	let ProjectWeekly = () =>
		import('./Project_Weekly.vue')
    let WeeklyDetailsComponentsP = function(resolve) {
        require(['@/modules/week/WeeklyDetailsComponentsP'], resolve);
    }
	let ProjectMember = () =>
		import('./Project_Member.vue')
	let ProjectLog = () =>
		import('./Project_Log.vue')
	let ProjectBonus = () =>
		import('./Project_Bonus.vue')
	let OperationRecord = () =>
		import('./Operation_Record.vue')

	export default {
		name: 'UnFinishedProjectDetails_Right',
		data() {
			return {
				activeName: '',
				hourcost_view: null,
				hourcostdepart_view: null,
				log_view: null,
				pweekly_view: null,
				pmember_view: null,
				pbonus_view: null,
				operation_record_view: null,
				iswrap: false,
				projectLogs: [], //项目日志列表
                state:this.$store.state,
                rightWeeklyList: []
			}
		},
		components: {
			Tabs,
			TabPane,
			ProjectWeekly,
            WeeklyDetailsComponentsP,
			ProjectMember,
			ProjectLog,
			ProjectBonus,
			OperationRecord
		},
		watch:{
		    'state.WeeklyDetalisData':{
                handler(val,oldVal){
                    this.pweekly_view = WeeklyDetailsComponentsP
                    this.getWeeklyData(val)
                    delete this.$store.getters.WeeklyDetalisData.dtype
                },
                deep:true
			}
		},
		mounted() {

		},
		activated() {
			alert('activated')
		},
		beforeDestroy() {
			this.activeName = ''
		},
		methods: {
            cacheData(val){
                sessionStorage.setItem("ProjectWeeklyData",JSON.stringify(val))
            },
            getWeeklyData(data){
                this.rightWeeklyList = data
            },
			queryProjectLog(itemId) {
				let curPage = 1
				this.$http.post('/api/dayLog/queryProjectDayLogs?itemId=' + itemId + '&curPage=' + curPage, {
					emulateJSON: true
				}).then((res) => {
					let flag = res.data.success
					let result = res.data.result.content
					if(flag) {
						this.projectLogs = result
					}
				}).catch((err) => {
					
				});
			},
			handleClick(tab, event) {
				switch(tab.name) {
					case 'hourcost':
						this.hourcost_view = HourCost
						break;
					case 'hourcostdepart':
						this.hourcostdepart_view = HourCostDepart
					case 'log':
						this.log_view = ProjectLog
						break;
					case 'pweekly':
						this.pweekly_view = ProjectWeekly
						break;
					case 'pmember':
						this.pmember_view = ProjectMember
						break;
					case 'pbonus':
						this.pbonus_view = ProjectBonus
						break;
					case 'operation_record':
						this.operation_record_view = OperationRecord
						break;
					default:
						break;
				}
			},
            reloadProjectList(val){
				if(val){
                    this.pweekly_view = ProjectWeekly
					return
				}
			}
		}
	}
</script>

<style scoped>
	.project_details_right {
		height: 100%;
	}
	
	.projectdetailstab {
		background: #FFFFFF;
	}
</style>
<!--项目管理-新邀请-详情页右侧-->
<template>
	<tabs ref="tabs" class="projectdetailstab" v-model="activeName" @tab-click="handleClick" :iswrap="false" :isroute="false">
		<tab-pane label="评估信息" name="evinfo" v-if="HasPermission('evinfo')">
			<component :is="evview" :data="rightDetails" :reload="obtainRightDetails"></component>
		</tab-pane>
		<tab-pane label="范围描述" name="rangedsc" v-if="HasPermission('rangedsc')">
			<component :is="rangedsc_view" :data="rightDetails"></component>
		</tab-pane>
		<tab-pane label="收款记录" name="corecord" v-if="isHasCorecord">
			<component :is="corecordview" :data="rightDetails"></component>
		</tab-pane>
		<tab-pane label="阶段性汇报" name="pereport" v-if="HasPermission('pereport')">
			<component :is="rereportview" :data="rightDetails"></component>
		</tab-pane>
		<tab-pane label="评价" name="assess" v-if="HasPermission('assess')">
			<component :is="assessview" :data="rightDetails"></component>
		</tab-pane>
		<tab-pane label="操作记录" name="oprecord" v-if="HasPermission('oprecord')">
			<component :is="operation_record_view" :data="rightDetails" type="2"></component>
		</tab-pane>
	</tabs>
</template>

<script>
	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')
	let Range_Dsc = () =>
		import('./Range_Dsc.vue')
	let Evaluation_Info = () =>
		import('./Evaluation_Info.vue')
	let OperationRecord = () =>
		import('@/modules/ProjectDetails_Right/Operation_Record.vue')
	let CollectionRecord = () =>
		import('./Collection_Record.vue')
	let PeriodicReport = () =>
		import('./Periodic_Report.vue')
	let AssessList = () =>
		import('./Assess_List.vue')
		
	export default {
		name: 'AlreadyCpDetails_Right',
		data() {
			return {
				activeName: '',
				rangedsc_view: null,
				evview: Evaluation_Info,
				corecordview: null,
				operation_record_view: null,
				rereportview: null,
				assessview: null,
				rightDetails: {}
			}
		},
		components: {
			Tabs,
			TabPane
		},
		mounted() {
			this.$nextTick(()=> {
				this.obtainRightDetails()
			})
		},
		computed: {
			isHasCorecord() {
				if (this.$store.getters.outItemItem.status >= 10 && this.HasPermission('corecord')) {
					return true
				}
				return false
			}
		},
		methods: {
			obtainRightDetails() {
				this.$http.post('/api/itemAssess/assessDetail', {
					id: this.$route.params.id.split("-")[0]
				}, {
					emulateJSON: true
				}).then((res) => {
					this.rightDetails = res.data.result || {}
				}).catch((err) => {
				})
			},
			handleClick(tab, event) {
				switch(tab.name) {
					case 'rangedsc':
						this.rangedsc_view = Range_Dsc
						break;
					case 'evinfo':
						this.evview = Evaluation_Info
						break;
					case 'corecord':
						this.corecordview = CollectionRecord
						break;
					case 'pereport':
						this.rereportview = PeriodicReport
						break;
					case 'assess':
						this.assessview = AssessList
						break;
					case 'oprecord':
						this.operation_record_view = OperationRecord
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.projectdetailstab {
		background: #FFFFFF;
	}
</style>
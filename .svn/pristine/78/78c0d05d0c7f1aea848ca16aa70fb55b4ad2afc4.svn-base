<!--项目管理-未完结项目详情-左侧模块-->
<template>
	<div class="layout">
		<div class="layout-in">
			<ProgressCharts></ProgressCharts>
			<div v-if="hasPm2Role('departsQuota')" class="viewAllotment">
				<div class="line"></div>
				<p class="title">各部门进度</p>
				<ViewAllotment :id="index" :datasource="item" v-for="(item, index) in viewAllotmentData" :key="index" class="mlr"></ViewAllotment>
			</div>
			<DemandChange :itemId="$route.params.id"></DemandChange>
			<CustomEvaluation :itemId="$route.params.id" ></CustomEvaluation>
			<ManagerEvaluation :itemId="$route.params.id" ></ManagerEvaluation>
			<ProjectBtnPop :itemId="$route.params.id"></ProjectBtnPop>
		</div>
	</div>
</template>

<script>
	let ProgressCharts = () =>
		import('./Progress.vue')
	let ViewAllotment = () =>
		import('./View_Allotment.vue')
	let DemandChange = () =>
		import('./Demand_Change.vue')
	let CustomEvaluation = () =>
		import('./Custom_Evaluation.vue')
	let ProjectBtnPop = () =>
		import('./ProjectBtnPop.vue')
	let ManagerEvaluation = () =>
		import('./Manager_Evaluation.vue')
    let HerGhostScroll = () =>
        import('@/components/scroll/HerGhostScroll.vue')
	import pjdetailsMinxins from '@/mixin/pjdetails.js'

	export default {
		mixins: [pjdetailsMinxins],
		name: 'UnFinishedProjectDetails_Left',
		data() {
			return {
				viewAllotmentData: []
			}
		},
		components: {
            'herghost-scroll' : HerGhostScroll,
			ProgressCharts,
			ViewAllotment,
			DemandChange,
			CustomEvaluation,
			ProjectBtnPop,
			ManagerEvaluation
		},
		mounted: function() {
			this.obtainChartInfoByAuthType()
		},
		methods: {
			obtainChartInfoByAuthType() {
				let authType = this.$store.getters.unFinishAuthType
				let url = this.obtainRequestUrl(authType)
				this.$http.post(url, {
					id: this.$route.params.id.split('-')[0]
				}, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.result
					if (Object.isEmpty(result)) {
						result = {}
					}
					if (Array.isArray(result.fatherDepartList)){
						this.viewAllotmentData = result.fatherDepartList
					} else {
						this.viewAllotmentData = []
					}
					console.log(result,result.fatherDepartList)
					this.$store.commit('setPjDetailsLeftData', result)
				}).catch((err) => {
					
				})
			},
			obtainRequestUrl(authType) {
				switch(authType) {
					case 'upuc':
						return "/api/item/itemDetailByUc"
					case 'updepart':
						return "/api/item/itemDetailByDepartIds"
					case 'upall':
						return "/api/item/itemDetailByAll"
					case 'upmgr':
						return "/api/item/itemDetailByMgr"
					case 'upba':
						return "/api/item/itemDetailByBa"
					default:
						return void 0
				}
			}
		}
	}
</script>

<style scoped>
	.viewAllotment{
		background: #fff;
		padding-bottom: 14px;
	}
	.layout .line {
		margin-bottom: 14px;
		position: relative;
		margin-left: -20px;
		margin-right: -20px;
		height: 1px;
		opacity: 0.26;
		background: #D5D5D5;
		border: none;
	}
	.layout {
		width: 350px;
		position: relative;
	}
	.layout .title{
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		padding-left: 20px;
	}
	.mlr {
		margin-left: 5px;
		margin-right: 5px;
		width: auto;
	}
	
	.mt14 {
		margin-top: 14px;
	}
	
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0
	}
</style>
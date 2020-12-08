<!--项目管理-未完结项目详情页-->
<template>
	<section class="wrap" v-if="pageLoadFlag">
		<div class="backToPre" @click="backToPre">
			<i class="el-icon-arrow-left"></i>
			<span class="return">返回</span>
		</div>
		<div class="layout-container" ref="pane-o">
			<div class="layout-in" ref="pane-i">
				<section class="layout">
					<div class="unfinish-project-steps">
						<el-steps :space="100" :active="stepsActive" finish-status="success" align-center>
							<el-step title="创建项目"></el-step>
							<el-step title="PMO审核"></el-step>
							<el-step title="项目立项"></el-step>
							<el-step title="PMO审核"></el-step>
							<el-step title="分配部门"></el-step>
						</el-steps>
					</div>
					<div class="form-wrap page-bg">
						<PjManagementUnFinishedStepsOne v-if="active==0" :stepsData.sync="stepsData"></PjManagementUnFinishedStepsOne>
						<PjManagementUnFinishedStepsTwo v-if="active==1" :stepsData.sync="stepsData"></PjManagementUnFinishedStepsTwo>
						<PjManagementUnFinishedStepsThree v-if="active==2" :stepsData.sync="stepsData"></PjManagementUnFinishedStepsThree>
						<PjManagementUnFinishedStepsFour v-if="active==4" :stepsData.sync="stepsData"></PjManagementUnFinishedStepsFour>
						<PjManagementUnFinishedStepsFive v-if="active==6" :stepsData.sync="stepsData"></PjManagementUnFinishedStepsFive>
					</div>
				</section>
			</div>
		</div>
	</section>

</template>

<script>
	let PjManagementUnFinishedStepsOne = () =>
		import('@/components/PjManagement_UnFinished_Steps/PjManagement_UnFinished_Steps01.vue')

	let PjManagementUnFinishedStepsTwo = () =>
		import('@/components/PjManagement_UnFinished_Steps/PjManagement_UnFinished_Steps02.vue')

	let PjManagementUnFinishedStepsThree = () =>
		import('@/components/PjManagement_UnFinished_Steps/PjManagement_UnFinished_Steps03.vue')

	let PjManagementUnFinishedStepsFour = () =>
		import('@/components/PjManagement_UnFinished_Steps/PjManagement_UnFinished_Steps04.vue')

	let PjManagementUnFinishedStepsFive = () =>
		import('@/components/PjManagement_UnFinished_Steps/PjManagement_UnFinished_Steps05.vue')
	let routeFrom = null
	export default {
		beforeRouteEnter (to, from, next) {
			routeFrom = from
			next()
	  	},
		data() {
			return {
				stepsData: {

				},
				state: this.$store,
				active: -1,
				stepsActive: 0,
				resizefn: null,
				pageLoadFlag: false
			};
		},
		created() {
            if (routeFrom.path == '/') {
                this.pageLoadFlag = false
                this.$router.go(-2)
            }   else {
                this.pageLoadFlag = true
			}
		},
		mounted() {
		    if (this.pageLoadFlag) {
		        this.$nextTick(()=>{
                    this.computedResize()
                    this.hideAudit()
                    this.setStatus()
                    this.dealActiveStatus()
				})
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizefn)
		},
		watch: {

		},
		components: {
			PjManagementUnFinishedStepsOne,
			PjManagementUnFinishedStepsTwo,
			PjManagementUnFinishedStepsThree,
			PjManagementUnFinishedStepsFour,
			PjManagementUnFinishedStepsFive
		},
		methods: {
			computedResize() {
				this.paneScrollHandler()
				this.resizefn = () => {
					this.paneScrollHandler()
				}
				window.addEventListener('resize', this.resizefn, true);
			},
			paneScrollHandler() {
				let paneWidth = this.$el ? this.$el.clientWidth : 0
				this.$refs['pane-o'] ? this.$refs['pane-o'].style.width = paneWidth + 'px' : void 0
				this.$refs['pane-i'] ? this.$refs['pane-i'].style.width = (paneWidth + 20) + 'px' : void 0
			},
			setStatus() {
				if (sessionStorage.getItem(Config.CreateStep.NAME) != Config.CreateStep.ACTION_TYPE.CREATE_PROJECT_INTO) {
					this.stepsData = this.state.getters.pjManageUnFinished.itemPassingStatus
				}
				this.judgeAddEdit()
			},
			judgeAddEdit() {
				if(!!(this.stepsData.item)){
					var status = this.stepsData.item.status
					var is_pass = this.stepsData.item.is_pass
					if(status == 0 && is_pass == 0) {
						this.active = 0
					} else if(status == 2 && is_pass == 0) {
						this.active = 2
					} else {
						status = !!(status)?status:0
						this.active = status
					}
				}else{
					this.active = 0
				}
				
			},
			hideAudit() {
				this.$store.commit('hideProjectAudit');
			},
			dealActiveStatus() {
				switch(this.active) {
					case 0:
						return this.stepsActive = 0;
					case 1:
						return this.stepsActive = 1;
					case 2:
						return this.stepsActive = 2;
					case 4:
						return this.stepsActive = 3;
					case 6:
						return this.stepsActive = 4;
				}
			},
			backToPre() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.layout-o {}
	
	.backToPre {
		font-size: 16px;
		height: 60px;
		line-height: 60px;
		color: #333;
		border-bottom: 1px solid #F1F2F3;
		cursor: pointer;
	}
	
	.backToPre i {
		margin-right: 5px;
	}
	
	.form-wrap {
		margin: 24px auto 24px auto;
		min-height: 633px;
	}
	
	.unfinish-project-steps {
		text-align: center;
		padding-left: 20px;
	}
	
	.wrap {
		height: 100%;
		background: #f8f9fb;
		padding: 0 28px;
		overflow: hidden;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.backToPre {
		font-size: 18px;
		height: 60px;
		line-height: 60px;
		color: #000;
		border-bottom: 1px solid #F1F2F3;
		cursor: pointer;
	}
	
	.layout-container {
		overflow-x: hidden;
		height: 100%;
		margin-top: -41px;
		padding-top: 61px;
		margin-left: -56px;
		padding-left: 56px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.layout-in {
		overflow-x: hidden;
		overflow-y: scroll;
		height: 100%;
	}
	
	.mb24 {
		margin-bottom: 24px;
	}
	
	.layout {
		padding: 20px;
		height: 100%;
		padding-right: 78px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	.return{
		font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
</style>
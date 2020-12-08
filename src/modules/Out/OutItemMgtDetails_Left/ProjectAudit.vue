<!--外围项目管理详情-左侧审核按钮组-->
<template>
	<div>
		<div class="btn-area">
			<el-button class="btn sure" type="primary" @click="sureClick">审核通过</el-button>
			<el-button class="btn cancel" @click="cancelClick">驳回</el-button>
		</div>
        <alert-dialog :visible.sync="auditVisible" @submit="auditSure" @cancel="auditCancel" :text="'是否确认审核通过？'" :title="'提示'"></alert-dialog>
		<ProjectAuditRejectDialog :url="auditUrl" :data="auditSubmitDataBK" :visible.sync="projectAuditRejectDialogFlag"></ProjectAuditRejectDialog>
	</div>
</template>

<script>
	let ProjectAuditRejectDialog = () =>
		import('./ProjectAudit_Reject_Dialog.vue')
	let AlertDialog = () =>
		import('@/components/dialog/AlertDialog.vue')
		
	export default {
		name: 'ProjectAudit',
		data() {
			return {
				state: this.$store.state,
				auditVisible: false,
				projectAuditRejectDialogFlag: false,
				auditUrl: '',
				auditSubmitDataBK: {
					ucId: this.$store.getters.loginInfo.uc.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					taskId: this.$store.getters.outItemAudit.taskId,
					isPass:"",
					ioApplyId: this.$store.getters.outItemAudit.id,
				},
				auditSubmitData: {}
			};
		},
		watch: {
		},
		components: {
			ProjectAuditRejectDialog,
			AlertDialog
		},
		mounted: function() {
			this.auditSubmitData = Object.deepClone(this.auditSubmitDataBK)
			this.obtainAuditUrl()
		},
		methods: {
			obtainAuditUrl() {
				switch (+this.$route.params.id.split("-")[1]){
					case 1:
						this.auditUrl = '/api/ioApply/directorAuth'
						this.$set(this.auditSubmitData, 'itemAssess', this.$store.getters.outEvInfoItem)
						break;
					case 2:
						this.auditUrl = '/api/ioApply/purchaseAuth'
						break;
					case 3:
						this.auditUrl = '/api/ioApply/directorAuth'
						break;
					case 4:
						this.auditUrl = '/api/ioApply/doInvite'
						break;
					case 5:
						this.auditUrl = '/api/ioApply/directorAuth'
						break;
					case 6:
						this.auditUrl = '/api/ioApply/deputyManagerAuth'
						break;
					case 7:
						this.auditUrl = '/api/ioApply/managerAuth'
						break;
					case 8:
						this.auditUrl = '/api/ioApply/vpAuth'
						break;
					case 9:
						this.auditUrl = '/api/ioApply/payPlan'
						break;
					default:
						this.auditUrl = '/api/ioApply/directorAuth'
						break;
				}
			},
			sureClick() {
				this.auditVisible = true
			},
			auditSure() {
				this.auditSubmitData.isPass = 'Y'
				this.obtainAuditUrl()
				this.$http.post(this.auditUrl, JSON.stringify(this.auditSubmitData), {
                    emulateJSON: true
                }).then((res) => {
                    let data = res.data;
                    if(data.success) {
                    	this.$message({
	                        message: "审核通过",
	                        customClass: 'success'
	                    })
                    	this.auditVisible = false
                    	this.$router.go(-1)
                    }else{
	                	this.$message({
	                        message: data.message,
	                        customClass: 'error'
	                    })
                    }
                }).catch((err) => {
                });
			},
			auditCancel() {
				this.auditVisible = false
			},
			cancelClick() {
				this.projectAuditRejectDialogFlag = true
			}
		}
	}
</script>

<style>
	.btn-area {
		text-align: center;
		margin-bottom:20px;
	}
	
	.btn {
		width: 100px;
		height: 30px;
		padding: 0;
		font-size: 14px;
		border-radius: 2px;
		border: none;
	}
	
	.btn.sure {
		color: #FFFFFF;
		background: #295DCF;
	}
	
	.btn.cancel {
		color: #666666;
		background: #F2F2F2;
	}
	
    
</style>
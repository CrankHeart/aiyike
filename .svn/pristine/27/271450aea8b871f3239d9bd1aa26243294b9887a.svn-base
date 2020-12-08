<template>
	<div class="layout">
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="auditTermDialog">
			<p class="content">项目经理 {{item.author}} {{item.create_time|fmtDate}}提交了{{applyName}}申请。</p>
			<p class="content">原因：{{item.reason}}</p>
			<span slot="footer" class="dialog-footer">
	    	<el-button class="sure btn" type="primary" @click="sure()">审核通过</el-button>
		    <el-button class="cancel btn" @click="cancel">驳回</el-button>
	    </span>
		</el-dialog>
		<AuditRejectDialog :visible.sync="auditRejectDialogFlag" :type="type" :item="item"></AuditRejectDialog>
	</div>
</template>

<script>
	let AuditRejectDialog = () =>
		import('./Audit_Reject_Dialog.vue')
	export default {
		name: 'Audit_Term_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			titleType: {
				type: String,
				default: ''
			}
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				if (val) {
					this.$nextTick(()=>{
						this.dialogInit()
					})
				}
				this.$emit('update:visible', val)
			},
			'state.doTaskItem': {
				deep: true,
				handler(val) {
					this.item = val
				}
			},
			titleType(val) {
				this.dialogInit()
			}
		},
		data() {
			return {
				type: '',
				applyName: '',
				dialogTitle: '',
				dialogVisible: false,
				reason: '',
				auditRejectDialogFlag: false,
				item: {},
				state: this.$store.state
			};
		},
		components: {
			AuditRejectDialog
		},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			showSelf() {
				this.dialogVisible = true
			},
			hideSelf() {
				this.dialogVisible = false
			},
			dialogInit() {
				this.item = this.$store.getters.doTaskItem
				this.type = this.$route.params.id.split('-')[2] || this.titleType
				this.obtainTitleByType(this.type)
			},
			obtainTitleByType(type) {
				switch (type){
					case 'ItemFinish':
						this.applyName='结项'
						this.dialogTitle = '审核结项'
						break
					case 'ItemHangUp':
						this.applyName='挂起'
						this.dialogTitle = '审核挂起'
						break
					case 'ItemStop':
						this.applyName='中止'
						this.dialogTitle = '审核中止'
						break
					case 'ItemMoneyAuth':
						break
					case 'ItemApplyOut':
						break
					case 'ItemRequire':
						break
					default:
						break
				}
			},
			sure() {
				if('ItemHangUp'==this.type){
					let submitData={
						itemId:this.item.item_id,
						isPass:"Y",
						taskId:this.item.taskId,
						reason:'同意'
					}
					this.$http.post('/api/itemOpera/hangUpAuth',submitData, {emulateJSON: true
					}).then((res) => {
						if (res.data.success) {
							this.dialogVisible = false
							this.$message({
					          	message: res.data.message,
					          	customClass: 'success'
					        })
						} else {
							this.$message({
					          	message: res.data.message,
					          	type: 'info'
					        })
						}
					}).catch((err) => {
						
					})
				}else if('ItemStop'==this.type){
					let submitData={
						itemId:this.item.item_id,
						isPass:"Y",
						taskId:this.item.taskId,
						reason:'同意'
					}
					this.$http.post('/api/itemOpera/ItemStopAuth',submitData, {emulateJSON: true
					}).then((res) => {
						if (res.data.success) {
							this.dialogVisible = false
							this.$message({
					          	message: res.data.message,
					          	customClass: 'success'
					        })
						} else {
							this.$message({
					          	message: res.data.message,
					          	type: 'info'
					        })
						}
					}).catch((err) => {
						
					})
				}else if('ItemFinish'==this.type){
					let submitData={
						itemId:this.item.item_id,
						isPass:"Y",
						taskId:this.item.taskId,
						reason:'同意'
					}
					this.$http.post('/api/itemOpera/ItemFinishAuth',submitData, {emulateJSON: true
					}).then((res) => {
						if (res.data.success) {
							this.dialogVisible = false
							this.$message({
					          	message: res.data.message,
					          	customClass: 'success'
					        })
						} else {
							this.$message({
					          	message: res.data.message,
					          	type: 'info'
					        })
						}
					}).catch((err) => {
						
					})
				}
			},
			cancel() {
				this.dialogVisible = false
				this.auditRejectDialogFlag = true
			}
		}
	}
</script>

<style scoped>
	.content {
		text-align: center;
		font-size: 12px;
		color: #000000;
	}
	
	.btn {
		width: 90px;
		height: 30px;
		padding: 0;
		border-radius: 2px;
	}
	
	.sure {
		background: #295DCF;
	}
	
	.cancel {
		background: #F2F2F2;
		border: none;
	}
</style>
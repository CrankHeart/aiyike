<template>
	<div class="layout">
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="auditTermDialog">
			<!--<p class="content">项目经理 {{item.author}} {{item.create_time|fmtDate}}提交了{{applyName}}申请。</p>-->
			<!-- <p class="content">项目总进度更新 &nbsp;{{selfParseFloat(totalProgressText())}}%,当前项目总进度为&nbsp;{{selfParseFloat(itemProgressText())}}% 。</p> -->
			<p class="content">项目总进度更新到{{selfParseFloat(totalProgressText())}}%。</p>
			<span slot="footer" class="dialog-footer">
	    	<el-button class="sure btn" type="primary" @click="sure()">审核通过</el-button>
		    <el-button class="cancel btn" @click="cancel">驳回</el-button>
	    </span>
		</el-dialog>
		<ProgressReviewAuditReject :visible.sync="auditRejectDialogFlag" :type="type" :item="item"></ProgressReviewAuditReject>
	</div>
</template>

<script>
	let ProgressReviewAuditReject = () =>
		import('./Progress_Review_Audit_Reject.vue')
	export default {
		name: 'Progress_Review_Audit',
		props: {
			visible: {
				type: Boolean,
				default: false
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
			}
		},
		data() {
			return {
				applyName: '',
				dialogTitle: '',
				dialogVisible: false,
				reason: '',
				auditRejectDialogFlag: false,
				item: {},
				state: this.$store.state,
				type: this.$route.params.id.split('-')[2]
			};
		},
		components: {
			ProgressReviewAuditReject
		},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
				selfParseFloat(num){
				let _numStr = `${parseFloat(num).toFixed(1)}`
				let _numSp = _numStr.split('.')
				let ret
				if (_numSp.length >= 2 && _numSp[1] == '0') {
					ret = _numSp[0]
				} else {
					ret = _numStr
				}
				return ret
			},
			totalProgressText() {
				return parseFloat((this.item.hours+this.item.progress) * 100 / this.item.totalHours).toFixed(0)
			},
			itemProgressText() {
				return parseFloat(this.item.progress * 100 / this.item.totalHours).toFixed(0)
			},
			dialogInit() {
				this.$set(this.$data, 'item', Object.deepClone(this.$store.getters.doTaskItem))
				this.obtainTitleByType(this.type)
			},
			obtainTitleByType(type) {
				switch (type){
					case 'ItemProgressReview':
						this.applyName='进度'
						this.dialogTitle = '进度会审'
						break
					default:
						break
				}
			},
			sure() {
				if('ItemProgressReview'==this.type){
					let submitData = {
						itemId: this.item.item_id,
						isPass: "Y",
						taskId: this.item.taskId,
						reason: '同意',
						ucId: JSON.parse(Cache.local(Config.Login)).uc.id,
						tranId: this.item.id
					}
					this.$http.post('/api/progress/reviewAuth',JSON.stringify(submitData), {emulateJSON: true
					}).then((res) => {
						if (res.data.success) {
							this.$message({
					          	message: '审核成功',
					          	customClass: 'success'
					        })
							this.dialogVisible = false
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
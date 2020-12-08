<!--进度会审-->
<template>
	<div class="check_progress">
		<el-dialog title="进度会审" :visible.sync="dialogVisible" class="dialog442">
			<el-form :model="progressform">
				<div class="partmentprogress" v-for="idbChange in progressform.ipRordList">
					<div>
						<span class="partment">事业部&nbsp;{{idbChange.label}}&nbsp;更新进度到</span><span class="progress">&nbsp;{{idbChange.hour}}%</span>
					</div>
					<div>
						<span class="partment">备注：</span><span class="progress">{{idbChange.description}}</span>
					</div>
				</div>
				<div v-if="progressform.isPass == 'N'">
					<el-input type="textarea" :rows="3" v-model="progressform.reson" placeholder="请输入驳回原因" auto-complete="off"></el-input>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sure" class='submitbtn'>提交</el-button>
				<el-button v-if="progressform.isPass == 'Y'" @click="progressform.isPass = 'N'" class="cancelbtn">驳回</el-button>
				<el-button v-if="progressform.isPass == 'N'" @click="dialogVisible = false" class="cancelbtn">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'Progress_View_Audit',
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
				if(val) {
					this.$nextTick(() => {
						this.init()
					})
				}
				this.$emit('update:visible', val)
			},
			'state.doTaskItem': {
				deep: true,
				handler(val) {
					this.item = val
					this.progressform.ipRordList = val.IpRordList
				}
			}
		},
		data() {
			return {
				state: this.$store.state,
				item: {},
				dialogVisible: false,
				progressform: {
					ipRordList: [],
					isPass: 'Y',
					reson: '',
					status: '',
					taskId: '',
					itemId: parseInt(this.$route.params.id.split('-')[0]),
					idbAuthId: ''
				}

			}
		},
		mounted() {
			this.dialogVisible = this.visible
		},
		methods: {
			init() {
				this.item = this.$store.getters.doTaskItem
				this.progressform.ipRordList = this.$store.getters.doTaskItem.IpRordList
			},
			//			obtainInitData() {
			//				this.$http.post('/api/distribute/toSelfTask', {
			//						taskId: this.item.taskId,
			//						buzId: this.itemId
			//					}, {
			//						emulateJSON: true
			//					})
			//					.then((res) => {
			//						let data = res.data.result;
			//						if(res.data.success) {
			//							this.progressform.idbChangeList = data.idbChangeList	
			//						}
			//					}).catch((err) => {
			//						
			//					})
			//			},
			sure() {
				this.progressform.status = this.item.status
				this.progressform.taskId = this.item.taskId
				this.progressform.idbAuthId = this.item.buzId
				this.$http.post('/api/progress/reviewAuth', JSON.stringify(this.progressform), {
						emulateJSON: true
					})
					.then((res) => {
						let data = res.data.result;
						if(res.data.success) {
							this.$message({
								message: '提交成功',
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

			},
			cancel() {
				this.dialogVisible = false
			}
		}
	};
</script>

<style scoped>
	.check_progress .partmentprogress {
		padding-top: 15px;
		margin-bottom: 15px;
		border-top: 1px solid #F1F1F1;
	}
	
	.check_progress .partmentprogress:first-of-type {
		border-top: none;
		padding-bottom: 0;
	}
	
	.check_progress .partmentprogress .partment {
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.check_progress .partmentprogress .progress {
		font-size: 12px;
		color: #295DCF;
		letter-spacing: 0;
		line-height: 17px;
	}
	
	.check_progress .partmentprogress .note {
		font-size: 12px;
		color: #999;
		letter-spacing: 0;
		margin-top: 6px;
	}
	
	.check_progress .partmentprogress .auditnot {
		margin-top: 12px;
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
	}
</style>
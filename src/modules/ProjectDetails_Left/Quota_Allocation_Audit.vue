<!--项目管理-项目详情页-审核项目进度模块-->
<template>
	<div class="check_progress">
		<el-dialog title="项目额度审核" :visible.sync="dialogVisible" class="dialog442" :close-on-click-modal="false">
			<el-form :model="progressform" ref="progressform">
				<div class="partmentprogress" v-for="idbChange in progressform.idbChangeList">
					<div>
						<span class="partment">事业部：</span><span class="progress">{{idbChange.departName}}</span>
					</div>
					<div>
						<span class="partment">额度：</span><span class="progress">{{idbChange.amount}}</span><span>&nbsp;元</span>
					</div>
					<div>
						<span class="partment">工时：</span><span class="progress">{{idbChange.hour}}</span><span>&nbsp;h</span>
					</div>
				</div>
				<div v-if="progressform.isPass == 'N'">
					<el-form-item
							prop="reson"
							:rules="[
		                  { required: true, message: '原因不能为空'}
		                ]">
						<el-input type="textarea" :rows="3" v-model="progressform.reson" placeholder="请输入驳回原因" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button v-if="progressform.isPass == 'Y'" type="primary" @click="sure" class="submitbtn">审核通过</el-button>
				<el-button v-if="progressform.isPass == 'N'" type="primary" @click="sure" class="submitbtn">确定</el-button>
				<el-button v-if="progressform.isPass == 'Y'" @click="progressform.isPass = 'N'" class="cancelbtn">驳回</el-button>
				<el-button v-if="progressform.isPass == 'N'" @click="progressform.isPass = 'Y'" class="cancelbtn">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'Quota_Allocation_Audit',
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
						this.init()
					})
				}
				this.$emit('update:visible', val)
			},
			'state.doTaskItem': {
				deep: true,
				handler(val) {
					this.item = val
					this.obtainInitData()
				}
			}
		},
		data() {
			return {
				state: this.$store.state,
				itemId: parseInt(this.$route.params.id.split('-')[0]),
				item: {},
				buzId:'',
				dialogVisible: false,
				progressform: {
					idbChangeList: [],
					isPass: 'Y',
					reson: '',
					status:'',
					taskId:'',
					idbAuthId:''
				}

			}
		},
		mounted() {
			this.dialogVisible = this.visible
		},
		methods: {
			init() {
				this.item = this.$store.getters.doTaskItem
				this.buzId=this.$store.getters.doTaskItem.buzId
				this.obtainInitData()
			},
			obtainInitData() {
				this.$http.post('/api/distribute/toSelfTask', {
						taskId: this.item.taskId,
						itemId: this.itemId,
						buzId:this.buzId
					}, {
						emulateJSON: true
					})
					.then((res) => {
						let data = res.data.result;
						if(res.data.success) {
							this.progressform.idbChangeList = data.idbChangeList	
						}
					}).catch((err) => {
						
					})
			},
			sure() {
				this.$refs['progressform'].validate((valid) => {
                    if (valid) {
                    	this.progressform.status=this.item.status
						this.progressform.taskId=this.item.taskId
						this.progressform.idbAuthId=this.item.buzId
						this.$http.post('/api/distribute/auth', this.progressform, {
								emulateJSON: false
							})
							.then((res) => {
								let data = res.data.result;
								if(res.data.success) {
									this.$message({
										message: '项目额度操作成功',
										customClass: 'success'
									})
									this.dialogVisible = false
								} else {
									this.$message({
										message: res.data.message,
										customClass: 'error'
									})
								}
							}).catch((err) => {
								
							})
                    } else {
                        return false
                    }
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
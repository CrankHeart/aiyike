<!--收款记录---更新项目进度  弹窗 ---模块-->
<template>
	<div class="updated_progress">
		<el-dialog title="更新项目进度" :visible.sync="dialogVisible" @close="dialogClose">
			<el-form :model="form" ref="form">
				<div class="progress-wrap" :key="index" v-for="(item, index) in remoteDataSource">
					<div class="bus-name">{{item.outBus.name | nullformat}}</div>
					<OutProgress :data="item" v-model="proform[index].current_num"></OutProgress>
				</div>
				<!--备注-->
				<div class="remark">
					<el-form-item :rules="{required: true, message: '请输入备注信息', trigger: 'blur,change'}" label="备注" class="el-nox nopadding-label" prop="remark">
						<el-input type="textarea" :rows="6" placeholder="填写备注" v-model="form.remark"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureDec">确 定</el-button>
				<el-button @click="cancelReject('form')">取 消</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import $ from 'jquery'
	let OutProgress = () => import("@/components/progress/OutProgress.vue")
	export default {
		name: 'Update_Out_Progress',
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		components: {
			OutProgress
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
				}
			}
		},
		data() {
			return {
				state: this.$store.state,
				item: {},
				dialogVisible: false,
				proform: [],
				form: {
					remark: ''
				},
				remoteDataSource: []
			}
		},
		mounted() {
			this.dialogVisible = this.visible
		},
		methods: {
			cancelReject(formName) {
				this.$refs[formName].resetFields();
				this.$emit('update:visible', false)
			},
			dialogClose() {
			},
			sureDec() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.sure()
					} else {
						return false
					}
				})
			},
			sure() {
				let body = {
					description: this.form.remark,
					recordJa: []
				}
				for (let i in this.remoteDataSource) {
					let progress = Math.round(this.proform[i].current_num.toFixed(2) / 100 * this.remoteDataSource[i].item.totalHours)
					if(Object.isEmpty(progress)) {
						progress = 0
					}
					body.recordJa.push({
						itemId: +this.$route.params.id.split('-')[0],
						ucId: JSON.parse(Cache.local(Config.Login)).uc.id,
						progress: progress,
						busId: this.remoteDataSource[i].outBus.id,
						applyId: this.remoteDataSource[i].itemAssess.ioApplyId
					})
					if(progress < 1) {
						this.$message({
							customClass: 'error',
							message: `${this.remoteDataSource[i].outBus.name}更新的进度条不能小于1%`
						})
						return void 0
					}
				}
				this.$http.post('/api/ioRecord/saveItemProgressByItemOut', body, {
						emulateJSON: false
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
								customClass: 'error'
							})
						}
						this.$emit("sure")
					}).catch((err) => {

					})
			},
			obtainRemoteDataSource() {
				this.$http.post('/api/ioRecord/detailItemProgressByItemOut', {
						itemId: +this.$route.params.id.split('-')[0]
//						ucId: JSON.parse(Cache.local(Config.Login)).uc.id
					}, {
						emulateJSON: true
					})
					.then((res) => {
						let data = res.data.result
						for (let i in data) {
							this.proform.push({
								current_num: 0
							})
						}
						this.remoteDataSource = data
					}).catch((err) => {
					})
			},
			init: function() {
				this.item = this.$store.getters.doTaskItem
				this.obtainRemoteDataSource()
			}
		}

	}
</script>

<style scoped>
	.bus-name {
		margin-bottom: 10px;
	}
	.progress-wrap {
		position: relative;
		margin-bottom: 26px;
	}
	.nox:before {
		display: none;
	}
	
	.updated_progress .progress {
		height: 6px;
		background-color: #DADADA;
		position: relative;
		border-radius: 100px;
		width: 400px;
	}
	
	.updated_progress .circle {
		position: absolute;
		width: 12px;
		height: 12px;
		border: 1px solid #6495FF;
		border-radius: 50%;
		top: -4px;
		background: #FFFFFF;
		cursor: pointer;
		z-index: 1;
	}
	
	.updated_progress .percent {
		position: absolute;
		height: 6px;
		top: 0px;
		background-color: #6495FF;
		border-radius: 100px 0 0 100px;
	}
	
	.updated_progress .show {
		position: absolute;
		top: 15px;
		left: 6px;
		min-width: 48px;
		visibility: hidden;
		text-align: center;
		transform: translateX(-50%);
	}
	
	.updated_progress .circle:hover .show {
		/*visibility: visible;*/
	}
	
	.updated_progress .shownum {
		position: relative;
		background-color: rgba(0, 0, 0, .9);
		box-shadow: 0 7px 23px 0 rgba(0, 0, 0, 0.04);
		border-radius: 2px;
		color: #fff;
		padding: 1px 5px 2px 5px;
		line-height: 20px;
		moz-user-select: -moz-none;
		-moz-user-select: none;
		-o-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
		white-space: nowrap;
	}
	
	.updated_progress .shownum .o {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
	}
	
	.updated_progress .shownum span {
		position: relative;
		z-index: 1;
	}
	
	.updated_progress .triangle_up {
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid rgba(0, 0, 0, .9);
		margin: 0 auto;
	}
	
	.updated_progress .lastshow {
		position: absolute;
		top: -2px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #6495FF;
	}
	
	.updated_progress .lastshow:hover .show {
		visibility: visible;
	}
	
	.updated_progress .remark {
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
		margin-top: 30px;
	}
	
	.updated_progress .beizhu {
		margin-bottom: 9px;
		moz-user-select: -moz-none;
		-moz-user-select: none;
		-o-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
	}
</style>
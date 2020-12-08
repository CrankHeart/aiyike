<template>
	<div class="layout">
		<el-dialog title="需求变更" :visible.sync="dialogVisible" class="dialog442 requirementChangeDialog" @close="closeDialog('form')">
			<el-form ref="form" :rules="rules" label-position="left" :model="form" label-width="72px" class="form-wrap">
				<el-form-item label="主题：" class="w150" prop="theme">
					<el-input v-model="form.theme" placeholder="输入变更需求的主题" :maxlength="15" style="width: 310px"></el-input>
				</el-form-item>
				<el-form-item label="变更时间：">
					<el-date-picker :disabled="change_date_flag" v-model="form.startTime" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="补充金额：" class="mb10 w150" prop="money">
					<el-input v-model="form.money" placeholder="输入变更需求的金额" ></el-input> <span class="yuanw">元</span>
				</el-form-item>
				<el-form-item label="评估工时：" class="mb10 w150" prop="hour">
					<el-input v-model="form.hour" placeholder="输入变更需求的工时"></el-input> <span class="yuanw">h</span>
				</el-form-item>
				<el-form-item label="内容：" class="nopadding-label" prop="description">
					<el-input type="textarea" :rows="3" v-model="form.description" placeholder="输入项目简介"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sure('form')">提交</el-button>
			    <el-button class="cancelbtn" @click="cancel('form')">取消</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Requirement_Change_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			status: {}
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				if(val) {
					this.$nextTick(() => {
						this.obtainFormByStatus(this.$store.getters.doTaskItem)
					})
				}
				this.$emit('update:visible', val)
			},
			'form.money' (val) {
				if(`${val}`.length) {
					this.form.isAmount = 'Y'
				} else {
					this.form.isAmount = 'N'
				}
			},
			'state.doTaskItem': {
				deep: true,
				handler(val) {
					this.obtainFormByStatus(val)
				}
			}
		},
		data() {
			return {
				state: this.$store.state,
				item: {},
				dialogVisible: false,
				reason: '',
				rules: {
					theme: [{
						required: true,
						message: '需求变更主题必填',
						trigger: 'change,blur'
					   }],
					money: [{
						pattern: /^((([1-9]+[0-9]*)+(\.\d{1,2})?)|(0{1}(\.\d{1,2})?))$/,
						message: '补充金额不合法',
						trigger: 'change,blur'
					}],
					hour: [
						{
							required: true,
							pattern: /^[1-9]+\d*$/,
							message: '工时只能输入数字且要大于0',
							trigger: 'change,blur'
						}
					],
					description: [{
						required: true,
						message: '请输入需求变更内容',
						trigger: 'blur'
					}]
				},
				form: {
					itemId: +this.$route.params.id.split('-')[0],
					startTime: +new Date,
					theme: '',
					money: '',
					hour: '',
					isAmount: 'N',
					description: ''
				},
				change_date_flag: true
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			obtainFormByStatus(obj) {
				if(parseInt(this.status) == 2) {
					this.form.itemId = obj.item_id
					this.form.startTime = new Date(obj.start_time)
					this.form.theme = obj.theme
					this.form.money = +obj.money
					this.form.hour = +obj.hour
					this.form.description = obj.description
					this.form.isEdit = 'edit'
					this.form.reapply = 'Y'
					this.form.itemRequireId = obj.id
					this.form.taskId = obj.taskId
				} else {
					delete this.form.isEdit
					delete this.form.reapply
					delete this.form.itemRequireId
					delete this.form.taskId
				}
			},
			sure(form) {
				this.$refs[form].validate((valid) => {
					if(valid) {
						this.$http.post('/api/itemRequire/saveItemRequire', this.form, {
							emulateJSON: false
						}).then((res) => {
							if(res.data.success) {
								this.$message({
									message: '需求变更成功',
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
					} else {
						;
						return false;
					}
				});

			},
			cancel(formName) {
				 this.$refs[formName].resetFields();
				 this.dialogVisible = false
				
			},closeDialog(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.el-form-item {
		margin-bottom: 10px;
	}
	
	.mb10 {
		margin-bottom: 10px;
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
	.yuanw{
		font-size: 12px;
		color: #666;
	}
</style>
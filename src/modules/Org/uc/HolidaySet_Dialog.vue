<template>
	<el-dialog class="dialog442" title="假期设置" :visible.sync="dialogVisible" @close="closeDialog('form')" close-on-press-escape :modal="true">
		<el-form :model="form" label-width="70px" ref="form" :rules='rules'>
			<el-form-item label="起止日期：" class="clearfix" required>
				<div class="fl">
					<el-form-item prop="st" style="margin-bottom: 0">
						<el-date-picker :editable="false" :picker-options="pickerBeginDateBefore" type="date" placeholder="选择日期" v-model="form.st" style="width: 119px;"></el-date-picker>
					</el-form-item>
				</div>
				<div class="line fl" style="width: 20px; text-align: center">-</div>
				<div class="fl">
					<el-form-item prop="et" style="margin-bottom: 0">
						<el-date-picker :editable="false" :picker-options="pickerBeginDateAfter" type="date" placeholder="选择日期" v-model="form.et" style="width: 119px;"></el-date-picker>
					</el-form-item>
				</div>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="sure('form')" class="submitbtn">保存</el-button>
			<el-button @click="cancel('form')" class="cancelbtn">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'HolidaySet_Dialog',
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
				this.$emit('update:visible', val)
			}
		},
		created() {
			vueIns = this
		},
		data() {
			return {
				//搜索结束时间需大于等于开始时间
                pickerBeginDateBefore: {
		            disabledDate(time) { 
	              		return vueIns.form.et && vueIns.form.et.getTime && (time.getTime() > vueIns.form.et.getTime())
		            }
			    },
          		pickerBeginDateAfter: {
		            disabledDate(time) {  
             	 		return vueIns.form.st && vueIns.form.st.getTime && (time.getTime() < vueIns.form.st.getTime())
		            }  
		        },
				dialogVisible: false,
				form: {
					st: '',
					et: '',
					startTime: '',
					endTime: ''
				},rules:{
					st:[{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					et:[{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}]
				}
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			sure(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.form.startTime = (!!this.form.st) ? new Date(this.form.st).format("yyyy-MM-dd hh:mm:ss") : '';
						this.form.endTime = (!!this.form.et) ? new Date(this.form.et).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
						this.$http.post("/api/holiday/add", this.form, {
								emulateJSON: true
							})
							.then((res) => {
								;
								var data = res.data;
								if(data.success) {
									this.$message({
										customClass: 'success',
										message: '添加成功'
									});
								} else {
									this.$message({
										customClass: 'error',
										message: '添加失败'
									});
								}
							    this.dialogVisible = false;			    
								this.$parent.reload && this.$parent.reload();
							}).catch((err) => {
								this.$message({
									customClass: 'error',
									message: '添加error'
								});
							})
					} else {
						return false;
					}
				})
			},
			cancel(formName) {
				this.dialogVisible = false;
				this.$refs[formName].resetFields();
			},
			closeDialog(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.el-form-item{
		margin-bottom: 10px;
	}
	.textarea {
		margin-left: 62px;
		display: block;
		margin-right: 62px;
		box-sizing: border-box;
		padding-right: 62px;
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
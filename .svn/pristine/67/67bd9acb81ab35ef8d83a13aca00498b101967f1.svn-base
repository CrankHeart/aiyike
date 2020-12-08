<template>
	<div class="layout">
		<el-dialog title="客户评价" label-width="62px" :visible.sync="dialogVisible" class="dialog442 customer_ev_dialog">
			<el-form :model="form" :rules="rules" ref="form" label-width="72px" label-position="left" class="form-wrap">
				<el-form-item label="评价类型：" prop="type">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option label="好评" value="1"></el-option>
						<el-option label="差评" value="2"></el-option>
						<el-option label="投诉" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="评价内容：" class="note_item nopadding-label" prop="description">
					<el-input placeholder="填写评论" :rows="3" type="textarea" v-model="form.description"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sure">确定</el-button>
			    <el-button class="cancelbtn" @click="cancel">取消</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Customer_Evaluate_Dialog',
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
		data() {
			return {
				dialogVisible: false,
				form: {
					type: '', //类型(1:好评,2:差评,3:投诉)'
					description: '', //描述
					authorId: JSON.parse(Cache.local(Config.Login)).uc.id, //填写人
					itemId: +this.$route.params.id.split('-')[0] //项目ID
				},
				rules: {
					type: [
						{ required: true, message: '请选择评价类型' }
					],
				}
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			sure() {
				this.$refs["form"].validate((valid) => {
					if(valid) {
						this.dialogVisible = false
						this.$http.post('/api/customerComment/add', this.form, {
							emulateJSON: true
						}).then((res) => {
							let result = res.data.success
							if(result) {
								this.$message({
									message: '客户评价成功',
									customClass: 'success'
								});
								this.$refs["form"].resetFields();
								this.$store.commit('toggleCusCommentReload')
							} else {
								this.$message({
									message: res.data.message,
									customClass: 'error'
								});
							}
							this.$emit('cuCommentList')
						}).catch((err) => {
							this.loading = false;
							
						});
					} else {
						return false;
					}
				});
			},
			cancel() {
				this.dialogVisible = false
			},
			clearFrom(){
				this.form.type=''
				this.form.description=''
			}
		}
	}
</script>

<style scoped>
	.el-form-item {
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
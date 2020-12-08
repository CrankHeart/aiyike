<!--外围项目管理详情-左侧-放弃对话框-->
<template>
	<el-dialog title="放弃" :visible.sync="dialogVisible" class="dialog442 ayk-form ayk-form__novlilabel">
		<el-form ref="form" :rules="rules" label-position="top" :model="form" label-width="80px">
			<el-form-item label="放弃原因" prop="reason">
				<el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入" v-model="form.reason">
				</el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
	    	<el-button class="submitbtn" type="primary" @click="sureClick">确 定</el-button>
		    <el-button class="cancelbtn" @click="dialogVisible = false">取 消</el-button>
	    </span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'GiveUp_Evaluation_Dialog',
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
				reason: '',
				form: {
					ucId: this.$store.getters.loginInfo.uc.id,
					taskId: this.$store.getters.outItemAudit.taskId,
					ioApplyId: this.$store.getters.outItemAudit.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					isPass: "N",
					reason: ""
				},
				rules: {
					reason: [{
						required: true,
						message: '请输入原因',
						trigger: 'blur,change'
					}]
				}
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			sureClick() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.$http.post(`/api/ioApply/doInvite`, JSON.stringify(this.form), {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.dialogVisible = false
								this.$router.go(-1)
							}
						}).catch((err) => {})
					} else {
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	/*公用部分*/
	
	.dialogPosition .el-dialog {
		top: 50%!important;
		transform: translate(-50%, -50%);
	}
	
	.dialogPosition .el-dialog__title {
		font-size: 16px;
		color: #000000;
		font-weight: normal;
	}
	
	.el-dialog__footer {
		text-align: center!important;
	}
	/*公用部分end*/
	/*项目挂起*/
	
	.hang-title {
		font-size: 12px;
		color: #000000;
		margin-bottom: 10px;
	}
	
	textarea.hangtext {
		display: block;
		padding: 5px;
		border: 1px solid #eee;
		width: 100%!important;
		height: 80px!important;
		font-size: 12px;
		line-height: 20px;
		resize: none;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	/*项目挂起end*/
</style>
<!--外围项目管理详情-左侧-驳回弹窗-->
<template>
	<el-dialog title="驳回" :visible.sync="dialogVisible" class="dialog442 dialogPosition height58">
		<el-form :rules="rules" ref="form" :model="auditSubmitData" label-width="60px" label-position="left" class="ayk-dialogform">
			<el-form-item label="驳回至" prop="targetNode.index" :rules="targetRule()">
				<el-select v-model="targetNode">
					<el-option :key="index" v-for="(item, index) in targetNodeList" :label="item.nodeName" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="驳回原因" prop="targetNode.remark">
				<el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请填写项目驳回原因" v-model="auditSubmitData.targetNode.remark">
				</el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sureClick">确定</el-button>
			    <el-button class="cancelbtn" @click="dialogVisible = false">取消</el-button>
		    </span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'ProjectAudit_Reject_Dialog',
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			},
			url: {
				type: String,
				default: ''
			},
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
			},
			targetNode(val) {
				let node = this.targetNodeList.filter((item, index) => {
					return item.id == val
				})[0] || {}
				Object.assign(this.auditSubmitData.targetNode, node)
			}
		},
		data() {
			return {
				dialogVisible: false,
				targetNodeList: [],
				auditSubmitData: {},
				targetNode: '',
				rules: {
					'targetNode.remark': [{
						required: true,
						message: '请輸入项目驳回原因',
						trigger: 'blur'
					}]
				}
			};
		},
		components: {},
		created() {
			this.auditSubmitData = Object.deepClone(this.data)
			this.$set(this.auditSubmitData, 'targetNode', {
				remark: "",
			})
		},
		mounted: function() {
			this.dialogVisible = this.visible
			this.obtainTargetNode()
		},
		methods: {
			targetRule() {
				return [{
					required: true,
					type: 'number',
					message: '请输入额度',
					trigger: 'blur,change'
				}]
			},
			obtainTargetNode() {
				this.$http.post('/api/ioApply/tarNode', {
					buzId: +this.$route.params.id.split("-")[0]
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.targetNodeList = data.result.targetNodeList || []
					}
				}).catch((err) => {});
			},
			sureClick() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.auditSubmitData.isPass = 'N'
						this.$http.post(this.url, JSON.stringify(this.auditSubmitData), {
							emulateJSON: true
						}).then((res) => {
							let data = res.data;
							if(data.success) {
								this.$message({
			                        message: "驳回成功",
			                        customClass: 'success'
			                    })
								this.dialogVisible = false
								this.$router.go(-1)
							} else {
								this.$message({
			                        message: data.message,
			                        customClass: 'error'
			                    })
							}
						}).catch((err) => {});
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
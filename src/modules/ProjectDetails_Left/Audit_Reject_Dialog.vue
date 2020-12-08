<template>
	<el-dialog title="驳回" :visible.sync="dialogVisible" class="dialog442 dialogPosition height58">
		<p class="hang-title">驳回原因</p>
		<el-form ref="rejectForm" :model="rejectForm" label-width="0">
			<el-form-item
					prop="reason"
					:rules="[
                  { required: true, message: '驳回原因不能为空'}
                ]">
				<el-input type="textarea"  placeholder="请填写项目驳回原因" v-model="rejectForm.reason"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    	<el-button type="primary" class="submitbtn" @click="sure('rejectForm')">确定</el-button>
			    <el-button class="cancelbtn" @click="cancel('rejectForm')">取消</el-button>
		    </span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'Audit_Reject_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: ''
			},
			item: {
				type: Object,
				default: function() {
					return {}
				}
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
			}
		},
		data() {
			return {
				dialogVisible: false,
                rejectForm:{
                    reason:""                         //挂起原因
                },
                restful: ''
			}
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			dialogInit() {
				this.obtainRestFul()
			},
			obtainRestFul() {
				switch(this.type) {
					case "ItemHangUp":
						this.restful = '/api/itemOpera/hangUpAuth' 
						break
					case "ItemStop":
						this.restful = '/api/itemOpera/ItemStopAuth' 
						break
					case "ItemFinish":
						this.restful = '/api/itemOpera/ItemFinishAuth' 
						break
					default:
						break
				}
			},
			sure(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let submitData={
                            itemId:this.item.item_id,
                            isPass:"N",
                            taskId:this.item.taskId,
                           // reason:'驳回'
                            reason:this.rejectForm.reason
                        }
                        this.$http.post(this.restful, submitData, {
                        	emulateJSON: true
                        }).then((res) => {
                            if (res.data.success) {
                                this.dialogVisible = false
                                this.$parent.hideSelf()
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
                    } else {
                        return false
                    }
                })
			},
			cancel(formName) {
				 this.$refs[formName].resetFields();
				this.$emit('update:visible', false)
				this.$parent.showSelf()
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
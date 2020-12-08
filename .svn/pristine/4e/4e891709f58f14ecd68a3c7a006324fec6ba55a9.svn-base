<template>
	<el-dialog title="驳回" :visible.sync="dialogVisible" class="dialog442 dialogPosition">
		<p class="hang-title">驳回原因</p>
		<!--<textarea class="hangtext" placeholder="填写项目驳回原因" v-model="reason"></textarea>-->

		<el-form ref="rejectForm" :model="rejectForm" label-width="0">
			<el-form-item
					prop="reason"
					:rules="[
                  { required: true, message: '驳回原因不能为空'}
                ]">
				<el-input type="textarea"  placeholder="请填写项目驳回原因" :maxlength="200" v-model="rejectForm.reason"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sure('rejectForm')">确定</el-button>
			    <!--<el-button class="cancelbtn" @click="dialogVisible = false">取消</el-button>-->
			    <el-button @click="cancelReject()">取 消</el-button>
		    </span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'Progress_Review_Audit_Reject',
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
				this.$emit('update:visible', val)
			}
		},
		data() {
			return {
				dialogVisible: false,
                rejectForm:{
                    _isWait:false,				//提交方式狂点击
                    reason:""
                }
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			    cancelReject(){
                this.$emit('update:visible', false)
                this.$router.go(-1)
            },
			sure(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this._isWait){
                            return;
                        }
                        this._isWait = true
                        if('ItemProgressReview'==this.type){
                            let submitData={
                                itemId:this.item.item_id,
                                isPass:"N",
                                ucId: JSON.parse(Cache.local(Config.Login)).uc.id,
                                taskId:this.item.taskId,
                                reason:this.rejectForm.reason,
                                tranId: this.item.id
                            }
                            this.$http.post('/api/progress/reviewAuth',JSON.stringify(submitData), {emulateJSON: true
                            }).then((res) => {
                                this._isWait = false
                                if (res.data.success) {
                                    this.$message({
                                        message: '驳回成功',
                                        customClass: 'success'
                                    })
                                    this.dialogVisible = false
                                } else {
                                    this._isWait = false
                                    this.$message({
                                        message: res.data.message,
                                        type: 'info'
                                    })
                                }
                            }).catch((err) => {

                            })
                        }
					}else{
                        return false;
					}
				})
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
<template>
	<el-dialog @close="closeDialog" :title="dialogTitle" :visible.sync="dialogVisible" class="Project_Term_Dialog dialogPosition height58">
		<el-form ref="form" :model="form">
			<!--<textarea class="hangtext" placeholder="填写原因" v-model="form.reason"></textarea>-->
			<el-form-item
					prop="reason"
					:rules="[
                  { required: true, message: '原因不能为空'}
                ]">
				<el-input type="textarea"  placeholder="请填写原因" v-model="form.reason"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
	    	<el-button class="submitbtn" type="primary" @click="sure('form')">确定</el-button>
		    <el-button class="cancelbtn" @click="cancel('form')">取消</el-button>
	    </span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'Project_Term_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			titleType: ''
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
			},
			'state.doTaskItem': {
				deep: true,
				handler(val) {
					this.item = val
				}
			},
			titleType(val) {
				this.dialogInit()
			}
		},
		data() {
			return {
				type: '',
				itemId: parseInt(this.$route.params.id.split('-')[0]),
				item: {},
				state: this.$store.state,
				dialogVisible: false,
				dialogTitle: '',
				restfulUrl: '',
				form: {
					itemId: parseInt(this.$route.params.id.split('-')[0]),
					reason:''
				}
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
			console.log(this.$store.getters.doTaskItem.status)
			console.log(this.$store.getters.doTaskItem.reason)
		},
		methods: {
			visibleReason(){
				let status= parseInt(this.$route.params.id.split('-')[1])
				if(status==2){
					this.form.reason=this.$store.getters.doTaskItem.reason
				}
			},
			closeDialog() {
				this.resetForm('form')
			},
			resetForm(formName) {
	        	this.$refs[formName].resetFields()
	     	},
			dialogInit() {
				this.item = this.$store.getters.doTaskItem
				this.type = this.$route.params.id.split('-')[2] || this.titleType
				this.obtainRestfulByType(this.type)
				this.obtainTitle(this.type)
				this.visibleReason()
			},
			obtainRestfulByType(type) {
				switch (type){
					case 'ItemFinish':
						this.restfulUrl = '/api/itemOpera/ItemFinish'
						break
					case 'ItemHangUp':
						this.restfulUrl = '/api/itemOpera/hangUp'
						break
					case 'ItemStop':
						this.restfulUrl = '/api/itemOpera/ItemStop'
						break
					case 'ItemPost':
						this.restfulUrl = '/api/itemOpera/itemPost'
						break
					default:
						alert('obtainRestfulByType fail')
						break
				}
			},
			obtainTitle(type) {
				switch (type){
					case 'ItemFinish':
						this.dialogTitle = '项目结项'
						break
					case 'ItemHangUp':
						this.dialogTitle = '项目挂起'
						break
					case 'ItemStop':
						this.dialogTitle = '项目中止'
						break
					default:
						alert('obtainTitle fail')
						break
				}
			},
			sure(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (parseInt(this.item.status) == 2) {
                            this.form.isEdit = 'edit'
                            this.form.reapply = 'Y'
                            this.form.taskId = this.item.taskId
                        } else {
                            delete this.form.isEdit
                            delete this.form.reapply
                            delete this.form.taskId
                        }
                        this.$http.post(this.restfulUrl, this.form, {
                        	emulateJSON: true
                        }).then((res) => {
                            if (res.data.success) {
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
                    } else {
                        return false
                    }
                })
			},
			cancel(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
				if (Object.isNotEmpty(this.$route.params.id.split('-')[2])) {
					this.$router.go(-1)
				}
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
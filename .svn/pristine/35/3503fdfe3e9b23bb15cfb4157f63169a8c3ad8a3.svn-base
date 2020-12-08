<template>
	<div class="layout">
		<el-dialog title="修改密码" :visible.sync="dialogVisible" class="dialog442 resetDialog">
			<el-form :model="form" label-width="70px" :rules="rules" ref="form" class="resetpwdForm">
				<el-form-item label="原密码：" prop="oldPwd">
					<el-input v-model="form.oldPwd" auto-complete="off" type="password" placeholder="请输入原密码"></el-input>
					<span v-show="isShow1" class="staus_icon">
						<i class="el-icon-circle-close"></i>
					</span>
					<span v-show="show1" class="right_icon">
						<i class="el-icon-circle-check"></i>
					</span>
				</el-form-item>
				<el-form-item label="新密码：" prop="password">
					<el-input v-model="form.password" auto-complete="off" type="password" placeholder="密码长度为6到16个字符"></el-input>
					<span v-show="isShow2" class="staus_icon">
						<i class="el-icon-circle-close"></i>
					</span>
					<span v-show="show2" class="right_icon">
						<i class="el-icon-circle-check"></i>
					</span>
				</el-form-item>
				<el-form-item label="确认密码：" prop="again">
					<el-input v-model="form.again" auto-complete="off" type="password" placeholder="密码长度为6到16个字符"></el-input>
					<span v-show="isShow3" class="staus_icon">
						<i class="el-icon-circle-close"></i>
					</span>
					<span v-show="show3" class="right_icon">
						<i class="el-icon-circle-check"></i>
					</span>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sure">提交</el-button>
			    <el-button class="cancelbtn" @click="cancel">取消</el-button>
	    	</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'ChangePassword',
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
			var validatePass1 = (rule, value, callback) => {
			        if (value === '') {
			           callback(new Error('请输入密码'));
			           this.isShow1 = true;
		          	   this.show1 = false;
			        }else if(value.length < 6 || value.length > 16){
			        	callback(new Error('密码长度为6到16个字符'));
			        	this.isShow1 = true;
		          		this.show1 = false;
			        }else {
			            callback();
			            this.isShow1 = false;
		          	    this.show1 = true;
			        }
			    }
			var validatePass2 = (rule, value, callback) => {
			        if (value === '') {
			           callback(new Error('请输入密码'));
			           this.isShow2 = true;
		          	   this.show2 = false;
			        }else if(value.length < 6 || value.length > 16){
			        	callback(new Error('密码长度为6到16个字符'));
			        	this.isShow2 = true;
		          		this.show2 = false;
			        }else {
			            callback();
			            this.isShow2 = false;
		          	    this.show2 = true;
			        }
			    }
			var validatePass3 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
					this.isShow3 = true;
			        this.show3 = false;
				} else if(value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
					this.isShow3 = true;
			        this.show3 = false;
				} else {
					callback();
					this.isShow3 = false;
			        this.show3 = true;
				}
			}
			return {
				dialogVisible: false,
				isShow1: false,
		    	isShow2: false,
		    	isShow3: false,
		    	show1: false,
		    	show2: false,
		    	show3: false,
				form: {
					oldPwd: '',
					password: '',
					again: '',
					ucId: JSON.parse(Cache.local(Config.Login)).uc.id
				},
				rules: {
					oldPwd: [{
						validator: validatePass1, 
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					again: [{
						validator: validatePass3,
						trigger: 'blur'
					}]
				}
			};
		},
		components: {
		},
		mounted: function() {
		},
		methods: {
			sure() {
				this.$http.post('/api/uContact/modifyPwdByUc', this.form, {
						emulateJSON: true
					})
					.then((res) => {
						if(res.data.success) {
							this.dialogVisible = false
							this.$message({
					            customClass: 'success',
					            message: res.data.message
				          	})
						} else {
							this.$message({
					            customClass: 'error',
					            message: res.data.message
				          	})
						}
					}).catch((err) => {
						this.$message({
				            customClass: 'error',
				            message: '服务器错误'
			          	})
					})
			},
			cancel() {
				this.dialogVisible = false
			}
		}
	}
</script>

<style scoped>
	.content {
		text-align: center;
		font-size: 12px;
		color: #000000;
	}
	.staus_icon{
		margin-left: 6px;
	    color: #EE5A5A;
	    font-size: 12px;
	}
	.right_icon{
		margin-left: 6px;
	    color: #04BE02;
	    font-size: 12px;
	}
</style>
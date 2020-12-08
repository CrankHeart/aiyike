<!--外围忘记密码-填写邮箱-->
<template>
	<div class="wrap">
		<div class="title">
			修改密码
		</div>
		<el-form :rules="rules" ref="forget" :model="data" label-position="left" label-width="66px" class="RegForm ayk-form__novlilabel">
			<el-form-item label="新密码：" prop="password">
				<el-input type="password" v-model="data.password" placeholder="输入密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：" prop="checkpass">
				<el-input type="password" v-model="data.checkpass" placeholder="确认密码"></el-input>
			</el-form-item>
		</el-form>
		<div class="btn-area">
			<div>
				<el-button type="primary" class="nextbtn" @click="next">下一步</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Change_PassWord',
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data: function() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.data.checkpass !== '') {
						this.$refs.forget.validateField('checkpass');
					}
					callback();
				}
			};
			var validateCheckPass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.data.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				rules: {
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkpass: [{
						validator: validateCheckPass,
						trigger: 'blur'
					}],
				},
				query: {}
			}
		},
		mounted() {
			this.query = this.GetQuery()
		},
		methods: {
			next() {
				this.$refs['forget'].validate((valid) => {
					if(valid) {
						this.$http.post("/api/uContact/modifyPwdByEmail", {
							email: this.query['email'],
							uuid: this.query['uuid'],
							password: this.data.password
						}, {
							emulateJSON: true
						}).then((res) => {
							if(res.data.success) {
								this.$emit('actionHandler', 'CHANGE_PASSWORD_NEXT')
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
	.wrap {
		background: #fff;
	}
	
	.RegForm {
		width: 333px;
		margin: 102px auto 0;
		text-align: left;
	}
	
	.title {
		font-size: 32px;
		color: #333333;
		text-align: center;
		margin-top: 76px;
	}
	
	.btn-area {
		text-align: center;
		margin-top: 132px;
	}
	
	.nextbtn {
		background: #295DCF;
		border-radius: 2px;
		font-size: 14px;
		color: #FFFFFF;
		width: 200px;
		height: 30px;
		padding: 0;
	}
</style>
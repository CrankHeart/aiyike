<template>
	<div class="wrap">
		<div class="title">
			艾艺客
		</div>
		<el-form ref="regForm" :rules="rules" :inline="true" :model="data" label-position="left" label-width="60px" class="RegForm ayk-form__novlilabel">
			<div>
				<el-form-item label="用户名：">
					<el-input v-model="data.userName" placeholder="输入账号"></el-input>
				</el-form-item>
			</div>
			<div>
				<el-form-item label="注册邮箱：" prop="email">
					<el-input v-model="data.email" placeholder="输入邮箱"></el-input>
					<div class="sendemail">
						<el-button type="primary" class="submitbtn" @click="sendEmail" :disabled="sendEmailFlag">{{sendEmailText}}</el-button>
					</div>
				</el-form-item>
			</div>
			<div>
				<el-form-item label="验证码：">
					<el-input v-model="data.valiCode" placeholder="输入验证码"></el-input>
				</el-form-item>
			</div>
			<div>
				<el-form-item label="输入密码：">
					<el-input type="password" placeholder="输入密码" v-model="data.password" auto-complete="off"></el-input>
				</el-form-item>
			</div>
			<div>
				<el-form-item label="确认密码：">
					<el-input type="password" placeholder="确认密码" v-model="data.checkPass" auto-complete="off"></el-input>
				</el-form-item>
			</div>
			<div>
				<el-form-item label="">
					<el-checkbox v-model="data.isread">我已阅读《艾艺客外围团队平台用户须知》</el-checkbox>
				</el-form-item>
			</div>
		</el-form>
		<div class="btn-area">
			<el-button type="primary" class="longbtn" @click="regClick">注册</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Reg_Inner',
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data: function() {
			return {
				sendEmailInterval: null,
				sendEmailNum: 60,
				sendEmailFlag: false,
				sendEmailText: '发送验证码',
				rules: {
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur,change'
						}
					]
				}
			}
		},
		methods: {
			valiEmail() {
				let vali = ''
				this.$refs['regForm'].validateField('email', (msg, b) => {
					vali = msg
				})
				return vali
			},
			sendEmail() {
				if(this.valiEmail()) return void(0)
				this.$http.post('/api/uContact/validateEmail', {
					email: this.data.email
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.data.success) {
						this.startEmailInterval()
					}else {
						console.log(res.data.message+"11111111111111")
                        this.$message({
                        	customClass: 'error',
                            message: res.data.message
                        })
                    }
				}).catch((err) => {
					   console.log(res.data.message+"222222222222")
						this.$message({
								customClass: 'error',
								message: "发送失败"
							});
				})
			},
			startEmailInterval() {
				if(!this.sendEmailFlag) {
					this.sendEmailFlag = true
					this.sendEmailText = --this.sendEmailNum
					this.sendEmailInterval = setInterval(() => {
						if(!this.sendEmailNum) {
							this.sendEmailNum = 60
							this.sendEmailText = '发送验证码'
							this.sendEmailFlag = false
							clearInterval(this.sendEmailInterval)
						} else {
							this.sendEmailText = --this.sendEmailNum
						}
					}, 1000)
				}
			},
			regClick() {
				this.$http.post('/api/bus/register', JSON.stringify(this.data), {
					emulateJSON: true
				}).then((res) => {
					let data = res.data
					if(data.success) {
						this.$emit('actionHandler', 'suc')
					} else {
							this.$message({
								message: res.data.message,
								customClass: 'error'
							})
						}
				}).catch((err) => {})
			}
		}
	}
</script>

<style scoped>
	.el-form-item {
		position: relative;
		text-align: left;
	}
	
	.wrap {
		background: #fff;
	}
	
	.RegForm {
		margin: 36px auto 0;
	}
	
	.title {
		font-size: 32px;
		color: #295DCF;
		text-align: center;
		margin-top: 76px;
	}
	
	.btn-area {
		text-align: center;
	}
	
	.sendemail {
		position: absolute;
		right: -110px;
		top: 0;
	}
</style>
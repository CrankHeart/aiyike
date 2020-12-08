<!--外围忘记密码-填写邮箱-->
<template>
	<div class="wrap">
		<div class="title">
			忘记密码
		</div>
		<el-form :rules="rules" ref="forget" :model="data" label-position="left" label-width="66px" class="RegForm ayk-form__novlilabel">
			<el-form-item label="注册邮箱：" prop="email">
				<el-input v-model="data.email" placeholder="输入注册邮箱账号"></el-input>
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
		name: 'ForGetPassword',
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
			next() {
				this.$refs['forget'].validate((valid) => {
					if(valid) {
						this.$http.post("/api/uContact/sendEmail", {
							email: this.data.email,
						}, {
							emulateJSON: true
						}).then((res) => {
							if(res.data.success) {
								this.$emit('actionHandler', 'ADD_EMAIL_NEXT')
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
		margin: 140px auto 0;
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
		margin-top: 140px;
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
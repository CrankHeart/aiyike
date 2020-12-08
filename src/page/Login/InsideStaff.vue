<!--外围登陆页面-->
<template>
	<div class="wrap middle">
		<div class="content-out">
			<p class="title">艾艺客</p>
			<el-form label-position="left" :model="staffForm" class="staffForm" ref="staffForm" label-width="46px">
				<div class="form-item mt55 user">
					<el-form-item prop="userName" label="账号：">
						<el-input v-model="staffForm.userName" placeholder="输入账号"></el-input>
					</el-form-item>
				</div>
				<div class="form-item mt20 pass">
					<el-form-item prop="password" label="密码：">
						<el-input type="password" v-model="staffForm.password" placeholder="输入密码"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div class="action">
				<router-link class="forget" to="/forget">忘记密码？</router-link>
				<router-link class="reg" to="/reg">注册>></router-link>
			</div>
			<div class="btn-area">
				<el-button :disabled="false" type="primary" class="longbtn" @click="loginClick">登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	let Md5promise = require.ensure([], function() {
		return require('@/utils/md5.js')
	})
	export default {
		name: 'Reg',
		data: function() {
			return {
				regStaffInfo: JSON.parse(Cache.local('staff-reg-info')),
				loginClickFlag: false,
				staffForm: {
					userName: '',
					password: ''
				}
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.staffForm.userName = this.regStaffInfo.userName
				Cache.local('staff-reg-info', '')
			})
		},
		methods: {
			loginClick() {
				if(this.loginClickFlag) {
					return void 0
				}
				this.loginClickFlag = true
				Md5promise.then((md5) => {
					console.log(md5)
					this.staffForm.password = md5(this.staffForm.password)
					this.$store.dispatch('LOGIN', this.staffForm).then((val) => {
						this.$router.push({path: "/"})
					}).catch((error) => {
						this.loginClickFlag = false
						this.$message({
							customClass: 'error',
							message: error.message
						});
						this.staffForm.password = '';
					})
				})
			}
		}
	}
</script>

<style scoped>
	.wrap {
		background: #f8f9fb;
		overflow-y: auto;
		text-align: center;
	}
	
	.content-out {
		width: 906px;
		height: 548px;
		background: #fff;
		overflow: hidden;
		vertical-align: middle;
		margin-top: 20px;
		margin-bottom: 20px;
		display: inline-block;
	}
	
	.title {
		font-size: 32px;
		color: #295DCF;
		text-align: center;
		margin-top: 76px;
	}
	.staffForm {
		width: 310px;
		margin: 102px auto 0;
	}
	.action {
		width: 310px;
		margin: auto;
		padding-left: 46px;
		box-sizing: border-box;
		font-size: 12px;
		color: #000000;
	}
	.forget{
		float: left;
	}
	.reg{
		float: right;
	}
	.btn-area {
		text-align: center;
		margin-top: 106px;
	}
</style>
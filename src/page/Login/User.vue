<!--外围登陆界面-->
<template>
	<div class="wrap">
		<AdBlockIntercept></AdBlockIntercept>
		<div class="header">
			<div class="login-head">
				<!--<img id="svg" src="../../../static/img/logo2.png" width="202" height="47"/>-->
				<svg id="svg" 
					 version="1.1"
				     width="162" height="47"
				     xmlns="http://www.w3.org/2000/svg"
				     xmlns:xlink="http://www.w3.org/1999/xlink">
				    <image xlink:href="/static/img/Group.svg" width="162" height="47"/>
				</svg>
				<span class="logo-tips">欢迎登录！</span>
			</div>
		</div>
		<div class="content clearfix">
			<LoginBanner :style="bannerStyle" ref="banner"></LoginBanner>
			<div class="login-box" @keyup.enter="loginDec" :style="loginBoxStyle">
				<div class="title">
					登录
				</div>
				<el-form :model="loginForm" class="loginForm" ref="loginForm">
					<div class="form-item mt55 user">
						<el-form-item prop="userName">
							<el-input v-model="loginForm.userName"></el-input>
						</el-form-item>
					</div>
					<div class="form-item mt20 pass">
						<el-form-item prop="password">
							<el-input type="password" v-model="loginForm.password"></el-input>
						</el-form-item>
					</div>
				</el-form>
				<div class="login-btn" @click="loginDec" v-show="!loginClickFlag">
				</div>
				<div v-show="loginClickFlag" class="login-loading">
					<img src="../../assets/img/loading.gif" width="42px" height="39px"/>
				</div>
				<div class="toolbar">
					<router-link to="/forget" class="forget">忘记密码?</router-link>
					<router-link to="/reg" class="reg">用户注册&nbsp; ></router-link>
				</div>
			</div>
		</div>
		<div class="footer">
			Copyright © 2014~2015 上海艾艺信息技术有限公司
		</div>
	</div>
</template>

<script>
	let Md5promise = require.ensure([], function() {
		return require('@/utils/md5.js')
	})
	let AdBlockIntercept = () =>
		import('@/components/intercept/AdBlockIntercept.vue')
	let	LoginBanner = () =>
		import('@/modules/Login/LoginBanner.vue')
	
	import Windows from '@/utils/windows.js'
	import EventUtils from '@/utils/EventUtils.js'
	
	export default {
		name: 'User',
		data: function() {
			return {
				loginForm: {
					userName: '',
					password: ''
				},
				loginClickFlag: false,
				resizefn: null,
				winInfo: {}
			}
		},
		beforeMount(){
			this.bindWResize()
		},
		mounted() {
			this.$nextTick(()=>{
				this.resizefn()
			})
		},
		beforeDestroy() {
			this.rmWResize()
		},
		components: {
			AdBlockIntercept,
			LoginBanner
		},
		computed: {
			bannerStyle() {
				let div3
				if (this.winInfo.width > 1366) {
					div3 = `${((this.winInfo.width - 648 - 366) / 3).toFixed(2)}px`
				} else {
					div3 = `${((1366 - 648 - 366) / 3).toFixed(2)}px`
				}
				return {
					'margin-left': div3
				}
			},
			loginBoxStyle() {
				let div3
				if (this.winInfo.width > 1366) {
					div3 = `${((this.winInfo.width - 648 - 366) / 3).toFixed(2)}px`
				} else {
					div3 = `${((1366 - 648 - 366) / 3).toFixed(2)}px`
				}
				return {
					'margin-right': div3
				}
			}
		},
		methods: {
			bindWResize() {
				let _self = this
				this.resizefn = function(){
				    var timer
				    return function(){
				        if(timer) clearTimeout(timer);
				        timer = setTimeout(function(){
				        	let info = Windows.getWindowsInfo()
			        		_self.winInfo = info
				        }, 0)
				    }
				}()
				EventUtils.addHandler(window, 'resize', this.resizefn)
			},
			rmWResize() {
				EventUtils.removeHandler(window, 'resize', this.resizefn)
			},
			loginDec() {
//				this.$store.dispatch('QUITNOTREMOVE').then(()=>{
					this.login()
//				}).catch((err) => {
//					
//				})
			},
			login() {
				/*let info = JSON.parse(Cache.session(Config.Login));
				if(info&&info!=''){
					Cache.removeSession('LOGIN_KEY');
				}*/
				if(this.loginClickFlag) {
					return void 0
				}
				this.loginClickFlag = true
				Md5promise.then((md5) => {
					this.loginForm.password = md5(this.loginForm.password)
					this.$store.dispatch('LOGIN', this.loginForm).then((val) => {
						this.$router.push({path: "/"})
					}).catch((error) => {
						this.loginClickFlag = false
						this.$message({
							customClass: 'error',
							message: error.message
						});
						this.loginForm.password = '';
						//this.resetForm('loginForm')
					})
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	#svg{
		margin-left: 42px;
	}
	.toolbar {
		text-align: center;
		margin-top: 47px;
		display: none;
	}
	
	.toolbar .forget {
		margin-right: 48px;
	}
	
	.toolbar a {
		font-size: 12px;
		color: #C9C9C9;
		letter-spacing: 0;
	}
	
	.content {
		width: 100%;
		min-width: 1366px;
		height: 500px;
		margin: auto;
		/*margin-top: 81px;*/
		position: absolute;
		margin-top: -250px;
		margin-left: -50%;
		left: 50%;
		top: 50%;
	}
	
	.wrap {
		min-width: 1366px;
		position: relative;
	}
	
	.header {
		padding-top: 55px;
	}
	
	.login-head {
		position: relative;
		display: inline-block;
	}
	
	.login-head>span:nth-of-type(1) {
		color: #333;
		font-size: 20px;
		margin-left: 16px;
	}
	
	.login-head>span:nth-of-type(2) {
		font-size: 20px;
		color: #333333;
	}
	.login-box {
		width: 366px;
		height: 430px;
		background: #FFFFFF;
		border: 1px solid #EFF1F4;
		box-shadow: 0 13px 12px 0 rgba(0, 0, 0, 0.02), 0 38px 34px 0 rgba(0, 0, 0, 0.03);
		border-radius: 6px;
		float: right;
		overflow: hidden;
		/*margin-right: 168px;*/
	}
	
	.login-box .title {
		text-align: center;
		font-size: 32px;
		color: #666666;
		margin-top: 54px;
	}
	
	.login-box .form-item {
		width: 268px;
		height: 42px;
		margin: 0 auto 0 auto;
		position: relative;
	}
	
	.mt55 {
		margin-top: 55px !important;
	}
	
	.mt20 {
		margin-top: 20px !important;
	}
	
	.login-box .form-item:before {
		content: "";
		display: inline-block;
		width: 14px;
		height: 16px;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.login-box .form-item.user:before {
		background: url(../../assets/img/icon-people.png) no-repeat;
		background-size: 14px 16px;
		left: 12px;
		top: 14px;
		z-index: 1;
	}
	
	.login-box .form-item.pass:before {
		background: url(../../assets/img/icon-password.png) no-repeat;
		background-size: 14px 16px;
		left: 12px;
		top: 14px;
		z-index: 1;
	}
	
	.login-btn {
		background: url(../../assets/img/icon-right.png) no-repeat;
		border-radius: 100%;
		background-size: 15px 11px;
		background-position: center center;
		width: 42px;
		height: 42px;
		border: 1px solid #295DCF;
		margin: 47px auto 0px auto;
		cursor: pointer;
	}
	.login-loading{
		margin: 47px auto 0px auto;
		width: 42px;
		height: 42px;
	}
	
	.footer {
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		padding-top: 85px;
		position: absolute;
		bottom: 47px;
		left: 50%;
		margin-left: -50%;
	}
	.logo-tips{
		position: relative;
		bottom: 10px;
	}
</style>
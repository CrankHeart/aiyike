<!--注册成功且邮箱验证成功-->
<template>
	<div class="wrap">
		<div class="title">
			注册成功
		</div>
		<div class="content">
			<div class="tip-1">
				<span class="middle tag">您的账号：</span>
				<span class="user">{{data.userName}}</span>
				<el-button class="verifystate">已验证</el-button>
			</div>
		</div>
		<div class="btn-area">
			<div>
				<el-button type="primary" class="backbtn" @click="toindex">点击登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Reg_Suc_Ver',
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
			}
		},
		methods: {
			toindex() {
				Cache.local('staff-reg-info', JSON.stringify(this.data))
				Cache.local(Config.Login, '')
				window.location.href= '/staff'
			}
		}
	}
</script>

<style scoped>
	.tip-1 {
		height: 30px;
		text-align: center;
		margin-top: 141px;
	}
	
	.wrap {
		background: #fff;
	}
	
	.tag {
		font-size: 18px;
		color: #000000;
		letter-spacing: 0;
	}
	
	.user {
		font-size: 18px;
		color: #295dcf;
		letter-spacing: 0;
		line-height: 25px;
		cursor: pointer;
	}
	
	.verifystate {
		width: 60px;
		height: 26px;
		border: none;
		padding: 0;
		background: #F2F2F2;
		border-radius: 2px;
		font-size: 12px;
		color: #989898;
		margin-left: 12px;
		position: relative;
		top: -2px;
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
	
	.backbtn {
		background: #295DCF;
		border-radius: 2px;
		font-size: 14px;
		color: #FFFFFF;
		width: 200px;
		height: 30px;
		padding: 0;
	}
</style>
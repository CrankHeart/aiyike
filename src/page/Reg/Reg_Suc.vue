<!--注册成功未验证-->
<template>
	<div class="wrap">
		<div class="title">
			注册成功
		</div>
		<div class="content">
			<div class="tip-1">
				<span class="middle tag">您的账号：</span>
				<span class="user" @click="next">{{email}}</span>
				<el-button class="verifystate">未验证</el-button>
			</div>
			<div class="tip-2">
				为了您的账号安全，请及时前往邮箱进行验证。
			</div>
		</div>
		<div class="btn-area">
			<div>
				<el-button type="primary" class="editbtn">编辑团队信息</el-button>
			</div>
			<div>
				<el-button class="verifybtn" @click="verifyClick">前往邮箱验证</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import getEmailLoginAddress from '@/utils/getEmailLoginAddress.js'
	
	export default {
		name: 'Reg_Suc',
		data: function() {
			return {
				email: 'xx@qq.com'
			}
		},
		methods: {
			next() {
				this.$emit('actionHandler', 'suc')
			},
			verifyClick() {
				const url = getEmailLoginAddress(this.email)
				if (!!url) {
					window.open(url)
				} else {
					this.$message({
						showClose: true,
						message: '此邮箱提供商暂无，请手动打开邮箱验证'
					});
				}
				
			}
		}
	}
</script>

<style scoped>
	.tip-1 {
		height: 30px;
		text-align: center;
		margin-top: 106px;
	}
	
	.tip-2 {
		margin-top: 20px;
		text-align: center;
		font-size: 12px;
		color: #9B9B9B;
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
		margin-top: 106px;
	}
	
	.editbtn {
		background: #295DCF;
		border-radius: 2px;
		font-size: 14px;
		color: #FFFFFF;
		width: 200px;
		height: 30px;
		padding: 0;
	}
	
	.verifybtn {
		margin-top: 12px;
		background: #F2F2F2;
		border-radius: 2px;
		border: none;
		padding: 0;
		font-size: 14px;
		color: #666666;
		width: 200px;
		height: 30px;
	}
</style>
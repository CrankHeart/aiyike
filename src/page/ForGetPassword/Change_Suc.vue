<!--外围修改密码-修改成功提示-->
<template>
	<div class="wrap">
		<div class="title">
			修改成功
		</div>
		<div class="tip-1">
			您的密码修改已完成，请妥善保管好您的密码！
		</div>
		<div class="btn-area">
			<div>
				<el-button type="primary" class="nextbtn" @click="back">返回登陆</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'Change_Suc',
		data: function() {
			return {
			}
		},
		methods: {
			back() {
				this.$router.push('/staff')
			}
		}
	}
</script>

<style scoped>
	.tip-1{
		font-size: 18px;
		color: #000000;
		margin-top: 142px;
		text-align: center;
	}
	.wrap {
		background: #fff;
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
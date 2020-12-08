<!--外围忘记密码-邮箱提示查收-->
<template>
	<div class="wrap">
		<div class="title">
			忘记密码
		</div>
		<div class="tip-1">
			<span class="middle">验证信息已发至您的邮箱&nbsp;&nbsp;</span>
			<span class="email middle" @click="toemail">{{data.email}}</span>
			<span class="middle">&nbsp;&nbsp;请前往查收</span>
		</div>
	</div>
</template>

<script>
	import getEmailLoginAddress from '@/utils/getEmailLoginAddress.js'
	
	export default {
		name: 'ForGet_Email',
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
			}
		},
		methods: {
			toemail() {
				const url = getEmailLoginAddress(this.data.email)
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
	.wrap {
		background: #fff;
	}
	.title {
		font-size: 32px;
		color: #333333;
		text-align: center;
		margin-top: 76px;
	}
	.tip-1{
		height:30px;
		font-size: 18px;
		color: #000000;
		margin-top: 142px;
		text-align: center;
	}
	.email{
		font-size: 18px;
		color: #295dcf;
		letter-spacing: 0;
		line-height: 25px;
		cursor: pointer;
	}
</style>
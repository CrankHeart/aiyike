<template>
	<div class="cp-btn-area">
		<div v-if="type == 1" class="btn1" @click="toCreat">
			<i class="el-icon-icon-add1"></i>
		</div>
		<el-button class="btn2" v-if="type == 2" type="primary" @click="toCreat">创建项目</el-button>
	</div>
</template>

<script>
	export default {
		name: '',
		props: {
			type: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			toCreat() {
				sessionStorage.setItem(Config.CreateStep.NAME, Config.CreateStep.ACTION_TYPE.CREATE_PROJECT_INTO)
                this.$router.push('/businessaffairs/pj/steps');
			}
		}
	}
</script>

<style scoped>
	.cp-btn-area{
		display: inline-block;
	}
	.btn1 {
		background: #295DCF;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		color: #FFFFFF;
		text-align: center;
		display: inline-block;
		cursor: pointer;
		line-height: 50px;
		box-shadow: 0 5px 4px 0 rgba(41, 93, 207, 0.10);
	}
	.btn2 {
		border-radius: 2px;
		width: 88px;
		height: 30px;
		padding: 0;
		line-height: 1;
	}
</style>
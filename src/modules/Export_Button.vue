<template>
	<el-button class="exportbtn" type="primary" @click="exportClick" icon="icon-daochu">导出</el-button>
</template>

<script>
	export default {
		name: 'Export_Button',
		props: {
		},
		data() {
			return {
				
			}
		},
		methods: {
			exportClick() {
			}
		}
	}
</script>

<style scoped>
	.cp-btn-area{
		display: inline-block;
	}
	.exportbtn{
		width: 74px;
		height: 30px;
		line-height: 1;
		padding: 0;
	}
</style>
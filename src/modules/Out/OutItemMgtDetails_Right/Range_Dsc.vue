<!--项目管理-新邀请详情页-范围描述-->
<template>
	<div class="layout">
		<div v-html="dsc"></div>
	</div>
</template>

<script>
	export default {
		name: 'Range_Dsc',
		props: {
			data: {
				type: Object,
				default: function() {return {}}
			}
		},
		data() {
			return {
				dsc: ''
			}
		},
		watch: {
			data: {
				deep: true,
				handler(val) {
					this.obtainDetails()
				}
			}
		},
		mounted() {
			this.obtainDetails()
		},
		methods: {
			obtainDetails() {
				if (Object.isEmpty(this.data)) {
					return void 0
				}
				this.dsc = this.data.description
			}
		}
	}
</script>

<style scoped>
	.layout {
		width: auto;
		margin-top: 30px;
		margin-bottom: 16px;
		position: relative;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
</style>
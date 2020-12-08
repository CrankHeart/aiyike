<!--项目审核模块-->
<template>
	<Audit title="待办事项" :tips="tipsLen">
		<ProjectWrap @obtainTipsLen="obtainTipsLen"></ProjectWrap>
	</Audit>
</template>

<script>
	let Audit = () =>
		import('@/modules/Audit/Audit.vue')
	let ProjectWrap = () =>
		import('@/modules/Audit/ProjectWrap.vue')
		
	export default {
		name: 'LogAudit',
		data() {
			return {
				tipsLen: 0
			}
		},
		components: {
			Audit,
			ProjectWrap
		},
		mounted: function() {
		},
		watch: {
		},
		methods: {
			obtainTipsLen(value) {
				this.tipsLen = value	
			}
		}
	}
</script>

<style scoped>
</style>
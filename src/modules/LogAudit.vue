<!--日志审核模块-->
<template>
	<Audit title="日志审核" :tips="tipsLen">
		<LogWrap @obtainTipsLen="obtainTipsLen"></LogWrap>
	</Audit>
</template>

<script>
	let Audit = () =>
		import('@/modules/Audit/Audit.vue')
	let LogWrap = () =>
		import('@/modules/Audit/LogWrap.vue')
		
	export default {
		name: 'LogAudit',
		data() {
			return {
				tipsLen: 0
			}
		},
		components: {
			Audit,
			LogWrap
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
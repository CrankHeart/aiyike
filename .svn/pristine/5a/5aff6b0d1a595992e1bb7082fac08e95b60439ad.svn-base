<!--周报审核模块-->
<template>
	<Audit title="周报审核" :tips="tipsLen">
		<WeeklyWrap @obtainTipsLen="obtainTipsLen"></WeeklyWrap>
	</Audit>
</template>

<script>
	let Audit = () =>
		import('@/modules/Audit/Audit.vue')
	let WeeklyWrap = () =>
		import('@/modules/Audit/WeeklyWrap.vue')
		
	export default {
		name: 'LogAudit',
		data() {
			return {
				tipsLen: 0
			}
		},
		components: {
			Audit,
			WeeklyWrap
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
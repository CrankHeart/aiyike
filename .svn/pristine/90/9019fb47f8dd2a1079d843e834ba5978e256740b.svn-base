<!--外围申请审核模块-->
<template>
	<Audit title="待办事项" :tips="tipsLen">
		<OutApplyWrap @obtainTipsLen="obtainTipsLen"></OutApplyWrap>
	</Audit>
</template>

<script>
	let Audit = () =>
		import('@/modules/Audit/Audit.vue')
	let OutApplyWrap = () =>
		import('@/modules/Audit/OutApplyWrap.vue')
	export default {
		name: 'OutApplyAudit',
		data() {
			return {
				tipsLen: 0
			}
		},
		watch: {
		},
		components: {
			Audit,
			OutApplyWrap
		},
		mounted() {
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
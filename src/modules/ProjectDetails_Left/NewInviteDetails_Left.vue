<!--项目管理-新邀请-详情页左侧模块-->
<template>
	<div class="layout">
		<NewInviteProjectDsc></NewInviteProjectDsc>
	</div>
</template>

<script>
	let NewInviteProjectDsc = () =>
		import('./NewInviteProjectDsc.vue')
		
	export default {
		name: 'NewInviteDetails_Left',
		data() {
			return {};
		},
		components: {
			NewInviteProjectDsc
		},
		mounted: function() {},
		methods: {}
	}
</script>

<style scoped>
	.layout {
		width: 350px;
		background: #FFFFFF;
		position: absolute;
		height: 100%;
	}
	
	.mlr {
		margin-left: 5px;
		margin-right: 5px;
		width: auto;
	}
	
	.mt14 {
		margin-top: 14px;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0
	}
</style>
<!--项目管理-未完结项目详情页-->
<template>
	<div class="wrap clearfix">
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：项目管理</el-breadcrumb-item>
			<el-breadcrumb-item>新邀请</el-breadcrumb-item>
			<el-breadcrumb-item>SEQ联系项目</el-breadcrumb-item>
		</el-breadcrumb>
		<component :is="leftview" class="details_left"></component>
		<component :is="rightview" class="details_right"></component>
	</div>
</template>

<script>
	let NewInviteDetails_Left = () =>
		import('@/modules/Out/OutItemMgtDetails_Left/OutItemMgtDetails_Left.vue')
	let NewInviteDetails_Right = () =>
		import('@/modules/Out/OutItemMgtDetails_Right/OutItemMgtDetails_Right.vue')
		
	export default {
		name: 'PjManagement_NewInvite_Details',
		data() {
			return {
				leftview: NewInviteDetails_Left,
				rightview: NewInviteDetails_Right
			};
		},
		components: {
			NewInviteDetails_Left,
			NewInviteDetails_Right
		},
		mounted: function() {
//			this.$nextTick(() => {
//				alert(this.$route.params.id)
//			})
		},
		methods: {}
	}
</script>

<style scoped>
	.mb24{
		margin-bottom: 24px;
	}
	.wrap {
		height: 100%;
		margin-top: -50px;
		padding-top: 50px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		position: relative;
	}
	
	.details_left {
		float: left;
	}
	
	.details_right {
		margin-left: 374px;
	}
</style>
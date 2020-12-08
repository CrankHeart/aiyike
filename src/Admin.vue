<template>
	<div class="wrapper">
		<div class="wrapperin el-row container">
			<common-menu>
				<router-view></router-view>
			</common-menu>
		</div>
	</div>
</template>

<script>
	import CommonMenu from '@/components/common-menu/CommonMenu.vue'
	export default {
		name: 'admin',
		data: () => {
			return {}
		},
		components: {
			CommonMenu
		},
		mounted: function() {
		},
		methods: {
		
		}
	}
</script>

<style scoped>
	.wrapper {
		min-width: 1366px;
	}
	.wrapper,
	.container {
		height: 100%;
	}
	.wrapperin{
		overflow: hidden;
	}
	.container {}
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
</style>
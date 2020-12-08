<!--待办模块外层-->
<template>
	<div class="ayk-audit">
		<div class="ayk-audit__title">
			<el-badge :value="tips" class="item">
				{{title}}
			</el-badge>
		</div>
		<herghost-scroll class="ayk-audit__hs">
			<slot></slot>
		</herghost-scroll>
	</div>
</template>

<script>
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	
	export default {
		name: 'Audit',
		props: {
			title: {
				type: String,
				default: ''
			},
			tips: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
			}
		},
		watch: {
		},
		components: {
			'herghost-scroll': HerGhostScroll
		},
		mounted: function() {
		},
		methods: {
		}
	}
</script>

<style scoped>
</style>
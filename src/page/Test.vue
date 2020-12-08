<template>
	<div class="wrap container">
		<herghost-scroll class="ayk-scrollbar" wrapClass="ayk-scrollbar__wrap">
			<MultipleSelect v-model="data"></MultipleSelect>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>aaaa</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
			<p>bbbb</p>
		</herghost-scroll>
	</div>
</template>

<script>
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	let MultipleSelect = () =>
		import('@/components/select/MultipleSelect.vue')
	export default {
		name: 'Test',
		data() {
			return {
				data: [5,6]
			}
		},
		watch: {},
		components: {
			'herghost-scroll': HerGhostScroll,
			MultipleSelect
		},
		mounted: function() {},
		methods: {}
	}
</script>

<style scoped>
	.container {
	}
</style>
<style>
	
</style>
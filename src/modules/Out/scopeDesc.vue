<template>
	<div class="wrap">
		<div class="dsc">
			<span class="dsc-item">{{scopeDesc.description}}</span>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'scopeDesc',
		data() {
			return {
				isloading: false,
				itemId: this.$store.getters.currentItemOutId,
				scopeDesc: this.$store.state.itemOutData[this.$store.getters.currentItemOutId]
			}
		},
		watch: {
			
		},
		components: {
			
		},
		mounted: function() {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
 	.dsc{
 		margin-top: 10px;
 	}
	.dsc-item {
		line-height: 30px;
	}
	
</style>
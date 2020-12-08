<template>
	<div class="loadmore-block">
		<template>
			<a class="loadMorebtn" :class="[isloading?'hidden':'']" @click="loadClick">
				加载更多<i class="el-icon-arrow-down"></i>
			</a>
			<div :class="[isloading?'':'hidden']">
				<i data-loader="circle-side"></i>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'LoadMore',
		props: {
			isloading: {
				type: Boolean
			}
		},
		mounted() {
		},
		data: function() {
			return {}
		},
		methods: {
			loadClick() {
				this.$emit('update:isloading', true)
			}
		}
	}
</script>

<style scoped>
	.el-icon-arrow-down{
		margin-left: 10px;
	}
	.loadmore-block {
		margin-top: 26px;
		text-align: center;
	}
	
	.loadMorebtn {
		cursor: pointer;
		font-size: 14px;
		color: #5d5d5d;
	}
	
	.hidden {
		display: none;
	}
	.loadmore a {
		display: block;
		text-align: center;
		font-size: 14px;
		color: #666666;
		letter-spacing: 0;
		margin: 20px 0 30px 0;
	}
</style>
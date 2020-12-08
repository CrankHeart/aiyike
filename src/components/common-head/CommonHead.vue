<template>
	<div class="head">
		<lazyImg class="header-logo" src="https://www.baidu.com/img/baidu_jgylogo3.gif"></lazyImg>
		<ul class="header-operations">
			<li>切换主题色</li>
			<li class="header-download is-available">
				下载主题
			</li>
			<li>帮助</li>
			<li><span class="header-lang is-active">
          中文
        </span> <span>/</span> <span class="header-lang">
          En
        </span></li>
		</ul>
	</div>
</template>

<script>
	import lazyImg from '@/components/lazy-img/LazyImg.vue'

	export default {
		name: 'commonHead',
		props: {},
		mounted() {},
		data: function() {
			return {}
		},
		components: {
			lazyImg
		},
		methods: {}
	}
</script>

<style scoped>
	.head {
		background-color: rgb(32, 160, 255);
		height: 80px;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		padding: 0 20px;
		z-index: 1;
		box-sizing: border-box;
	}
	
	.header-logo {
		display: inline-block;
		vertical-align: middle;
	}
	
	.header-operations {
		display: inline-block;
		float: right;
		padding-right: 30px;
		height: 100%;
	}
	
	.header-operations li {
		color: #fff;
		display: inline-block;
		vertical-align: middle;
		padding: 0 10px;
		margin: 0 10px;
		line-height: 80px;
		cursor: pointer;
	}
	
	.header-operations:after,
	.head:after {
		display: inline-block;
		content: "";
		height: 100%;
		vertical-align: middle;
	}
</style>
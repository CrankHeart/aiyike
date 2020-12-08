<template>
	<div class="loading">
		<div class="d-area">
			<img v-show="!isloading" class="zanwu" src="../../assets/img/zanwu.png" @click.stop="load"/>
			<span v-show="!isloading" class="text">暂无数据</span>
			<span v-show="!isloading" class="text">点击图片刷新~</span>
			<div class="load" v-show="isloading">
				<img src="../../assets/img/loading.gif" width="42px" height="39px" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NoDetails',
		props: {
			isloading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
			load() {
				this.$emit('update:isloading', true)
			}
		}
	}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .3s ease;
	}
	.fade-enter, .fade-leave-to{
	  opacity: 0;
	}
	.loading {
		text-align: center;
		position: relative;
		height: 100%;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.loading .text {
		color: #bbb;
		margin-top: 10px;
		display: inline-block;
		font-size: 12px;
	}
	
	.loading .zanwu {
		cursor: pointer;
		width: 100%;
		display: block;
	    position: relative;
    	z-index: 2;
	}
	
	.loading .d-area {
		margin: auto;
		width: 100px;
		height: 144px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.loading .load {
	    top: 0px;
	    bottom: 0;
	    padding-top: 60px;
	    box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
		position: absolute;
		left: 0;
		right: 0;
		z-index: 1;
	}
</style>
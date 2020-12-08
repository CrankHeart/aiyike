<template>
	<div ref="lazybox">
		<div class="lazybox">
			<i class="el-icon-loading loading" :class="[isfull?'':'full']"></i>
			<img ref="lazyimg" :alt="alt" :title="title" :class="[isfull?'full':'']" src="" />
		</div>
	</div>
</template>

<script>
	/**
	 * Useage:图片延时懒加载
	 * <lazyImg class="box" src="https://www.baidu.com/img/bd_log.png" title="" alt=""></lazyImg>
	 */
	export default {
		name: 'lazyImg',
		props: {
			src: {
				type: String,
				required: true
			},
			alt: {
				type: String
			},
			title: {
				type: String
			}
		},
		mounted() {
			this.handleScroll()
			window.addEventListener('scroll', this.handleScroll)
		},
		data: function() {
			return {
				lazyimg: '',
				isfull: true
			}
		},
		methods: {
			//j兼容IE和其他浏览器获取元素央样式
			getStyle(el, attr) {
				return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el, false)[attr];
			},
			handleScroll() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				let el2browsertop = this.$refs.lazybox.offsetTop - scrollTop
				let browserheight = document.documentElement.clientHeight
				if(el2browsertop <= browserheight) {
					window.removeEventListener('scroll', this.handleScroll)
					this.loadImageAsync(this.src)
						.then((img) => {
							this.$refs.lazyimg.src = img.src
							this.isfull = false
						}, () => {
							
						})
				}
			},
			loadImageAsync(url) {
				return new Promise(function(resolve, reject) {
					var image = new Image();

					image.onload = function() {
						resolveresolve(image);
					};

					image.onerror = function() {
						reject(new Error('Could not load image at ' + url));
					};

					image.src = url;
				});
			}
		}
	}
</script>

<style scoped>
	.loading{
		font-size: 24px;
		color: #FFFFFF;
	}
	img {
		width: 100%;
		height: 100%;
	}
	
	.full {
		display: none;
	}
	.fullhidden{
		display: none;
	}
	.lazybox {
		width: inherit;
		height: inherit;
		text-align: center;
		vertical-align: middle;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
	}
</style>
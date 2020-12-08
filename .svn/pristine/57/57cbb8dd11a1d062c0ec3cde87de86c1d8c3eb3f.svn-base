<template>
	<div class="banner" id="banner" ref="banner">
		<ul id="banner-ul" class="banner-ul" ref="banner-ul">
			<li v-for="(item,index) in bannerPath" ref="banner-li" :class="[index==0?'on':'']"><img :src="item"></li>
		</ul>
		<div class="banner-btn">
			<span class="banner-left" id="banner-left" ref="banner-left"></span>
			<span class="banner-right" id="banner-right" ref="banner-right"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LoginBanner',
		data() {
			return {
				bannerPath: [
					'/static/img/banner/bn1.png',
					'/static/img/banner/bn2.png',
					'/static/img/banner/bn3.png'
				],
				bannerOptions: {
					time: 3000
				},
				xh: null,
				num: 0,
				banner: null,
				bannerlis:null,
				bannerleft: null,
				bannerright: null
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.initBanner()
			})
		},
		beforeDestroy() {
			this.stopPlay()
		},
		methods: {
			play(num) {
				for(i = 0; i < this.bannerlis.length; i++) {
					this.bannerlis[i].className = ''
				}
				this.bannerlis[num].className = 'on'
			},
			next() {
				this.num++
				if(this.num >= this.bannerlis.length) {
					this.num = 0
				}
				this.play(this.num)
			},
			pre() {
				this.num--
				if (this.num<0) {
					this.num = this.bannerlis.length - 1
				}
				this.play(this.num)
			},
			autoPlay() {
				this.xh = setInterval(()=>{
					this.next()
				}, this.bannerOptions.time)
			},
			stopPlay() {
				clearInterval(this.xh)
				this.xh = null
			},
			initBanner() {
				console.log("this.$refs",this.$refs)
				this.banner = this.$refs['banner']
				this.bannerlis = this.$refs['banner-li']
				this.bannerleft = this.$refs['banner-left']
				this.bannerright = this.$refs['banner-right']
				this.num = 0
				let _self = this
				this.autoPlay()
				this.banner.onmouseover = function() {
					_self.stopPlay()
				}
				this.banner.onmouseout = function() {
					_self.autoPlay()
				}
				this.bannerleft.onclick = function() {
					_self.pre()
				}
				this.bannerright.onclick = function() {
					_self.next()
				}
			}
		}
	}
</script>

<style scoped>
	.banner-btn{
		top: 124px;
		position: relative;
		display: none;
	}
	.banner-btn span {
		width: 44px;
		height: 44px;
		display: inline-block;
		position: absolute;
		text-align: center;
		line-height: 44px;
		font-size: 24px;
		cursor: pointer;
		border: 1px solid #E7E7E7;
		border-radius: 100%;
	}
	
	.banner-btn span:hover {
		opacity: 1;
		color: #fff;
	}
	.banner-btn .banner-left{
		left: -84px;
	}
	.banner-btn .banner-left:before {
		content:'';
		display: inline-block;  
        border-left: 1px solid #C3C3C3; 
        border-bottom: 1px solid #C3C3C3;  
        width: 10px; 
        height: 10px;  
        transform: rotate(45deg); 
        margin: auto;
	    position: absolute;
	    top: 0;
	    left: 4.5px;
	    right: 0;
	    bottom: 0;
	}
	
	.banner-btn .banner-right {
		right: -39px;
	}
	.banner-btn .banner-right:before {
		content:'';
		display: inline-block;  
        border-right: 1px solid #C3C3C3; 
        border-bottom: 1px solid #C3C3C3;  
        width: 10px; height: 10px;  
        transform: rotate(-45deg); 
        margin: auto;
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 4.5px;
	    bottom: 0;
	}
	.banner {
		/*left: 187px;*/
		position: relative;
		float: left;
	    width: 648px;
    	height: 432px
	}
	.banner-ul>li {
		position: absolute;
		transition: all 1s ease;
		opacity: 0;
	}
	.banner-ul img{
		width: 100%;
		height: 100%;
	}
	.banner-order {
		width: 100%;
		position: absolute;
		top: 430px;
		text-align: center;
	}
	
	.banner-order li {
		display: inline-block;
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 50%;
		margin: 0 15px;
		cursor: pointer;
	}
	#banner-ul .on {
		display: block;
		opacity: 1;
	}
	
	#banner-order .on {
		background: chocolate;
	}
</style>
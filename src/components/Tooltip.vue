<template>
	<div v-show="false" ref="tips">
		<ul class="tip-ul">
			<li v-if="index > 1" v-for="(item, index) in data" :key="index" class="tips-text">
				<span>{{item}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	import $ from 'jquery'
	
	export default {
		props: {
			tipData: {
				type: Array,
				require: true,
				default() {
					return []
				}
			},
			tipStatus: {
				type: Boolean
			},
			targetClass: {
				type: String,
				require: true
			}
		},
		data() {
			return {
				tipPosition: {},
				div: null,
				data: [],
				moveFn: null
			}
		},
		watch: {
			'tipData' (val) {
				this.data = val
				this.loadDivContent()
			},
			'tipStatus' (val) {
				if(val) {
					$(this.div).css({
						left: this.tipPosition.X,
						top: this.tipPosition.Y,
						display: 'block'
					})
				} else {
					$(this.div).css({
						display: 'none'
					})
				}
			}
		},
		mounted() {
			this.data = this.tipData
			this.$nextTick(()=>{
				this.createDiv()
				this.positionDiv()
			})
		},
		beforeDestroy() {
			$(document).unbind("mousemove", this.moveFn)
			if ($("#ayk-morefloatips")[0]) {
				document.body.removeChild($("#ayk-morefloatips")[0])
			}
		},
		methods: {
			createDiv() {
				if ($("#ayk-morefloatips").length) {
					this.div = $("#ayk-morefloatips")[0]
				} else {
					this.div = document.createElement('div')
					this.div.id = "ayk-morefloatips"
					this.div.style.display = "none"
					this.loadDivContent()
				}
				document.body.appendChild(this.div);
			},
			loadDivContent() {
				this.$nextTick(() => {
					this.div.innerHTML = this.$el.innerHTML
				})
			},
			positionDiv() {
				let _self = this
				this.moveFn = function(e) {
					var target1 = $(e.target)
					var target2 = $(e.target).parent()
					var target = null
					if (target1.hasClass(_self.targetClass) || target2.hasClass(_self.targetClass)) {
						target1.hasClass(_self.targetClass)?(target = target1):(target = target2)
						var targetW = target.outerWidth()
						var targetH = target.outerHeight()
						var left = target.offset().left + targetW + 10 + 'px'
     					var top = target.offset().top - ($(_self.div).outerHeight()/2) + (target.height()/2) - _self.getScrollTop() + 'px'
     					_self.tipPosition = {
							X: left,
							Y: top
						}
					}
				}
				$(document).on("mousemove", this.moveFn)
			},
			getScrollTop() {
				var scrollPos;
				if(window.pageYOffset) {
					scrollPos = window.pageYOffset;
				} else if(document.compatMode && document.compatMode != 'BackCompat') {
					scrollPos = document.documentElement.scrollTop;
				} else if(document.body) {
					scrollPos = document.body.scrollTop;
				}
				return scrollPos;
			}
		}
	};
</script>

<style>
	#ayk-morefloatips{
		display: none;
		position: absolute;
		left: 40px;
		min-height: 126px;
		width: 340px;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 2px;
		padding: 20px 20px 10px 20px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	#ayk-morefloatips li{
		margin-bottom: 10px;
	}
	
	#ayk-morefloatips li:nth-of-type(3n){
		margin-right: 0;
	}
	
	#ayk-morefloatips:before{
		position: absolute;
		content: "";
		display: inline-block;
		border-top: 6px solid transparent;
		border-right: 6px solid rgba(0, 0, 0, 0.8);
		border-bottom: 6px solid transparent;
		left: -6px;
		top: 57px;
	}
	
	#ayk-morefloatips .tips-text{
		background: rgba(68, 68, 68, 0.8);
		color: #fff;
	}
	
	#ayk-morefloatips .tip-ul {}
	
	#ayk-morefloatips .tips-text {
		width: 90px;
		height: 23px;
		display: inline-block;
		font-size: 12px;
		line-height: 23px;
		text-align: center;
		margin-right: 12px;
	}
	
	#ayk-morefloatips .tips-text span {
		display: block;
		transform: scale(0.8333);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
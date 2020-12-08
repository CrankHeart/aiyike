<template>
	<div class="hg-scroll" ref="wrap">
		<div class="hg-wrap" ref="me" :style="wrapStyle">
			<slot></slot>
		</div>
		<div class="hg-bar hardware-speedup" ref="bar"></div>
		<div class="hg-rail" ref="rail"></div>
	</div>
</template>

<script>
	import $ from 'jquery'
	
	export default {
		name: 'HerGhostScroll',
		props: {
			options: {
				type: Object,
				default: function() {
					return {}
				}
			},
			success: {},
			scrollHandler: {}
		},
		data() {
			return {
				o: {
					paddingLeft: 0,
					paddingRight: 0,
					width: '100%',
					height: '100%',
					size: '6px',
					color: '#979DBE',
					position: 'right',
					distance: '1px',
					start: 'top',
					opacity: .3,
					alwaysVisible: false,
					disableFadeOut: false,
					railVisible: false,
					railColor: '#333',
					railOpacity: .2,
					railDraggable: true,
					railClass: 'hg-rail',
					barClass: 'hg-bar',
					meClass: 'hg-wrap',
					wrapperClass: 'hg-scroll',
					allowPageScroll: true, //滚动到顶部或底部是否允许继续滚动
					wheelStep: 6, //鼠标滚动页面滑动距离
					touchScrollStep: 200, //用户触摸停止滚动继续滚动量
					borderRadius: '6px', //设置滚动条内border-radius
					railBorderRadius: '6px' //设置滚动条外border-radius
				},
				wrap: null,
				me: null,
				bar: null,
				rail: null,
				isOverPanel: null,
				isOverBar: null,
				isDragg: null,
				queueHide: null,
				barHeight: null,
				percentScroll: null,
				lastScroll: null,
				minBarHeight: null,
				releaseScroll: null,
				$: null,
				rePointtimeOut: null
			}
		},
		created() {
			this.$nextTick(()=>{
				this.init()
			})
		},
		beforeDestroy() {
			clearTimeout(this.rePointtimeOut)
			clearTimeout(this.queueHide)
		},
		methods: {
			init(){
				let _self = this
				for (let i in this.options) {
					this.$set(this.o, i, this.options[i])
				}
				if (
					Object.isEmpty(this.options) || 
					this.options.paddingLeft == 0 || 
					this.options.paddingRight == 0
				) {
					this.$set(this.o, 'paddingLeft', '20px')
					this.$set(this.o, 'paddingRight', '20px')
				}
				this.me = $(this.$refs.me);
				var offset = this.me.scrollTop();
				this.bar = $(this.$refs.bar);
				this.rail = $(this.$refs.rail)
				
				this.wrapper = $(this.$refs.wrap)
					.css({
						position: 'relative',
						overflow: 'hidden',
						width: this.o.width,
						height: this.o.height
					})
					
				this.me.css({
					overflow: 'hidden',
					width: this.o.width,
					height: this.o.height
				})
				
				this.rail  = this.rail.css({
									width: this.o.size,
									height: '100%',
									position: 'absolute',
									top: 0,
									display: (this.o.alwaysVisible && this.o.railVisible) ? 'block' : 'none',
									'border-radius': this.o.railBorderRadius,
									background: this.o.railColor,
									opacity: this.o.railOpacity,
									zIndex: 90
								});

				this.bar   = this.bar.css({
								background: this.o.color,
								width: this.o.size,
								position: 'absolute',
								top: 0,
								opacity: this.o.opacity,
								display: this.o.alwaysVisible ? 'block' : 'none',
								'border-radius': this.o.borderRadius,
								BorderRadius: this.o.borderRadius,
								MozBorderRadius: this.o.borderRadius,
								WebkitBorderRadius: this.o.borderRadius,
								zIndex: 99
							});
							
				var posCss = (this.o.position == 'right') ? {
					right: this.o.distance
				} : {
					left: this.o.distance
				}
				
				this.rail.css(posCss)
				this.bar.css(posCss)
				
				if(this.o.railDraggable) {
					this.bar.bind("mousedown", function(e) {
						var $doc = $(document);
						_self.isDragg = true;
						t = parseFloat(_self.bar.css('top'));
						pageY = e.pageY;

						$doc.bind("mousemove.herghostscroll", function(e) {
							currTop = t + e.pageY - pageY;
							_self.bar.css('top', currTop);
							_self.scrollContent(0, _self.bar.position().top, false); // scroll content
						});

						$doc.bind("mouseup.herghostscroll", function(e) {
							_self.isDragg = false;
							_self.hideBar();
							$doc.unbind('.herghostscroll');
						});
						return false;
					}).bind("selectstart.herghostscroll", function(e) {
						e.stopPropagation();
						e.preventDefault();
						return false;
					})
				}
				// on rail over
				this.rail.hover(function() {
					_self.showBar();
				}, function() {
					_self.hideBar();
				})

				// on bar over
				this.bar.hover(function() {
					_self.isOverBar = true;
				}, function() {
					_self.isOverBar = false;
				})

				// show on parent mouseover
				this.me.hover(function() {
					_self.isOverPanel = true;
					_self.showBar();
					_self.hideBar();
				}, function() {
					_self.isOverPanel = false;
					_self.hideBar();
				})
				
				this.getBarHeight()
				this.hideBar()
				attachWheel(this.$refs.me)
				if (Object.isNotEmpty(this.success) && Function.isFunction(this.success)) {
					this.success()
				}
				function attachWheel(target) {
					if(window.addEventListener) {
						target.addEventListener('DOMMouseScroll', _onWheel, false);
						target.addEventListener('mousewheel', _onWheel, false);
					} else {
						document.attachEvent("onmousewheel", _onWheel)
					}
				}
				function _onWheel(e) {
					if(!_self.isOverPanel) {
						return
					}
					var e = e || window.event;
					var delta = 0;
					if(e.wheelDelta) {
						delta = -e.wheelDelta / 120;
					}
					if(e.detail) {
						delta = e.detail / 3;
					}
					var target = e.target || e.srcTarget || e.srcElement;
					if($(target).closest('.el-dialog__wrapper').length) {
						return true
					}
					if($(target).closest('.' + _self.o.wrapperClass).is(_self.me.parent())) {
						_self.scrollContent(delta, true);
					} else {
						let innerme = $(target).closest('.' + _self.o.meClass)
						let innerWrap = $(target).closest('.' + _self.o.wrapperClass)
						let innerbar = innerWrap.find('.' + _self.o.barClass)
						let innerRail = innerWrap.find('.' + _self.o.railClass)
						let scrollPoint = 0
						if ((innerme.outerHeight() - innerbar.outerHeight()) > 0) {
							scrollPoint = parseInt(innerbar.css('top')) / (innerme.outerHeight() - innerbar.outerHeight())
						}
						if (scrollPoint == 0 || scrollPoint == 1) {
							_self.scrollContent(delta, true)
						}
					}
					if(e.preventDefault && !_self.releaseScroll) {
						e.preventDefault();
					}
					if(!_self.releaseScroll) {
						e.returnValue = false;
					}
				}
			},
			scrollContent(y, isWheel, isJump) {
				this.releaseScroll = false;
                this.showBar();
				var delta = y;
				var maxTop = this.me.outerHeight() - this.bar.outerHeight();
				if(isWheel) {
					delta = parseInt(this.bar.css('top')) + y * parseInt(this.o.wheelStep) / 100 * this.bar.outerHeight();

					delta = Math.min(Math.max(delta, 0), maxTop);

					delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

					this.bar.css({
						top: delta + 'px'
					});
					function isReview(ar) {
						let ret = false
						if (!(ar.$el && ar.$el.nodeType == 1)) {
							return ret
						}
						if (ar.pickerVisible && ar.showPicker) {
							ar.showPicker()
							ret = true
						}
						if (ar.visible && ar.$el.className.indexOf("el-select")!=-1 && ar.$children && ar.$children[1] && ar.$children[1].updatePopper){
							ar.$children[1].updatePopper()
							ret = true
						}
						
						return ret
					}
					var s = function(ar) {
						for (let i in ar) {
							if (!isReview(ar[i])) {
								s(ar[i].$children)
							}
						}
					}.bind(this)
					clearTimeout(this.rePointtimeOut)
					this.rePointtimeOut = setTimeout(()=>{
						s(this.$children)
					}, 0)
				}
				this.percentScroll = parseInt(this.bar.css('top')) / (this.me.outerHeight() - this.bar.outerHeight());
				delta = this.percentScroll * (this.me[0].scrollHeight - this.me.outerHeight());
				if(isJump) {
					delta = y;
					var offsetTop = delta / this.me[0].scrollHeight * this.me.outerHeight();
					offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
					this.bar.css({
						top: offsetTop + 'px'
					});
				}
				this.me.scrollTop(delta);
				this.scrollHandler && this.scrollHandler()
				this.showBar();
				this.hideBar();
			},
			getBarHeight() {
				this.barHeight = Math.max((this.me.outerHeight() / this.me[0].scrollHeight) * this.me.outerHeight(), this.minBarHeight);
				this.bar.css({
					height: this.barHeight + 'px'
				});
				var display = this.barHeight == this.me.outerHeight() ? 'none' : 'block';
				this.bar.css({
					display: display
				})
			},
			showBar() {
				this.getBarHeight()
				clearTimeout(this.queueHide);
				if(this.percentScroll == ~~this.percentScroll) {
					this.releaseScroll = this.o.allowPageScroll;
					if(this.lastScroll != this.percentScroll) {
						var msg = (~~this.percentScroll == 0) ? 'top' : 'bottom';
						this.me.trigger('herghostscroll', msg);
					}
				} else {
					this.releaseScroll = false;
				}
				this.lastScroll = this.percentScroll;
				if(this.barHeight >= this.me.outerHeight()) {
					this.releaseScroll = true;
					return;
				}
				this.bar.stop(true, true).fadeIn('fast');
				if(this.o.railVisible) {
					this.rail.stop(true, true).fadeIn('fast');
				}
			},
			hideBar() {
				if(!this.o.alwaysVisible) {
					clearTimeout(this.queueHide)
					this.queueHide = setTimeout(() => {
						if(!(this.o.disableFadeOut && this.isOverPanel) && !this.isOverBar && !this.isDragg) {
							this.bar.fadeOut('slow');
							this.rail.fadeOut('slow');
						}
					}, 1000);
				}
			}
		},
		computed: {
			wrapStyle() {
				return {
					paddingLeft: parseFloat(this.o.paddingLeft) + 'px',
					paddingRight: parseFloat(this.o.paddingRight) + 'px'
				}
			}
		}
	}
</script>

<style scoped>
	.hg-wrap {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		position: relative;
	}
</style>
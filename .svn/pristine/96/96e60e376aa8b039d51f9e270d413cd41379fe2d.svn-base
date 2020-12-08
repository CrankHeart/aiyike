<!--收款记录---更新项目进度  弹窗 ---模块-->
<template>
	<div>
		<div class="progress" ref="progress" oncopy="function(){}">
			<div ref="percent" class="percent"></div>
			<div ref="circle" class="circle">
				<div class="show" ref="show">
					<div ref="triangle_up" class="triangle_up"></div>
					<div class="shownum">
						<div class="o"></div>
						<span>{{selfParseFloat(2, proform.current_num)}}%</span>
					</div>
				</div>
			</div>
			<!--上一次的更新进度-->
			<div ref="lastshow" class="lastshow" v-for="(item, index) in proform.lastnum" :key="index">
				<div class="show">
					<div class="triangle_up"></div>
					<div class="shownum">
						<template v-if="index == proform.lastnum.length - 1">
							{{selfParseFloat(2, item)}}%
						</template>
						<template v-else>
							{{selfParseFloat(0, item)}}%
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		name: 'OutProgress',
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				proform: {
					lastnum: [],
					current_num: 0
				},
				el: {
					progress: this.$refs.progress,
					show: this.$refs.show,
					circle: this.$refs.circle,
					percent: this.$refs.percent,
					lastshow: this.$refs.lastshow
				},
				measure: {
					progressWidth: null,
					percentWidth: null,
					circleOffset: null,
					lastsShowOffset: []
				},
				remoteDataSource: {

				}
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				this.$nextTick(() => {
					Object.isNotEmpty(this.data) && this.init()
				})
			},
			selfParseFloat(fixednum, num) {
				let _numStr = `${parseFloat(num).toFixed(fixednum)}`
				let _numSp = _numStr.split('.')
				let ret
				if(_numSp.length >= 2 && _numSp[1] == '0') {
					ret = _numSp[0]
				} else {
					ret = _numStr
				}
				return ret
			},
			obtainRemoteDataSource(callback) {
				Object.rmNull(this.data)
				this.$set(this.$data, 'remoteDataSource', this.data)
				let ipRecordList = this.data.ipRecordList
				let itemAssess = this.data.itemAssess
				let item = this.data.item
				for(let i in ipRecordList) {
					let cpValue = Number.isNaN(ipRecordList[i].progress / item.totalHours * 100) ? 0 : ipRecordList[i].progress / item.totalHours * 100
					this.proform.lastnum.push(parseFloat(cpValue).toFixed(0))
				}
				//最后一个点是最大可拉动的位置
				this.proform.lastnum.push(Number.isNaN(itemAssess.totalHour / item.totalHours * 100) ? 0 : (itemAssess.totalHour / item.totalHours * 100).toFixed(2))
				if(this.proform.lastnum.length == 1) {
					this.proform.lastnum.unshift(0)
				}
				this.proform.current_num = this.proform.lastnum[this.proform.lastnum.length - 2]
				this.$emit('input', this.proform.current_num)
				callback()
			},
			init: function() {
				this.obtainRemoteDataSource(() => {
					let tempInterval = setInterval(() => {
						let flag = false
						if(this.proform.lastnum.length) {
							if(
								this.$refs.progress &&
								this.$refs.show &&
								this.$refs.circle &&
								this.$refs.percent &&
								this.$refs.lastshow
							) {
								flag = true
							}
						} else {
							if(
								this.$refs.progress &&
								this.$refs.show &&
								this.$refs.circle &&
								this.$refs.percent
							) {
								flag = true
							}
						}
						if(flag) {
							clearInterval(tempInterval)
							this.putEl()
							this.meaSure()
							this.draw()
							this.bindEvent()
						}
					}, 0)
				})
			},
			putEl() {
				this.el.progress = this.$refs.progress
				this.el.show = this.$refs.show
				this.el.circle = this.$refs.circle
				this.el.percent = this.$refs.percent
				this.el.lastshow = this.$refs.lastshow
			},
			meaSure() {
				this.measure.progressWidth = $(this.el.progress).outerWidth()
				this.measure.percentWidth = this.measure.progressWidth * (this.proform.current_num / 100)
				let circle_width = $(this.el.circle).outerWidth()
				let lastshow_width = this.$refs.lastshow ? $(this.$refs.lastshow[0]).outerWidth() : 0
				this.proform.lastnum.sort(function(a, b) {
					return a - b
				})
				for(let i in this.proform.lastnum) {
					this.measure.lastsShowOffset.push(this.measure.progressWidth * (this.proform.lastnum[i] / 100) - circle_width / 2)
				}
				this.measure.circleOffset = this.measure.percentWidth - circle_width / 2
			},
			draw() {
				$(this.el.percent).width(this.measure.percentWidth)
				for(let i in this.el.lastshow) {
					$(this.el.lastshow[i]).css('left', this.measure.lastsShowOffset[i])
				}
				$(this.el.circle).css('left', this.measure.circleOffset)
			},
			bindEvent() {
				let _self = this
				let preVal

				function downFn(e) {
					window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
					$(_self.el.circle).unbind('mouseenter').unbind('mouseleave');
					$(_self.el.show).css('visibility', 'visible')
					$(document).bind('mousemove', moveFn);
					$(document).one('mouseup', upFn);
				}

				function moveFn(e) {
					let mousePosition = e.clientX - $(_self.el.progress).offset().left
					let circle_width = $(_self.el.circle).outerWidth()
					if(mousePosition >= -circle_width && mousePosition <= _self.measure.progressWidth) {
						let ratio = (mousePosition / _self.measure.progressWidth) * 100
						let ratio_handler = ratio > 50 ? Math.ceil(ratio) : Math.floor(ratio)
						if(_self.proform.lastnum.length >= 2) {
							if(
								ratio_handler >= _self.proform.lastnum[_self.proform.lastnum.length - 2] &&
								ratio_handler <= _self.proform.lastnum[_self.proform.lastnum.length - 1]
							) {
								_self.proform.current_num = ratio_handler
								_self.$emit('input', ratio_handler)
								_self.meaSure()
								_self.draw()
							} else if(ratio_handler > _self.proform.lastnum[_self.proform.lastnum.length - 1]) {
								_self.proform.current_num = _self.proform.lastnum[_self.proform.lastnum.length - 1]
								_self.$emit('input', _self.proform.current_num)
								_self.meaSure()
								_self.draw()
							}
						} else if(_self.proform.lastnum.length == 1) {
							if(
								ratio_handler <= _self.proform.lastnum[_self.proform.lastnum.length - 1]
							) {
								_self.proform.current_num = ratio_handler
								_self.$emit('input', ratio_handler)
								_self.meaSure()
								_self.draw()
							} else if(ratio_handler > _self.proform.lastnum[_self.proform.lastnum.length - 1]) {
								_self.proform.current_num = _self.proform.lastnum[_self.proform.lastnum.length - 1]
								_self.$emit('input', _self.proform.current_num)
								_self.meaSure()
								_self.draw()
							}
						} else {
							_self.proform.current_num = ratio_handler
							_self.$emit('input', ratio_handler)
							_self.meaSure()
							_self.draw()
						}
					}
				}

				function upFn(e) {
					$(_self.el.show).attr('style', '')
					$(document).unbind('mousemove', moveFn)
					$(_self.el.show).css('visibility', 'hidden')
					showHover.call(_self)
					return false
				}
				let showHover = function() {
					$(this.el.circle).hover(function() {
						$(_self.el.show).css('visibility', 'visible')
					}, function() {
						$(_self.el.show).css('visibility', 'hidden')
					})
					return arguments.callee
				}.call(this)
				$(this.el.show).unbind('mousedown')
				$(this.el.circle).unbind('mousedown')
				$(this.el.show).bind('mousedown', function() {
					return false
				})
				$(this.el.circle).bind('mousedown', downFn)
			}
		}

	}
</script>

<style scoped>
	.bus-name {
		margin-bottom: 10px;
	}
	.progress-wrap {
		position: relative;
	}
	.nox:before {
		display: none;
	}
	
	.updated_progress .progress {
		height: 6px;
		background-color: #DADADA;
		position: relative;
		border-radius: 100px;
		width: 400px;
	}
	
	.updated_progress .circle {
		position: absolute;
		width: 12px;
		height: 12px;
		border: 1px solid #6495FF;
		border-radius: 50%;
		top: -4px;
		background: #FFFFFF;
		cursor: pointer;
		z-index: 1;
	}
	
	.updated_progress .percent {
		position: absolute;
		height: 6px;
		top: 0px;
		background-color: #6495FF;
		border-radius: 100px 0 0 100px;
	}
	
	.updated_progress .show {
		position: absolute;
		top: 15px;
		left: 6px;
		min-width: 48px;
		visibility: hidden;
		text-align: center;
		transform: translateX(-50%);
	}
	
	.updated_progress .circle:hover .show {
		/*visibility: visible;*/
	}
	
	.updated_progress .shownum {
		position: relative;
		background-color: rgba(0, 0, 0, .9);
		box-shadow: 0 7px 23px 0 rgba(0, 0, 0, 0.04);
		border-radius: 2px;
		color: #fff;
		padding: 1px 5px 2px 5px;
		line-height: 20px;
		moz-user-select: -moz-none;
		-moz-user-select: none;
		-o-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
		white-space: nowrap;
	}
	
	.updated_progress .shownum .o {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
	}
	
	.updated_progress .shownum span {
		position: relative;
		z-index: 1;
	}
	
	.updated_progress .triangle_up {
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid rgba(0, 0, 0, .9);
		margin: 0 auto;
	}
	
	.updated_progress .lastshow {
		position: absolute;
		top: -2px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #6495FF;
	}
	
	.updated_progress .lastshow:hover .show {
		visibility: visible;
	}
	
	.updated_progress .remark {
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
		margin-top: 30px;
	}
	
	.updated_progress .beizhu {
		margin-bottom: 9px;
		moz-user-select: -moz-none;
		-moz-user-select: none;
		-o-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
	}
</style>
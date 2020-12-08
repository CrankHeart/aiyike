<template>
	<div class="tabs" :class="[iswrap?'':'hauto']">
		<div ref="tabs_bar" class="tabs_bar clearfix" :style="tabsBarStyle">
			<div ref="active_bar" class="active_bar" v-show="isshow"></div>
			<div :style="tabsItemStyle" class="tabs_item" ref="item" :class="[item.name == currentName?'active':'']" @click="tabclick(index, item.name)" v-for="(item, index) in panes" :key="item.name">
				{{item.label}}
				<i class="tips" v-if="!isBlank(item.tips)"><span>{{item.tips}}</span></i>
			</div>
			<div class="right">
				<slot name="right"></slot>
			</div>
		</div>
		<div class="downmenu-wrap" :style="downmenuWrapStyle" ref="downmenu">
			<div class="downmenu" v-show="!!downPanes.length">
				<span class="caret" @click.stop="downMenuClick"></span>
				<ul class="menu" :class="[menuHidden?'active':'']" @click.stop="() => {}">
					<li :key="index" v-for="(item, index) in downPanes" :class="[(tabs.length + index) == activeindex?'active':'']" @click="tabclick(tabs.length + index, item.name)">{{item.label}}</li>
				</ul>
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	import ResizeUtils from '@/utils/resize.js' 
	import Selector from '@/utils/selector.js'
	export default {
		name: 'Tabs',
		props: {
			value: {},
			resize: {
				default: true
			},
			iswrap: {
				type: Boolean,
				default: true
			},
			isroute: {
				type: Boolean,
				default: true
			},
			right: {
				default: function() {
					return 20
				}
			},
			tabsType: {
				default: 1
			},
			hgoptions: {
				default: function() {
					return {
						'paddingLeft': '28px',
						'paddingRight': '28px'
					}
				}
			}
		},
		watch: {
			'$route' (to, from) {
				let s = to.path.split('/')
				let tabName = s[s.length - 1]
				if(this.isTabClickByRoute && this.hasNameByPanes(tabName)) {
					this.tabclick(this.getIndexByName(tabName), tabName, true)
				}
				this.isTabClickByRoute = true
			},
			value(value) {
				this.setCurrentName(value);
			},
			currentName(value) {
				if(this.isTabClickByName) {
					this.tabclick(this.getIndexByPanes(), value)
				}
				this.isTabClickByName = true
			},
			'state.paneResize' (val) {
				if(this.paneScrollHandler) {
					this.paneScrollHandler()
				}
			},
			'tabs.width' (tabsWidth) {
				cancelAnimationFrame(this.tabWidthInterval)
				let _self = this
				this.tabWidthInterval = requestAnimationFrame(function req(){
					if (Object.isNotEmpty(_self.$refs.item)) {
						cancelAnimationFrame(_self.tabWidthInterval)
						const items = _self.tabitemWidth()
						let maxWidth = 0
						for(let index in items) {
							maxWidth += items[index].outerWidth
							if (Number.isNaN(maxWidth) || Number.isNaN(tabsWidth)) {
								continue
							}
							if(maxWidth > tabsWidth) {
								_self.tabs.length = parseInt(index)
								break
							} else if(parseInt(index) == items.length - 1) {
								_self.tabs.length = items.length
								break
							}
						}
						_self.transmove(_self.activeindex)
						_self.computedTabsBar(_self.activeindex)
					} else {
						_self.tabWidthInterval = requestAnimationFrame(req)
					}
				})
			},
			'tabs.length' (len) {
				let el = Selector('.tabs_item')
				for (let i = 0;i < el.length;i++) {
					el[i].style.display = 'inline-block'
				}
				let hasHiddenItem = false
				let _self = this
				for (let i in this.intervalH) {
					cancelAnimationFrame(this.intervalH[i])
				}
				this.intervalH = []
				for(var index = len; index < this.panes.length; index++) {
					hasHiddenItem = true
					let el = Selector('.tabs_item')
					interHidden(el, index)
				}
				function interHidden(el, i) {
					let inter = null
					_self.intervalH.push(inter = requestAnimationFrame(function req(){
						if (Object.isNotEmpty(el[i])) {
							cancelAnimationFrame(_self.intervalH[i])
							el[i].style.display = 'none'
						} else {
							inter = requestAnimationFrame(req)
						}
					}))
				}
			}
		},
		data() {
			return {
				paneWidth: 0,
				intervalH: [],
				state: this.$store.state,
				currentName: this.value,
				panes: [],
				isshow: false,
				activeindex: 0,
				resizefn: null,
				isTabClickByName: false,
				isTabClickByRoute: false,
				tabs: {
					width: 0,
					length: 0
				},
				menuHidden: true,
				menuBlurFn: null,
				itemsWidth: null,
				resizeTabsBarFn: null,
				initInterval: null,
				tabWidthInterval: null,
				computedTabInterval: null,
				paneScrollInterval: null,
				panesInterval: null
			}
		},
		components: {},
		created() {
			this.computedResize()
			this.obtainPanes()
		},
		mounted: function() {
			this.$nextTick(() => {
				let _self = this
				cancelAnimationFrame(this.initInterval)
				this.initInterval = requestAnimationFrame(function req(){
					if (_self.tabs.length) {
						cancelAnimationFrame(_self.initInterval)
						_self.resizeTabsBarFn = function() {
							_self.computedTabs()
						}
						ResizeUtils.on(_self.$refs.tabs_bar, _self.resizeTabsBarFn)
						_self.tabclick(_self.getIndexByPanes(), _self.currentName)
						_self.isTabClickByRoute = true	//首次加载置位解决后退bug
					} else {
						_self.initInterval = requestAnimationFrame(req)
					}
				})
			})
		},
		beforeDestroy: function() {
			for (let i in this.intervalH) {
				cancelAnimationFrame(this.intervalH[i])
			}
			if(this.resize) {
				window.removeEventListener('resize', this.resizefn)
			}
			if(this.menuBlurFn) {
				document.removeEventListener('click', this.menuBlurFn)
			}
			cancelAnimationFrame(this.initInterval)
			cancelAnimationFrame(this.tabWidthInterval)
			cancelAnimationFrame(this.computedTabInterval)
			cancelAnimationFrame(this.paneScrollInterval)
		},
		computed: {
			downPanes: function() {
				if (this.tabs.length) {
					return this.panes.slice(this.tabs.length)
				}
				return []
			},
			downmenuWrapStyle() {
				if (this.tabsType == 1) {
					return {
						'margin-left': this.hgoptions.paddingLeft,
						'margin-right': this.hgoptions.paddingRight
					}
				}
			},
			tabsBarStyle() {
				this.$nextTick(()=>{
					this.computedTabs()
				})
				if (this.tabsType == 1) {
					return {
						'padding-right': parseInt(this.right) + 'px',
						'margin-left': this.hgoptions.paddingLeft,
						'margin-right': this.hgoptions.paddingRight
					}
				}
				if (this.tabsType == 2) {
					return {
						'padding-right': parseInt(this.right) + 'px'
					}
				}
			},
			tabsItemStyle() {
				if (this.tabsType == 1) {
					return {
						'marginRight': '28px'
					}
				}
				if (this.tabsType == 2) {
					return {
						'width': '84px'
					}
				}
			}
		},
		methods: {
			isBlank(text) {
				if (Object.isEmpty(text)) {
					return true
				}
				if (text == 0) {
					return true
				}
				if (text == '0') {
					return true
				}
				return false
			},
			obtainPanes() {
				let _self = this
				this.panes = []
				cancelAnimationFrame(this.panesInterval)
				this.panesInterval = requestAnimationFrame(function req(){
					if (Object.isNotEmpty(_self.$slots.default)) {
						for(let i in _self.$slots.default) {
							if (
								!!_self.$slots.default[i].componentInstance && 
								_self.$slots.default[i].componentInstance.$el.nodeType == 1
							) {
								_self.panes.push(_self.$slots.default[i].componentInstance)
							}
						}
						if (_self.panes.length) {
							cancelAnimationFrame(_self.panesInterval)
						} else {
							_self.panesInterval = requestAnimationFrame(req)
						}
					} else {
						_self.panesInterval = requestAnimationFrame(req)
					}
				})
				
			},
			downMenuClick() {
				this.menuHidden = !this.menuHidden
				if (this.menuBlurFn) {
					return void 0
				}
				this.menuBlurFn = () => {
					this.menuHidden = true
				}
				document.addEventListener('click', this.menuBlurFn)
			},
			computedResize() {
				if(this.resize) {
					this.paneScrollHandler()
					this.resizefn = () => {
						if(this.$refs.tabs_bar) {
							this.paneScrollHandler()
						}
					}
					window.addEventListener('resize', this.resizefn, true);
				}
			},
			computedTabs() {
				let _self = this
				cancelAnimationFrame(this.computedTabInterval)
				this.computedTabInterval = requestAnimationFrame(function req(){
					_self.tabs.width = parseInt(_self.getStyle(_self.$refs.tabs_bar, 'width'))
					if (_self.tabs.width) {
						cancelAnimationFrame(_self.computedTabInterval)
					} else {
						_self.computedTabInterval = requestAnimationFrame(req)
					}
				})
			},
			paneScrollHandler() {
				let _self = this
				cancelAnimationFrame(this.paneScrollInterval)
				this.paneScrollInterval = requestAnimationFrame(function req(){
					if (_self.$el && _self.$el.clientWidth) {
						cancelAnimationFrame(_self.paneScrollInterval)
						_self.paneWidth = _self.$el.clientWidth
						_self.computedTabs()
					} else {
						_self.paneScrollInterval = requestAnimationFrame(req)
					}
				})
				
			},
			hasPanesName(name) {
				for(let i in this.panes) {
					if(name == this.panes[i].name) {
						return true
					}
				}
				return false
			},
			getIndexByPanes() {
				for(let i in this.panes) {
					if(this.currentName == this.panes[i].name) {
						this.activeindex = i
						return this.activeindex
					}
				}
				let s = this.$route.path.split('/')
				let tabName = s[s.length - 1]
				if (this.hasNameByPanes(tabName)) {
					return this.getIndexByName(tabName)
				}
				return this.activeindex
			},
			getIndexByName(name) {
				for(let i in this.panes) {
					if(name == this.panes[i].name) {
						return i
					}
				}
				return -1
			},
			hasNameByPanes(name){
				for(let i in this.panes) {
					if(name == this.panes[i].name) {
						return true
					}
				}
				return false
			},
			showByIndex(index, name) {
				for(let i in this.panes) {
					this.panes[i].active = null
				}
				this.panes[index].active = name
			},
			setStyle(el, text, val) {
				el.style[text] = val
			},
			getStyle(obj, attr) {
				if (!Object.isDOM(obj)) {
					return ''
				}
				let ret = ''
				if (obj.style.display == 'none') {
					obj.style.display = 'inline-block'
					ret = document.defaultView.getComputedStyle(obj, null)[attr]
				}
				return Object.isNotEmpty(ret)?ret:document.defaultView.getComputedStyle(obj, null)[attr];
			},
			computedTabsBar(index) {
				if (index >= this.tabs.length) {
					this.isshow = false
				} else {
					this.isshow = true
				}
			},
			tabclick(index, name, notBrowserHistory) {
				let ali = name
				this.activeindex = index
				this.computedTabs()
				this.isTabClickByName = false
				this.isTabClickByRoute = false
				if(this.$listeners.hasOwnProperty('tab-click')) {
					if(Object.isEmpty(ali)) {
						ali = this.panes[index].name
						this.$emit('tab-click', this.panes[index], index, ali)
					} else {
						this.$emit('tab-click', this.panes[index], index, ali)
					}
				}
				this.transmove(index)
				this.computedTabsBar(index)
				this.$emit('input', ali)
				this.showByIndex(index, ali)
				this.setDocumentTitle(index)
				if(this.isroute && this.$route.matched.length > 1 && !notBrowserHistory) {
					let path = this.$route.matched[1].path + '/' + ali
					this.$router.push({path: `${path}`})
				}
			},
			setDocumentTitle(index) {
				let label = this.panes[index].label
				document.title = `艾艺客-${label}`
			},
			tabitemWidth() {
				let l, r, s, ret = []
				for(let i in this.$refs.item) {
					l = parseFloat(this.getStyle(this.$refs.item[i], 'marginLeft'))
					r = parseFloat(this.getStyle(this.$refs.item[i], 'marginRight'))
					s = parseFloat(this.getStyle(this.$refs.item[i], 'width'))
					ret.push({
						outerWidth: l + r + s,
						width: s
					})
				}
				return ret
			},
			to(name) {
				let index = -1
				for(let i in this.panes) {
					if(this.panes[i].name == name) {
						index = i
						break
					}
				}
				this.tabclick(index, name)
			},
			transmove(index) {
				this.isshow = true
				const el = this.$refs.active_bar
				const pointDetails = this.getPointByIndex(index)
				const offset = pointDetails.offset
				const width = pointDetails.width
				const transform = `translateX(${offset}px)`;
				el.style.width = width + 'px';
				el.style.transform = transform;
				el.style.msTransform = transform;
				el.style.webkitTransform = transform;
			},
			getPointByIndex(index) {
				let obj = this.tabitemWidth()
				let ret = 0
				for(let i = 0; i < index; i++) {
					ret += obj[i].outerWidth
				}
				return {
					width: obj[index].width,
					offset: ret
				}
			},
			setCurrentName(value) {
				this.currentName = value;
			}
		}
	}
</script>

<style scoped>
	.right {
		position: absolute;
		right: 0;
		top: 0;
		height: 60px;
	    line-height: 56px;
	}
	.hauto {
		height: auto !important;
	}
	
	.tabs {
		height: 100%;
		overflow: hidden;
	}
	
	.tabs_item {
		height: 60px;
		line-height: 60px;
		font-size: 18px;
		color: #bbb;
		cursor: pointer;
		display: inline-block;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		text-align: center;
		float: left;
		position: relative;
	}
	
	.tabs_item.active {
		color: #000;
	}
	.tabs_item .tips {
	    position: absolute;
	    top: 12px;
	    left: 58px;
	    font-style: normal;
	    display: table;
	}
	.tabs_item .tips>span{
		font-size: 12px;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		color: #FFFFFF;
		letter-spacing: 0;
		background: #EE5A5A;
		border-radius: 150px;
		text-align: center;
		height: 15px;
		line-height: 15px;
		padding-left: 7.3px;
		padding-right: 7.3px;
		display: table-cell;
		white-space: nowrap;
	}
	.tabs_bar {
		position: relative;
		border-bottom: 1px solid #F0F0F0;
		height: 60px;
		overflow: hidden;
	}
	
	.active_bar {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 3px;
		background-color: #295dcf;
		z-index: 1;
		transition: transform .3s cubic-bezier(.645, .045, .355, 1);
		list-style: none;
		width: 89px;
	}
	.downmenu-wrap {
		position: relative;
		height: 0;
	}
	.downmenu {
		height: 60px;
		position: absolute;
		top: -60px;
		line-height: 60px;
		right: 0px;
		text-align: right;
	    z-index: 999;
	}
	.downmenu .menu {
		background: #FFFFFF;
		box-shadow: 0 7px 23px 0 rgba(0,0,0,0.04);
		border-radius: 2px;
		padding-left: 10px;
		padding-right: 10px;
		min-width: 100px;
		line-height: 40px;
		text-align: center;
		transition: all 0.5s;
		position: absolute;
		top: 60px;
		right: 0;
	}
	.downmenu .menu.active {
	    transform-origin: right top;
	    -moz-transform-origin: right top;
	    -ms-transform-origin: right top;
	    -webkit-transform-origin: right top;
	    transform: scaleX(0);
	    -webkit-transform: scaleX(0);
	    -moz-transform: scaleX(0);
	    -ms-transform: scaleX(0);
	}
	.downmenu .menu li{
		cursor: pointer;
		border-bottom: 1px solid #F1F1F1;
		font-size: 12px;
		color: #999999;
		white-space: nowrap;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: none;
	}
	.downmenu .menu li.active{
		color: #333333;
	}
	.downmenu .menu li:nth-last-of-type(1) {
		border-bottom: none;
	}
	.caret {
		cursor: pointer;
		display: inline-block;
		width: 0;
		height: 0;
		vertical-align: middle;
		border-top: 6px dashed;
		border-top: 6px solid\9;
		border-top-color: #979797;
		border-right: 6px solid transparent;
		border-left: 6px solid transparent;
	}
</style>
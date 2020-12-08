<template>
	<div class="wrap">
		<div class="menu-wrap">
			<div class="logo">
				<div class="svg-bg"></div>
				<img src="../../../static/img/logo1.png" width="41" height="42" />
				<!--<svg id="svg" 
					 class="middle" 
					 version="1.1"
				     width="41" height="42"
				     xmlns="http://www.w3.org/2000/svg"
				     xmlns:xlink="http://www.w3.org/1999/xlink">
				    <image xlink:href="/static/img/logo.svg" width="41" height="42"/>
				</svg>-->
			</div>
			<section class="scrollli-wrap">
				<!--<el-scrollbar class="ayk-scrollbar" wrapClass="ayk-scrollbar__wrap">-->
				<herghost-scroll class="hgscroll-menu">
					<el-menu ref="menu" :default-active="activePath" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="true">
						<el-menu-item v-for="(item, index) in menuList" :index="obtainMenuIndexPath(item)" :key="index">
							<span slot="title">{{item.title}}</span>
							<router-link :to="obtainMenuChildrenIndexPath(item)">
								<i :class="[parseIconByClass(item)]" :style="parseIconByStyle(item)"></i>
							</router-link>
						</el-menu-item>
					</el-menu>
				</herghost-scroll>
				<!--</el-scrollbar>-->
			</section>
			<div class="user-info">
				<div class="tx-wrap">
					<div class="svg-bg"></div>
					<img class="tx" :src="txSrc" @error="txSrcError" />
					<div class="menu-list-wrap">
						<ul class="menu-list clearfix">
							<li>个人中心</li>
							<li @click="changePassWord">密码修改</li>
							<li @click="quitlogin">注销</li>
						</ul>
					</div>
				</div>
				<p class="username">{{dataList.uc.chName}}</p>
				<div class="msgalert">
					<i class="el-icon-icon-xiaoxi1 msg" @click.stop="tomsgalert"></i>
					<i class="hasmsg" v-show="newMsgVisible"></i>
				</div>
			</div>
		</div>
		<div class="msg-list hardware-speedup" :class="[showMsgAlert?'active':'']" @click.stop="()=>{}">
			<div class="title">
				<span class="text middle">最新消息</span>
				<span class="clear middle" @click="clearMsg">清除</span>
				<div class="line"></div>
			</div>
			<section class="scrollmsg-wrap">
				<herghost-scroll>
					<ul class="msgwrap">
						<li class="item" v-for="(item, index) in msgList">
							<div class="l-area">
								<img class="user-tx" src="../../assets/img/msg.png" />
							</div>
							<div class="r-area">
								<p class="text">{{item.content}}</p>
								<p class="time"><span>{{item.updateTime}}</span></p>
							</div>
						</li>
					</ul>
				</herghost-scroll>
			</section>
		</div>
		<div class="el-menu-right" ref="rightmenu">
			<slot>
				<div class="expection">
					<img src="../../assets/img/zanwu.png" alt="" />
					<div>未拥有相关权限</div>
				</div>
			</slot>
		</div>
		<ChangePasswordDialog :visible.sync="cpvisible"></ChangePasswordDialog>
		<QuitUserDialog :visible.sync="quitvisible" :success="quitAction"></QuitUserDialog>
	</div>
</template>

<script>
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	let ChangePasswordDialog = () =>
		import('@/modules/PerCenter/ChangePassword.vue')
	let QuitUserDialog = () =>
		import('@/modules/PerCenter/QuitUserDialog.vue')

	export default {
		name: 'commonMenu',
		props: {},
		created() {
			this.mpPath()
			this.islinkAtMenuList(window.location.pathname)
		},
		mounted() {
			this.$nextTick(() => {
				this.bindEvent()
				this.obtainMsgListInterval()
				this.obtainMsgList()
			})
		},
		data: function() {
			return {
				dataList: JSON.parse(Cache.local(Config.Login)),
				quitvisible: false,
				unload: true,
				cpvisible: false,
				showMsgAlert: false,
				menuList: this.$store.getters.menu$route.menu,
				msgList: [],
				msgListLen: 0,
				msgListCount: 0,
				newMsgVisible: false,
				txSrcErrorFlag: false,
				activePath: '',
				mappingPath: {}
			}
		},
		components: {
			'herghost-scroll': HerGhostScroll,
			ChangePasswordDialog,
			QuitUserDialog
		},
		computed: {
			txSrc() {
				let imgPath = ''
				if(Object.isNotEmpty(this.dataList.uc.userIcon)) {
					imgPath = [Config.StaticUrl, this.dataList.uc.userIcon].join('')
				} else {
					imgPath = "/static/img/userIcon.png"
				}
				if(this.txSrcErrorFlag) {
					imgPath = "/static/img/userIcon.png"
				}
				return imgPath
			}
		},
		watch: {
			'$route' (to, from) {
				this.islinkAtMenuList(to.path)
			},
			msgListLen(cv, ov) {
				if(this.msgListCount > 1 && cv > ov && !this.showMsgAlert) {
					this.newMsgVisible = true
				}
			}
		},
		methods: {
			loadImg(url, callback) {
				var img = new Image()
				img.src = url
				if(img.complete) {
					callback(img.width, img.height, url)
				} else {
					img.onload = function() {
						callback(img.width, img.height, url)
						img.onload = null
					}
				}
			},
			isImgType(str) {
				let sp = str.split('.')
				if(sp.indexOf('png') != -1) {
					return true
				}
				if(sp.indexOf('jpg') != -1) {
					return true
				}
				if(sp.indexOf('jpeg') != -1) {
					return true
				}
				return false
			},
			parseIconByClass(item) {
				if(
					Object.isNotEmpty(item.icon) &&
					!this.isImgType(item.icon)
				) {
					return `el-icon-${item.icon}`
				} else {
					return 'el-icon-document'
				}
			},
			parseIconByStyle(item) {
				if(this.isImgType(item.icon)) {

					return {}
				}
				return {}
			},
			mpPath() {
				for(let i in this.menuList) {
					this.mappingPath[this.menuList[i].path] = true
				}
			},
			islinkAtMenuList(lk) {
				if(!this.mappingPath[lk]) {
					let pathArr = lk.split('/')
					let len = pathArr.length
					for(let i = 0; i < len; i++) {
						pathArr.pop()
						let j = pathArr.join('/')
						if(j == '') {
							break
						}
						if(this.mappingPath[j]) {
							this.activePath = j
							break
						}
					}
				} else {
					this.activePath = lk
				}
			},
			txSrcError() {
				this.txSrcErrorFlag = true
			},
			clearMsg() {
				this.$http.post('/api/message/deleteByUcId', {
						ucId: this.dataList.uc.id
					}, {
						emulateJSON: true
					})
					.then((res) => {
						if(res.data.success) {
							this.$message({
								customClass: 'success',
								customClass: 'success',
								message: res.data.message
							})
							Cache.removeLocal('msg:::' + this.dataList.uc.id)
							this.msgListCount = 0
							this.obtainMsgList()
						} else {
							this.$message({
								customClass: 'error',
								customClass: 'error',
								message: res.data.message
							})
						}
					}).catch((err) => {

					})
			},
			obtainMenuIndexPath(item) {
				return item.path
			},
			obtainMenuChildrenIndexPath(item) {
				if(Object.isNotEmpty(item.children) && item.children.length) {
					return item.children[0].path
				} else {
					return item.path
				}
			},
			obtainMsgListInterval() {
				let tempInterval = setInterval(() => {
					this.obtainMsgList()
				}, 1000 * 60)
			},
			obtainMsgList() {
				this.$http.post('/api/message/list', {}, {
						emulateJSON: true
					})
					.then((res) => {
						if(res.data.success) {
							if(Array.isArray(res.data.result.content)) {
								this.msgList = res.data.result.content
							} else {
								this.msgList = []
							}
							if(this.msgListCount == 0) {
								let preLen = JSON.parse(Cache.local('msg:::' + this.dataList.uc.id))
								if(Object.isNotEmpty(preLen)) {
									if(this.msgList.length > parseInt(preLen) && !this.showMsgAlert) {
										this.newMsgVisible = true
									}
								}
							}
							this.msgListCount++
								this.msgListLen = this.msgList.length
							Cache.local('msg:::' + this.dataList.uc.id, this.msgListLen + '')
						}
					}).catch((err) => {

					})
			},
			scrollLoadSuc() {
				this.unload = false
			},
			changePassWord() {
				this.cpvisible = true
			},
			quitlogin() {
				this.quitvisible = true
			},
			quitAction() {
				this.$store.dispatch('QUIT')
			},
			bindEvent() {
				let _self = this
				document.addEventListener('click', function(e) {
					_self.showMsgAlert = false
				})
			},
			tomsgalert() {
				this.newMsgVisible = false
				this.showMsgAlert = !this.showMsgAlert
			},
			getStyle(el, attr) {
				return getComputedStyle(el, false)[attr]
			},
			handleOpen(key, keyPath) {},
			handleClose(key, keyPath) {}
		}
	}
</script>

<style scoped>
	.svg-bg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		z-index: 2;
	}
	
	.scrollmsg-wrap {
		position: relative;
		top: -46px;
		padding-top: 46px;
		height: 100%;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.scrollli-wrap {
		height: 100%;
		width: 100%;
		top: 86px;
		padding-bottom: 226px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		position: relative;
	}
	
	.menu-hgscroll {
		width: 100px;
	}
	
	.expection {
		position: absolute;
		left: 100px;
		top: 0px;
		bottom: 0px;
		right: 0px;
		width: 200px;
		text-align: center;
		color: #bbb;
		height: 190px;
		font-size: 12px;
		margin: auto;
	}
	
	.el-menu-item {
		width: 100px;
	}
	
	.msg-list {
		height: 100%;
		width: 322px;
		position: absolute;
		left: -222px;
		overflow: hidden;
		z-index: 999;
		background: #FFFFFF;
		box-shadow: 0 14px 21px 0 rgba(0, 0, 0, 0.15);
		border-radius: 2px 2px 2px 0;
		transition: transform 0.25s linear;
	}
	
	.msg-list.active {
		transform: translateX(322px);
	}
	
	.title {
		position: relative;
		height: 46px;
		line-height: 46px;
		z-index: 2;
	}
	
	.title .line {
		position: absolute;
		bottom: 0;
		height: 1px;
		background: #f1f1f1;
		width: 100%;
	}
	
	.title .text {
		font-size: 14px;
		color: #000000;
		padding-left: 14px;
	}
	
	.title .clear {
		float: right;
		font-size: 12px;
		color: #295DCF;
		padding-right: 14px;
		cursor: pointer;
	}
	
	.msgwrap {}
	
	.msgwrap .item {
		padding-top: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid #F1F1F1;
		overflow: hidden;
	}
	
	.msgwrap .item .l-area {
		width: 30px;
		float: left;
	}
	
	.msgwrap .item .l-area .user-tx {
		width: 30px;
		height: 30px;
		border-radius: 100%;
		margin-top: 4px;
	}
	
	.msgwrap .item .r-area {
		margin-left: 30px;
		padding-left: 20px;
	}
	
	.msgwrap .item .r-area .text {
		font-size: 12px;
		color: #333333;
	}
	
	.msgwrap .item .r-area .time {
		font-size: 12px;
		color: #999999;
		margin-top: 6px;
	}
	
	.msgwrap .item .r-area .time>span {
		transform: scale(0.833333);
		display: inline-block;
		transform-origin: left;
	}
	
	.user-info {
		height: 140px;
		text-align: center;
		background-color: #295dcf;
		position: absolute;
		bottom: 0;
		z-index: 1;
		width: 100px;
	}
	
	.msgalert {
		margin-top: 12px;
		position: relative;
	}
	
	.msgalert .msg {
		display: inline-block;
		width: 20px;
		height: 20px;
		cursor: pointer;
		color: #78A7FF;
		font-size: 20px;
	}
	
	.hasmsg {
		width: 6px;
		height: 6px;
		background: #EE5A5A;
		position: absolute;
		top: 1px;
		left: 50%;
		border-radius: 100%;
		margin-left: 4px;
	}
	
	.user-info .username {
		padding-bottom: 2px;
		font-size: 12px;
		color: #85A5EA;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		max-height: 34px;
	}
	
	.user-info .tx-wrap {
		padding-left: 10px;
		padding-right: 10px;
		width: 38px;
		height: 38px;
		display: inline-block;
		position: relative;
		margin-top: 20px;
	}
	
	.user-info .tx {
		width: 38px;
		height: 38px;
		cursor: pointer;
		display: inline-block;
		border-radius: 100%;
		background: #fff;
	}
	
	.menu-list-wrap {
		left: 0px;
		top: 0;
		position: absolute;
		padding-left: 60px;
		display: none;
	}
	
	.tx-wrap:hover .menu-list-wrap {
		display: block;
	}
	
	.menu-list {
		position: relative;
		height: 40px;
		border-radius: 4px;
		background: #fff;
		height: 40px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		line-height: 40px;
		width: 192px;
		box-shadow: 0 14px 21px 0 rgba(0, 0, 0, 0.15);
		border-radius: 2px 2px 2px 2px;
	}
	
	.menu-list:before {
		content: "";
		display: inline-block;
		position: absolute;
		width: 0px;
		height: 0px;
		left: -5px;
		top: 15px;
		border-right: 5px solid #fff;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
	}
	
	.menu-list li {
		float: left;
		color: #9e9e9e;
		display: inline-block;
		font-size: 14px;
		cursor: pointer;
		padding-left: 8px;
		padding-right: 8px;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.menu-list li:after {
		content: "";
		position: relative;
		display: inline-block;
		width: 1px;
		height: 12px;
		background: #f2f2f2;
		left: 8px;
	}
	
	.menu-list li:hover {
		color: #4d4d4d;
	}
	
	.logo {
		width: 100px;
		height: 86px;
		line-height: 107px;
		text-align: center;
		color: #FFFFFF;
		font-size: 28px;
		position: absolute;
		background-color: #295dcf;
		z-index: 1;
	}
	
	.menu-wrap {
		width: 100px;
		height: 100%;
		background: #295dcf;
		position: relative;
		float: left;
		z-index: 1000;
	}
	/*.el-menu-vertical {
		height: 100%;
		width: 100px;
	}*/
	
	.el-menu--collapse {
		width: auto;
	}
	
	.el-menu-right {
		margin-left: 100px;
		height: 100%;
	}
	
	.el-menu-item {
		text-align: center;
		font-size: 22px;
		height: 66px;
		line-height: 66px;
		color: #fff;
	}
	
	.el-menu-item.is-active {
		color: #fff;
	}
	
	.el-menu-item.is-active i {
		background-color: #4c84ff;
		border-radius: 6px;
	}
	
	.el-menu-item:hover {
		background-color: initial;
	}
	
	.el-menu-item i:hover {
		background-color: #4c84ff;
		border-radius: 6px;
	}
	
	.el-menu-item [class^="el-icon-"] {
		margin-right: 0px;
		width: 54px;
		height: 52px;
		line-height: 52px;
		text-align: center;
	}
	
	.wrap {
		height: 100%;
	}
	
	.el-menu {
		background-color: #295dcf;
	}
	
	.el-menu,
	.el-row,
	.el-col {
		height: 100%;
	}
	
	.el-menu-right {}
	
	.menu-hgscroll.unload {
		opacity: 0;
	}
</style>
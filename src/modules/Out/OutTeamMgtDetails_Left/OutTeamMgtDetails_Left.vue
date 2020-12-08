<!--外围管理-外围项目管理详情-左侧模块-->
<template>
	<div class="layout">
		<div class="layout-in">
			<div class="unknow-icon">
				<span class="ayk-icon ayk-icon-text showCertIcon">
					<vue-preview class="ayk-hiddenpreview" :slides="slide1"></vue-preview>
				</span>
				<el-switch @change="orderStatusChange" class="switch-type-1 outeamdetails__switch" v-model="orderStatus" on-color="#295DCF" off-color="#f2f2f2" on-text="接单" off-text="停止" :on-value="1" :off-value="0">
				</el-switch>
			</div>
			<div class="tx-area">
				<div class="tx-box">
					<div class="tx-prospect"></div>
					<img class="tx-img" v-show="imgUrl" :src="imgUrl" />
				</div>
				<i v-if="hasAuthen" class="ayk-icon ayk-icon-authen"></i>
			</div>
			<p class="company__name">{{teamDetails.bus && teamDetails.bus.name}}</p>
			<div class="jdinfo-area">
				<span>
					<i class="ayk-icon ayk-icon-cp"></i>
					<span class="jdinfo-area__text">{{teamDetails.bus && teamDetails.bus.cooperate}}次</span>
				</span>
				<span>
					<i class="ayk-icon ayk-icon-star"></i>
					<span class="jdinfo-area__text">{{teamDetails.busStar}}颗</span>
				</span>
				<template v-if="HasPermission('orderOut')">
					<span v-if="orderStatus">
						<i class="ayk-icon ayk-icon-jiedan"></i>
						<span class="jdinfo-area__text">接单</span>
					</span>
					<span v-else>
						<i class="ayk-icon ayk-icon-stop"></i>
						<span class="jdinfo-area__text">停止</span>
					</span>
				</template>
			</div>
			<table class="jj-area">
				<tr>
					<td>
						<i class="ayk-icon ayk-icon-phone"></i>
						<div class="text-area">
							<span>{{teamDetails.bus && teamDetails.bus.phone}}</span>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<i class="ayk-icon ayk-icon-print"></i>
						<div class="text-area">
							<span>{{teamDetails.bus && teamDetails.bus.fax}}</span>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<i class="ayk-icon ayk-icon-point"></i>
						<div class="text-area">
							<span>{{teamDetails.bus && teamDetails.bus.address}}</span>
						</div>
					</td>
				</tr>
			</table>
			<el-button type="primary" class="submitbtn single-btn" @click="editClick" v-if="HasPermission('outBusEdit')">编辑</el-button>
			<div class="btn-group" v-if="authBtnVisible && HasPermission('authBtnOut')">
				<el-button type="primary" class="submitbtn" @click="authClick(5)">认证</el-button>
				<el-button type="primary" class="cancelbtn" @click="authClick(1)">驳回</el-button>
			</div>
			<div class="btn-group" v-if="auditBtnVisible && HasPermission('auditBtnOut')">
				<el-button type="primary" class="submitbtn" @click="auditClick(7)">审核</el-button>
				<el-button type="primary" class="cancelbtn" @click="auditClick(3)">驳回</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OutTeamMgtDetails_Left',
		data() {
			return {
				state: this.$store.state,
				orderStatus: 1,
				slide1: [],
				teamDetails: {
					bus:{
						logo:""
					}
				},
				authFlag: false,
				auditFlag: false,
				imgUrl:""
			}
		},
		watch: {
			'state.teamDetails': {
				deep: true,
				handler(val) {
					this.teamDetailsHandler(val)
				}
			}
		},
		components: {},
		mounted: function() {
//			this.$emit("reload")
			this.teamDetailsHandler(this.$store.getters.teamDetails)
		},
		computed: {
			itemId() {
				let params = this.$route.params.id
				if (Object.isNotEmpty(params)) {
					return params.split('-')[0]
				} else {
					return this.$store.getters.loginInfo.bus.id
				}
			},
			authBtnVisible() {
				let status = this.teamDetails && this.teamDetails.bus && this.teamDetails.bus.status
				if(status == 0 || status == 1 || status == 2 && !this.authFlag) {
					return true
				} else {
					return false
				}
			},
			auditBtnVisible() {
				let status = this.teamDetails && this.teamDetails.bus && this.teamDetails.bus.status
				if(status == 3 || status == 4 && !this.auditFlag) {
					return true
				} else {
					return false
				}
			},
			hasAuthen() {
				let ret = false
				if(this.teamDetails.bus && this.teamDetails.bus.isLicense == 1) {
					ret = true
				}
				return ret
			}
		},
		methods: {
			teamDetailsHandler(val) {
				this.teamDetails = Object.deepClone(val)
				if (Object.isNotEmpty(this.teamDetails)) {
					this.imgUrl = `${Config.StaticUrl}${this.teamDetails.bus && this.teamDetails.bus.logo}`
					this.init()
				}
			},
			init() {
				this.slide1.push({
					src: Config.StaticUrl+this.teamDetails.bus.license,
					msrc: Config.StaticUrl + this.teamDetails.bus.license,
					w: 1200,
					h: 900
				})
				this.orderStatus = this.teamDetails.bus.isOrder
			},
			editClick() {
				this.$router.push({
					path: `/out/outMgt/tedit/${this.itemId}`
				});
			},
			orderStatusChange() {
				this.$http.post("/api/bus/isOrder", {
					isOrder: this.orderStatus,
					busId: this.itemId
				}, {
					emulateJSON: true
				}).then((res) => {}).catch((err) => {})
			},
			authClick(status) {
				this.$http.post("/api/bus/examineBus", {
					busId: this.itemId,
					status
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.data.success) {
						this.authFlag = true
						this.$emit("reload")
						this.$message({
						customClass: 'success',
						message: '操作成功'
						});
					}
				}).catch((err) => {
					this.$message({
						customClass: 'error',
						message: '操作失败'
					});
				})
			},
			auditClick(status) {
				this.$http.post("/api/bus/auditBus", {
					busId: this.itemId,
					status
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.data.success) {
					this.auditFlag = true
					this.$emit("reload")
					this.$message({
						customClass: 'success',
						message: '操作成功'
					});
					}
				}).catch((err) => {
						this.$message({
						customClass: 'error',
						message: '操作失败'
					});
				})
			},
		}
	}
</script>

<style scoped>
	.btn-group {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.showCertIcon {
		overflow: hidden;
	}
	
	.single-btn {
		margin-top: 94px;
		margin-left: auto;
		margin-right: auto;
		display: block;
		margin-bottom: 24px;
	}
	
	.jj-area {
		width: 280px;
		background: #F8F9FB;
		border-radius: 4px;
		margin: 42px auto 0px auto;
		box-sizing: border-box;
		padding: 0px 40px 0px 25px;
	}
	
	.jj-area td {
		border-bottom: 1px dashed rgba(130, 130, 130, .26);
		font-size: 12px;
		color: #999999;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	
	.jj-area tr:nth-last-of-type(1) td:nth-last-of-type(1) {
		padding-top: 12px;
	}
	
	.jj-area tr:nth-last-of-type(1) td {
		border: none;
	}
	
	.jj-area .ayk-icon {
		margin-right: 20px;
		float: left;
		margin-top: 3px;
	}
	
	.jj-area .text-area {
		margin-left: 32px;
	}
	
	.jdinfo-area {
		text-align: center;
		margin-top: 12px;
	}
	
	.jdinfo-area>span {
		margin-right: 28px;
		text-align: center;
		display: inline-block;
		width: 50px;
	}
	
	.jdinfo-area>span:nth-last-of-type(1) {
		margin-right: 3px;
	}
	
	.jdinfo-area .jdinfo-area__text {
		font-size: 12px;
		color: #999;
		display: block;
		transform: scale(0.92);
		transform-origin: center;
	}
	
	.company__name {
		margin-top: 18px;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 16px;
		color: #000000;
		letter-spacing: 0;
		text-align: center;
	}
	
	.tx-area {
		padding-top: 44px;
		position: relative;
		transform: translateZ(0);
	}
	
	.tx-img {
		position: absolute;
		left: 2px;
		right: 2px;
		bottom: 2px;
		top: 2px;
		width: 64px;
		height: 64px;
		z-index: 1;
		margin: auto;
	}
	
	.tx-prospect {
		background: url(../../../assets/img/qiqiu-tx-bg.png) no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0px;
		top: 0px;
		width: 64px;
		height: 64px;
		margin: auto;
		z-index: 2;
	}
	
	.tx-box {
		position: relative;
		overflow: hidden;
		width: 92px;
		height: 92px;
		background: #fff;
		border: 2px solid #eee;
		outline: none;
		margin: auto;
		border-radius: 100%;
	}
	
	.ayk-icon-authen {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: -4px;
		outline: none;
		border: none;
	}
	
	.unknow-icon {
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.viewAllotment {
		background: #fff;
		padding-bottom: 14px;
	}
	
	.layout .line {
		margin-bottom: 14px;
		position: relative;
		margin-left: -20px;
		margin-right: -20px;
		height: 1px;
		opacity: 0.26;
		background: #D5D5D5;
		border: none;
	}
	
	.layout {
		width: 350px;
		position: relative;
	}
	
	.layout .title {
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		padding-left: 20px;
	}
	
	.mlr {
		margin-left: 5px;
		margin-right: 5px;
		width: auto;
	}
	
	.mt14 {
		margin-top: 14px;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0
	}
</style>
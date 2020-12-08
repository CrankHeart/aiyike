<!--外围申请审核模块-->
<template>
	<div class="wrap">
		<NoDetails :isloading.sync="isloading" v-show="!hasData" class="ayk-audit__loading"></NoDetails>
		<div class="todo-item" v-for="(item, index) in ioApplyList">
			<span class="pending-position" v-if="IoApplyStatus(item)">
						{{IoApplyStatus(item) | IoApplyStatus}}
					</span>
			<div class="title clearfix">
				<span class="primary-tag">{{applyText | nullformat}}</span>
				<div class="content">{{titleText(item) | nullformat}}</div>
			</div>
			<div class="dsc">
				<span class="tip">申请原因：</span>
				<span class="content">{{obtainTypeText(item.type) | nullformat}}</span>
			</div>
			<div class="dsc" v-if="budgetVisible">
				<span class="tip">外围预算：</span>
				<span class="content">{{item.budget.toFixed(2) | moneyformat | nullformat}}元</span>
			</div>
			<div class="dsc">
				<span class="tip">申请日期：</span>
				<span class="content">{{item.create_time | timeStamp2Text | nullformat}}</span>
			</div>
			<div class="dsc">
				<span class="tip">{{rejectResonText(item).tip}}</span>
				<span class="content">{{rejectResonText(item).content}}</span>
			</div>
			<el-button type="primary" class="btn" @click="bbbb(item)">{{btnText(item)}}</el-button>
		</div>
	</div>
</template>

<script>
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	let NoDetails = () =>
		import('@/components/no-details/NoDetails.vue')

	export default {
		name: 'OutApplyWrap',
		data() {
			return {
				isloading: true,
				hasData: false,
				taskData: {},
				ioApplyList: [],
				ioApplyListBk: [],
				outReason: [],
				loginInfo: this.$store.getters.loginInfo
			}
		},
		watch: {
			isloading(val) {
				if(val) {
					this.getToDoTask()
				}
			}
		},
		components: {
			'herghost-scroll': HerGhostScroll,
			NoDetails
		},
		mounted: function() {
			this.$nextTick(()=>{
				this.obtainReasonDic()
				this.getToDoTask()
			})
		},
		computed: {
			applyText() {
				let type = this.loginInfo.bus.type
				if (2 == type) {
					return '评估报价'
				} else {
					return '申请外围'
				}
			},
			budgetVisible() {
				let type = this.loginInfo.bus.type
				if (2 == type)
					return false
				return true
			}
		},
		methods: {
			IoApplyStatus(item) {
				let type = this.loginInfo.bus.type
				if (2 == type) {
					return ''
				} else {
					return item.status
				}
			},
			obtainReasonDic() {
				this.$store.dispatch("DICTIONARY", "apply_reason").then((data) => {
					this.outReason = data;
				})
			},
			obtainTypeText(type) {
				let name = '',
					item = {}
				for(let i in this.outReason) {
					item = this.outReason[i]
					if(item.value == type) {
						name = item.name
						break
					}
				}
				return name
			},
			getToDoTask: function() {
				let loginInfo = JSON.parse(Cache.local(Config.Login))
				let curUserId = loginInfo.uc.id;
				this.$http.post('/api/process/selfToDoTask?curUserId=' + curUserId, null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.taskData = data.result || {}
							this.ioApplyListBk = [
								...(this.taskData.ioApplyList || []),
								...(this.taskData.outMgrList || [])
							]
							this.ioApplyListHandler()
						}
						if(Object.isEmpty(this.ioApplyListBk)) {
							this.noAudit()
						} else {
							this.hasAudit()
						}
					}).catch((err) => {
						this.noAudit()
					})
			},
			titleText(item) {
				let $theme = item.$theme
				if(Object.isNotEmpty($theme.cname)) {
					return `${$theme.cname}——${item.item_name}`
				}
				return `${item.item_name}`
			},
			rejectResonText(item) {
				let $theme = item.$theme
				let rejectReson = $theme.rejectReson
				if(Object.isNotEmpty(rejectReson)) {
					let remark = item.comment.remark
					if(Object.isEmpty(remark)) {
						remark = ''
					}
					return {
						tip: rejectReson,
						content: remark
					}
				}
				return {
					tip: '',
					content: ''
				}
			},
			btnText(item) {
				let $theme = item.$theme
				return `${$theme.btntext}`
			},
			obtainTheme(item) {
				let btntext = '',
					cname = '',
					rejectReson = ''
				switch(parseInt(item.status)) {
					case 0:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							cname = "驳回"
							rejectReson = "驳回原因："
							btntext = "编辑"
						}
						break;
					case 1:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							cname = "驳回"
							rejectReson = "驳回原因："
							btntext = "编辑"
						}
						break;
					case 2:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							cname = "驳回"
							rejectReson = "驳回原因："
							btntext = "编辑"
						}
						break;
					case 3:
						if(Object.isEmpty(item.taskId)) {
							btntext = "再次评估"
						} else if(item.is_pass == 1) {
							let type = this.loginInfo.bus.type
							if (2 == type) {
								btntext = "评估"
							} else {
								btntext = "审核"
							}
						} else {
							btntext = "编辑"
						}
						break;
					case 4:
						if(Object.isEmpty(item.taskId)) {
							btntext = "再次评估"
						} else if(item.is_pass == 1) {
							let type = this.loginInfo.bus.type
							if (2 == type) {
								btntext = "评估"
							} else {
								btntext = "审核"
							}
						} else {
							btntext = "编辑"
						}
						break;
					case 5:
						if(Object.isEmpty(item.taskId)) {
							btntext = "再次评估"
						} else if(item.is_pass == 1) {
							btntext = "去选标"
						} else {
							cname = "驳回"
							rejectReson = "驳回原因："
							btntext = "编辑"
						}
						break;
					case 6:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							cname = "驳回"
							rejectReson = "驳回原因："
							btntext = "编辑"
						}
						break;
					case 7:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							cname = "驳回"
							rejectReson = "驳回原因："
							btntext = "编辑"
						}
						break;
					case 8:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							cname = "驳回"
							btntext = "编辑"
						}
						break;
					case 9:
						if(item.is_pass == 1) {
							btntext = "填写付款计划"
						} else {
							btntext = "编辑"
						}
						break;
					case 10:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							btntext = "编辑"
						}
						break;
					case 11:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							btntext = "编辑"
						}
						break;
					case 12:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							btntext = "编辑"
						}
						break;
					case 13:
						if(item.is_pass == 1) {
							btntext = "审核"
						} else {
							btntext = "编辑"
						}
						break;
					default:
						break;
				}

				return {
					cname,
					btntext,
					rejectReson
				}
			},
			ioApplyListHandler() {
				let ret = []
				for(let i in this.ioApplyListBk) {
					this.$set(this.ioApplyListBk[i], '$theme', )
					this.ioApplyListBk[i].$theme = this.obtainTheme(this.ioApplyListBk[i])
				}
				ret.sort(function(a, b) {
					return b.create_time - a.create_time
				})
				this.ioApplyList = this.ioApplyListBk
				this.$emit("obtainTipsLen", this.ioApplyList.length)
			},
			hasAudit() {
				this.isloading = false
				this.hasData = true
			},
			noAudit() {
				this.isloading = false
				this.hasData = false
			},
			bbbb(item) {
				this.$store.commit('outItemAudit', item)
				if(+item.status == 0 && +item.is_pass == 0) {
					this.$store.commit('outItemMgtSteps_State', "edit")
					this.$router.push("/out/outMgt/outItemMgt")
				} else {
					this.$router.push(`/out/outMgt/details/${item.id}-${item.status}`);
				}
			},
		}
	}
</script>

<style scoped>
	.primary-tag {
		font-size: 12px;
		border-radius: 2px;
		border: 1px solid #295DCF;
		display: inline-block;
		color: #295DCF;
		float: left;
		padding: 1px 6px;
		margin-right: 10px;
	}
	
	.pending-position {
		width: auto;
		padding: 2px 13px;
		background: #F9F9F9;
		border-radius: 2px;
		font-size: 12px;
		color: #295DCF;
	}
	
	.pending-position+div {
		margin-top: 13px;
	}
	
	.todo-item .btn {
		font-size: 14px;
		margin-top: 10px;
		min-width: 78px;
		height: 30px;
		padding: 0;
		padding-left: 6px;
		padding-right: 6px;
		background-color: #295DCF;
		border-color: #295DCF;
	}
	
	.todo-item {
		padding-top: 26px;
		padding-bottom: 26px;
		border-bottom: 1px solid #F0F0F0;
		padding-right: 20px;
	}
	
	.todo-item:last-child {
		/*border-bottom: none;*/
	}
	
	.todo-item .title .content {
		display: block;
		position: relative;
		font-size: 16px;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.todo-item .dsc {
		margin-top: 8px;
		color: #b9b9b9;
		font-size: 12px;
	}
</style>
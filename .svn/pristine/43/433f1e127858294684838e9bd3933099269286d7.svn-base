<!--日志审核模块-->
<template>
	<div class="wrap">
		<LogDetails :visible.sync="logDetailsVisible" @toLogAudit="link2Page" :reportLogList="reportLogList" :dayLog="dayLog" :logDoCommentHidden="logDoCommentHidden"></LogDetails>
		<NoDetails v-show="!hasData" class="ayk-audit__loading" :isloading.sync="isloading"></NoDetails>
		<div class="todo-item" v-for="item in listData">
			<div class="title clearfix">
				<span class="success-tag">日志</span>
				<span class="content">{{item.ucName}}</span>
			</div>
			<div class="dsc">
				<span class="tip">工作类型：</span>
				<span class="content">{{item.type}}</span>
			</div>
			<div class="dsc">
				<span class="tip">工作日期：</span>
				<span class="content">{{item.workTime|fmtDate}}</span>
			</div>
			<el-button type="success" class="btn" @click="watchLogDetails(item.id)">审核</el-button>
		</div>
	</div>
</template>

<script>
	let NoDetails = () =>
		import('@/components/no-details/NoDetails.vue')
	let LogDetails = () =>
		import('@/modules/LogManagement/LogDetails.vue')
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	export default {
		name: 'LogWrap',
		data() {
			return {
				isloading: true,
				hasData: false,
				logDetailsVisible: false,
				logId: '',
				userId: JSON.parse(Cache.local(Config.Login)).uc.id,
				logDoCommentHidden: true,
				listData: [],
				reportLogList: [],
				dayLog: {}
			}
		},
		components: {
			LogDetails,
			NoDetails,
			'herghost-scroll': HerGhostScroll,
		},
		mounted: function() {
			this.$nextTick(() => {
				this.link2Page();
			});
		},
		watch: {
			isloading(val) {
				if(val) {
					this.reload()
				}
			}
		},
		methods: {
			watchLogDetails(row) {
				this.$http.post('/api/dayLog/queryDaylogBylogId?logId=' + row, {
					emulateJSON: true
				}).then((res) => {
					this.reportLogList = res.data.result.reportLogList;
					this.dayLog = res.data.result.dayLog;
					this.logDetailsVisible = true
				}).catch((err) => {

				});
			},
			reload() {
				this.link2Page()
			},
			hasDetails() {
				this.hasData = true
				this.isloading = true
			},
			noDetails() {
				this.hasData = false
				this.isloading = false
			},
			link2Page() {
				this.$http.post('/api/dayLog/queryDayLogtoCheck?userId=' + this.userId, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.result
					if(res.data.success) {
						this.listData = result
						this.$emit("obtainTipsLen", this.listData.length)
						if(this.listData.length > 0) {
							this.hasDetails()
						} else {
							this.noDetails()
						}
					}
				}).catch((err) => {
					this.noDetails()
				});
			}
		}
	}
</script>

<style scoped>
	
	.todo-item .btn {
		margin-top: 12px;
		font-size: 14px;
		padding: 0;
		width: 90px;
		height: 30px;
	}
	
	.todo-wrap:after {
		position: relative;
		content: "";
		display: block;
		width: 100%;
		height: 50px;
	}
	
	.todo-item {
		padding-top: 26px;
		padding-bottom: 26px;
		padding-right: 28px;
		border-bottom: 1px solid #F0F0F0;
	}
	
	.todo-item:last-child {
		border-bottom: none;
	}
	
	.todo-item .title .content {
		display: block;
		position: relative;
		left: 10px;
		font-size: 16px;
		top: 0px;
		color: #000;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.todo-item .dsc {
		margin-top: 8px;
		color: #b9b9b9;
		font-size: 12px;
	}
	
	.dsc:nth-of-type(2) {
		margin-top: 14px;
	}
	
	.header {
		height: 60px;
		padding-left: 20px;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.header .text {
		font-size: 18px;
		color: #000000;
	}
	
	.middle {
		vertical-align: center;
	}
	
	.todo {
		background: #fff;
		height: 100%;
		width: 334px;
		overflow: hidden;
	}
	
	.todo-wrap {
		height: 100%;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		position: relative;
		top: -60px;
		padding-top: 60px;
	}
	
	.alert-tag {
		position: relative;
		top: -2px;
		margin-left: 9px;
		padding: 1px 16.5px;
	}
	
	.success-tag {
		font-size: 10px;
		border-radius: 2px;
		border: 1px solid #1ABF69;
		display: inline-block;
		padding: 0.5px 7px;
		color: #1ABF69;
		float: left;
	}
</style>
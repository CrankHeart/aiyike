<!--项目管理-项目详情页-项目日志模块-->
<template>
	<div class="project_log">
		<div>
			<div class="log" v-for="(log ,index) in projectLogs" @click="watchLogDetails(log.id)">
				<div class="log_time">
					<p class="date">{{log.workTime | fmtMonthDay}}</p>
					<p class="year">{{log.workTime | fmtYear}}</p>
				</div>
				<div class="log_con">
					<!--未审核-->
					<div class="logcon">
						<div class="logc">
							<span class="worktype">工作类型:</span>
							<div class="workcon">
								<span class="work">{{log.type | fmtLogType}}</span>
							</div>
						</div>
						<div class="logc">
							<span class="worktype">项目名称:</span>
							<div class="workcon">
								<span class="name1 active">{{log.itemName}}</span>
								<span class="name1">正常工时: <span class="time">{{log.totalWorkHour}}h</span> </span>
								<span class="name1">其它工时: <span class="time">{{log.totalOverHour}}h</span> </span>
							</div>
						</div>
						<div class="logc">
							<div class="quality clearfix">
								<div class="partment fr">
									{{log.depart}}: <span class="partment_member">{{log.ucName}}</span>
								</div>
							</div>
						</div>
						<div class="aud-state" :state="log.status|fmtLogStatus"><span>{{log.status | fmtLogStatus}}</span> </div>
					</div>
					<!--未审核-->
				</div>
			</div>
		</div>
		<LoadMore :isloading.sync="isloading" class="loadmore" v-show="showLoad"></LoadMore>
		<LogDetails :visible.sync="logDetailsVisible" :reportLogList="reportLogData" :dayLog="dayLog"></LogDetails>
	</div>
</template>

<script>
	let LoadMore = () =>
		import('@/components/load-more/LoadMore.vue')
	let LogDetails = () =>
		import('@/modules/LogManagement/LogDetails.vue')
	export default {
		name: 'Project_Log',
		props: {
			itemId: {
				type: String,
				default: 0
			}
		},
		data() {
			return {
				projectLogs: [],
				showLoad: false,
				isloading: false,
				logDetailsVisible: false,
				reportLogData: [], //传给日志详情页面数据
				dayLog: {},
				curPage: 1,
				category: 2, //表明查询为项目日志
				userId: JSON.parse(Cache.local(Config.Login)).uc.id
			}
		},
		watch: {
			isloading(val) {
				if(val) {
					this.queryProjectLog(this.curPage)
					this.isloading = false
				}
			}
		},
		components: {
			LoadMore,
			LogDetails
		},
		mounted() {
			this.queryProjectLog(this.curPage)
		},
		methods: {
			watchLogDetails(row) {
				this.$http.post('/api/reportLog/queryReportLogAndDayLog?id=' + row, {
					emulateJSON: true
				}).then((res) => {
					let success = res.data.success
					let result = res.data.result
					if(success) {
						this.reportLogData = [];
						this.reportLogData.push(result);
						this.dayLog = result.dayLog;
						this.logDetailsVisible = true
					}
				}).catch((err) => {
					
				});
			},
			queryProjectLog(curPage) {
				let itemId = this.itemId.split('-')[0]
				this.$http.post('/api/dayLog/queryProjectLogs?itemId=' + itemId + '&userId=' + this.userId + '&curPage=' + curPage, {
					emulateJSON: true
				}).then((res) => {
					let success = res.data.success
					let result = !!res.data.result ? res.data.result.content : []
					if(!Array.isArray(result)) {
						result = []
					}
					if(success) {
						this.curPage += 1
						if(result.length <= 0) {
							this.showLoad = false;
						} else {
							this.showLoad = true;
							for(var i = 0; i < result.length; i++) {
								this.projectLogs.push(result[i])
							}
						}
					}
				}).catch((err) => {
					
				});
			},
		}
	}
</script>

<style scoped>
	.loadmore {
		margin-top: 0px !important;
		margin-bottom: 20px;
	}
	
	.project_log {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.project_log>div:nth-child(1) {
		padding-top: 30px;
	}
	
	.project_log .log {}
	
	.project_log .log_time {
		width: 60px;
		margin-right: 20px;
		float: left;
	}
	
	.project_log .log .date {
		font-size: 18px;
		color: #333333;
		letter-spacing: 0;
		text-align: right;
	}
	
	.project_log .log .year {
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 25px;
		text-align: right;
	}
	
	.project_log .log_con {
		opacity: 0.88;
		border-radius: 2px 0 0 2px;
		margin-bottom: 20px;
		margin-left: 80px;
		position: relative;
	}
	
	.project_log .logcon {
		padding: 20px;
		margin-bottom: 14px;
		background-color: #F9FAFC;
	}
	
	.log_con .unAudit:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.log_con .audit:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.project_log .worktype {
		display: inline-block;
		width: 52px;
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		padding-right: 10px;
	}
	
	.project_log .workcon {
		display: inline-block;
	}
	
	.project_log .work {
		font-size: 12px;
		color: #295DCF;
		letter-spacing: 0;
		padding-left: 10px;
		padding-right: 10px;
		background: #E9EEF8;
		margin-right: 10px;
	}
	
	.project_log .name1 {
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		margin-right: 20px;
	}
	
	.project_log .name1.active {
		color: #333;
	}
	
	.project_log .attitude {
		font-size: 12px;
		color: #333;
		letter-spacing: 0;
		margin-right: 20px;
	}
	
	.project_log .quality {
		padding-left: 65px;
	}
	
	.project_log .time {
		font-size: 12px;
		color: #333333;
		letter-spacing: 0;
		padding-left: 5px;
	}
	
	.project_log .logc {
		margin-bottom: 5px;
	}
	
	.logc {}
	
	.project_log .partment {
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		text-align: right;
		padding-right: 30px;
	}
	
	.project_log .partment_member {
		font-size: 12px;
		color: #000000;
		letter-spacing: 0;
		margin-left: 5px;
	}
	
	.aud-state {
		position: absolute;
		right: 0;
		top: 0;
		width: 50px;
		height: 50px;
		display: inline-block;
		text-align: center;
		line-height: 50px;
		font-size: 12px;
	}
	
	.aud-state span {
		transform: rotate(45deg) scale(0.8333);
		display: inline-block;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		line-height: 25px;
	}
	
	.aud-state[state="已审核"] {
		background: url(../../assets/img/audited.png) no-repeat;
		background-size: 50px 50px;
	}
	
	.aud-state[state="已审核"] span {
		color: #999999;
	}
	
	.aud-state[state="未审核"] {
		background: url(../../assets/img/unaudited.png) no-repeat;
		background-size: 50px 50px;
	}
	
	.aud-state[state="未审核"] span {
		color: #fff;
	}
	
	.aud-state[state="已驳回"] {
		background: url(../../assets/img/tuohui.png) no-repeat;
		background-size: 50px 50px;
	}
	
	.aud-state[state="已驳回"] span {
		color: #fff;
	}
</style>
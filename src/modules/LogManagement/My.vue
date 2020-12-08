<template>
	<section class="wrap-o">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item>当前位置：日志管理</el-breadcrumb-item>
			<el-breadcrumb-item>我的</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="list-wrap mylog">
			<el-form :inline="true" :model="searchParam" ref="searchParam" class="soso clearfix margin-left8" label-width="68px">
				<el-form-item class="label startend" label="起止日期：">
					<el-form-item prop="startTime" class="inlineblock">
						<el-date-picker class="input_text" type="date" placeholder="开始日期" v-model="searchParam.startTime" style="width: 100%;" :editable="false" :picker-options="pickerBeginDateBefore"></el-date-picker>
					</el-form-item>
					<span>-</span>
					<el-form-item prop="endTime" class="inlineblock">
						<el-date-picker class="input_text" type="date" placeholder="结束日期" v-model="searchParam.endTime" style="width: 100%;" :editable="false" :picker-options="pickerBeginDateAfter"></el-date-picker>
					</el-form-item>
				</el-form-item>
				<el-form-item class="label logcontent" label="日志内容：" prop="content">
					<el-input class="input_text" v-model="searchParam.content" placeholder="请输入关键字" :maxlength="50"></el-input>
				</el-form-item>
				<el-form-item class="search label">
					<el-button type="primary" @click="resetForm('searchParam')" class="submitbtn">重置</el-button>
					<el-button type="primary" @click="onSubmit" class="submitbtn">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="log-list">
				<div class="log-list-item clearfix" v-for="(item, index) in listData" :key="index">
					<div class="l data">
						<p class="m">{{item.workTime | fmtMonthDay | nullformat}}</p>
						<p class="y">{{item.workTime | fmtYear | nullformat}}</p>
					</div>
					<div class="r details" @mouseup="mouseup" @click="item.type!='请假'&&watchLogDetails(item.id)">
						<div class="dsc clearfix">
							<span class="l tips">工作类型：</span>
							<div class="r type"><span class="primary-type">{{item.type | nullformat}}</span></div>
						</div>
						<div class="dsc" v-if="item.type!='请假'" >
							<span class="dsc-item" v-show="!!item.itemName"><span class="tips">项目名称：</span><span class="t">{{item.itemName | nullformat}}</span></span>
							<span class="dsc-item"><span class="tips">正常工时：</span><span class="t">{{item.workHour | nullformat}}h</span></span>
							<span class="dsc-item"><span class="tips">其它工时：</span><span class="t">{{item.overHour | nullformat}}h</span></span>
						</div>
						<section class="evaluate clearfix" v-if="item.isAutoEffect!=1 && (item.status==2&&item.type!='请假')">
							<span class="l tips"></span>
							<div class="r">
								<span class="evaluate-item"><span class="t">质量：{{item.quality | fmtQem | nullformat}}</span></span>
								<span class="evaluate-item"><span class="t">效率：{{item.efficiency | fmtQem | nullformat}}</span></span>
								<span class="evaluate-item"><span class="t">态度：{{item.manner | fmtQem | nullformat}}</span></span>
							</div>
			<!--				<div class="from-area">
								<span class="bm">{{item.depart | nullformat}}：</span>
								<span class="text">{{item.ucName | nullformat}}</span>
							</div>-->
						</section>
						<div v-show="item.status==0||item.status==4" class="editlog-wrap" @mouseup="mouseup" @click.stop="edit(item.id)">
							<span class="icon-edit">编辑</span>
						</div>
						<div class="aud-state" :state="item.status|fmtLogStatus"><span>{{item.status | fmtLogStatus | nullformat}}</span></div>
					</div>
				</div>
			</div>
			<LoadMore :isloading.sync="isloading" v-show="showLoad"></LoadMore>
			<LogDetails :visible.sync="logDetailsVisible" :reportLogList="reportLogData" :dayLog="dayLog" :logAuditShow="logAuditShow"></LogDetails>
		</div>
	</section>
</template>

<script>
	let LoadMore = () =>
		import('@/components/load-more/LoadMore.vue')
	let LogDetails = () =>
		import('./LogDetails.vue')
	let LogManagement_My_ReleaseLog = () =>
		import('@/modules/LogManagement/ReleaseLog.vue')

	export default {
		name: 'My',
		created() {
			vueIns = this
		},
		data() {
			return {
				linkLoading: false,
				showLoad: false,
				reportLogList: [], //传给编辑日志页面数据
				reportLogData: [], //传给日志详情页面数据
				dayLog: {},
				logAuditShow:true,
				logDetailsVisible: false,
				isloading: false,
				listData: [],
				items: [],
				a: '',
				b: '',
				searchParam: {
					userId: JSON.parse(Cache.local(Config.Login)).uc.id,
					ucId: JSON.parse(Cache.local(Config.Login)).uc.id,
					startTime: '',
					endTime: '',
					itemId: '',
					content: '',
					curPage: 1
				},
				//搜索结束时间需大于等于开始时间
                pickerBeginDateBefore: {
			            disabledDate(time) { 
			              return time.getTime() > Date.now()|| (vueIns.searchParam.endTime && vueIns.searchParam.endTime.getTime && (time.getTime() > vueIns.searchParam.endTime.getTime()))
			            }
			    },
          		pickerBeginDateAfter: {
			            disabledDate(time) {  
			              return time.getTime() > Date.now()|| (vueIns.searchParam.startTime && vueIns.searchParam.startTime.getTime && (time.getTime() < vueIns.searchParam.startTime.getTime())) 
			            }  
		        },
		        textSelectFlag: true
			}
		},
		watch: {
			isloading(val) {
				if(val) {
					this.link2Page(this.searchParam.curPage);
				}
			}
		},
		components: {
			LoadMore,
			LogDetails,
			LogManagement_My_ReleaseLog
		},
		mounted: function() {
			this.$nextTick(() => {
				this.reload();
			});
		},
		methods: {
			mouseup(e) {
				var event = window.event || e;
				var target = event.srcElement ? event.srcElement : event.target;
				if(/input|textarea/i.test(target.tagName) && /firefox/i.test(navigator.userAgent)) {
					//Firefox在文本框内选择文字
					var staIndex = target.selectionStart;
					var endIndex = target.selectionEnd;
					if(staIndex != endIndex) {
						var sText = target.value.substring(staIndex, endIndex);
						this.textSelectFlag = false
					} else {
						this.textSelectFlag = true
					}
				} else {
					//获取选中文字
					var sText = document.selection == undefined ? document.getSelection().toString() : document.selection.createRange().text;
					if(sText != "") {
						this.textSelectFlag = false
					} else {
						this.textSelectFlag = true
					}
				}
			},
			edit(id) {
				if (this.textSelectFlag) {
					//根据日志id获得具体日志集合
					this.$http.post('/api/dayLog/queryDaylogBylogId?logId=' + id, {
						emulateJSON: true
					}).then((res) => {
						this.$emit('editLog', res.data.result)
						//                    this.$store.commit('LogManagementToEditViewData',);
					}).catch((err) => {
						
					});
				}
			},
			watchLogDetails(row) {
				if (this.textSelectFlag) {
					this.$http.post('/api/dayLog/queryDaylogBylogId?logId=' + row, {
						emulateJSON: true
					}).then((res) => {
						this.reportLogData = res.data.result.reportLogList;
						this.dayLog = res.data.result.dayLog;
						this.logDetailsVisible = true
					}).catch((err) => {
						
					});
				}
			},
			reload() {
				this.link2Page(1);
			},
			link2Page(curPage) {
				if (this.linkLoading) {
					return void 0
				}
				this.linkLoading = true
				this.searchParam.curPage = curPage;
				this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.searchParam.endTime = (!!this.searchParam.endTime) ? new Date(this.searchParam.endTime).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
				this.$http.post('/api/dayLog/mydayLoglist', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					let flag = res.data.success
					let result = res.data.result.content
					if(flag) {
						if(result.length == 0) {
							this.showLoad = false;
						} else if(result.length>10){
							this.showLoad = true;
						}
						//this.listData=[];
						if(this.searchParam.curPage == 1) {
							if(result.length == 0) {
								this.listData = []
							}
							this.listData = result;
						} else {
							for(var i = 0; i < result.length; i++) {
								this.listData.push(result[i])
							}
						}
						this.searchParam.curPage = this.searchParam.curPage + 1;
					} else {
						
					}
					this.isloading = false
					this.linkLoading = false
				}).catch((err) => {
					this.showLoad = false;
					this.isloading = false
					this.linkLoading = false
					
				});
			},
/*			queryItems() {
				//查询员工项目列表
				this.$http.post('/api/dayLog/queryItemsByUserId', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					let flag = res.data.success
					let result = res.data.result
					if(flag) {
						this.items = result;
					} else {
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				}).catch((err) => {
					this.loading = false
					
				})

			},*/
			onSubmit() {
				this.reload();
			},
			resetForm(formName) {
				this.$refs.searchParam.resetFields();
				this.reload()
			}
		}
	}
</script>

<style scoped>
	.editlog-wrap{
		opacity: 0;
	}
	.log-list-item .r:hover > .editlog-wrap{
		opacity: 1;
	}
	.el-form-item {
		margin-right: 0px;
	}
	.el-form-item {
		margin-bottom: 2px;
	}
	
	.from-area {
		float: right;
		margin-right: 112px;
	}
	
	.from-area .bm {
		font-size: 12px;
		color: #999999;
	}
	
	.from-area .text {
		font-size: 12px;
		color: #000000;
	}
	
	.wrap {
		position: relative;
	}
	
	.inlineblock {
		display: inline-block;
	}
	
	
	.input_text {
		font-size: 12px;
		color: #999999;
	}
	
	.label {
		font-size: 12px !important;
		color: #666666 !important;
	}
	
	.el-icon-arrow-down {
		margin-left: 13px;
	}
	
	.loadmore-block {
		margin-top: 26px;
		text-align: center;
	}
	
	.loadMorebtn {
		cursor: pointer;
		font-size: 14px;
		color: #5d5d5d;
	}
	
	.sosobtn {
		font-size: 14px;
		color: #FFFFFF;
		background: #295DCF;
		border-radius: 2px;
		width: 90px;
		height: 30px;
		line-height: 0px;
	}
	
	.el-icon-arrow-down {
		font-size: 12px;
	}
	
	.search {
		margin-right: 0;
		position: absolute;
		right: 0;
		top: 0;
	}
	
	.soso {
		position: relative;
		margin-bottom: 10px;
		padding-right: 194px;
	}
	
	.line {
		text-align: center;
	}
	
	.header {
		height: 64px;
	}
	
	.header .title {
		font-size: 16px;
		font-weight: bold;
	}
	
	.worktab>.el-tabs__header {
		background: #f8f9fb;
	}
	
	.tabs {
		margin-right: 334px;
	}
	
	.todo-module {
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.el-row {
		height: auto;
	}
	
	.box {
		width: 50px;
		height: 50px;
		background: url('../../assets/img/audited.png');
	}
	.logcontent{
		margin-left: 9px;
	}
</style>
 <template>
	<el-dialog title="日志详情" class="logdetails" :visible.sync="dialogVisible" @close="dialogClose">
		<div class="log-title">
			<span class="name">{{dayLog.ucName}}</span>
			<span class="log-time">工作日期: {{dayLog.workTime|fmtDate}}</span>
		</div>
		<div class="log-content">
			<div class="log-list-item clearfix" v-for="(item, index) in reportLogList">
				<section class="r details" >
					<div class="dsc clearfix">
						<span class="l pname">{{item.itemName}}</span>
					</div>
					<template v-if="item.isAutoGenerate==0">
					<div class="dsc clearfix">
						<span class="l tips">工作类型：</span>
						<div class="r type">
							<span class="dsc-item primary-type">{{item.type|fmtLogType}}{{item.category|fmtLogCategoryAddChar}}</span>
							<span class="dsc-item"><span class="tips">正常工时：</span><span class="t">{{item.workHour}}h</span></span>
							<span class="dsc-item"><span class="tips">其它工时：</span><span class="t">{{item.overHour}}h</span></span>
						</div>
					</div>
					<div class="dsc clearfix">
						<span class="l tips">工作内容：</span>
						<span class="r content">{{item.content}}</span>
					</div>
					<div class="aud-state" :state="item.status | fmtLogStatus"><span>{{item.status | fmtLogStatus}}</span></div>
					</template>
				</section>
				<template v-if="item.requireLogs.length>0" v-for="requireLog in item.requireLogs">
					<section class="r details">
						<div class="dsc clearfix">
							<span class="l tips">工作类型：</span>
							<div class="r type">
								<span class="dsc-item primary-type">{{item.type|fmtLogType}}-{{requireLog.name}}</span>
								<span class="dsc-item"><span class="tips">正常工时：</span><span class="t">{{requireLog.workHour}}h</span></span>
								<span class="dsc-item"><span class="tips">其它工时：</span><span class="t">{{requireLog.overHour}}h</span></span>
							</div>
						</div>
						<div class="dsc clearfix">
							<span class="l tips">工作内容：</span>
							<span class="r content">{{requireLog.content}}</span>
						</div>
						<div class="aud-state" :state="item.status|fmtLogStatus"><span>{{item.status|fmtLogStatus}}</span></div>
					</section>
				</template>
				<div class="log-title mt mb" v-if="item.status==2&&item.logComments.length>0">
					<span class="name">日志点评</span>
				</div>
				<div class="log-content" v-if="item.status==2">
					<div class="log-list-item clearfix" v-for="logComment in item.logComments">
						<div class="r details">
							<div class="dsc clearfix pj">
								<span class="date">{{logComment.createTime|fmtDate}}</span>
								<span class="time">{{logComment.createTime|fmtHms}}</span>
							</div>
							<div class="dsc clearfix">
								<span class="l tips">{{logComment.auditor}}：</span>
								<span class="r content">{{logComment.content}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="log-examine" v-show="!enableExaminebtn && examineState == 3">
					<el-form class="evaluateForm" label-position="left" :model="commentForm" :rules="examineRules" ref="evaluateForm" label-width="62px">
						<el-form-item class="explain" label="点评说明：" prop="explain" label-width="78px">
							<el-input placeholder="请描述对该员工的工作点评(内容不得少于10个字符)" class="explaininput" type="textarea" v-model="commentForm.remark"></el-input>
						</el-form-item>
					</el-form>
					<div class="sd-btn-toolbar btn-toolbar" v-show="!enableExaminebtn">
						<el-button type="primary" class="submitbtn" @click="submitCommentForm(item.id)">确定</el-button>
						<el-button class="cancelbtn" @click="cancelBtn">取消</el-button>
					</div>
				</div>
				<div class="btn-toolbar" v-if="enableExaminebtn&&dayLog.ucId!=userId&&item.isComment==0&&logDoCommentShow">
					<el-button type="primary" class="btn examinebtn" @click="evaluatebtn">点评</el-button>
				</div>
				<!--<div class="line"></div>-->
			</div>
		</div>
		<template v-if="dayLog.ucId==userId&&dayLog.status==2&&logAuditFalse&&dayLog.isAutoEffect!=1">
			<div class="log-title mt mb">
				<span class="name">日志审核</span>
			</div>
			<div class="log-content">
				<div class="log-list-item clearfix">
					<div class="r details">
						<div class="dsc clearfix pj">
							<span class="date">{{dayLog.auditTime|fmtDate}}</span>
							<span class="time">{{dayLog.auditTime|fmtHms}}</span>
							<span class="tips">质量:<span class="t">{{dayLog.quality | fmtQem}}</span></span>
							<span class="tips">效率:<span class="t">{{dayLog.efficiency | fmtQem}}</span></span>
							<span class="tips">态度:<span class="t">{{dayLog.manner | fmtQem}}</span></span>
						</div>
						<div class="dsc clearfix">
							<span class="l tips">{{dayLog.auditorName}}：</span>
							<span class="r content">{{dayLog.remark}}</span>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-if="dayLog.ucId==userId&&dayLog.status==4&&dayLog.isAutoEffect!=1">
			<div class="log-title mt mb">
				<span class="name">日志驳回</span>
			</div>
			<div class="log-content">
				<div class="log-list-item clearfix">
					<div class="r details">
						<div class="dsc clearfix pj">
							<span class="date">{{dayLog.auditTime|fmtDate}}</span>
							<span class="time">{{dayLog.auditTime|fmtHms}}</span>
						</div>
						<div class="dsc clearfix">
							<span class="l tips">{{dayLog.auditorName}}：</span>
							<span class="r content">{{dayLog.remark}}</span>
						</div>
					</div>
				</div>
			</div>
		</template>
		<div class="btn-toolbar" v-show="enableExaminebtn&&dayLog.ucId!=userId">
			<el-button type="primary" class="btn examinebtn" @click="examinebtn" v-if="dayLog.status==0&&dayLog.auditorId==userId">审核</el-button>
			<el-button class="btn rejectbtn" @click="rejectbtn" v-if="dayLog.status==0&&dayLog.auditorId==userId">驳回</el-button>
		</div>
		<div class="log-examine" v-show="!enableExaminebtn && examineState == 1">
			<div class="log-title mt mb">
				<span class="name">日志审核</span>
			</div>
			<el-form class="examineForm" label-position="left" :model="examineForm" :rules="examineRules" ref="examineForm" label-width="62px">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="质量：" prop="quality">
							<el-select v-sicon1 v-model="examineForm.quality" placeholder="请选择" style="width:100%;">
								<el-option label="A" value="1"></el-option>
								<el-option label="B" value="2"></el-option>
								<el-option label="C" value="3"></el-option>
								<el-option label="D" value="4"></el-option>
								<el-option label="E" value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="效率：" prop="efficiency">
							<el-select v-sicon1 v-model="examineForm.efficiency" placeholder="请选择" style="width:100%;">
								<el-option label="A" value="1"></el-option>
								<el-option label="B" value="2"></el-option>
								<el-option label="C" value="3"></el-option>
								<el-option label="D" value="4"></el-option>
								<el-option label="E" value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="态度：" prop="manner">
							<el-select v-sicon1 v-model="examineForm.manner" placeholder="请选择" style="width:100%;">
								<el-option label="A" value="1"></el-option>
								<el-option label="B" value="2"></el-option>
								<el-option label="C" value="3"></el-option>
								<el-option label="D" value="4"></el-option>
								<el-option label="E" value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item class="explain" label="评分说明：" prop="explain" label-width="78px">
					<el-input v-model="examineForm.remark" placeholder="请描述对该员工的工作点评" class="explaininput" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<div class="sd-btn-toolbar btn-toolbar" v-show="!enableExaminebtn">
				<el-button type="primary" class="btn examinebtn" @click="submitExamineForm(2,'examineForm')">确定</el-button>
				<el-button class="btn rejectbtn" @click="cancelBtn">取消</el-button>
			</div>
		</div>
		<div class="log-examine" v-show="!enableExaminebtn && examineState == 2">
			<div class="log-title mt">
				<span class="name">日志驳回</span>
			</div>
			<el-form label-position="left" :model="examineForm" ref="rejectForm" label-width="80px">
				<el-form-item class="explain" label="驳回说明：" prop="explain">
					<el-input class="explaininput" v-model="examineForm.remark" placeholder="请描述对该员工的工作点评" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<div class="sd-btn-toolbar btn-toolbar" v-show="!enableExaminebtn">
				<el-button type="primary" class="btn examinebtn" @click="submitExamineForm(4)">确定</el-button>
				<el-button class="btn rejectbtn" @click="cancelBtn">取消</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'LogDetails',
		props: {
			visible: {
				type: Boolean
			},
			logAuditShow: {//从my传过来-true
				type: Boolean
			},
			reportLogList: {
				type: Array,
				default: function() {
					return []
				}
			},
			logComments: {
				type: Array,
				default: function() {
					return []
				}
			},
			logDoCommentHidden: {
				type: Boolean
			},
			dayLog: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		computed: {
			
		},
		data() {
			return {
				dialogVisible: false,
				enableExaminebtn: true,
				enableCommentbtn: true,
				logDoCommentShow: true,//日志点评操作默认是显示
				logAuditFalse:false,//默认日志审核内容是false--隐藏
				userId: JSON.parse(Cache.local(Config.Login)).uc.id,
				examineState: 1,
				examineForm: {
					userId: JSON.parse(Cache.local(Config.Login)).uc.id,
					id: '',
					quality: '',
					efficiency: '',
					manner: '',
					status: '', //2审核，4驳回
					remark: '',
				},
				commentForm: {
					id: '',
					userId: JSON.parse(Cache.local(Config.Login)).uc.id,
					remark: '',
				},
				examineRules: {
					quality: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}],
					efficiency: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}],
					manner: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}]
				},
				evaluateForm: {
					explain: ''
				},
				rejectForm: {
					userId: JSON.parse(Cache.local(Config.Login)).uc.id,
					id: '',
					remark: '',
					status: '' //2审核，4驳回
				}
			}
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				this.$emit('update:visible', val)
			}
		},
		components: {},
		mounted: function() {
			this.iniData()
		},
		methods: {
			iniData() {
				if(this.logDoCommentHidden) {
					this.logDoCommentShow = false
				}
				if(this.logAuditShow){
					this.logAuditFalse=this.logAuditShow
				}
			},
			submitEvaluateForm() {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.dialogVisible = false
						this.$refs[formName].resetFields();
					} else {
						return false;
					}
				});
			},
			submit(status) {
				this.examineForm.userId = JSON.parse(Cache.local(Config.Login)).uc.id
				this.examineForm.id = this.dayLog.id
				this.examineForm.status = status;
				this.$http.post('/api/dayLog/auditDaylog', this.examineForm, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.success
					if(result) {
						this.clearForm()
						this.dialogVisible = false
						this.$message({
							customClass: 'success',
							message: '日志处理成功'
						});
						this.$emit('toLogAudit')
						this.$store.commit('logSearchReload')

					} else {
						this.$message({
							customClass: 'error',
							message: res.data.message,
							type: 'error'
						});
					}
				}).catch((err) => {
					this.loading = false;
					
				});
			},
			//审核验证(status=2为审核通过，status=4为驳回)
			submitExamineForm(status, formName) {
				if(status == 2) {
					this.$refs[formName].validate((valid) => {
						if(valid) {
							this.submit(status)
						}
					});
				} else {
					this.submit(status)
				}
			},
			//点评提交
			submitCommentForm(row) {
				this.commentForm.id = row;
				this.commentForm.userId = JSON.parse(Cache.local(Config.Login)).uc.id
				this.$http.post('/api/dayLog/reviewReportLog', this.commentForm, {
					emulateJSON: true
				}).then((res) => {
					let success = res.data.success
					if(success) {
						this.dialogVisible = false
						this.enableCommentbtn = true
						this.clearForm()
						this.$message({
							customClass: 'success',
							message: '点评成功'
						});
					} else {
						this.$message({
							customClass: 'error',
							message: res.data.message
						});
					}
				}).catch((err) => {
					this.loading = false;
					
				});

			},
			clearForm() {
				for(let i in this.examineForm) {
					this.examineForm[i] = ''
				}
				for(let i in this.rejectForm) {
					this.rejectForm[i] = ''
				}
				for(let i in this.commentForm) {
					this.commentForm[i] = ''
				}
			},
			//驳回验证
			submitRejectForm() {
				this.dialogVisible = false
				this.clearForm()
			},
			//审核状态变更按钮
			examinebtn() {
				this.enableExaminebtn = false
				this.examineState = 1
			},
			//驳回状态变更按钮
			rejectbtn() {
				this.enableExaminebtn = false
				this.examineState = 2
			},
			//点评按钮
			evaluatebtn() {
				this.enableExaminebtn = false
				this.examineState = 3
			},
			cancelBtn() {
				this.enableExaminebtn = true
				//this.dialogVisible = false
				this.clearForm()
			},
			dialogClose() {
				this.enableExaminebtn = true
				this.examineState = 1
			}
		}
	}
</script>

<style scoped>
	.line {
		width: 100%;
		height: 1px;
		background: red;
		transform: scaleY(0.5);
	}
	
	.log-content .log-list-item .line {
		margin-top: 10px;
	}
	
	.log-content .log-list-item:nth-last-of-type(1) .line {
		margin-top: 10px;
	}
	
	.log-list-item {
		margin-bottom: 20px;
	}
	
	.log-content .log-list-item:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.explaininput {
		height: 80px;
	}
	
	.btn-toolbar .btn {
		border-radius: 2px;
		width: 90px;
		height: 30px;
		line-height: 0;
	}
	
	.btn-toolbar .btn.examinebtn {
		background: #295DCF;
	}
	
	.btn-toolbar .btn.rejectbtn {
		background: #F2F2F2;
		border: none;
	}
	
	.btn-toolbar {
		margin-top: 24px;
		margin-bottom: 6px;
		text-align: center;
	}
	
	.sd-btn-toolbar {
		margin-bottom: 22px;
		margin-top: 35px;
	}
	
	.mt {
		margin-top: 14px;
	}
	
	.mb {
		margin-bottom: 14px;
	}
	
	.log-list-item .pj .tips {
		width: 50px;
	}
	
	.log-list-item .pj .time {
		margin-left: 20px;
		margin-right: 20px;
	}
	
	.aud-state {
		position: absolute;
		right: 0px;
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
	
	.log-title {}
	
	.log-title .name {
		font-size: 12px;
		color: #333333;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.log-title .log-time {
		margin-left: 14px;
		font-size: 12px;
		color: #333333;
	}
	
	.log-list-item {
		overflow: hidden;
		font-size: 12px;
	}
	
	.log-content {
		margin-top: 12px;
	}
	
	.log-list .log-list-item:nth-last-child(1) {
		margin-bottom: 0;
	}
	
	.log-list-item .l {
		float: left;
	}
	
	.log-list-item .r {
		display: inline-block;
	}
	
	.log-list-item .dsc-item {
		margin-right: 18px;
		margin-left: -3px;
	}
	
	.log-list-item .dsc-item:nth-last-of-type(1) {
		margin-right: 0;
	}
	
	.log-list-item .dsc {
		margin-bottom: 12px;
		position: relative;
	}
	
	.log-list-item .dsc .pname {
		font-size: 12px;
		color: #333333;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.log-list-item .dsc:nth-of-type(3) {
		margin-bottom: 0;
	}
	
	/*.log-list-item .dsc:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	*/
	.log-list-item .dsc .content {
		font-size: 12px;
		display: block;
		color: #151515;
		letter-spacing: 0;
		left: 0px;
		line-height: 17px;
		overflow: hidden;
		margin-right: 22px;
	}
	
	.log-list-item .tips {
		display: inline-block;
		width: 62px;
		height: 15px;
		font-size: 12px;
		color: #999999;
	}
	
	.log-list-item .t {
		font-size: 12px;
		color: #333333;
	}
	
	.log-list-item .data {
		width: 72px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		text-align: right;
		padding-right: 20px;
	}
	
	.log-list-item .data .m {
		font-size: 18px;
		color: #333333;
	}
	
	.log-list-item .data .y {
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 25px;
	}
	
	.log-list-item .details {
		/*padding: 6px 20px;*/
		padding: 14px;
		background: #fafbfd;
		width: auto;
		display: block;
		position: relative;
		border-bottom: 1px solid #EAECEE;
		margin-left: 0;
	    cursor: auto;
	}
	
	.log-list-item .details:nth-last-of-type(1) {
		border-bottom: none;
	}
	
	.log-list-item .evaluate {
		margin-top: 15px;
	}
	
	.log-list-item .evaluate .evaluate-item {
		margin-right: 18px;
	}
	
	.log-list-item .evaluate .evaluate-item:nth-last-of-type(1) {
		margin-right: 0;
	}
	
	.primary-type {
		display: inline-block;
		width: auto;
		height: 20px;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
		color: #295DCF;
		opacity: 0.66;
		background: #E9EEF8;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: break-all;
		word-wrap: break-word;
		vertical-align: bottom;
	}
	
	.log-list-item .type span {
		position: relative;
		top: -1px;
	}
</style>
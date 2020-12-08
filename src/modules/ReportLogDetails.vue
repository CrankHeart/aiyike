<template>
	<div >
		<el-dialog title="日志详情" class="logdetails"   :visible.sync="dialogVisible"    @close="dialogClose" >
			<div class="log-title"  >
				<span class="name">{{dayLog.ucName}}</span>
				<span class="log-time">工作日期:{{dayLog.workTime|fmtTime}}</span>
				<span class="aud-state">{{dayLog.status|fmtLogStatus}}</span>
			</div>
			<div class="log-content">
				<div class="log-list-item clearfix" v-for="(item, index) in reportLogList">
					<div class="r details">
						<div >
							<span class="dsc clearfix">{{item.itemName}}</span>
						</div>
						<div class="dsc clearfix">
							<span class="l tips">工作类型：</span>
							<div class="r type">
								<span class="dsc-item primary-type">{{item.type|fmtLogType}}</span>
								<span class="dsc-item"><span class="tips">正常工时：</span><span class="t">{{item.workHour}}h</span></span>
								<span class="dsc-item"><span class="tips">其它工时：</span><span class="t">{{item.overHour}}h</span></span>
							</div>
						</div>
						<div class="dsc clearfix">
							<span class="l tips">工作内容：</span>
							<span class="r content">{{item.content}}</span>
						</div>
						<div v-if="item.requireLogs.length>0" v-for="item1 in item.requireLogs">
							<div class="dsc clearfix">
								<span class="l tips">工作类型：</span>
								<div class="r type">
									<span class="dsc-item primary-type">{{item.type|fmtLogType}}-{{item1.name}}</span>
									<span class="dsc-item"><span class="tips">正常工时：</span><span class="t">{{item1.workHour}}h</span></span>
									<span class="dsc-item"><span class="tips">其它工时：</span><span class="t">{{item1.overHour}}h</span></span>
								</div>
							</div>
							<div class="dsc clearfix">
								<span class="l tips">工作内容：</span>
								<span class="r content">{{item1.content}}</span>
							</div>
						</div>
						<div class="log-examine" v-show="!enableCommentbtn">
							<div class="log-title mt">
								<span class="name">日志点评</span>
							</div>
							<el-form label-position="left" :model="rejectForm" ref="rejectForm" label-width="80px">
								<el-form-item class="explain" label="点评说明：" prop="explain">
									<el-input placeholder="请描述对该员工的工作点评" class="explaininput" type="textarea" v-model="examineForm.remark"></el-input>
								</el-form-item>
							</el-form>
							<div class="sd-btn-toolbar btn-toolbar" v-show="!enableExaminebtn">
								<el-button type="primary" class="btn submitbtn" @click="submitExamineForm(4)">确定</el-button>
								<el-button class="btn cancelbtn" @click="cancelBtn">取消</el-button>
							</div>
						</div>
						<template dsc clearfix  v-if="item.logComments.length>0">
							<div >日志点评</div>
							<div   v-for="logComment in item.logComments">
								<div>
									<span class="dsc-item">{{logComment.auditor}}</span>
									<span class="dsc-item">{{logComment.createTime}}</span>
								</div>
								<div>{{logComment.content}}</div>
							</div>
						</template>
						<div class="btn-toolbar" v-show="enableCommentbtn"  >
							<el-button class="btn rejectbtn" @click="comment" >点评</el-button>
						</div>
						<hr style="border:1px dashed #000">
					</div>
				</div>
			</div>
			<div v-if="dayLog.status==2">
				<div class="log-title mt mb">
					<span class="name">日志审核</span>
				</div>
				<div class="log-content">
					<div class="log-list-item clearfix">
						<div class="r details">
							<div class="dsc clearfix pj">
								<span class="date">{{dayLog.updateTime|fmtTime}}</span>
								<span class="tips">质量:<span class="t">{{dayLog.quality|fmtQem}}</span></span>
								<span class="tips">效率:<span class="t">{{dayLog.efficiency|fmtQem}}</span></span>
								<span class="tips">态度:<span class="t">{{dayLog.manner|fmtQem}}</span></span>
							</div>
							<div class="dsc clearfix">
								<span class="l tips">{{dayLog.auditorName}}：</span>
								<span class="r content">{{dayLog.remark}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="dayLog.status==0">
			<div class="btn-toolbar" v-show="enableExaminebtn"  >
				<el-button type="primary" class="btn examinebtn" @click="examinebtn" >审核</el-button>
				<el-button class="btn rejectbtn" @click="rejectbtn" >驳回</el-button>
			</div>
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
							<el-form-item label="态度：" prop="attitude">
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
						<el-input placeholder="请描述对该员工的工作点评" class="explaininput" type="textarea" v-model="examineForm.remark"></el-input>
					</el-form-item>
				</el-form>
				<div class="sd-btn-toolbar btn-toolbar" v-show="!enableExaminebtn">
					<el-button type="primary" class="btn submitbtn" @click="submitExamineForm(2)">确定</el-button>
					<el-button class="btn cancelbtn" @click="cancelBtn">取消</el-button>
				</div>
			</div>
			<div class="log-examine" v-show="!enableExaminebtn && examineState == 2">
				<div class="log-title mt">
					<span class="name">日志驳回</span>
				</div>
				<el-form label-position="left" :model="rejectForm" ref="rejectForm" label-width="80px">
					<el-form-item class="explain" label="驳回说明：" prop="explain">
						<el-input placeholder="请描述对该员工的工作点评" class="explaininput" type="textarea" v-model="examineForm.remark"></el-input>
					</el-form-item>
				</el-form>
				<div class="sd-btn-toolbar btn-toolbar" v-show="!enableExaminebtn">
					<el-button type="primary" class="btn submitbtn" @click="submitExamineForm(4)">确定</el-button>
					<el-button class="btn cancelbtn" @click="cancelBtn">取消</el-button>
				</div>
			</div>
		</el-dialog>
	</div>

</template>

<script>
    export default {
        name: 'LogDetails',
        props: {
            visible: {
                type: Boolean
            },
            reportLogList: {
            	type: Array,
            	default: function() {
            		return []
            	}
            },
            dayLog: {
            	type: Object,
            	default: function() {
            		return {}
            	}
            }
        },
        computed: {},
        data() {
            return {
                dialogVisible: false,
                enableExaminebtn: true,
                enableCommentbtn: true,
				userId:JSON.parse(Cache.local(Config.Login)).uc.id,
                examineState: 1,
                examineForm: {
                    userId:JSON.parse(Cache.local(Config.Login)).uc.id,
                    id:'',
                    quality: '',
                    efficiency: '',
                    manner: '',
					status:'',//2审核，4驳回
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
                    attitude: [{
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    }]
                },
                rejectForm: {
                    userId:JSON.parse(Cache.local(Config.Login)).uc.id,
                    id:'',
                    remark: '',
                    status:''//2审核，4驳回
                },
                searchParam: {
                    userId:'',
                    logId: ''
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
        },
        methods: {
            //审核验证
            submitExamineForm(status) {
 /*               this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.dialogVisible = false
                        this.clearForm()
                    } else {
                        return false;
                    }
                });*/
 				alert("jinlail ")
 				this.examineForm.id=this.dayLog.id
                this.examineForm.status=status;
				
                this.$http.post('/api/dayLog/auditDaylog' ,this.examineForm, {
                    emulateJSON: true
                }).then((res) => {
                    let result=res.data.success
					if(result){
                        this.dialogVisible = false
                        this.clearForm()
					}
                }).catch((err) => {
                    this.loading = false;
                    
                });

            },
            //驳回验证
            submitRejectForm() {
                this.dialogVisible = false
                this.clearForm()
            },
            clearForm() {
                for (let i in this.examineForm) {
                    this.examineForm[i] = ''
                }
                for (let i in this.rejectForm) {
                    this.rejectForm[i] = ''
                }
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
			comment(){
                this.enableCommentbtn = false
			},
            cancelBtn() {
                this.dialogVisible = false
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
	}

	.btn-toolbar {
		margin-top: 24px;
		margin-bottom: 6px;
		text-align: center;
	}
	.sd-btn-toolbar{
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
		right: 20px;
		top: 60px;
		width: 50px;
		height: 50px;
		display: inline-block;

		/*	background: url(../assets/img/unaudited.png) no-repeat;
            background-size: 50px 50px;*/
	}

	.aud-state.active {
		background: url(../assets/img/audited.png) no-repeat;
		background-size: 50px 50px;
	}

	.log-title {}

	.log-title .name {
		font-size: 12px;
		color: #333333;
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
		margin-right: 26px;
		margin-left: -3px;
	}

	.log-list-item .dsc-item:nth-last-of-type(1) {
		margin-right: 0;
	}

	.log-list-item .dsc {
		margin-bottom: 12px;
		position: relative;
	}

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
		padding: 14px;
		background: #fafbfd;
		width: 100%;
		display: block;
		position: relative;
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
		width: 66px;
		height: 20px;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
		color: #295DCF;
		opacity: 0.66;
		background: #E9EEF8;
	}

	.log-list-item .type span {
		position: relative;
		top: -1px;
	}
</style>
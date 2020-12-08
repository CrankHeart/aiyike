<!--发布日志 模块-->
<template>
	<section class="wrap-o logmy">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item>当前位置：日志管理</el-breadcrumb-item>
			<el-breadcrumb-item>{{saveOrEdit}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="wrap">
			<div class="page-bg">
				<p class="title">{{saveOrEdit}}</p>
				<el-form class="weeklyForm releaseLog" :rules="rules" ref="weeklyForm" label-position="left" :model="weeklyForm" label-width="72px">
					<el-form-item label="工作日期：" class="workdateitem" prop="workDate">
						<el-date-picker type="date" placeholder="选择日期" v-model="weeklyForm.workDate" :picker-options="pickerOptions"></el-date-picker>
					</el-form-item>
					<section class="log-area norelated mt20 mb20 box" v-if="showNperformer">
						<div class="norelated-checkbox clearfix">
							<span class="lb">非项目相关：</span>
							<el-form-item class="ml0 nmb" prop="noproject_relevant.norelatedType">
								<el-checkbox-group v-model="weeklyForm.noproject_relevant.norelatedType">
									<el-checkbox label="日常事务" name="type"></el-checkbox>
									<el-checkbox label="学习" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</div>
						<div class="affair-area" v-show="weeklyForm.noproject_relevant.norelatedType.indexOf('日常事务') != -1">
							<p class="patch middle">日常事务</p>
							<div class="content">
								<el-row :gutter="20">
									<el-col :span="6">
										<el-form-item label="正常工时：" prop="noproject_relevant.affairNormalHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.affairNormalHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="其它工时：" prop="noproject_relevant.affairOvertimeHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.affairOvertimeHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
								</el-row>
								<el-form-item class="nmb" label="工作内容：" prop="noproject_relevant.affairWorkContent" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
									<el-input type="textarea" v-model="weeklyForm.noproject_relevant.affairWorkContent" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="study-area" v-show="weeklyForm.noproject_relevant.norelatedType.indexOf('学习') != -1">
							<p class="patch middle">学习</p>
							<div class="content">
								<el-row :gutter="20">
									<el-col :span="6">
										<el-form-item label="正常工时：" prop="noproject_relevant.studyNormalHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.studyNormalHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="其它工时：" prop="noproject_relevant.studyOvertimeHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.studyOvertimeHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
								</el-row>
								<el-form-item class="nmb" label="工作内容：" prop="noproject_relevant.studyWorkContent" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
									<el-input type="textarea" v-model="weeklyForm.noproject_relevant.studyWorkContent" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
								</el-form-item>
							</div>
						</div>
					</section>
					<!--项目日志填写-->
					<section class="log-area related box mt20" v-for="(noproject, index) in weeklyForm.project_relevant" ref="project_relevant">
						<div class="related-checkbox clearfix">
							<span class="lb">项目相关：</span>
							<el-form-item class="ml0 nmb" :prop="'project_relevant.' + index + '.relatedType'">
								<el-checkbox-group v-model="weeklyForm.project_relevant[index].relatedType">
									<el-checkbox label="项目执行" name="type"></el-checkbox>
									<el-checkbox label="项目会议" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="项目名称：" class="mt14 nmb" :prop="'project_relevant.' + index + '.projectName'">
								<el-select class="width190" v-model="weeklyForm.project_relevant[index].projectName" clearable placeholder="请选择项目名称" @change="changeValue(weeklyForm.project_relevant[index].projectName, index)">
									<el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<!--项目执行日志填写-->
						<p class="patch middle" v-show="weeklyForm.project_relevant[index].relatedType.indexOf('项目执行') != -1">项目执行</p>
						<section class="impl-area clearfix" v-show="weeklyForm.project_relevant[index].relatedType.indexOf('项目执行') != -1">
							<div class="l">
								<el-form-item class="ml0" prop="nochange_has">
									<el-checkbox class="changeDemand" v-model="weeklyForm.project_relevant[index].exec.nochange_has">无变更需求</el-checkbox>
								</el-form-item>
							</div>
							<div class="r" v-if="weeklyForm.project_relevant[index].exec.nochange_has">
								<div class="content">
									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item label="正常工时：" :prop="'project_relevant.' + index + '.exec.nochange_normaltime'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].exec.nochange_normaltime" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="其它工时：" :prop="'project_relevant.'+index+'.exec.nochange_overtime'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].exec.nochange_overtime" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
									</el-row>
									<el-form-item class="nmb" label="工作内容：" :prop="'project_relevant.'+index+'.exec.nochange_content'" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
										<el-input type="textarea" v-model="weeklyForm.project_relevant[index].exec.nochange_content" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
									</el-form-item>
								</div>
							</div>
						</section>
						<section v-for="(requireitem, requireindex) in weeklyForm.project_relevant[index].exec.require" class="impl-area clearfix" v-show="weeklyForm.project_relevant[index].relatedType.indexOf('项目执行') != -1">
							<div class="l">
								<el-form-item class="ml0" prop="has">
									<el-checkbox class="changeDemand" v-model="weeklyForm.project_relevant[index].exec.require[requireindex].has">{{weeklyForm.project_relevant[index].exec.require[requireindex].theme}}</el-checkbox>
								</el-form-item>
							</div>
							<div class="r" v-if="weeklyForm.project_relevant[index].exec.require[requireindex].has">
								<div class="content">
									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item label="正常工时：" :prop="'project_relevant.'+index+'.exec.require.'+requireindex+'.workHour'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].exec.require[requireindex].workHour" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="其它工时：" :prop="'project_relevant.'+index+'.exec.require.'+requireindex+'.overHour'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].exec.require[requireindex].overHour" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
									</el-row>
									<el-form-item class="nmb" label="工作内容：" :prop="'project_relevant.'+index+'.exec.require.'+requireindex+'.content'" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
										<el-input type="textarea" v-model="weeklyForm.project_relevant[index].exec.require[requireindex].content" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
									</el-form-item>
								</div>
							</div>
						</section>
						<p class="patch middle" v-show="weeklyForm.project_relevant[index].relatedType.indexOf('项目会议') != -1">项目会议</p>
						<section class="impl-area clearfix" v-show="weeklyForm.project_relevant[index].relatedType.indexOf('项目会议') != -1">
							<div class="l">
								<el-form-item class="ml0" prop="nochange_has">
									<el-checkbox class="changeDemand" v-model="weeklyForm.project_relevant[index].meeting.nochange_has">无变更需求</el-checkbox>
								</el-form-item>
							</div>
							<div class="r" v-if="weeklyForm.project_relevant[index].meeting.nochange_has">
								<div class="content">
									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item label="正常工时：" :prop="'project_relevant.'+index+'.meeting.nochange_normaltime'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].meeting.nochange_normaltime" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="其它工时：" :prop="'project_relevant.'+index+'.meeting.nochange_overtime'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].meeting.nochange_overtime" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
									</el-row>
									<el-form-item class="nmb" label="工作内容：" :prop="'project_relevant.'+index+'.meeting.nochange_content'" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
										<el-input type="textarea" v-model="weeklyForm.project_relevant[index].meeting.nochange_content" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
									</el-form-item>
								</div>
							</div>
						</section>
						<section v-for="(requireitem, requireindex) in weeklyForm.project_relevant[index].meeting.require" class="impl-area clearfix" v-show="weeklyForm.project_relevant[index].relatedType.indexOf('项目会议') != -1">
							<div class="l">
								<el-form-item class="ml0" prop="has">
									<el-checkbox class="changeDemand" v-model="weeklyForm.project_relevant[index].meeting.require[requireindex].has">{{weeklyForm.project_relevant[index].meeting.require[requireindex].theme}}</el-checkbox>
								</el-form-item>
							</div>
							<div class="r" v-if="weeklyForm.project_relevant[index].meeting.require[requireindex].has">
								<div class="content">
									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item label="正常工时：" :prop="'project_relevant.'+index+'.meeting.require.'+requireindex+'.workHour'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].meeting.require[requireindex].workHour" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="其它工时：" :prop="'project_relevant.'+index+'.meeting.require.'+requireindex+'.overHour'" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
												<plusminusintfloat :validate="true" v-model="weeklyForm.project_relevant[index].meeting.require[requireindex].overHour" :decimal="1"></plusminusintfloat>
											</el-form-item>
										</el-col>
									</el-row>
									<el-form-item class="nmb" label="工作内容：" :prop="'project_relevant.'+index+'.meeting.require.'+requireindex+'.content'" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
										<el-input type="textarea" v-model="weeklyForm.project_relevant[index].meeting.require[requireindex].content" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
									</el-form-item>
								</div>
							</div>
						</section>
					</section>
					<el-button icon="icon-add1" class="mt14 againbtn" @click="againClick">再写一篇</el-button>
					<section class="log-area norelated mt20 mb20 box" v-if="!showNperformer">
						<div class="norelated-checkbox clearfix">
							<span class="lb">非项目相关：</span>
							<el-form-item class="ml0 nmb" prop="noproject_relevant.norelatedType">
								<el-checkbox-group v-model="weeklyForm.noproject_relevant.norelatedType">
									<el-checkbox label="日常事务" name="type"></el-checkbox>
									<el-checkbox label="学习" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</div>
						<div class="affair-area" v-show="weeklyForm.noproject_relevant.norelatedType.indexOf('日常事务') != -1">
							<p class="patch middle">日常事务</p>
							<div class="content">
								<el-row :gutter="20">
									<el-col :span="6">
										<el-form-item label="正常工时：" prop="noproject_relevant.affairNormalHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.affairNormalHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="其它工时：" prop="noproject_relevant.affairOvertimeHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.affairOvertimeHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
								</el-row>
								<el-form-item class="nmb" label="工作内容：" prop="noproject_relevant.affairWorkContent" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
									<el-input type="textarea" v-model="weeklyForm.noproject_relevant.affairWorkContent" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="study-area" v-show="weeklyForm.noproject_relevant.norelatedType.indexOf('学习') != -1">
							<p class="patch middle">学习</p>
							<div class="content">
								<el-row :gutter="20">
									<el-col :span="6">
										<el-form-item label="正常工时：" prop="noproject_relevant.studyNormalHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.studyNormalHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="其它工时：" prop="noproject_relevant.studyOvertimeHours" :rules="[{ required: true, message: '工时不能为空'},{ type: 'number', message: '必须为数字值'}]">
											<plusminusintfloat :validate="true" v-model="weeklyForm.noproject_relevant.studyOvertimeHours" :decimal="1"></plusminusintfloat>
										</el-form-item>
									</el-col>
								</el-row>
								<el-form-item class="nmb" label="工作内容：" prop="noproject_relevant.studyWorkContent" :rules="[{ required: true, message: '日志内容不能为空', trigger: 'blur' },{ min: 10, message: '日志内容不得少于10个字符', trigger: 'blur' }]">
									<el-input type="textarea" v-model="weeklyForm.noproject_relevant.studyWorkContent" :autosize="{ minRows: 2}" :minlength="10" :maxlength="500"></el-input>
								</el-form-item>
							</div>
						</div>
					</section>
					<div class="action-toolbar">
						<el-button type="primary" class="submitbtn" :disabled="buttonDisabled" @click="submitForm('weeklyForm')">提交</el-button>
						<el-button type="primary" class="submitbtn" @click="resetForm">重置</el-button>
						<el-button class="cancelbtn" @click="cancel">取消</el-button>
					</div>
				</el-form>
			</div>
			<div style="height: 24px;"></div>
		</div>
	</section>
</template>

<script>
	let plusminusintfloat = () =>
		import('@/components/select/plusminusintfloat.vue')
	export default {
		name: 'ReleaseLog_Pmo',
		props: {
			editLogDataSource: {
				type: Object,
				default: function() {
					return null
				}
			}
		},
		data() {
			return {
				editLogFlag: false,
				itemsFlag: true,
				userId: JSON.parse(Cache.local(Config.Login)).uc.id,
				items: [], //项目列表
				itemRequires: [],
				buttonDisabled: false,
				isWriteLog: true, //是否是写日志
				saveOrEdit: '发布日志',
				pickerOptions: {
					disabledDate(time) {
						var fday = new Date().setTime(new Date().getTime() - 48 * 60 * 60 * 1000);
						return fday > time.getTime() || time.getTime() > Date.now()
					}
				},
				showNperformer: JSON.parse(Cache.local(Config.Login)).uc.isPerformer == 0 ? true : false,
				weeklyForm: {
					workDate: '', //工作日期
					logId: '',
					project_relevant: [{ //项目相关
						relatedType: JSON.parse(Cache.local(Config.Login)).uc.isPerformer == 1 ? ['项目执行'] : [],
						projectName: '',
						exec: {
							id: '', //项目日志id
							nochange_has: true,
							nochange_normaltime: 0,
							nochange_overtime: 0,
							nochange_content: '',
							require: []
						},
						meeting: {
							id: '', //项目日志id
							nochange_has: true,
							nochange_normaltime: 0,
							nochange_overtime: 0,
							nochange_content: '',
							require: []
						}
					}],
					noproject_relevant: {
						norelatedType: JSON.parse(Cache.local(Config.Login)).uc.isPerformer == 0 ? ['日常事务'] : [],
						aId: '', //非项目日志--事务日志id
						sId: '', //非项目日志--学习日志id
						affairNormalHours: 0,
						affairOvertimeHours: 0,
						affairWorkContent: '',
						studyNormalHours: 0,
						studyOvertimeHours: 0,
						studyWorkContent: ''
					},
				},
				rules: {
					workDate: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}]
				}
			}
		},
		watch: {
			'state.LogManagement.switchToLogViewData': {
				deep: true,
				handler(val, oldVal) {

				}
			},
			'weeklyForm': {
				deep: true,
				handler(val, oldVal) {
					console.log("9999", JSON.parse(JSON.stringify(val)))
				}
			}

		},
		components: {
			plusminusintfloat
		},
		mounted: function() {
			this.$emit('init')
			this.$store.dispatch('HIDE_LOG_AUDIT')
			this.$nextTick(() => {
				this.queryItems();
				!!this.editLogDataSource && this.editInitDate();
				!!this.editLogDataSource && this.fmt2weeklyForm();

			});
		},
		methods: {
			editInitDate() {
				this.weeklyForm.project_relevant[0].relatedType = [],
					this.weeklyForm.noproject_relevant.norelatedType = [],
					this.saveOrEdit = '编辑日志'
			},
			againClick() {
				this.weeklyForm.project_relevant.push({ //项目相关
					relatedType: [],
					projectName: '',
					exec: {
						nochange_has: true,
						nochange_normaltime: '',
						nochange_overtime: '',
						nochange_content: '',
						require: []
					},
					meeting: {
						nochange_has: false,
						nochange_normaltime: '',
						nochange_overtime: '',
						nochange_content: '',
						require: []
					}
				})
			},
			covert2Item(data) {
				let itemLog = []
				let requireLog = []
				for(let i in this.weeklyForm.project_relevant) {
					let item = this.weeklyForm.project_relevant[i]
					if(item.relatedType.indexOf('项目执行') != -1) {
						for(let requireindex in item.exec.require) {
							if(item.exec.require[requireindex].has) {
								item.exec.require[requireindex].logType = 3 //项目执行类型
								requireLog.push(item.exec.require[requireindex])
							}
						}
						if(item.exec.nochange_has) {
							itemLog.push({
								type: 3, //
								id: item.exec.id,
								itemId: item.projectName, //项目id
								workHour: item.exec.nochange_normaltime,
								overHour: item.exec.nochange_overtime,
								content: item.exec.nochange_content,
							})
						}
					}
					if(item.relatedType.indexOf('项目会议') != -1) {
						for(let requireindex in item.meeting.require) {
							if(item.meeting.require[requireindex].has) {
								item.meeting.require[requireindex].logType = 4 //项目会议类型
								requireLog.push(item.meeting.require[requireindex])
							}
						}
						if(item.meeting.nochange_has) {
							itemLog.push({
								type: 4, //
								id: item.meeting.id,
								itemId: item.projectName, //项目id
								workHour: item.meeting.nochange_normaltime,
								overHour: item.meeting.nochange_overtime,
								content: item.meeting.nochange_content,
							})
						}
					}
					/*	if(item.exec.nochange_has &&
						item.relatedType.indexOf('项目执行') != -1) {
					let requireTempArr = []
						for(let requireindex in item.exec.require) {
							if(item.exec.require[requireindex].has) {
								requireTempArr.push(item.exec.require[requireindex])
							}
						}
						ret.push({
							type: 3, //
							id: item.exec.id,
							itemId: item.projectName, //项目id
							workHour: item.exec.nochange_normaltime,
							overHour: item.exec.nochange_overtime,
							content: item.exec.nochange_content,
							require: requireTempArr
						})
					
					}
					if(item.meeting.nochange_has &&
						item.relatedType.indexOf('项目会议') != -1) {
						let requireTempArr = []
						for(let requireindex in item.meeting.require) {
							if(item.meeting.require[requireindex].has) {
								requireTempArr.push(item.meeting.require[requireindex])
							}
						}
						ret.push({
							type: 4, //
							id: item.meeting.id,
							itemId: item.projectName, //项目id
							workHour: item.meeting.nochange_normaltime,
							overHour: item.meeting.nochange_overtime,
							content: item.meeting.nochange_content,
							require: requireTempArr
						})
				}*/
				}
				data.itemLog = itemLog;
				data.requireLog = requireLog;
				console.log('data', JSON.parse(JSON.stringify(data)))
				//return ret
			},
			convertFormData() {
				let data = {
					workTime: (!!this.weeklyForm.workDate) ? new Date(this.weeklyForm.workDate).format("yyyy-MM-dd") : '',
					logId: this.weeklyForm.logId,
					userId: this.userId, //用户id
					normal: [],
				}
				this.covert2Item(data)
				if(this.weeklyForm.noproject_relevant.norelatedType.indexOf('日常事务') != -1) {
					data.normal.push({
						type: 1, //日志类型
						workHour: this.weeklyForm.noproject_relevant.affairNormalHours, //工时
						overHour: this.weeklyForm.noproject_relevant.affairOvertimeHours, //其它工时
						content: this.weeklyForm.noproject_relevant.affairWorkContent, //日志内容
						id: this.weeklyForm.noproject_relevant.aId
					})
				}
				if(this.weeklyForm.noproject_relevant.norelatedType.indexOf('学习') != -1) {
					data.normal.push({
						type: 2,
						workHour: this.weeklyForm.noproject_relevant.studyNormalHours,
						overHour: this.weeklyForm.noproject_relevant.studyOvertimeHours,
						content: this.weeklyForm.noproject_relevant.studyWorkContent,
						id: this.weeklyForm.noproject_relevant.sId
					})
				}
				return data
			},
			queryItems() {
				//查询员工所在部门分配到的项目列表
				this.$http.post('/api/dayLogQuery/queryItemsByNoPm?userId=' + this.userId + '&isWriteLog=' + this.isWriteLog, {
					emulateJSON: true
				}).then((res) => {
					let flag = res.data.success;
					if(flag) {
						this.items = res.data.result;
					}
				}).catch((err) => {
					this.loading = false

				})
			},
			changeValue(value, index) {
				if(!!this.editLogDataSource) {
					if(this.editLogFlag) {
						this.queryItemRequire(value, index)
					}
				} else {
					this.queryItemRequire(value, index)
				}
			},
			trimSpace(array) {
				for(var i = 0; i < array.length; i++) {
					if(array[i] == "" || array[i] == null || typeof(array[i]) == "undefined") {
						array.splice(i, 1);
						i = i - 1;

					}
				}
				return array;
			},
			queryItemRequire(value, index) {
				//根据项目id查询项目需求变更列表
				this.$http.post('/api/itemRequire/getItemRequireByItemId?itemId=' + value, {
					emulateJSON: true
				}).then((res) => {
					let flag = res.data.success;
					if(flag) {
						let ret = res.data.result
						for(let i = 0; i < ret.length; i++) {
						    if(ret[i].theme.length>8){
						     ret[i].theme=ret[i].theme.substring(0,8)+"..."
						    }
							ret[i].has = false
							ret[i].workHour = 0
							ret[i].overHour = 0
							ret[i].content = ''
						}
						let remoteExecRequire = [...this.weeklyForm.project_relevant[index].exec.require]
						let remoteMeetRequire = [...this.weeklyForm.project_relevant[index].meeting.require]
						this.weeklyForm.project_relevant[index].exec.require = []
						this.weeklyForm.project_relevant[index].meeting.require = []
						let copyRet1 = JSON.parse(JSON.stringify(ret))
						let copyRet2 = JSON.parse(JSON.stringify(ret))
						if(remoteExecRequire.length > 0) {
							for(let i in remoteExecRequire) {
								if(!remoteExecRequire[i].has) {
									remoteExecRequire = [];
									break;
								} else {
									if(copyRet1.length > 0) {
										if(copyRet1[0].itemId != remoteExecRequire[0].itemId) {
											remoteExecRequire = [];
											break;
										} else {
											for(let j in copyRet1) {
												let point = this.hasNameAtArray(copyRet1[j].theme, remoteExecRequire)
												if(point != -1) {
													delete copyRet1[j]
												}
											}
											let temArr = this.trimSpace(copyRet1)
											if(temArr.length > 0) {
												for(let i in temArr) {
													remoteExecRequire.push(temArr[i])
												}
											}
											copyRet1 = [];
											break;
										}
									}
								}
							}
						}
						this.weeklyForm.project_relevant[index].exec.require = [...remoteExecRequire, ...copyRet1]
						if(remoteMeetRequire.length > 0) {

							for(let i in remoteMeetRequire) {
								if(!remoteMeetRequire[i].has) {
									remoteMeetRequire = [];
									break;
								} else {
									if(copyRet2.length > 0) {
										if(copyRet2[0].itemId != remoteMeetRequire[0].itemId) {
											remoteMeetRequire = [];
											break;
										} else {
											for(let j in copyRet2) {
												let point = this.hasNameAtArray(copyRet2[j].theme, remoteMeetRequire)
												if(point != -1) {
													delete copyRet2[j]
												}
											}
											let temArr = this.trimSpace(copyRet2)
											if(temArr.length > 0) {
												for(let i in temArr) {
													remoteMeetRequire.push(temArr[i])
												}
											}
											copyRet2 = [];
											break;
										}
									}
								}
							}
						}
						this.weeklyForm.project_relevant[index].meeting.require = [...remoteMeetRequire, ...copyRet2]
					}
				}).catch((err) => {
					this.loading = false

				})
			},
			hasNameAtArray(theme, arr) {
				let ret = -1
				for(let i in arr) {
					if(arr[i].theme == theme) {
						ret = i
					}
				}
				return ret
			},
			validateOneLogOneItem() {
				let itemid = []
				let flag = true;
				for(let i in this.weeklyForm.project_relevant) {
					if(this.weeklyForm.project_relevant[i].relatedType.length) {
						let projectName = this.weeklyForm.project_relevant[i].projectName
						if(projectName) {
							if(itemid.indexOf(projectName) != -1) {
								flag = false;
								this.$message({
									customClass: 'error',
									message: "同一个项目只能选择一次"
								})
								return
							} else {
								itemid.push(projectName)
							}
						}
					}
				}
				return flag;
			},
			submitForm() {
				if(!this.validateOneLogOneItem()) {
					return;
				}
				let data = this.convertFormData()
				this.buttonDisabled = true
				this.$http.post('/api/dayLog/saveOrEdit', data, {
					emulateJSON: false
				}).then((res) => {
					let flag = res.data.success;
					if(flag) {
						this.$message({
							customClass: 'success',
							message: '恭喜你，日志提交成功'
						});
						this.cancel()
					} else {
						this.buttonDisabled = false
						this.$message({
							customClass: 'error',
							message: res.data.message
						});
					}
				}).catch((err) => {

				});
			},
			cancel() {
				this.$emit('back')
			},
			resetForm() {
				this.$refs.weeklyForm.resetFields();
			},
			ftmLogType(type) {

				switch(type) {
					case 1:
						return '日常事务'
					case 2:
						return '学习'
					case 3:
						return '项目执行'
					case 4:
						return '项目会议'
				}
			},
			fmt2weeklyForm(data) {
				let rst = { ...this.editLogDataSource
				}
				let dayLog = rst.dayLog
				let reportLogList = rst.reportLogList
				let wf = this.weeklyForm
				wf.workDate = new Date(`${dayLog.workTime}`.split('-').join('/'))
				//如果logId有值说明是编辑
				wf.logId = dayLog.id
				let norelatedType = wf.noproject_relevant.norelatedType
				let itemLog = wf.project_relevant

				function remoteDataFormat() {
					let ret = [],
						eqFlag = false,
						pret = []
					for(let remoteIndex in reportLogList) {
						for(var i = 0; i < ret.length; i++) {
							if(ret[i].id == reportLogList[remoteIndex].itemId) {
								ret[i].data.push(reportLogList[remoteIndex])
								eqFlag = true
							}
						}
						if(ret.length == 0 || !eqFlag) {
							ret.push({
								id: reportLogList[remoteIndex].itemId,
								category: reportLogList[remoteIndex].category,
								data: [reportLogList[remoteIndex]]
							})
						}
						eqFlag = false
					}
					for(let i in ret) {
						if(parseInt(ret[i].category) == 1) {
							pret = ret.splice(i, 1)[0].data
						}
					}
					return {
						pret: ret,
						npret: pret
					}
				}

				function generItemLogNullData(len) {
					for(var i = 0; i < len - 1; i++) {
						itemLog.push({ //项目相关
							relatedType: [],
							projectName: '',
							exec: {
								id: '',
								nochange_has: false,
								nochange_normaltime: '',
								nochange_overtime: '',
								nochange_content: '',
								require: []
							},
							meeting: {
								id: '',
								nochange_has: false,
								nochange_normaltime: '',
								nochange_overtime: '',
								nochange_content: '',
								require: []
							}
						})
					}
				}
				let remoteObj = remoteDataFormat()
				let remoteData = remoteObj.pret //项目日志
				generItemLogNullData(remoteData.length)
				let tempInter = setInterval(() => {
					if(
						(this.$refs.project_relevant.length == remoteData.length) ||
						(this.$refs.project_relevant.length == 1 && remoteData.length == 0)
					) {
						clearInterval(tempInter)
						//非项目相关
						for(let remoteIndex in remoteObj.npret) {
							let item = remoteObj.npret[remoteIndex]
							//非项目日志--日常事务
							if(item.category == 1 && item.type == 1) {
								wf.noproject_relevant.affairNormalHours = item.workHour //工时
								wf.noproject_relevant.affairOvertimeHours = item.overHour //其它工时
								wf.noproject_relevant.affairWorkContent = item.content //日志内容
								wf.noproject_relevant.aId = item.id //日志id
								norelatedType.push(this.ftmLogType(item.type))
							}
							//非项目日志--学习
							if(item.category == 1 && item.type == 2) {
								wf.noproject_relevant.studyNormalHours = item.workHour //工时
								wf.noproject_relevant.studyOvertimeHours = item.overHour //其它工时
								wf.noproject_relevant.studyWorkContent = item.content //日志内容
								wf.noproject_relevant.sId = item.id //日志id
								norelatedType.push(this.ftmLogType(item.type))
							}
						}
						for(let remoteIndex in remoteData) {
							for(let sameIndex in remoteData[remoteIndex].data) {
								let item = remoteData[remoteIndex].data[sameIndex]
								let itemId = item.itemId;
								//如果日志类型为项目执行
								if(item.type == 3) {
									if(item.isAutoGenerate == 1) {
										itemLog[remoteIndex].exec.nochange_has = false
									} else {
										itemLog[remoteIndex].exec.nochange_has = true
									}
									itemLog[remoteIndex].exec.id = item.id
									itemLog[remoteIndex].exec.nochange_normaltime = item.workHour
									itemLog[remoteIndex].exec.nochange_overtime = item.overHour
									itemLog[remoteIndex].exec.nochange_content = item.content
									for(let i in item.requireLogs) {
										itemLog[remoteIndex].exec.require.push({
											has: true,
											itemId: itemId,
											itemReportLogId: item.id,
											requireLogId: item.requireLogs[i].id,
											theme: item.requireLogs[i].name,
											workHour: item.requireLogs[i].workHour,
											overHour: item.requireLogs[i].overHour,
											content: item.requireLogs[i].content
										})
									}
								}
								//日志类型为项目会议
								if(item.type == 4) {
									if(item.isAutoGenerate == 1) {
										itemLog[remoteIndex].meeting.nochange_has = false
									} else {
										itemLog[remoteIndex].meeting.nochange_has = true
									}
									itemLog[remoteIndex].meeting.id = item.id
									itemLog[remoteIndex].meeting.nochange_normaltime = item.workHour
									itemLog[remoteIndex].meeting.nochange_overtime = item.overHour
									itemLog[remoteIndex].meeting.nochange_content = item.content
									for(let i in item.requireLogs) {
										itemLog[remoteIndex].meeting.require.push({
											has: true,
											theme: item.requireLogs[i].name,
											itemId: itemId,
											itemReportLogId: item.id,
											requireLogId: item.requireLogs[i].id,
											workHour: item.requireLogs[i].workHour,
											overHour: item.requireLogs[i].overHour,
											content: item.requireLogs[i].content
										})
									}
								}
								itemLog[remoteIndex].relatedType.push(this.ftmLogType(item.type))
								itemLog[remoteIndex].projectName = item.itemId
							}
						}
						this.editLogFlag = true
					}
				}, 16)
			}
		},
	}
</script>
<style scoped>
	.logmy {
		height: 100%;
	}
	
	.workdateitem {
		margin-bottom: 2px;
	}
	
	.mt24 {
		margin-top: 24px;
	}
	
	.mb20 {
		margin-bottom: 20px;
	}
	
	.ml0 {
		margin-left: 0px;
	}
	
	.primary_btn {
		border-radius: 2px;
		font-size: 14px;
		line-height: 1;
		width: 90px;
		height: 30px;
		padding: 0;
	}
	
	.cancel_btn {
		background: #f2f2f2;
		border-radius: 2px;
		border: none;
		font-size: 14px;
		line-height: 1;
		width: 90px;
		height: 30px;
		padding: 0;
		font-size: 14px;
		color: #666666;
	}
	
	.action-toolbar {
		text-align: right;
		padding-top: 10px;
		position: absolute;
		right: 20px;
		bottom: 20px;
		left: 20px;
	}
	
	.againWrite {
		background: #F7F8F9;
		border-radius: 2px;
		width: 90px;
		height: 30px;
		font-size: 12px;
		color: #666;
		line-height: 1;
		padding: 0;
		border: none;
	}
	
	.mt14 {
		margin-top: 14px;
	}
	
	.mt20 {
		margin-top: 20px;
	}
	
	.nmb {
		margin-bottom: 0px !important;
	}
	
	.nmb label {
		font-size: 12px;
		font-family: "PingFangSC-Regular", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.wrap {
		position: relative;
		height: 100%;
		margin-top: -26px;
    	padding-top: 50px;
    	box-sizing: border-box;
    	padding-bottom: 24px;
	}
	.page-bg{
		padding: 20px 20px 50px 20px;
		margin: 0 auto 0 auto;
		min-height: 100%;
	}
	.title {
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.weeklyForm {
		margin-top: 14px;
	}
	
	.log-area.box {
		border: 1px solid #E9EAEC;
		border-radius: 2px 0 0 2px;
	}
	
	.log-area .patch {
		height: 40px;
		background: #FAFBFD;
		font-size: 12px;
		color: #000000;
		padding-left: 20px;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.impl-area {
		height: 166px;
	}
	
	.log-area .impl-area {
		border-top: 1px solid #E9EAEC;
		height: auto;
		position: relative;
		min-height: 36px;
	}
	
	.impl-area .l {
		float: left;
		width: 170px;
		height: 100%;
		border-right: 1px solid #e9eaec;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
	}
	
	.log-area .impl-area .l .el-form-item {
		top: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		height: 14px;
		position: absolute;
	}
	
	.impl-area .r {
		float: none;
		overflow: hidden;
		height: 100%;
		margin-left: 170px;
	}
	
	.impl-area .content {
		padding: 20px;
		font-size: 12px;
	}
	
	.changeDemand {
		margin-left: 20px;
	}
	
	.related-checkbox {
		padding: 12px 0px 16px 20px;
	}
	
	.norelated-checkbox {
		padding: 2.5px 0px 2.5px 20px;
	}
	
	.norelated-checkbox .lb,
	.related-checkbox .lb {
		font-size: 12px;
		color: #000;
		float: left;
		line-height: 37.5px;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.affair-area .content,
	.study-area .content {
		padding: 20px;
		font-size: 12px;
	}
	
	.width190 {
		width: 190px;
	}
	
	.plus-minus-int-float {
		width: 86px;
	}
</style>
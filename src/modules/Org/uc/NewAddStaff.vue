<template>
	<section class="wrap">
		<div class="backToPre">
			<span @click="backToPre">
				<i class="el-icon-arrow-left"></i>
				<span class="return">返回</span>
			</span>
		</div>
			<section class="layout newAddStaff">
				<herghost-scroll>
				<div class="backImg page-bg">
					<div class="iswork">
						<span>是否在职：</span>
						<el-switch class="uciszz switch-type-3" v-model="value1" on-value="1" off-value="0" on-text="" off-text=""></el-switch>
					</div>
					<div class="yuan">
						<span class="upload_img">
							<!--<input type="text" id="userIcon" ref="userIcon" @click="showUploadDialog"/>-->
							<span id="userIcon" ref="userIcon" @click="showUploadDialog"></span>
							<img class="circlex" ref="circlex" />
						</span>
					</div>
					<div class="layin">
						<el-form :inline="true" :model="accountFrom" :rules="rules" label-position = "left" ref="accountFrom" label-width="67px" class="form-wrap">
							<div class="clearfix">
								<div class="box_name">账号信息</div>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="工号：" prop="jobNum">
											<el-input v-model="accountFrom.jobNum" :maxlength="15" placeholder="请输入"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="用户名：" prop="userName">
											<el-input v-model="accountFrom.userName" :maxlength="15" placeholder="请输入" @blur="validateUser"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="初始口令：" prop="passWord">
											<el-input v-model.number="accountFrom.passWord" class="initpwd" :readonly="true"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="所属部门：" prop="departId" class="pad_l">
											<!--<label class="depLabel"><span>*</span>所属部门：</label>-->
											<el-cascader :options="data" class="departCascader" v-model="accountFrom.departId" :change-on-select="true" @change="handleChange1"></el-cascader>
											<!--<div class="el-form-item__error depart" style="display:none">不能为空</div>-->
											<!--<div class="error depart" style="display:none">不能为空</div>-->
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="所在岗位：" prop ='stationId' class="pad_l">
											<!--<label class="depLabel"><span>*</span>所在岗位：</label>-->
											<template>
												<el-select v-model="accountFrom.stationId" placeholder="请选择">
													<el-option v-for="(item ,index) in stations" :key="index" :label="item.name" :value="item.id">
													</el-option>
												</el-select>
											</template>
											<!--<div class="el-form-item__error stationId" style="display:none">不能为空</div>-->
											<!--<div class="error stationId" style="display:none">不能为空</div>-->
										</el-form-item>
									</el-col>
									<el-col :span="12">
										
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="24">
										<el-form-item label="拥有角色：" class="pad_l hasrole" prop='roleIds'>
											<template>
												<el-select v-model="accountFrom.roleIds" placeholder="请选择" multiple>
													<el-option v-for="(item ,index) in roleIds" :key="index" :label="item.name" :value="item.id">
													</el-option>
												</el-select>
											</template>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="员工状态：" prop="status" class="jobStatus pad_l">
											<template>
												<el-select v-model="accountFrom.status"  placeholder="请选择">
													<el-option v-for="(item ,index) in jobStatus" :key="index" :label="item.name" :value="item.value">
													</el-option>
													<!--<el-option label="离职" value="0"></el-option>-->
												</el-select>
											</template>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item class="blocki label88" label="是否允许登陆：" prop='isLogin'>
											<el-switch class="isyxlogin switch-type-3" v-model="accountFrom.isLogin" :on-value="1" :off-value="0" on-text="" off-text=""></el-switch>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="16">
										<el-form-item label="是否执行人员：" prop='isPerformer' class="label88">
											<el-switch class="iszxuc switch-type-3" v-model="accountFrom.isPerformer" :on-value="1" :off-value="0" on-text="" off-text=""></el-switch>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
							<div class="clearfix">
								<div class="box_name">个人资料</div>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="姓名：" prop="chName">
											<el-input :maxlength="15" v-model="accountFrom.chName" placeholder="请输入"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item prop="birthTime" label="出生日期：" class="date1">
											<el-date-picker type="date" placeholder="" v-model="accountFrom.birthTime"></el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="24">
										<el-form-item label="英文名：" prop="enName">
											<el-input :maxlength="15" v-model="accountFrom.enName" placeholder="英文名" class="last_name"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="性别：" class="pad_l" prop='gender'>
											<el-radio-group v-model="accountFrom.gender">
												<el-radio :label="1">男</el-radio>
												<el-radio :label="0">女</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="工资：" prop="salary" class="wage">
											<el-input :maxlength="8" v-model.number="accountFrom.salary" placeholder="工资=合同工资+公司承担的五险一金" @blur="salaryClick"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="级别：" prop="busRank">
											<el-input v-model="accountFrom.busRank" placeholder="" :disabled="true" class="levelx"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="24">
										<el-form-item label="公司邮箱：" prop="email" class="blocki">
											<el-input v-model.email="accountFrom.email" placeholder="请输入"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="分机号码：" prop="extPhone" class="pad_l">
											<el-input :maxlength="20" v-model="accountFrom.extPhone" auto-complete="off" :readonly="false"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="手机号码：" prop="phone">
											<el-input :maxlength="11" v-model.number="accountFrom.phone" placeholder="请输入"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
							<div class="clearfix">
								<div class="box_name">个人简历</div>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item prop="entryTime" label="入职时间：" class="date1 pad_l">
											<el-date-picker v-model="accountFrom.entryTime" type="date" placeholder="入职日期"></el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item prop="date3" label="辞职时间：" class="date1">
											<el-date-picker v-model="accountFrom.quitTime" type="date" placeholder="辞职日期"></el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="毕业学校：" prop="graduate_school" class="pad_l">
											<el-input :maxlength="30" v-model="accountFrom.graduateSchool" auto-complete="off" :readonly="false"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="毕业时间：" class="date1">
											<el-date-picker v-model="accountFrom.graduateTime" type="date" placeholder="毕业时间" format="yyyy-MM-dd"></el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="12">
										<el-form-item label="学历：" prop="education" class="pad_l">
											<template>
												<el-select v-model="accountFrom.education" placeholder="请选择">
													<el-option v-for="(item ,index) in educations" :key="index" :label="item.name" :value="item.id">
													</el-option>
												</el-select>
											</template>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="专业：" prop="major">
											<el-input :maxlength="30" v-model="accountFrom.major" auto-complete="off" :readonly="false"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="24">
										<el-form-item class="mt8 pad_l" label="备注：" prop="description">
											<el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2}" :rows="4" placeholder="请输入" v-model="accountFrom.description" class="note"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="24" class="text-center marginbt">
										<el-button type="primary" @click="submitForm('accountFrom')" class="submitbtn">提交</el-button>
										<el-button type="primary" @click="resetForm('accountFrom')" class="submitbtn">重置</el-button>
										<el-button class="cancelbtn" @click='backToPre'>取消</el-button>
									</el-col>
								</el-row>
							</div>
						</el-form>
					</div>
				</div>
				<UploadAvator :visible.sync="UploadAvatorVisible" @imgData = 'imgData'></UploadAvator>
				</herghost-scroll>
			</section>
	</section>

</template>

<script>
	let md5 = require('@/utils/md5.js')
	let MultipleSelect = () =>
		import('@/components/select/MultipleSelect.vue')
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	let UploadAvator = () =>
		import('@/modules/Org/uc/UploadAvator.vue')
		
	let fromRoute = null
	export default {
		name: 'NewAddStaff',
		beforeRouteEnter(to, from, next) {
			fromRoute = from
			next()
		},
		components: {
			MultipleSelect,
			'herghost-scroll': HerGhostScroll,
			UploadAvator
		},
		data() {
			var validateMailPass = (rule, value, callback) => {
				if(value && value != '') {
					this.$http.post('/api/uContact/queryUcByAccount', {
						'ucId': null,
						'account': value
					}, {
						emulateJSON: true
					}).then((res) => {
						
						if(res.data.result) {
							callback(new Error('数据已存在！'));
						} else {
							callback();
						}
					}).catch((err) => {});
				} else {
					callback(new Error('邮箱不能为空'));
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value && value != '') {
					this.$http.post('/api/uContact/queryUcByAccount', {
						'ucId': null,
						'account': value
					}, {
						emulateJSON: true
					}).then((res) => {
						
						if(res.data.result) {
							callback(new Error('数据已存在！'));
						} else {
							callback();
						}
					}).catch((err) => {});
				} else {
					callback(new Error('数据不能为空'));
				}
			};
			return {
				dataList: JSON.parse(Cache.local(Config.Login)),
				educations: null,
				value1: '1',
				resize: null,
				accountFrom: {
					id: null,
					chName: null, //姓名
					enName: null, //英文名
					jobNum: null,
					depart: null,
					departId: null,
					gender: 1,
					email: null,
					phone: null,
					status: null,
					jobStatus: null,
					passWord: null,
					isLogin: 1,
					isPerformer: 1,
					birthTime: null,
					salary: null,
					extPhone: null,
					graduateSchool: null,
					entryTime: null,
					quitTime: null,
					graduateTime: null,
					education: null,
					major: null,
					stationId: null,
					jobStatuss: null,
					statusName: null,
					genderName: null,
					roleIds: [],
					idCardNo: null,
					departId: null,
					busId: null,
					rank: null,
					busRank: null,
					userName: null,
					departsId: null,
					startTime: null,
					endTime: null,
					departsId: '',
					departIds: [],
					selectedOptions: [],
					description: "",
					role: [8, 1] //分配角色
				},
				roleIds: [],
				data: [],
				stations: [{}],
				jobStatus: [],
				rules: {
					jobNum: [{
						required: true,
						validator: validatePass,
						trigger: 'blur'
					}],
					userName: [{
						required: true,
						message: '用户名不能为空',
					}],
					passWord: [{
						required: true,
						message: '初始口令不能为空'
					}],
					departId: [{
                        type: 'array',
						required: true,
						message: '请选择所属部门',
						trigger: 'change'
					}],
					stationId: [{
						required: true,
						message: '请选择所属岗位',
						trigger: 'change'
					}],
					roleIds: [{
                        type: 'array',
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
					status: [{
                     	required: true,
						message: '用户名不能为空',
					}],
					chName: [{
						required: true,
						message: '姓名不能为空',
						trigger: 'blur'
					},{
						pattern:/^[\u2E80-\u9FFF]+$/,
						message: '请输入中文',
						trigger: 'blur'
					},
					],
					enName:[{
						pattern:/^[a-z]+$/i,
						required: false,
						message: '请输入英文',
						trigger: 'blur'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					salary: [{
							required: true,
							message: '工资不能为空'
						},
						{
							type: 'number',
							message: '工资必须为数字'
						}
					],
					email: [{
							required: true,
							validator: validateMailPass,
							trigger: 'blur'
						},
						{
							pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/gi,
							type: 'email',
							message: '必须为合法的邮箱地址'
						}
					],
					extNum: [{
						required: true,
						message: '不能为空'
					}],
					entryTime: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					store: [],
					phone: [{
						type:'number',
						required: true,
						message: '手机号码不能为空',
						trigger: 'blur'
					}],
					birthTime:[{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],extPhone:[{
						pattern:/^((\d{3,4}-?\d{7,8})|(\d{3,4}-?\d{3,4}-?\d{3,4}))$/gi,
						required: false,
						message: '输入有误',
						trigger: 'blur'
					}]
				},
				passWord: '',

                UploadAvatorVisible:false
			}
		},
		beforeRouteEnter(to, from, next) {
			fromRoute = from
			next()
		},
		mounted() {
			if(fromRoute.path == '/') {
				this.backToPre()
			}
			this.initMethod();
			/*;
				this.accountFrom.status = this.jobStatus[0].value;*/
		},
		beforeDestroy() {},
		methods: {
			getStyle(obj, attr) {
				return document.defaultView.getComputedStyle(obj, null)[attr]
			},
			backToPre() {
				this.$router.go(-1)
			},
			submitForm(formName) {
			    console.log(this.accountFrom.departId)
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let graduteTime = this.accountFrom.graduateTime;
						let birthTime = this.accountFrom.birthTime;
						let entryTime = this.accountFrom.entryTime;
						let quitTime = this.accountFrom.quitTime;
						this.accountFrom.jobStatus = (this.value1) ? parseInt(this.value1) : null;
						this.accountFrom.busId = this.dataList.bus.id
						var s = new Set(this.accountFrom.departIds)
						this.accountFrom.departsId = s.toString();
                        this.accountFrom.departId = this.accountFrom.departId[this.accountFrom.departId.length - 1]
						this.accountFrom.birthTime = (birthTime) ? new Date(birthTime).format("yyyy-MM-dd") : null;
						this.accountFrom.graduateTime = (graduteTime) ? new Date(graduteTime).format("yyyy-MM-dd") : null;
						this.accountFrom.entryTime = (entryTime) ? new Date(entryTime).format("yyyy-MM-dd") : null;
						this.accountFrom.quitTime = (quitTime) ? new Date(quitTime).format("yyyy-MM-dd") : null;
						// if(this.validateObj()) {
						// 	return false;
						// }
						this.accountFrom.passWord = this.accountFrom.passWord;
						this.$http.post('/api/uContact/add', this.accountFrom, {
							emulateJSON: true
						}).then((res) => {
							var data = res.data;
							if(data.success) {
								this.$message({
									customClass: 'success',
									message: '添加成功'
								});
								this.backToPre();
							} else {
								this.$message({
									customClass: 'error',
									message: data.message
								});
							}
						}).catch((err) => {
						});
					} else {
						// this.validateObj();
					}
				});

			},
			resetForm(formName) {
				let passWord = this.accountFrom.passWord ;
				let departId = this.accountFrom.departId ;
				this.$refs[formName].resetFields();
				this.accountFrom.passWord = passWord;
				this.accountFrom.departId = departId;
			},
			validateObj() {
				let flag = false;
				let departId = this.accountFrom.departId;
				if(!departId || departId == '') {
					document.getElementsByClassName('depart')[0].style.display = '';
					flag = true;
				} else {
					document.getElementsByClassName('depart')[0].style.display = 'none';
				}
				let stationId = this.accountFrom.stationId;
				if(!stationId || stationId == '') {
					document.getElementsByClassName('stationId')[0].style.display = '';
					flag = true;
				} else {
					document.getElementsByClassName('stationId')[0].style.display = 'none';
				}
				let roleIds = this.accountFrom.roleIds;
				if(!roleIds || roleIds == '' || roleIds.length < 0) {
					document.getElementsByClassName('roleIds')[0].style.display = '';
					flag = true;
				} else {
					document.getElementsByClassName('roleIds')[0].style.display = 'none';
				}
				if(flag) {
					return true;
				} else {
					return false;
				}
			},
			initPwd() {
				this.accountFrom.passWord = this.dataList.initPwd.value
				/*this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'init_pwd'
				}, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.result;
					let array = [];
					if(result && result != '') {
						for(let i in result) {
							this.accountFrom.passWord = result[i].value;
							break;
						}
					}
				}).catch((err) => {
					this.loading = false
					
				})*/
				//初始学历
				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'education'
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.educations = data.result;
					}
				}).catch((err) => {
					this.loading = false
					
				})

				//初始员工状态
				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'job_status'
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.jobStatus = data.result;
						if(this.jobStatus&&this.jobStatus.length>0){
							for(let i in this.jobStatus){
								if(this.jobStatus[i].name=='正常'){
										this.accountFrom.status = this.jobStatus[i].value;
								}
							}

						}
					}
				}).catch((err) => {
					this.loading = false
					
				})
			},
			validateUser() {
				let userName = this.accountFrom.userName;
				if(userName && userName != '') {
					this.$http.post("/api/user/validateUserIsExits", {
							"userName": userName
						}, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								var result = data.result;
								if(result) {
									this.$prompt('请输入密码', '谨慎提示：此用户已存在，如果您想覆用此用户，请输入正确密码', {
										confirmButtonText: '确定',
										cancelButtonText: '取消'
									}).then(({
										value
									}) => {
										this.passWord = value;
										this.$message({
											customClass: 'success',
											message: '你的密码是: ' + value
										});
									}).catch(() => {
										this.$message({
											customClass: 'error',
											message: '取消输入'
										});
									});
								}
							}
						}).catch((err) => {
							
						});
				}

			},
			handleChange1(value) {
				// if(value && value != '') {
				// 	this.accountFrom.departId = value[value.length - 1];
				// }
			},
			/*second(value,datas){
				debugger;
				if(value&&value!=''){
					for(let i in value){
						for(let j in datas){
							let ch = datas[j].parentId;
							if(ch&&ch!=''){
								if(ch==value[i]){
									return true;
								}
							}else{
								return false;
							}
						}
					}
				}
				return false;
			},*/
			/*depart(value,datas){
				for(let i in datas){
					if(value == datas[i].value){
							if(!this.second(this.accountFrom.departIds,datas[i].children)){
								this.accountFrom.depart = "";
								this.accountFrom.departIds = [];
							}
						let depart = this.accountFrom.depart?this.accountFrom.depart+"-":"";
						this.accountFrom.depart = depart+ datas[i].label;
						this.accountFrom.departIds.push(value);
					}else{
						let ch = datas[i].children;
						if(ch){
							this.depart(value,ch);
						}
					}
					}
				},*/
			initDepartTree() {
				this.$http.post("/api/depart/departPack", {}, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					//
					if(data.success) {
						this.data = data.result;
					}
				}).catch((err) => {
					
				});
			},
            dealIdToString(value){
                this.stations = value.map((item)=>{
                    item.id = item.id.toString()
					return item
				})
			},
			initMethod() {
				this.initPwd(); //初始密码
				this.initDepartTree(); //初始部门节点树
				//查询岗位
				this.$http.post('/api/station/queryStationByRedis', {
					"busId": this.dataList.bus.id
				}, {
					emulateJSON: true
				}).then((res) => {
				    this.dealIdToString(res.data.result)
					// this.stations = res.data.result
				}).catch((err) => {
					this.loading = false
				});
				//查询角色
				this.$http.post('/api/role/queryRole', {
					busId: this.dataList.bus.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.roleIds = res.data.result;

				}).catch((err) => {
					this.loading = false
					
				});
			},
			salaryClick() {
				this.$http.post('/api/busRank/queryBusRankBySalary', {
					busId: this.dataList.bus.id,
					salary: this.accountFrom.salary
				}, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					var result = data.result;
					if(data.success) {
						;
						this.accountFrom.rank = result.id;
						this.accountFrom.busRank = result.name;
					} else {
						//this.$message({ customClass: 'error', message: '添加失败'});
					}
				}).catch((err) => {});
			},
            showUploadDialog(){
                this.UploadAvatorVisible = true
			},
			//接收上传图片的数据
            imgData(data){
                this.accountFrom.userIcon = data
                this.$refs.circlex.src = Config.StaticUrl + data
			}

		}
	}
</script>

<style scoped>
	.uciszz {
		margin-top: 4px;
	}
	.iszxuc {
		margin-top: 4px;
	}
	.isyxlogin {
		margin-left: 1px;
		margin-top: 4px;
	}

	.mt8 {
		margin-top: 8px;
	}

	.mt10 {
		margin-top: 10px;
	}

	.wrap {
		height: 100%;
		background: #f8f9fb;
		overflow: hidden;
		box-sizing: border-box;
		  -moz-box-sizing: border-box;
		  -webkit-box-sizing: border-box;
	}

	.backToPre {
		font-size: 18px;
		height: 60px;
		line-height: 60px;
		color: #000;
		border-bottom: 1px solid #F1F2F3;
		margin-left: 28px;
		margin-right: 28px;
		position: relative;
		z-index: 1;
	}

	.backToPre span {
		cursor: pointer;
	}

	.layout-container {
		height: 100%;
		box-sizing: border-box;
		  -moz-box-sizing: border-box;
		  -webkit-box-sizing: border-box;
	}

	.layout-in {
		height: 100%;
	}

	.mb24 {
		margin-bottom: 24px;
	}

	.layout {
		height: 100%;
		position: relative;
		top: -60px;
		padding-top: 60px;
		box-sizing: border-box;
		  -moz-box-sizing: border-box;
		  -webkit-box-sizing: border-box;
	}

	.return {
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}

	.backImg {
		width: 825px;
		margin: 0 auto;
		padding: 20px;
		margin-bottom: 56px;
		margin-top: 20px;
	}

	.iswork span {
		font-size: 12px;
		color: #000000;
		letter-spacing: 0;
	}

	.yuan {
		text-align: center;
		margin: 18px auto 40px auto;
	}

	.circlex {
		width: 80px;
		height: 80px;
		border-radius: 100%;
	}

	.box_name {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 14px;
		color: #000;
		letter-spacing: 0;
		font-weight: 600;
		margin-bottom: 10px;
	}

	.blocki {
		display: block;
	}

	.blocki span {
		padding-left: 8px;
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
	}

	.layin {
		padding-left: 50px;
	}

	.note {
		width: 622px;
	}

	.upload_img {
		display: inline-block;
		width: 80px;
		height: 80px;
		margin: 0 auto;
		position: relative;
		border-radius: 50%;
		background-color: #D8D8D8;
		border: 1px solid #979797;
		overflow: hidden;
		cursor: pointer;
		vertical-align: middle;
	}

	#userIcon {
		position: absolute;
		width: 80px;
		height: 80px;
		border-radius: 100%;
		top: 0;
		left: 0;
		opacity: 0;
	}
	/*.pad_l{
		content: '*';
    color: #ff4949;
    margin-right: 4px;
	}*/
	.container {
		z-index: 99;
		position: fixed;
		padding-top: 60px;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background:rgba(0,0,0,1);
	}

	#image {
		max-width: 100%;
	}
	#button {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 80px;
		height: 40px;
		border:none;
		border-radius: 5px;
		background:white;
	}
	#cancel{
		position: absolute;
		right: 150px;
		top: 10px;
		width: 80px;
		height: 40px;
		border:none;
		border-radius: 5px;
		background:white;
	}
	#xuanzhuan{
		position: absolute;
		right: 250px;
		top: 10px;
		width: 80px;
		height: 40px;
		border:none;
		border-radius: 5px;
		background:white;

	}
	.depLabel{
		display: inline-block;
	    width: 100px;
	    text-align: left;
	    font-size: 12px;
	    color: #000;
	    letter-spacing: 0;
	}
	.depLabel span{
		color: #ff4949;
		padding-right: 4px;
	}   
	
	.error{
		text-align: right;
	    color: #ff4949;
	    font-size: 12px;
	    width: 148px;
	    height: 20px;
	    line-height: 20px;
	} 
	.departCascader{
		line-height: 26px;
	}
</style>
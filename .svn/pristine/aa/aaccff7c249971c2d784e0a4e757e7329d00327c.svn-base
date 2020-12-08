<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--查询表单-->
		<el-form :inline="true" :model="searchParam" ref="ruleForm" class="ui-demo-form-inline">
			<el-form-item label="姓名:" prop="chName">
				<template>
					<el-select v-model="searchParam.chName" filterable placeholder="请选择">
						<el-option v-for="item in chNames" :key="item.name" :label="item.chName" :value="item.id">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="工号:" prop="jobNum">
				<el-input v-model="searchParam.jobNum" placeholder="工号"></el-input>
			</el-form-item>
			<el-form-item label="所在部门:" prop="departId">

				<template>
					<el-select v-model="searchParam.departId" placeholder="请选择">
						<el-option v-for="item in departs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="所在岗位:" prop="stationId">
				<template>
					<el-select v-model="searchParam.stationId" placeholder="请选择">
						<el-option v-for="item in stations" :key="item.value" :label="item.stationName" :value="item.stationId">
						</el-option>
					</el-select>
				</template>

			</el-form-item>

			<el-form-item label="在职状态:" prop="jobStatus">
				<template>
					<el-select v-model="searchParam.jobStatus" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>

			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchBtn" class="submitbtn" icon="search"></el-button>
				<el-button type="primary" class="submitbtn" @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<el-button type="primary" class="add">添加<i class="el-icon-plus el-icon--right"></i></el-button>
		<el-table ref="table" :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading.customClass="aaaaa" @sort-change="sortchange">
			<el-table-column prop="id" label="ID" width="">
			</el-table-column>
			<el-table-column sortable prop="chName" label="姓名" width="">
			</el-table-column>
			<el-table-column prop="enName" label="英文名" width="">
			</el-table-column>
			<el-table-column prop="jobNum" label="工号" width="">
			</el-table-column>
			<el-table-column prop="depart" label="部门" width="">
			</el-table-column>
			<el-table-column prop="gender" label="性别" :formatter="gender" width="">
			</el-table-column>
			<el-table-column prop="email" label="电子邮箱" width="">
			</el-table-column>
			<el-table-column prop="phone" label="手机号码" width="">
			</el-table-column>
			<el-table-column prop="status" label="员工状态" :formatter="status">
			</el-table-column>
			<el-table-column prop="jobStatus" label="在职状态" :formatter="jobStatuss">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handlerSee(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
					<!--<el-button type="text" size="small" @click="deleteBtn(scope.row)">删除</el-button>-->
				</template>
			</el-table-column>
		</el-table>
		<br />
		<!--分页-->
		<el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.curPage" :page-size="pagination.pagesize" layout="total, prev, pager, next, jumper" :total="pagination.total">
		</el-pagination>

		<!--员工详情-->
		<el-dialog title="详情" :visible.sync="detail_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px">
				<el-form-item label="工号：" :label-width="formLabelWidth">
					<el-input v-model="form.jobNum" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="初始密码：" :label-width="formLabelWidth">
					<el-input v-model="form.password" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="所属部门：" :label-width="formLabelWidth">
					<el-input v-model="form.depart" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="拥有岗位：" :label-width="formLabelWidth">
					<el-input v-model="form.station" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="拥有角色：" :label-width="formLabelWidth">
					<el-input v-model="form.role" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="员工状态：" :label-width="formLabelWidth">
					<el-input v-model="form.status" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				
				<el-form-item label="是否允许登录：" :label-width="formLabelWidth">
					<el-input v-model="form.isLogin" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" :label-width="formLabelWidth">
					<el-input v-model="form.chName" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="英文名：" :label-width="formLabelWidth">
					<el-input v-model="form.enName" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="出生日期：" :label-width="formLabelWidth">
					<el-input v-model="form.birthTime" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="性别：" :label-width="formLabelWidth">
					<el-input v-model="form.gender" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="工资：" :label-width="formLabelWidth">
					<el-input v-model="form.salary" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="p级" :label-width="formLabelWidth">
					<el-input v-model="form.gender" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="公司邮箱：" :label-width="formLabelWidth">
					<el-input v-model="form.email" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.phone" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="分机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.extPhone" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="入职日期：" :label-width="formLabelWidth">
					<el-input v-model="form.entryTime" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="辞职日期：" :label-width="formLabelWidth">
					<el-input v-model="form.quitTime" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="毕业学校：" :label-width="formLabelWidth">
					<el-input v-model="form.graduateSchool" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="毕业时间：" :label-width="formLabelWidth">
					<el-input v-model="form.graduateTime" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学历：" :label-width="formLabelWidth">
					<el-input v-model="form.education" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="专业：" :label-width="formLabelWidth">
					<el-input v-model="form.major" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<div slot="footer" class="dialog-footer">
					<el-button @click="detail_dialog = false">关闭</el-button>
					
				</div>
				<!--  <el-form-item label="工作状态：" :label-width="formLabelWidth">
                	 <el-input v-model="form.status" auto-complete="off" :readonly="true" :formatter="status"></el-input>
                </el-form-item>-->
				<!-- <el-form-item label="在职状态：" :label-width="formLabelWidth">
                	 <el-input v-model="form.jobStatus" auto-complete="off" :readonly="true" :formatter="jobStatuss"></el-input>
                </el-form-item>-->
			</el-form>
		</el-dialog>

		<!--修改员工-->
		<el-dialog title="修改" :visible.sync="update_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px">
				<el-form-item label="姓名：" :label-width="formLabelWidth">
					<el-input v-model="form.chName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文名：" :label-width="formLabelWidth">
					<el-input v-model="form.enName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="工号：" :label-width="formLabelWidth">
					<el-input v-model="form.jobNum" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="性别：" :label-width="formLabelWidth">
					<el-select v-model="form.gender" placeholder="请选择">
						<el-option v-for="item in genderStatus" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<!--<el-input v-model="form.gender" auto-complete="off" :readonly="false" :formatter="gender"></el-input>-->
				</el-form-item>
				<el-form-item label="公司邮箱：" :label-width="formLabelWidth">
					<el-input v-model="form.email" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.phone" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="工作状态：" :label-width="formLabelWidth">
					<el-select v-model="form.status" placeholder="请选择">
						<el-option v-for="item in workStatus" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<!-- <el-input v-model="form.status" auto-complete="off" :readonly="false" :formatter="status"></el-input>-->
				</el-form-item>
				<el-form-item label="在职状态：" :label-width="formLabelWidth">
					<el-select v-model="form.jobStatus" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<!-- <el-input v-model="form.jobStatus" auto-complete="off" :readonly="false" :formatter="jobStatuss"></el-input>-->
				</el-form-item>
				<div slot="footer" class="dialog-footer">
					<el-button @click="update_dialog = false">取 消</el-button>
					<el-button type="primary" @click="editSubmit">确 定</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				aaaaa: 'aaaa',
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 0
				},
			  ruleForm: {
		          chName: '',
		          jobNum: '',
		          departId: '',
		          stationId: '',
		          jobStatus: ''
		         
		       },
				loading: true,
				add_dialog: false,
				update_dialog: false,
				detail_dialog: false,
				tableData: [],
				obj: {},
				formLabelWidth: "120px",
				title: '',
				form: {
					id: null,
					chName: null,
					enName: null,
					jobNum: null,
					depart: null,
					gender: null,
					email: null,
					phone: null,
					status: null,
					jobStatus: null,
					password: null,
					isLogin: null,
					birthTime: null,
					salary: null,
					extPhone: null,
					graduateSchool: null,
					entryTime: null,
					quitTime: null,
					graduateTime: null,
					education: null,
					major: null

				},
				searchParam: {
					chName: '',
					jobNum: '',
					departId: '',
					stationId: '',
					jobStatus: '',
					curPage: 1
				},
				options: [{
					value: '1',
					label: '在职'
				}, {
					value: '0',
					label: '离职'
				}],
				jobStatus: '',

				stations: [{

				}],
				stationId: "",
				departs: [{}],
				departId: "",
				chNames: [{

				}],
				chName: '',
				/* jobSta:[{
				 	value:'0',
				 	label:'离职'
				 },{
				 	value:'1',
				 	label:'在职'
				 }],*/
				genderStatus: [{
					value: '1',
					label: '男'
				}, {
					value: '0',
					label: '女'
				}],
				workStatus: []

			}

		},
		mounted: function() {
			this.$nextTick(() => {
				//				this.loadMpProgressCircle()
				this.link2Page(1);
				this.queryParam();
			})
		},
		methods: {
			sortchange(column, prop, order) {
			},
			loadMpProgressCircle() {
				let MpCircleBar = require('@/utils/canvas-progress.js').MpCircleBar
				MpCircleBar.init(this.$refs.ccc, [{
						color: '#f8f6f1',
						value: 25,
						child: {
							color: '#f5bf3c',
							value: 20,
							endimg: './static/img/1.png'
						}
					},
					{
						color: '#dbe6ff',
						value: 25,
						child: {
							color: '#295dcf',
							value: 20,
							endimg: './static/img/2.png'
						}
					},
					{
						color: '#edf5f1',
						value: 25,
						child: {
							color: '#1abf69',
							value: 16,
							endimg: './static/img/3.png'
						}
					}
				])
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage;
				/* var formdata = new FormData();
				 for (let i in this.searchParam){
				 	formdata.append(i, this.searchParam[i]);
				 }*/
				this.$http.post('api/uContact/list', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					this.tableData = res.data.result.content
					this.pagination.total = res.data.result.total
					this.pagination.pagesize = res.data.result.helper.pageSize
					this.pagination.curPage = res.data.result.helper.curPage
					this.loading = false
				}).catch((err) => {
					this.loading = false
					
				})
			},
			handleClick(tab, event) {
			},
			handleSizeChange(val) {
			},
			handleCurrentChange(val) {
				this.loading = true
				this.link2Page(val);
			},
			handlerSee(row) {
				Object.assign(this.form, row);
				this.detail_dialog = true;
				this.form.status = this.status(row);
				this.form.jobStatus = this.jobStatuss(row);
				this.form.gender = this.gender(row);
				this.education(row);
				this.isLogin(row);

			},
			gender(row) {
				let gender = row.gender;
				if(gender == 0) {
					return '女';
				} else if(gender == 1) {
					return '男';
				} else {
					return '未知';
				}
			},
			//字典表1:正常,2:休婚假,3:修产假,4:驻场，５：事假，６：调休
			status(row) {
				switch(row.status) {
					case 1:
						return '正常';
						break;
					case 2:
						return '休婚假';
						break;
					case 3:
						return '修产假';
						break;
					case 4:
						return '驻场';
						break;
					case 5:
						return '事假';
						break;
					case 6:
						return '调休';
						break;
					default:
						return '其他';

				}

			},
			//在职状态(0:离职,1:在职)',
			jobStatuss(row) {
				switch(row.jobStatus) {
					case 0:
						return '离职';
						break;
					case 1:
						return '在职';
						break;
					default:
						return '未知';
				}
			},
			queryParam() {
				//查询岗位
				this.$http.post('api/station/queryStationByRedis', {
					emulateJSON: true
				}).then((res) => {
					this.stations = res.data.result;
					/*let array = [];
					if(result && result != '') {
						for(let i in result) {
							let json = {};
							var results = result[i];
							let busId = results.busId;
							let value = results.stationId;
							let label = results.stationName;
							json['value'] = value;
							json['label'] = label;
							array.push(json);
						}

						this.stations = array;

					}*/

				}).catch((err) => {
					this.loading = false
					
				});
				//查询员工
				this.$http.post('api/uContact/queryUContactAllByRedis', {
					emulateJSON: true
				}).then((res) => {
					this.chNames = res.data.result;
					/*let array = [];
					if(result && result != '') {
						for(let i in result) {
							let json = {};
							let results = result[i];
							let busId = results.busId;
							let value = results.chName;
							let label = results.chName;
							json['value'] = value;
							json['label'] = label;
							array.push(json);
						}

						this.chNames = array;
					}*/

				}).catch((err) => {
					this.loading = false
					
				})
				//工作的状态

				this.$http.post('api/dictionaryCategory/queryDictionByCode', {
						code: 'job_status'
					}, {
						emulateJSON: true
					}).then((res) => {
						let result = res.data.result;
						let array = [];
						if(result && result != '') {
							for(let i in result) {
								let json = {};
								let results = result[i];
								//let busId = results.busId;
								let value = results.value;
								let label = results.name;
								json['value'] = value;
								json['label'] = label;
								array.push(json);
							}

							this.workStatus = array;
						}

					}).catch((err) => {
						this.loading = false
						
					}),

					this.$http.post('api/dictionaryCategory/queryDictionByCode', {
						code: 'init_pwd'
					}, {
						emulateJSON: true
					}).then((res) => {
						let result = res.data.result;
						let array = [];
						if(result && result != '') {
							for(let i in result) {
								this.form.password = result[i].value;
							}

						}

					}).catch((err) => {
						this.loading = false
						
					})
			},
			reload() {
				this.link2Page(1);
			},
			searchBtn() {
				// this.searchParam.endTime = (!!this.searchParam.endTime) ? new Date(this.searchParam.endTime).format("yyyy-MM-dd") : '';
				this.reload();
			}
			/*,resetBtn(){
							this.searchParam;
							this.reload();
						}*/
			,
			update(row) {
				this.update_dialog = true;
				Object.assign(this.form, row);
				this.form.status = this.status(row);
				this.form.jobStatus = this.jobStatuss(row);
				this.form.gender = this.gender(row)
			},
			deleteBtn(row) {
				this.$confirm('是否删除？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				      this.$http.post("api/uContact/del",{ucId:row.id},{emulateJSON: true})
                            .then((res)=>{
                                var data=res.data;
                                if(data.success){
                                    this.$message({ customClass: 'error', message: '删除成功'});
                                }else{
                                    this.$message({customClass: 'error',message: '删除失败'});
                                }
                                this.reload();
                            }).catch((err)=>{
                                this.$message({ customClass: 'error', message: '删除失败'});
                            });
				}).catch(() => {
					this.$message({
						customClass: 'error',
						message: '已取消删除'
					});
				});
			},
			education(row) {
				this.$http.post('api/dictionaryCategory/queryDictionByCode', {
					code: 'education'
				}, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.result;
					if(result && result != '') {
						for(let i in result) {
							let results = result[i];
							if(results.value == row.education) {
								this.form.education = results.name;
								break;
							}

						}

					}

				}).catch((err) => {
					this.loading = false
					
				})
			},
			isLogin(row) {
				switch(row.isLogin) {
					case 0:
						this.form.isLogin = '否';
						break;
					case 1:
						this.form.isLogin = '是'
						break;
					default:
						return '';
				}
			},editSubmit(){
				
			}, resetForm(formName) {
        		this.$refs[formName].resetFields();
        		this.reload();
   			 }		
		}
	}
</script>

<style scoped>
	.add {
		float: right;
		margin-right: 28px;
		margin-bottom: 10px;
	}
</style>
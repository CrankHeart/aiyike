<template>
	<div class="">
		<!--面包屑-->
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item :to="{ path: '/' }">当前位置：管理员</el-breadcrumb-item>
			<el-breadcrumb-item>全员密码管理</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap">
			<input type="text" ref="iiii" style="width: 1px;height: 1px;opacity: 0;"/>
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam" ref="searchParam" class="margin-left8">
				<el-form-item label="公司：" prop="busId">
					<el-select v-model="searchParam.busId" filterable placeholder="请选择" @change="dateHandler" clearable>
						<el-option v-for="item in busIds" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名：" prop="uid" class="marginleft2">
					<el-select v-model="searchParam.uid" filterable placeholder="请选择" clearable>
						<el-option v-for="item in chNames" :key="item.id" :label="item.chName" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工号：" prop="jobNum" class="marginleft2">
					<el-input v-model="searchParam.jobNum" placeholder="工号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchBtn" class="searchbtn">搜索</el-button>
					<el-button type="primary" class="submitbtn" @click="resetForm('searchParam')">重置</el-button>
				</el-form-item>
				<el-form-item class="addbtn-item">
					<el-button type="primary" class="submitbtn" @click="padd">重置密码</el-button>
				</el-form-item>
			</el-form>
			<!--表格-->
			<el-table @sort-change="sortHandler" class="mytabel" :data="tableData" v-loading="loading" :default-sort="{}">
				<el-table-column prop="id" label="主键" align="left"></el-table-column>
				<el-table-column prop="userName" label="用户名" align="left"></el-table-column>
				<el-table-column prop="jobNum" label="工号" align="left"></el-table-column>
				<el-table-column prop="chName" label="中文名" align="left"></el-table-column>
				<el-table-column prop="enName" label="英文名" align="left"></el-table-column>
				<el-table-column prop="gender" label="性别" align="left" :formatter="genderFormatter"></el-table-column>
				<el-table-column prop="email" label="公司邮箱" align="left"></el-table-column>
				<el-table-column prop="busName" label="公司" align="left"></el-table-column>
				<el-table-column label="操作" align="left">
					<template slot-scope="scope">
						<el-button @click="initpwd(scope.row)" type="text" size="small">初始化密码</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br />
			<!--分页-->
			<el-pagination class="ui-cpagina" small @current-change="pageChange" :current-page="pagination.curPage" :page-size="pagination.pageSize" layout="total,prev,pager,next,jumper" :total="pagination.total">
			</el-pagination>
		</section>
		<!--弹出框-->
		<el-dialog title="重置初始密码" class="dialog442 resetDialog" :visible.sync="add_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="70px" :rules="rules" ref="form" class="resetpwdForm">
				<el-form-item label="新密码：" prop="value">
					<el-input v-model="form.value" auto-complete="off" type="password" placeholder="密码长度为6到16个字符"></el-input>
					<span v-show="isShow1" class="staus_icon">
						<i class="el-icon-circle-close"></i>
					</span>
					<span v-show="show1" class="right_icon">
						<i class="el-icon-circle-check"></i>
					</span>
				</el-form-item>
				<el-form-item label="确认密码：" prop="value1">
					<el-input v-model="form.value1" auto-complete="off" type="password"></el-input>
					<span v-show="isShow2" class="staus_icon">
						<i class="el-icon-circle-close"></i>
					</span>
					<span v-show="show2" class="right_icon">
						<i class="el-icon-circle-check"></i>
					</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addBtn('form')" class="submitbtn">提 交</el-button>
				<el-button @click="add_dialog = false" class="cancelbtn">取 消</el-button>
			</div>
		</el-dialog>
		<!--重置初始化密码成功或者失败弹窗-->
		<el-dialog title="初始化密码" class="dialog442 successDialog" :visible.sync="dialogSuccessVisible">
		  <div class="succeed">
		  	<div class="successTag">
		  		<div class="padd_bottom">
		  			<!--已将 {{whoname}}的登录密码初始化成功！-->
		  			已将登录密码初始化成功！
		  		</div>
		  		<div>
		  			新密码: <span class="newpwd">{{this.form.value}}</span>
		  		</div>
		  		
		  	</div>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import selector from '@/utils/selector.js'
	
	export default {
		name: 'inituc',
		mounted() {
			this.$nextTick(() => {
				this.link2Page(1);
				this.queryParam();
				this.queryInitPwd();
			});
		},
		data() {
			var validatePass = (rule, value, callback) => {
			        if (value === '') {
			           callback(new Error('请输入密码'));
			           this.isShow1 = true;
		          	   this.show1 = false;
			        }else if(value.length < 6 || value.length > 16){
			        	callback(new Error('密码长度为6到16个字符'));
			        	this.isShow1 = true;
		          		this.show1 = false;
			        }else {
			            this.$refs.form.validateField('value1');
			            callback();
			            this.isShow1 = false;
		          	    this.show1 = true;
			        }
			    };
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
					this.isShow2 = true;
			        this.show2 = false;
				} else if(value !== this.form.value) {
					callback(new Error('两次输入密码不一致!'));
					this.isShow2 = true;
			        this.show2 = false;
				} else {
					callback();
					this.isShow2 = false;
			        this.show2 = true;
				}
			};
			return {
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 1
				},
				searchParam: {
					order: 'DESC',
					//startTime: '',
					jobNum: '',
					busId:'',
					uid:'',
					curPage: 1
				},
				title: '',
				whoname: '',
				newpassword: '',
				dialogSuccessVisible: false,
				add_dialog: false,
				update_dialog: false,
				detail_dialog: false,
				loading: false,
				tableData: [],
				plist: [],
				isShow1: false,
		    	isShow2: false,
		    	show1: false,
		    	show2: false,
				form: {
					id: null,
					chName: null,
					enName: null,
					jobNum: null,
					passWord: null,
					value: '',
					value1: ''
				},
				chNames: [{}],
				busIds: [{}],
				rules: {
					value: [{
						validator: validatePass, trigger: 'blur' 
					}],
					value1: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			dateHandler(val) {
				this.$http.post('/api/uContact/queryUcBlurByBusId/' + val, {
					emulateJSON: true
				}).then((res) => {
					this.chNames = res.data.result;
				}).catch((err) => {
					this.loading = false
					
				})
			},
			sortchange(column, prop, order) {
			},
			padd() {
				this.add_dialog = true;
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage;
				this.$http.post('/api/uContact/queryUcBySuper', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					this.tableData = res.data.result.content;
					this.pagination.total = res.data.result.total;
					this.pagination.pageSize = res.data.result.helper.pageSize;
					this.pagination.curPage = res.data.result.helper.curPage;
					this.loading = false;
				}).catch((err) => {
					this.loading = false;
					
				});
			},
			handleClick(tab, event) {
			},
			handleSizeChange(val) {
			},
			handleCurrentChange(val) {
				this.loading = true
				this.link2Page(val);
			},
			role_close_dialog: function() {
				this.roleAddDialogFormVisible = false;
			},
			queryParam() {
				//查询员工姓名
				this.$http.post('/api/uContact/queryUcBlur', {
						emulateJSON: true
					}).then((res) => {
						this.chNames = res.data.result;
					}).catch((err) => {
						this.loading = false
						
					}),
					//查询公司名
					this.$http.post('/api/bus/queryBusBlur', {
						emulateJSON: true
					}).then((res) => {
						this.busIds = res.data.result;
					}).catch((err) => {
						this.loading = false
						
					})
			},
			queryInitPwd() {
				//查询初始化密码
				this.$http.post('/api/dictionary/queryInitPwd', {
					emulateJSON: true
				}).then((res) => {
					this.$store.commit('setDicInitPwd', res.data.result)
				}).catch((err) => {
					this.loading = false
					
				})

			},
			reload() {
				this.link2Page(1);
			},
			addBtn(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post("/api/dictionary/initPwdByAdmin", this.form, {
								emulateJSON: true
							})
							.then((res) => {
								var data = res.data;
								if(data.success) {
									this.$message({
										customClass: 'success',
										message: '重置初始密码成功'
									});
									this.dialogSuccessVisible = true
									
								} else {
									this.$message({
										customClass: 'error',
										message: '重置初始密码失败'
									});
								}
								
								this.add_dialog = false;
								this.reload();
							}).catch((err) => {
								this.add_dialog = false;
							});
					} else {
						;
						return false;
					}
				});
			},
			watchBtn(row) {
				this.detail_dialog = true;
				Object.assign(this.form, row);
			},
			editBtn(row) {
				this.update_dialog = true;
				Object.assign(this.form, row);
			},
			editSubmit() {
				this.$http.post("api/dictionaryCategory/update", this.form, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.$message({
								customClass: 'success',
								message: '修改成功'
							});
						} else {
							this.$message({
								customClass: 'error',
								message: '请求失败'
							});
						}
						this.update_dialog = false;
						this.reload();
					}).catch((err) => {
						this.update_dialog = false;
					});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.reload()
			},
			initpwd(row) {
				let val1 = this.$store.getters.dicInitPwdVal.value
				this.$confirm('是否初始化密码?', '提示', {
					customClass: 'openmeMessageDialog',
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("/api/user/reSetpwdByAdmin/" + row.id, this.form, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.$message({
									customClass: 'success',
									message: '已将 ' + row.chName + ' 初始化密码成功 ' + ' 新密码:' + val1
								});
							} else {
								this.$message({
									customClass: 'error',
									message: '请求失败'
								});
							}
							this.update_dialog = false;
							this.reload();
						}).catch((err) => {
							this.$message({
								customClass: 'error',
								message: '初始化密码失败'
							});
						});
				}).catch(() => {
				});
				let _self = this
				/**
				 * 这里发现了一个element ui的彩蛋
				 */
				let interval = requestAnimationFrame(function req(){
					if (
						Object.isNotEmpty(selector('.openmeMessageDialog')) && 
						selector('.openmeMessageDialog')[0].style.display != 'none'
					) {
						cancelAnimationFrame(interval)
						_self.$refs.iiii.focus()
						_self.$refs.iiii.blur()
					} else {
						interval = requestAnimationFrame(req)
					}
				})
			},
			pageChange(val) {
				this.link2Page(val);
			},
			sortHandler(column) {
				this.searchParam.order = column.order.split("ending")[0]
				//let field = this.fieldFormatter(column.prop) 格式化字段
				this.link2Page(1);
			},
			searchBtn() {
				//this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd") : '';
				//this.searchParam.endTime = (!!this.searchParam.endTime) ? new Date(this.searchParam.endTime).format("yyyy-MM-dd") : '';
				this.reload();
			},
			statusFormatter(row) {
				if(row.isDeleted == 1) {
					return "未删除";
				} else {
					return "已删除"
				}
			},
			genderFormatter(row) {
				if(row.gender == 1) {
					return "男";
				}
				if(row.gender == 2) {
					return "女";
				} else {
					return "未知"
				}
			},
			pwdFormatter(row) {
				let val = this.$store.getters.dicInitPwdVal.value
				if(row.isPwd == 0) {
					return val;
				} else {
					return "******"
				}
			}
		}
	}
</script>

<style scoped>
	.addbtn-item {
		float: right;
		margin-right: 0;
	}
	.staus_icon{
		margin-left: 6px;
	    color: #EE5A5A;
	    font-size: 12px;
	}
	.right_icon{
		margin-left: 6px;
	    color: #04BE02;
	    font-size: 12px;
	}
	.succeed{
		height: 175px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	.successTag{
		font-size: 12px;
		color: #000000;
		letter-spacing: 0;
	}
	.padd_bottom{
		padding-bottom: 20px;
	}
	.newpwd{
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 18px;
		color: #295DCF;
		letter-spacing: 0;
		margin-left: 5px;
	}
	.marginleft2{
		margin-left: 2px;
	}
</style>
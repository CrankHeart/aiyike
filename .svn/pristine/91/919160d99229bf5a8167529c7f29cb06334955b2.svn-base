<template>
	<div class="">
		<!--面包屑-->
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item :to="{ path: '/' }">当前位置：管理员</el-breadcrumb-item>
			<el-breadcrumb-item>假期设置</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap">
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam">
				<el-form-item>
					<!--<el-button type="primary" @click="searchBtn" class="searchbtn">搜索</el-button>-->
				</el-form-item>
				<el-form-item class="addbtn-item">
					<!--<el-button type="primary" class="submitbtn" @click="padd">重置密码</el-button>-->
				</el-form-item>
			</el-form>
			<!--表格-->
			<el-table @sort-change="sortHandler" class="mytabel" :data="tableData" v-loading="loading" :default-sort="{}">
				<el-table-column prop="id" label="主键" width=""></el-table-column>
				<el-table-column prop="startTime" label="开始时间" width=""></el-table-column>
				<el-table-column prop="endTime" label="结束时间" width=""></el-table-column>
				<el-table-column prop="dayCode" label="天数" width=""></el-table-column>
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
	</div>
</template>

<script>
	export default {
		name: 'holiday',
		mounted() {
			this.$nextTick(() => {
				this.link2Page(1);
				/*             this.queryParam();
				             this.queryInitPwd();*/
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
					curPage: 1
				},
				title: '',
				add_dialog: false,
				update_dialog: false,
				detail_dialog: false,
				loading: false,
				tableData: [],
				formLabelWidth: "120px",
				isShow1: false,
		    	isShow2: false,
		    	show1: false,
		    	show2: false,
				form: {
					id: null,
					chName: null,
					enName: null,
					jobNum: null,
					value:'',
					value1:''
				},
				chNames: [{}],
				busIds: [{}],
				rules:{
						value: [
							{validator: validatePass, trigger: 'blur' }
						],
						value1:[ { validator: validatePass2, trigger: 'blur' }]
				}
			}
		},
		methods: {
			sortchange(column, prop, order) {
			},
			padd() {
				this.add_dialog = true;
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage;
				this.$http.post('/api/holiday/list', this.searchParam, {
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
		          if (valid) {
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
			parentHandler() {},
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
								message: '修改失败'
							});
						}
						this.update_dialog = false;
						this.reload();
					}).catch((err) => {
						this.update_dialog = false;
					});
			},
			initpwd(row) {
				this.$confirm('是否初始化密码?', '提示', {
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
									message: '初始化密码成功'
								});
							} else {
								this.$message({
									customClass: 'error',
									message: '初始化密码失败'
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
					this.$message({
						customClass: 'success',
						message: '已取消'
					});
				});
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
</style>
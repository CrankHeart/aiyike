<template>
	<div class="">
		<!--面包屑-->
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item :to="{ path: '/' }">当前位置：系统设置</el-breadcrumb-item>
			<el-breadcrumb-item>标签管理</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap">
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam" class="" ref='searchParam'>
				<el-form-item label="名字：" prop='name'>
					<el-input v-model="searchParam.name" placeholder="名字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="searchbtn" type="primary" @click="searchBtn">搜索</el-button>
					<el-button class="searchbtn" type="primary" @click="resetBtn('searchParam')">重置</el-button>
				</el-form-item>
				<el-form-item class="addbtn-item">
					<!--添加按钮-->
					<el-button class="submitbtn" type="primary" @click="padd">添加</el-button>
				</el-form-item>
			</el-form>
			<!--表格-->
			<el-table @sort-change="sortHandler" class="mytabel" :data="tableData" v-loading="loading" :default-sort="{}">
				<el-table-column prop="id" label="主键" width="" align="center"></el-table-column>
				<el-table-column prop="name" label="名字" width="" align="center"></el-table-column>
				<el-table-column prop="type" label="类型" width="" :formatter="typeFormatter" align="center"></el-table-column>
				<el-table-column prop="color" label="背景颜色" width="" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" width="" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button @click="watchBtn(scope.row)" type="text" size="small">查看</el-button>
						<el-button @click="editBtn(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br />
			<!--分页-->
			<el-pagination class="ui-cpagina" small @current-change="pageChange" :current-page="pagination.curPage" :page-size="pagination.pageSize" layout="total,prev,pager,next,jumper" :total="pagination.total">
			</el-pagination>
		</section>
		<!--弹出框-->
		<el-dialog class="dialog442" title="添加" :visible.sync="add_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px">

				<el-form-item label="名字：">
					<el-input v-model="form.name" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item label="颜色：">
					<el-input v-model="form.color" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item label="类型：">
					<el-select v-model="form.type" placeholder="请选择状态" v-sicon1>
						<el-option v-for="item in statusoptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancelbtn" @click="add_dialog = false">取消</el-button>
				<el-button class="submitbtn" type="primary" @click="addBtn">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog class="dialog442" title="修改" :visible.sync="update_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px">
				<el-form-item label="名字：">
					<el-input v-model="form.name" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="颜色：">
					<el-input v-model="form.color" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="form.type" placeholder="请选择状态" v-sicon1>
						<el-option v-for="item in statusoptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancelbtn" @click="update_dialog = false">取消</el-button>
				<el-button type="primary" class="submitbtn" @click="editSubmit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog class="dialog442" title="详情" :visible.sync="detail_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px">
				<el-form-item label="名字：">
					<el-input v-model="form.name" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="类型：">
					<el-input v-model="form.type" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="颜色：">
					<el-input v-model="form.color" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
		
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'labels',
		mounted() {
			this.$nextTick(() => {
				this.link2Page(1);
				//this.queryParam();
			});
		},
		data() {
			return {
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 1
				},
				searchParam: {
					order: 'DESC',
					//startTime: '',
					// endTime: '',
					name: '',
					curPage: 1
				},
				statusoptions: [{
					value: 1,
					label: '公司'
				}, {
					value: 2,
					label: '外围'
				}],
				title: '',
				add_dialog: false,
				update_dialog: false,
				detail_dialog: false,
				loading: false,
				tableData: [],
				formLabelWidth: "120px",
				form: {
					id: null,
					type: null,
					name: null,
					color: null
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
				this.$http.post('/api/label/list', this.searchParam, {
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
			reload() {
				this.link2Page(1);
			},
			addBtn() {
				this.$http.post("/api/label/add", this.form, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.$message({
								customClass: 'success',
								message: '添加成功'
							});
						} else {
							this.$message({
								customClass: 'error',
								message: '添加失败'
							});
						}
						this.add_dialog = false;
						this.reload();
					}).catch((err) => {
						this.add_dialog = false;
					});
			},
			watchBtn(row) {
				this.detail_dialog = true;
				Object.assign(this.form, row);
				this.form.type = this.typeFormatter(row);
			},
			editBtn(row) {
				this.update_dialog = true;
				Object.assign(this.form, row);
			},
			parentHandler() {},
			editSubmit() {
				this.$http.post("/api/label/update", this.form, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.$message({
								customClass: 'error',
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
			delBtn(row) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("/api/label/del/" + row.id, this.form, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.$message({
									customClass: 'error',
									message: '删除成功'
								});
							} else {
								this.$message({
									customClass: 'error',
									message: '删除失败'
								});
							}
							this.update_dialog = false;
							this.reload();
						}).catch((err) => {
							this.$message({
								customClass: 'error',
								message: '删除失败'
							});
						});
				}).catch(() => {
					this.$message({
						customClass: 'error',
						message: '已取消删除'
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
				// this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd") : '';
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
			typeFormatter(row) {
				if(row.type == 1) {
					return "公司";
				} else {
					return "外围"
				}
			},resetBtn(formName){
				this.$refs[formName].resetFields();
				this.reload();
			}
		}
	}
</script>
<style scoped>
	.layout-in {
		background: #fff;
		padding: 20px;
		margin-top: 24px;
	}
	.addbtn-item {
		float: right;
		margin-right: 0;
	}
</style>
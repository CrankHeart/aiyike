<template>
	<div class="">
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item :to="{path:'/'}">当前位置：系统设置</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap">
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam"  class="" ref="searchParam">
				<el-form-item label="开始时间：" prop='startTime'>
					<el-date-picker v-model="searchParam.startTime" type="date" placeholder="开始时间" :editable="false" :picker-options="pickerBeginDateBefore">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间：" prop='endTime'>
					<el-date-picker v-model="searchParam.endTime" type="date" placeholder="结束时间" :editable="false" :picker-options="pickerBeginDateAfter">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchBtn" class="searchbtn">搜索</el-button>
					<el-button type="primary" @click="resetBtn('searchParam')" class="searchbtn">重置</el-button>
				</el-form-item>
				<el-form-item class="addbtn-item">
					<!--添加按钮-->
					<el-button type="primary" @click="roleAddDialogFormVisible=true" class="submitbtn">添加</el-button>
				</el-form-item>
			</el-form>
			<el-table ref="table" :data="tableData" style="width:100%" v-loading="loading" element-loading-text="拼命加载中">
				<el-table-column prop="id" label="主键" align="center"></el-table-column>
				<el-table-column prop="name" label="名字" align="center"></el-table-column>
				<el-table-column prop="code" label="编码" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button @click="watchBtn(scope.row)" type="text" size="small">查看</el-button>
						<el-button @click="editBtn(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small">删除</el-button>
						<el-button @click="editResource(scope.row)" type="text" size="small">配置资源</el-button>
					</template>
				</el-table-column>
			</el-table>
			</br>
			<el-pagination small @current-change="handleCurrentChange" :current-page="pagination.curPage" :page-size="pagination.pagesize" layout="total,prev,pager,next,jumper" :total="pagination.total">
			</el-pagination>
		</section>
		<el-dialog class="dialog442" title="添加角色" :visible.sync="roleAddDialogFormVisible" :modal="true" :close-on-click-modal="true">
			<el-form :model="form" label-width="80px">
				<el-form-item label="角色：">
					<el-input v-model="form.name" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="编码：">
					
						<template>
				    <el-select v-model="form.code" placeholder="请选择">
				<el-option v-for="(item ,index) in codes" :key="index" :label="item.name" :value="item.value">
				</el-option>
				   </el-select>
				</template>
					<!--<el-input v-model="form.code" auto-complete="off" :maxlength="20"></el-input>-->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="role_close_dialog" class="cancelbtn">取消</el-button>
				<el-button type="primary" @click="role_add_submit" class="submitbtn">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog class="dialog442" title="修改角色" :visible.sync="update_dialog">
			<el-form :model="form" label-width="80px">
				<el-form-item label="角色：">
					<el-input v-model="form.name" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="编码：">
					<el-input v-model="form.code" disabled :readonly="true" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="update_dialog = false" class="cancelbtn">取消</el-button>
				<el-button type="primary" @click="editSubmit" class="submitbtn">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog class="dialog442" title="详情" :visible.sync="detail_dialog" :modal="true" :close-on-click-modal="false">
			<el-form :model="form" label-width="80px">
				<el-form-item label="角色：">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="编码：">
					<el-input v-model="form.code" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog class="dialog442" title="编辑权限" :visible.sync="editResourceDialog" :modal="true" :close-on-click-modal="false">
			<zTree ref="ztree" :id="ztreeId" :list="treeList"></zTree>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editResourceDialog = false" class="cancelbtn">取消</el-button>
				<el-button type="primary" @click="editResourceSubmit" class="submitbtn">确定</el-button>
			</div>
		</el-dialog>
		<!--角色配置组件-->
		<roleconfig v-if="false"></roleconfig>
		<!--角色配置组件2-->
		<roleconfigcheck v-if="false"></roleconfigcheck>
	</div>
</template>
<script>
	import zTree from "@/components/tree/zTree.vue"
	import roleconfig from "./roleconfig.vue"
	import roleconfigcheck from "./roleconfigcheck.vue"

	export default {
		name: "Index",
		created() {
			vueIns = this
		},
		data() {
			return {
				codes: null,
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 0
				},
				loading: true,
				tableData: [],
				formLabelWidth: "120px",
				roleAddDialogFormVisible: false,
				update_dialog: false,
				detail_dialog: false,
				editResourceDialog: false,
				form: {
					name: "",
					code: ""
				},
				pList: [],
				treeList: [],
				pIdList: [],
				ztreeId: "ztree",
				pRoleId: null,
				searchParam: {
					order: 'DESC',
					startTime: '',
					endTime: '',
					curPage: 1
				},
				//搜索结束时间需大于等于开始时间
				pickerBeginDateBefore: {
					disabledDate(time) {
						return time.getTime() > Date.now() || (vueIns.searchParam.endTime && vueIns.searchParam.endTime.getTime && (time.getTime() > vueIns.searchParam.endTime.getTime()))
					}
				},
				pickerBeginDateAfter: {
					disabledDate(time) {
						return time.getTime() > Date.now() || (vueIns.searchParam.startTime && vueIns.searchParam.startTime.getTime && (time.getTime() < vueIns.searchParam.startTime.getTime()))
					}
				},
				editResourceCount: 0
			}
		},
		components: {
			zTree,
			roleconfig,
			roleconfigcheck
		},
		mounted: function() {
			this.$nextTick(() => {
				this.link2Page(1);
				this.initTypes()
			});
		},
		methods: {
				initTypes(){
				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'role'
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.codes = data.result;
					}
				}).catch((err) => {
					this.loading = false
					
				})	
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage;
				this.$http.post('/api/role/list', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					this.tableData = res.data.result.content;
					this.pagination.total = res.data.result.total;
					this.pagination.pagesize = res.data.result.helper.pageSize;
					this.pagination.curPage = res.data.result.helper.curPage;
					this.loading = false;
				}).catch((err) => {
					this.loading = false;
					;
				})
			},
			reload() {
				this.link2Page(1);
			},
			handleClick(tab, event) {},
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.loading = true
				this.link2Page(val);
			},
			role_close_dialog: function() {
				this.roleAddDialogFormVisible = false;
			},
			editBtn(row) {
				this.update_dialog = true;
				Object.assign(this.form, row);
			},
			editSubmit() {
				this.$http.post("/api/role/update", this.form, {
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
								message: data.message
							});
						}
						this.update_dialog = false;
						this.reload();
					}).catch((err) => {
						this.update_dialog = false;
					});
			},
			watchBtn(row) {
				this.detail_dialog = true;
				Object.assign(this.form, row);
			},
			delBtn(row) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("/api/role/del/" + row.id, this.form, {
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
									message: data.message
								});
							}
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
			role_add_submit: function() {
				this.form.busId = JSON.parse(Cache.local(Config.Login)).bus.id
				this.$http.post("/api/role/add", this.form, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '添加成功'
						});
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						});
					}
					this.roleAddDialogFormVisible = false;
					this.reload();
				}).catch((err) => {
					this.roleAddDialogFormVisible = false;
				});
			},
			editResource(row) {
				this.pRoleId = row.id;
				this.pList = [];
				var _this = this;
				_this.editResourceCount = 0
				this.seqRequest({
					pre: [{
						param: null,
						fun: function(param, callback) {
							_this.$http.post("/api/permission/all", null, {
								emulateJSON: true
							}).then((res) => {
								var data = res.data;
								if(data.success) {
									var list = data.result;
									var t = [];
									for(var i = 0; i < list.length; i++) {
										var o = list[i];
										var o1 = {
											"id": o.id,
											"pId": o.parentId
										};
										if(o.type == 0) {
											o1.name = "菜单:" + o.title;
										} else if(o.type == 1) {
											o1.name = "碎片:" + o.title;
										} else {
											o1.name = "功能:" + o.title;
										}
										t.push(o1);
									}
									_this.pList = t;
									_this.editResourceCount++
									callback();
								}
							}).catch((err) => {});
						}
					}, {
						param: null,
						fun: function(param, callback) {
							_this.$http.post("/api/role/rp1/" + _this.pRoleId, null, {
								emulateJSON: true
							}).then((res) => {
								var data = res.data;
								if(data.success) {
									var list = data.result;
									_this.pIdList = list;
									_this.editResourceCount++
								}
								callback();
							}).catch((err) => {});
						}
					}],
					next: function() {
						if (_this.editResourceCount != 2) {
							return
						}
						var pList = _this.pList;
						var pIdList = _this.pIdList;
						if(Object.isNotEmpty(pList) && Object.isNotEmpty(pIdList)) {
							for(let i = 0; i < pList.length; i++) {
								var o = pList[i];
								for(let j = 0; j < pIdList.length; j++) {
									var o1 = pIdList[j];
									if(o.id == o1.pid) {
										_this.$set(_this.pList[i], 'checked', true)
										break;
									}
									if(j == pIdList.length - 1) {
										_this.$set(_this.pList[i], 'checked', false)
									}
								}
							}
						}
						_this.treeList = pList;
						_this.editResourceDialog = true;
					}
				});

			},
			editResourceSubmit() {
				var data = this.$refs.ztree.getNode(true);
				var arr = [];
				for(var i = 0; i < data.length; i++) {
					var o = data[i];
					if(o.checked) {
						arr.push(o.id);
					}
				}
				this.$http.post("/api/role/addPermission", {
					"roleId": this.pRoleId,
					"pId": arr
				}, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '修改资源成功'
						});
					} else {
						this.$message({
							customClass: 'error',
							message: '修改资源失败'
						});
					}
					this.editResourceDialog = false;
				});
			},
			searchBtn() {
				this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.searchParam.endTime = (!!this.searchParam.endTime) ? new Date(this.searchParam.endTime).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
				this.reload();
			},resetBtn(formName){
				this.$refs[formName].resetFields();
				this.reload();
			}
		}
	}
</script>
<style scoped>
	.addbtn-item {
		float: right;
		margin-right: 0;
	}
	
	.layout-in {
		background: #fff;
		padding: 20px;
		margin-top: 24px;
	}
</style>
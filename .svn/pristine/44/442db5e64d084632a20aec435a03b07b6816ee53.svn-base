<template>
	<div class="">
		<!--面包屑-->
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item :to="{path:'/'}">当前位置：系统设置</el-breadcrumb-item>
			<el-breadcrumb-item>资源列表</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap">
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam" ref="searchParam">
				<el-form-item label="开始时间：" prop='startTime'>
					<el-date-picker v-model="searchParam.startTime" type="date" placeholder="开始时间" :editable="false" :picker-options="pickerBeginDateBefore">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间：" prop='endTime'>
					<el-date-picker v-model="searchParam.endTime" type="date" placeholder="结束时间" :editable="false" :picker-options="pickerBeginDateAfter">
					</el-date-picker>
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
				<el-table-column prop="id" label="主键" align="center"></el-table-column>
				<el-table-column prop="parentId" label="父节点" align="center"></el-table-column>
				<el-table-column prop="rank" label="等级" align="center" width="60"></el-table-column>
				<el-table-column prop="code" label="编码" align="center"></el-table-column>
				<el-table-column prop="type" label="类型" align="center" width="60" :formatter="typeFormatter"></el-table-column>
				<el-table-column prop="seq" label="排序" align="center" width="60"></el-table-column>
				<el-table-column prop="url" label="请求" align="center"></el-table-column>
				<el-table-column prop="icon" label="小图标" align="center"></el-table-column>
				<el-table-column prop="title" label="标题" align="center"></el-table-column>
				<el-table-column prop="status" label="状态" align="center" width="80" :formatter="statusFormatter"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button @click="watchBtn(scope.row)" type="text" size="small">查看</el-button>
						<el-button @click="editBtn(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--分页-->
			<el-pagination class="ui-cpagina" small @current-change="pageChange" :current-page="pagination.curPage" :page-size="pagination.pageSize" layout="total,prev,pager,next,jumper" :total="pagination.total">
			</el-pagination>
		</section>
		<!--弹出框-->
		<el-dialog title="添加" :visible.sync="add_dialog" :modal="true" :close-on-click-modal="false">
			<el-form :model="form" label-width="80px">
				<el-form-item label="父节点：">
					<el-cascader :change-on-select="true" v-model="pFType" :options="plist" @change="parentHandler()" v-sicon1></el-cascader>
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="form.type" placeholder="请选择" v-sicon1>
						<el-option v-for="item in fType" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="编码：">
					<el-input v-model="form.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标题：">
					<el-input v-model="form.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="等级：">
					<plusminusintfloat v-model="form.rank" :decimal="1" ></plusminusintfloat>
				</el-form-item>
				<el-form-item label="排序：">
					<plusminusintfloat v-model="form.seq" :decimal="1" ></plusminusintfloat>
				</el-form-item>
				<el-form-item label="请求：">
					<el-input v-model="form.url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="源路径：">
					<el-input v-model="form.src" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图标：">
					<el-input v-model="form.icon" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述：">
					<el-input v-model="form.description" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="状态：">
					<el-switch class="switch-type-1" v-model="form.status" on-color="#295dcf" off-color="#f2f2f2" on-text="启用" off-text="禁用" :on-value="1" :off-value="0">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="add_dialog = false" class="cancelbtn">取消</el-button>
				<el-button type="primary" @click="addBtn" class="submitbtn">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="修改" :visible.sync="update_dialog" :modal="true" :close-on-click-modal="false">
			<el-form :model="form" label-width="80px">
				<el-form-item label="父节点：">
					<el-cascader :change-on-select="true" v-model="pFType" :options="plist" @change="parentHandler()" v-sicon1></el-cascader>
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="form.type" placeholder="请选择" v-sicon1>
						<el-option v-for="item in fType" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="等级：">
					<plusminusintfloat v-model="form.rank" :decimal="1"></plusminusintfloat>
				</el-form-item>
				<el-form-item label="编码：">
					<el-input v-model="form.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="排序：">
					<plusminusintfloat v-model="form.seq" :decimal="1"></plusminusintfloat>
				</el-form-item>
				<el-form-item label="请求：">
					<el-input v-model="form.url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="源路径：">
					<el-input v-model="form.src" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图标：">
					<el-input v-model="form.icon" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标题：">
					<el-input v-model="form.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述：">
					<el-input v-model="form.description" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="状态：">
					<el-switch class="switch-type-1" v-model="form.status" on-color="#295dcf" off-color="#f2f2f2" on-text="启用" off-text="禁用" :on-value="1" :off-value="0">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancelbtn" @click="update_dialog = false">取 消</el-button>
				<el-button class="submitbtn" type="primary" @click="editSubmit">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="详情" :visible.sync="detail_dialog" :modal="true" :close-on-click-modal="false">
			<el-form :model="form" label-width="80px">
				<el-form-item label="父节点：">
					<el-cascader :change-on-select="true" v-model="pFType" :options="plist" @change="parentHandler()" v-sicon1></el-cascader>
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="form.type" placeholder="请选择" v-sicon1>
						<el-option v-for="item in fType" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="等级：">
					<plusminusintfloat v-model="form.rank" :decimal="1"></plusminusintfloat>
				</el-form-item>
				<el-form-item label="编码：">
					<el-input v-model="form.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="排序：">
					<plusminusintfloat v-model="form.seq" :decimal="1"></plusminusintfloat>
				</el-form-item>
				<el-form-item label="请求：">
					<el-input v-model="form.url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="源路径：">
					<el-input v-model="form.src" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="小图标：">
					<el-input v-model="form.icon" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标题：">
					<el-input v-model="form.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述：">
					<el-input v-model="form.description" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="状态：">
					<el-switch class="switch-type-1" v-model="form.status" on-color="#295dcf" off-color="#f2f2f2" on-text="启用" off-text="禁用" :on-value="1" :off-value="0">
					</el-switch>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	let plusminusintfloat= () =>
		import('@/components/select/plusminusintfloat.vue')
	export default {
		name: 'permission',
		components:{
			plusminusintfloat
		},
		mounted() {
			this.$nextTick(() => {
				this.link2Page(1);
				this.getPList()

			});
		},
		created() {
			vueIns = this
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
					startTime: '',
					endTime: '',
					curPage: 1
				},
				title: '',
				add_dialog: false,
				update_dialog: false,
				detail_dialog: false,
				loading: false,
				tableData: [],
				formLabelWidth: "120px",
				plist: [],
				pFType: [],
				fType: [{
						value: 0,
						label: "菜单"
					},
					{
						value: 1,
						label: "碎片"
					},
					{
						value: 2,
						label: "功能"
					}
				],
				form: {
					id: null,
					parentId: null,
					rank: 1,
					code: null,
					type: 1,
					status: 1,
					seq: 1,
					url: null,
					src: null,
					icon: null,
					title: null,
					description: null
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
		        }
			}
		},
		methods: {
			padd() {
				this.add_dialog = true;
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage;
				this.$http.post('/api/permission/list', this.searchParam, {
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
			reload() {
				this.link2Page(1);
			},
			addBtn() {
				if(this.pFType && this.pFType.length > 0) {
					this.form.parentId = this.pFType[this.pFType.length - 1];
				} else {
					this.form.parentId = 0;
				}
				this.$http.post("/api/permission/add", this.form, {
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
				this.pFType = this.obtainIds(row.parentId)
				this.$set(this.$data, 'form', row)
			},
			obtainIds(parentId) {
				function sosoIds(id, arr, p) {
					let ret = null
					for (let i in arr) {
						if (arr[i].value == id) {
							if (Object.isNotEmpty(p)) {
								ret =  p.value
							} else {
								ret = null
							}
							return ret
						}
						if (arr[i].children && arr[i].children.length) {
							ret = sosoIds(id, arr[i].children, arr[i])
							if (ret) {
								return ret
							}
						}
					}
				}
				let ret = []
				for (let i = parentId;i != null;i = sosoIds(i, this.plist)) {
					ret.unshift(i)
				}
				return ret
			},
			editBtn(row) {
				this.update_dialog = true;
				this.pFType = this.obtainIds(row.parentId)
				this.$set(this.$data, 'form', row)
			},
			parentHandler() {
				
			},
			editSubmit() {
				this.$http.post("/api/permission/update", this.form, {
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
			delBtn(row) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("/api/permission/del/" + row.id, this.form, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.$message({
									customClass: 'success',
									message: '删除成功'
								});
							} else {
								this.$message({
									customClass: 'error',
									message: '删除失败'
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
			pageChange(val) {
				this.link2Page(val);
			},
			sortHandler(column) {
				this.searchParam.order = column.order.split("ending")[0]
				//let field = this.fieldFormatter(column.prop) 格式化字段
				this.link2Page(1);
			},
			searchBtn() {
				this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.searchParam.endTime = (!!this.searchParam.endTime) ? new Date(this.searchParam.endTime).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
				this.reload();
			},
			resetBtn(formName){
				this.$refs[formName].resetFields();
				this.reload();
			},
			getPList() {
				if(this.plist.length == 0) {
					this.$http.post("/api/permission/all", null, {
							emulateJSON: true
						}).then((res) => {
							var data = res.data;
							if(data.success) {
								var list = data.result;
								var t = [];
								for(var i = 0; i < list.length; i++) {
									var o = list[i];
									if(o.type == 0 && o.parentId == 0) {
										var o1 = {};
										o1.value = o.id;
										if(o.type == 0) {
											o1.label = "菜单:" + o.title;
										} else {
											o1.label = "碎片:" + o.title;
										}
										this.fillPList(o1, list, o.id);
										t.push(o1);
									}
								}
								this.plist = t;
							}
						}).catch((err) => {});
				}
			},
			fillPList(t, s, id) {
				var list = [];
				for(var i = 0; i < s.length; i++) {
					var o = s[i];
					if(o.type != 2 && o.parentId == id) {
						var o1 = {};
						o1.value = o.id;
						if(o.type == 0) {
							o1.label = "菜单:" + o.title;
						} else {
							o1.label = "碎片:" + o.title;
						}
						list.push(o1);
						this.fillPList(o1, s, o.id);
					}
				}
				if(list.length > 0) {
					t.children = list;
				}
			},
			statusFormatter(row) {
				if(row.status == 1) {
					return "启用";
				} else {
					return "停用"
				}
			},
			typeFormatter(row) {
				if(row.type == 0) {
					return "菜单";
				} else if(row.type == 2) {
					return "功能";
				} else if(row.type == 1) {
					return "碎片";
				}
				return "";
			}/*,
			plus(num){//单击加1
				this.$data.form[num]++;
			},
			minus(num){//单击减1
			   	if(this.$data.form[num]>1){
			   		this.$data.form[num]--;
			   	}else{
			   		return false;
			   	}
			},
			valiFloatFun(num){
				let re = /^(\d+)(\.?)(\d{0,2})$/;
				if(!re.test(this.$data.form[num])){ //如果输入时有小数，最多取前两位小数
					this.$data.form[num] = this.$data.form[num].replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                	
				}
				return this.$data.form[num];
			}*/
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
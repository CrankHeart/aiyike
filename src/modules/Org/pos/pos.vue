<template>
	<div class="layout">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">人事管理 </el-breadcrumb-item>
			<el-breadcrumb-item>岗位管理</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap layout-in">
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam" class="pos-form-inline margin-left8" :ref="searchParam">
				<el-form-item label="所在岗位：" prop="stationId">
					<template>
						<el-select v-model="searchParam.id" filterable  placeholder="请选择" clearable>
							<el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
			<!--	<el-form-item label="开始时间：">
					<el-date-picker v-model="searchParam.startTime" type="date" placeholder="开始时间" :editable="false" :picker-options="pickerBeginDateBefore"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间：">
					<el-date-picker v-model="searchParam.endTime" type="date" placeholder="结束时间" :editable="false" :picker-options="pickerBeginDateAfter"></el-date-picker>
				</el-form-item>-->
				<el-form-item class="toolitem">
					<el-button class="searchbtn" type="primary" @click="searchBtn">搜索</el-button>
					<el-button class="submitbtn" type="primary" @click="resetForm('searchParam')">重置</el-button>
				</el-form-item>
			</el-form>
			<el-table @sort-change="sortHandler" class="posTabel" :data="tableData" v-loading="loading" :default-sort="{}">
				<el-table-column prop="name" label="岗位名称" align="left"></el-table-column>
				<el-table-column prop="description" label="岗位简介" align="left"></el-table-column>
				<el-table-column prop="jobOut" label="离职人数" align="center"></el-table-column>
				<el-table-column prop="jobOn" label="在职人数" align="center"></el-table-column>
				<el-table-column prop="type" label="专业类别" align="center" :formatter="typeFormatter"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
				</el-table-column>
				<el-table-column label="操作" align="center" v-if="HasPermission('listeditbtn')">
					<template slot-scope="scope">
						<el-button @click="editPosBtn(scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination small @current-change="handleCurrentChange" :current-page="pagination.curPage" :page-size="pagination.pagesize" layout="total,prev,pager,next,jumper" :total="pagination.total"></el-pagination>
		</section>
		<!--编辑弹出框begin-->
		<el-dialog title="修改岗位" :visible.sync="posEditDialogFormVisible">
			<el-form :model="formData" :rules="rules" ref="formData">
				<el-form-item label="岗位名称" prop="name">
					<el-input type="text"  :maxlength="20" v-model="formData.name"></el-input>
				</el-form-item>
				
				<el-form-item label="专业类别" prop="type">
					<template>
				    <el-select v-model="formData.type" placeholder="请选择">
				  <el-option v-for="(item,index) in typesu" :key="index" :label="item.name" :value="item.value">
				  </el-option>
				   </el-select>
				</template>
				</el-form-item>
				
				<el-form-item label="岗位简介">
					<el-input type="textarea"  :maxlength="200" v-model="formData.description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editPosSubmit('formData')">确 定</el-button>
				<el-button @click="editPosDialogCancel">取 消</el-button>
			</div>
		</el-dialog>
		<!--编辑弹出框end-->
		<NewAddPosDialog v-if="HasPermission('newaddposbtn')" :visible.sync="newAddPosFlag"></NewAddPosDialog>
	</div>
</template>

<script>
	let NewAddPosDialog = () => import('@/modules/Org/pos/NewAddPos_Dialog.vue')	
	
	export default {
		name: 'pos',
		components: {
			NewAddPosDialog
		},
		mounted() {
			   this.initTypes()
			//查询岗位
				this.$http.post('/api/station/queryStationByRedis',{"busId":this.dataList.bus.id}, {
					emulateJSON: true
				}).then((res) => {
					this.stations = res.data.result;
				}).catch((err) => {
					this.loading = false
				});
			this.$nextTick(() => {
				this.link2Page(1);
			});
		},
		created() {
			vueIns = this
		},
		data() {
			return {
				typesu: null,
				dataList:JSON.parse( Cache.local(Config.Login)),
				stations:[],
				newAddPosFlag: false,
				loading: true,
				formDisabled: false,
				title: '',
				posEditDialogFormVisible: false,
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 1
				},
				formData: {
					type: '',
					name: '',
					description: '',
					busId:''
				},
				searchParam: {
					order: 'desc',
					startTime: '',
					endTime: '',
					curPage: 1
				},
				tableData: [],
				busId: JSON.parse(Cache.local(Config.Login)).bus.id,
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
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入岗位名称', trigger: 'blur' },
		            { max: 20, message: '长度在 20个字符范围', trigger: 'blur' }
		          ],
		            type: [
		            { required: true, message: '请选择类型', trigger: 'blur' }
		          ]
		        }
			}
		},
		methods: {
				initTypes(){
				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'major'
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.typesu = data.result;
					}
				}).catch((err) => {
					this.loading = false
					
				})	
			},
				typeFormatter(row) {
				 if(row.type == 0) {
					return "后台开发";
				 }if(row.type == 1) {
					return "设计";
				}if(row.type == 2) {
					return "策划";
				}if(row.type == 3) {
					return "前端开发";
				}if(row.type == 4) {
					return "质量管理";
				}if(row.type == 5) {
					return "运营服务管理";
				} else {
					return "未知"
				}
			},
				typeEditFormatter(row) {
				 if(row.type == 0) {
					return "后台开发";
				 }if(row.type == 1) {
					return "设计";
				}if(row.type == 2) {
					return "策划";
				}if(row.type == 3) {
					return "前端开发";
				}if(row.type == 4) {
					return "质量管理";
				}if(row.type == 5) {
					return "运营服务管理";
				} 
			},
			resetForm(formName){
				this.searchParam.id=''
				this.searchParam.startTime=null
				this.searchParam.endTime=null
				this.reload()
			},
			openNewAddPosDialog() {
				this.newAddPosFlag = true
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage
				this.$http.post('/api/station/list', this.searchParam, {
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
			reload() {
				this.link2Page(1);
			},
			handleCurrentChange(val) {
				this.loading = true
				this.link2Page(val);
			},
			pageChange(val) {
				this.loading = true
				this.link2Page(val)
			},
			sortHandler(column) {
				this.searchParam.order = column.order.split("ending")[0]
				this.link2Page(1)
			},
			searchBtn() {
				this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.searchParam.endTime = (!!this.searchParam.endTime) ? new Date(this.searchParam.endTime).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
				//this.link2Page(1)
				this.reload();
			},
			delPosBtn(row) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("/api/station/del/" + row.id, this.formData, {
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
						customClass: 'success',
						message: '已取消删除'
					});
				});
			},
			editPosBtn(row) {
				//this.initTypes()
				Object.assign(this.formData, row);
				this.posEditDialogFormVisible = true;
				this.formData.type = this.typeEditFormatter(row);
			},
			editPosSubmit: function(formName) {
				this.$refs[formName].validate((valid) => {
	          	if (valid) {
	          		this.updatePos();
	          	} else {
		            ;
		            return false;
	          	}
	          });
			},
			updatePos:function(){
				console.log(this.formData.type)
				this.formData.busId = this.busId;
				this.$http.post("/api/station/update", this.formData, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '修改成功'
						});
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						});
					}
					this.editPosDialogCancel();
					this.reload();
				}).catch((err) => {
					;
					this.editPosDialogCancel();
				});
			},
			editPosDialogCancel: function() {
				this.posEditDialogFormVisible = false;
			}
		}
	}
</script>

<style scoped>
	/*.posTabel {
		margin-top: 28px;
	}*/
	
	.pos-form-inline {
		position: relative;
	}
	
	.toolitem {
	    text-align: right;
	    right: 0;
	    position: absolute;
	    margin-right: 0;
	}
	
	.mt20 {
		margin-top: 20px;
	}
	
	
	.layout {}
	
	.layout-in {
		margin-bottom: 20px;
		margin-top: 24px;
	}
</style>
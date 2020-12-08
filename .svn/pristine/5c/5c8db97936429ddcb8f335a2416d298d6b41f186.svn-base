<template>
	<div class="">
		<!--面包屑-->
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>Demo</el-breadcrumb-item>
		</el-breadcrumb>
		<!--查询表单-->
		<el-form :inline="true" :model="searchParam" class="demo-form-inline">
			<el-form-item label="开始时间">
				<el-date-picker v-model="searchParam.starttime" type="date" placeholder="开始时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间">
				<el-date-picker v-model="searchParam.endtime" type="date" placeholder="结束时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchBtn" icon="search"></el-button>
				<!--添加按钮-->
				<el-button class="add" type="primary" icon="plus" @click="addBtn">添加</el-button>
			</el-form-item>
		</el-form>
		<!--表格-->
		<el-table @sort-change="sortHandler" class="mytabel" :data="tableData" v-loading="loading" :default-sort="{}">
			<el-table-column sortable='custom' prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="statusFormatter">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="watchBtn(scope.row)" type="text" size="small">查看</el-button>
					<el-button @click="editBtn(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="delBtn(scope)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-pagination class="cpagina" small @current-change="pageChange" :current-page="pagination.curPage" :page-size="pagination.pagesize" layout="total,prev,pager,next,jumper" :total="pagination.total">
		</el-pagination>
		<!--弹出框-->
		<el-dialog :title="title" :visible.sync="dialogVisible" close-on-press-escape :modal="true" @close="dialogClose">
			<el-form :model="formDate" label-width="80px">
				<el-form-item label="日期">
					<el-date-picker :disabled="formDisabled" v-model="formDate.date" type="date" placeholder="日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input :disabled="formDisabled" class="myinput" v-model="formDate.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select :disabled="formDisabled" v-model="formDate.status" clearable placeholder="请选择状态">
						<el-option v-for="item in statusoptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCancel">取 消</el-button>
				<el-button type="primary" @click="dialogSure">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Demo',
		mounted() {},
		data() {
			return {
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 1
				},
				formDisabled: false,
				formDate: {
					date: '',
					status: '',
					name: ''
				},
				searchParam: {
					order: 'desc',
					starttime: '',
					endtime: '',
					curPage: 1
				},
				statusoptions: [{
					value: 1,
					label: 'a'
				}, {
					value: 2,
					label: 'b'
				}, {
					value: 3,
					label: 'c'
				}, {
					value: 4,
					label: 'd'
				}],
				title: '',
				dialogVisible: false,
				loading: false,
				tableData: [{
					date: '2016-05-03',
					status: 1,
					name: '王'
				}, {
					date: '2016-05-02',
					status: 2,
					name: '王小'
				}, {
					date: '2016-05-04',
					status: 3,
					name: '王小虎'
				}, {
					date: '2016-05-01',
					status: 4,
					name: '王小虎2'
				}]
			}
		},
		methods: {
			link2Page(curPage) {
				this.searchParam.curPage = curPage
				this.$http.post('api/role/list', this.searchParam, {
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
			addBtn() {
				this.title = '添加'
				this.dialogVisible = true
				this.formDisabled = false
			},
			watchBtn(row) {
				this.title = '查看'
				this.dialogVisible = true
				this.formDisabled = true
				Object.assign(this.formDate, row)
			},
			editBtn(row) {
				this.title = '编辑'
				this.dialogVisible = true
				this.formDisabled = false
				Object.assign(this.formDate, row)
//				row.name = 666 
			},
			delBtn(scope) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData.splice(scope.$index, 1)
				}).catch(() => {
					this.$message({
						customClass: 'error',
						message: '已取消删除'
					});
				});
			},
			pageChange(val) {
				//				this.loading = true	
				this.link2Page(val)
			},
			statusFormatter(row) {
				let ret = null
				switch(row.status) {
					case 1:
						ret = 'a'
						break
					case 2:
						ret = 'b'
						break
					case 3:
						ret = 'c'
						break
					case 4:
						ret = 'd'
						break
				}
				return ret
			},
			fieldFormatter(name) {
				let obj = {
					date: 'da_te'
				}
				return obj[name]
			},
			sortHandler(column) {
				this.searchParam.order = column.order.split("ending")[0]
				//let field = this.fieldFormatter(column.prop) 格式化字段
				this.link2Page(1)
			},
			searchBtn() {
				this.searchParam.starttime = (!!this.searchParam.starttime) ? new Date(this.searchParam.starttime).format("yyyy-MM-dd") : '';
				this.searchParam.endtime = (!!this.searchParam.starttime) ? new Date(this.searchParam.endtime).format("yyyy-MM-dd") : '';
				this.link2Page(1)
			},
			dialogClose() {
				for (let i in this.formDate) {
					this.formDate[i] = ''
				}
			},
			dialogCancel() {
				this.dialogVisible = false
			},
			dialogSure() {
				this.dialogVisible = false
			}
		}
	}
</script>

<style scoped>
	.mytabel {
		margin-top: 28px;
	}
	
	.cpagina {
		margin-top: 10px;
	}
	
	.demo-form-inline {
		text-align: right;
	}
	.myinput{
		width: 193px;
	}
	.add {}
</style>
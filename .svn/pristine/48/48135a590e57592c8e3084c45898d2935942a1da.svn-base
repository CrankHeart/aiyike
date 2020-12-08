<template>
	<section class="layout-o">
		<!--面包屑-->
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：外围</el-breadcrumb-item>
			<el-breadcrumb-item>外围团队管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="list-wrap">
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam" label-width="68px" label-position="left" class="list-soso">
				<el-form-item label="业务范围：">
					<!--<el-input class="w190" v-model="searchParam.range" placeholder="请输入"></el-input>-->
					<MultipleSelect search v-model="searchParam.busIds" :options="labelIds" :fieldsOptinos="{label:'name',value:'id'}"></MultipleSelect>
				</el-form-item>
				<el-form-item label="公司类型：">
					<el-select :clearable="true" class="w190" v-model="searchParam.category" placeholder="请选择">
						<el-option v-for="(item,index) in busType" :key="index" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公司名称：">
					<el-select :clearable="true" class="w190" v-model="searchParam.name" placeholder="请选择">
						<el-option v-for="item in names" :key="item.id" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="创建日期：">
					<el-date-picker class="w110" type="date" placeholder="选择日期" v-model="searchParam.date"></el-date-picker>
				</el-form-item>
				<el-form-item class="searchbtn-area">
					<el-button type="primary" @click="searchBtn" class="searchbtn">搜索</el-button>
				</el-form-item>
			</el-form>
			<!--表格-->
			<el-table @row-click="rowClick" @sort-change="sortHandler" class="list-table ayk-table__pointer" :data="tableData" v-loading="loading" :default-sort="{}">
				<el-table-column prop="name" label="公司名" width=""></el-table-column>
				<el-table-column prop="labels" label="业务范围" width="320">
					<template slot-scope="props">
						<span class="tips-text" v-if="index < 2" v-for="(item, index) in props.row.labels" :key="index">
						<span>{{item.name}}</span>
						</span>
						<div v-if="props.row.labels.length > 2" class="more" @mouseenter="moreover(props.row.labels)" @mouseleave="moreout($event)">
							<span>...</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="category" label="公司类型" width="" :formatter="categoryFormatter" align="center"></el-table-column>
				<el-table-column prop="scope" label="项目类型" width="" :formatter="scopeFormatter" align="center"></el-table-column>
				<el-table-column prop="cooperate" label="合作次数" width="" align="center"></el-table-column>
				<el-table-column prop="status" label="审核状态" width="" align="center">
					<template slot-scope="props">
						<span class="ayk-textips" :status="statusFormatter(props.row)">{{statusFormatter(props.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="" align="center"></el-table-column>
			</el-table>
			<br />
			<!--分页-->
			<el-pagination class="ui-cpagina" small @current-change="pageChange" :current-page="pagination.curPage" :page-size="pagination.pageSize" layout="total,prev,pager,next,jumper" :total="pagination.total">
			</el-pagination>
		</div>
		<el-dialog title="业务范围管理" :visible.sync="labelsDialogVisible" class="dialog442">
			<section class="labels-area">
				<el-tag class="ayk-tag" :key="index" v-for="(tag, index) in dynamicTags" :closable="true" :close-transition="false" @close="closeTag(tag, index)">
					<span v-if="(tag.name+'').length">{{tag.name}}</span>
					<span v-else>未知</span>
				</el-tag>
				<div class="addtag-area">
					<el-input class="input-new-tag" v-if="inputTagVisible" v-model="inputTagValue" ref="saveTagInput" @keyup.enter.native="handleTagInputConfirm" @blur="handleTagInputConfirm">
					</el-input>
					<span v-else class="pl12 el-tag ayk-tag" size="small" @click="showTagInput">
						<span>+</span>
					</span>
				</div>
			</section>
			<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="tagDialogSave">保存</el-button>
			    <el-button class="cancelbtn" @click="tagDialogCancel">取消</el-button>
		    </span>
		</el-dialog>
		<Tooltip :tipData="tipData" :tipStatus="tipStatus" targetClass="more"></Tooltip>
	</section>
</template>

<script>
	let Tooltip = () =>
		import('@/components/Tooltip.vue')
	let MultipleSelect = () =>
		import('@/components/select/MultipleSelect.vue')

	export default {
		name: 'outTeam',
		components: {
			MultipleSelect,
			Tooltip
		},
		mounted() {
			this.$nextTick(() => {
				this.link2Page(1);
				this.queryLabel();
				this.obtainLabels()
			});
		},
		data() {
			return {
				names: [{}],
				busType: '',
				labelIds: [],
				tipData: [],
				tipStatus: false,
				tipPosition: {},
				labelsDialogVisible: false,
				dynamicTags: [],
				inputTagVisible: false,
				inputTagValue: '',
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 1
				},
				searchParam: {
					order: 'DESC',
					busIds: [],
					type: '',
					name: '',
					date:'',
					curPage: 1
				},
				statusoptions: [{
					value: '1',
					label: '系统'
				}, {
					value: '2',
					label: '自定义'
				}],
				loading: false,
				tableData: []
			}
		},
		methods: {
			obtainLabels() {
				this.$http.post("/api/label/queryLabelAll", {}, {
						emulateJSON: true
					}).then((res) => {
						this.labelIds = res.data.result
					}).catch((err) => {}),
					this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
						code: 'category'
					}, {
						emulateJSON: true
					}).then((res) => {
						let data = res.data;
						if(data.success) {
							this.busType = data.result;
						}
					}).catch((err) => {})
			},
			moreover(labels) {
				this.tipStatus = true
				this.tipData = labels.map((item, index, _self) => {
					return item.name
				})
			},
			moreout(e) {
				this.tipStatus = false
			},
			rowClick: function(row, event, column) {
				const noJumpList = ["操作"]
				if(noJumpList.indexOf(column.label) != -1) {
					return void(0)
				}
				this.tipStatus = false
				this.$router.push({
					path: `/out/outMgt/tdetails/${row.id}`
				});
			},
			tagDialogSave() {
				var newAddTags = this.dynamicTags.filter(function(item, index, _self) {
					return Object.isEmpty(item.id)
				})
				this.$http.post('/api/bus/addLabels', JSON.stringify({
					labels: newAddTags
				}), {
					emulateJSON: true
				}).then((res) => {
					let data = res.data
					if (data.success) {
						this.labelsDialogVisible = false
					}
				}).catch((err) => {
				})
			},
			tagDialogCancel() {
				this.labelsDialogVisible = false
			},
			handleTagInputConfirm() {
				let inputTagValue = this.inputTagValue
				if(inputTagValue) {
					inputTagValue = inputTagValue.trim()
					this.dynamicTags.push({
						id: "",
						name: inputTagValue
					})
				}
				this.inputTagVisible = false
				this.inputTagValue = ''
			},
			showTagInput() {
				this.inputTagVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus()
				})
			},
			closeTag(tag, index) {
				if(this.dynamicTags[index] == tag) {
					if (tag.id) {
						this.$http.post(`/api/label/del/${tag.id}`, {}, {
							emulateJSON: true
						}).then((res) => {
							if (res.data.success) {
								this.dynamicTags.splice(index, 1)
							} else {
								this.$message({
						            customClass: "error",
						            message: "删除失败"
					         	});
							}
						}).catch((err) => {})
					} else {
						this.dynamicTags.splice(index, 1)
					}
				}
			},
			spBusDialog() {
				this.queryLabel()
				this.labelsDialogVisible = true
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage;
				if (this.searchParam.date instanceof Date) {
					this.searchParam.date = this.searchParam.date.format("yyyy-MM-dd")
				}
				this.$http.post('/api/bus/queryBusLabel', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					let content = res.data.result.content || []
					this.tableData = content.map((item, index) => {
						if(String.isString(item.labels)) {
							item.labels = JSON.parse(item.labels)
						}
						if(Object.isEmpty(item.labels)) {
							item.labels = []
						}
						return item
					})
					this.pagination.total = res.data.result.total;
					this.pagination.pageSize = res.data.result.helper.pageSize;
					this.pagination.curPage = res.data.result.helper.curPage;
					this.loading = false;
				}).catch((err) => {
					this.loading = false;

				});
			},
			queryLabel() {
				this.$http.post('/api/label/queryLabelAll', {}, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.result
					this.dynamicTags = result
				}).catch((err) => {
					this.loading = false
				}),
				this.$http.post('/api/bus/loadOutCom', {}, {
						emulateJSON: true
					}).then((res) => {
						this.names = res.data.result;
					}).catch((err) => {
						this.loading = false
						
					})
			},
			reload() {
				this.link2Page(1);
			},
			pageChange(val) {
				this.link2Page(val);
			},
			sortHandler(column) {
				this.searchParam.order = column.order.split("ending")[0]
				this.link2Page(1);
			},
			searchBtn() {
				this.reload();
			},
			categoryFormatter(row) {
				if(row.category == 1) {
					return "公司";
				} else if(row.category == 2) {
					return "工作室";
				} else {
					return "个人"
				}
			},
			statusFormatter(row) {
				if(row.status == 0) {
					return "待认证";
				} else if(row.status == 1) {
					return "认证驳回";
				} else if(row.status == 2) {
					return "待认证";
				} else if(row.status == 3) {
					return "审核驳回";
				}else if(row.status == 4)  {
					return "待审核";
				} else if(row.status == 5) {
					return "已认证";
				} else if(row.status == 7) {
					return "已审核";
				} else if(row.status == 6){
					return "禁用";
				}else{
					return "未知"
				}
			},
			scopeFormatter(row) {
				if(row.scope == 1) {
					return "10人以下";
				} else if(row.scope == 2) {
					return "10-50人";
				} else if(row.scope == 3) {
					return "50-100人";
				} else if(row.scope == 4) {
					return "100-200人";
				} else {
					return "200人以上"
				}
			}
		}
	}
</script>
<style scoped>
	.addtag-area {
		width: 96px;
		height: 24px;
	}
	
	.input-new-tag {
		padding-left: 2.5px;
	}
	
	.labels-area {
		min-height: 155px;
		margin-left: -5px;
		margin-right: -5px;
	}
	
	.pl12 {
		padding-left: 12px;
		cursor: pointer;
	}
	
	.pl12 span {
		transform: scale(1);
	}
	
	.w190 {
		width: 190px;
	}
	
	.w110 {
		width: 110px;
	}
	
	.searchbtn-area {
		position: absolute;
		right: 0;
		top: 0;
		margin: 0;
	}
	
	.wrap {
		height: auto;
		background: #fff;
		padding: 20px;
	}
	
	.tips-text {
		background: rgba(68, 68, 68, 0.8);
		color: #fff;
	}
	
	.tips-text {
		background: #F8F9FB;
		width: 90px;
		height: 23px;
		display: inline-block;
		font-size: 12px;
		color: #666666;
		line-height: 23px;
		text-align: center;
		margin-right: 12px;
	}
	
	.tips-text span {
		display: inline-block;
		transform: scale(0.8333);
	}
	
	.more {
		text-align: center;
		width: 40px;
		height: 23px;
		display: inline-block;
		background: #F8F9FB;
		color: #666666;
		cursor: pointer;
		position: relative;
	}
	
	.more span {
		position: relative;
		top: -2px;
	}
</style>
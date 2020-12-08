<template>
	<section class="layout-o">
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：外围</el-breadcrumb-item>
			<el-breadcrumb-item>外围项目管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="list-wrap">
			<!--查询表单-->
			<el-form :inline="true" :model="searchParam" class="list-soso" label-width="68px" label-position="left">
				<el-form-item label="项目名称：">
					<!--<el-input class="w190" v-model="searchParam.itemName" type="text" placeholder="项目名称"></el-input>-->
						<el-select v-model="searchParam.itemName" filterable placeholder="请选择" clearable>
						<el-option v-for="item in names" :key="item.id" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公司名称：">
					<el-input class="w190" v-model="searchParam.busName" type="text" placeholder="公司名称"></el-input>
				</el-form-item>
		<!--		<el-form-item label="项目状态：" prop="status">
					<el-select class="w190" v-model="searchParam.status" placeholder="请选择" :clearable="true">
						<el-option v-for="item in itemStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>-->
				<el-form-item label="申请日期：">
					<el-date-picker class="w110" v-model="searchParam.startTime" type="date" placeholder="开始时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item class="searchbtn-area">
					<el-button type="primary" @click="searchBtn" class="searchbtn">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table @sort-change="sortHandler" class="list-table ayk-table__pointer" @row-click="rowClick" :data="tableData" v-loading="loading" :default-sort="{}">
				<el-table-column prop="itemName" label="项目名称" align="center"></el-table-column>
				<el-table-column prop="busName" label="公司名称" align="center"></el-table-column>
				<el-table-column prop="total" label="外围总价（元）" align="center"></el-table-column>
				<el-table-column prop="manager" label="项目经理" align="center"></el-table-column>
				<el-table-column prop="status" label="项目状态" align="center" :formatter="fmtItemStatus"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" :formatter="fmtDateCreateTime"></el-table-column>
			</el-table> 
			<el-pagination small @current-change="handleCurrentChange" :current-page="pagination.curPage" :page-size="pagination.pagesize" layout="total,prev,pager,next,jumper" :total="pagination.total"></el-pagination>
		</div>
	</section>
</template>

<script>
	function syncComponent(path) {
		return() =>
			import('@/' + path + '.vue')
	}
	export default {
		name: 'outItemMgt',
		mounted() {
			this.$nextTick(() => {
				this.link2Page(1);
				this.initItemName()
			});
		},
		computed: {
			itemStatus: function() {
				return [{
					value: '1',
					label: '询价中'
				}, {
					value: '2',
					label: '进行中'
				}, {
					value: '3',
					label: '已挂起'
				}, {
					value: '4',
					label: '已终止'
				}, {
					value: '5',
					label: '已结束'
				}, {
					value: '6',
					label: '待事业部总监审核'
				}, {
					value: '7',
					label: '待副总裁审核'
				}, {
					value: '8',
					label: '待总裁审核'
				}]
			}
		},
		data() {
			return {
				names: [{}],
				itemDataSource: null,
				loading: true,
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 1
				},
				searchParam: {
					order: 'desc',
					curPage: 1,
					itemName: '',
					busName: '',
					status: '',
					startTime: '',
				},
				tableData: []
			}
		},
		methods: {
			initItemName(){
			    this.$http.post('/api/item/searchItemNameByOut', {
					emulateJSON: true
				}).then((res) => {
					this.names = res.data.result;
				}).catch((err) => {
					this.loading = false
				})
			},
			link2Page: function(curPage) {
				this.searchParam.curPage = curPage
				this.$http.post('/api/itemOut/searchItemOutByAll', this.searchParam, {
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
			reload: function() {
				this.link2Page(1);
			},
			handleCurrentChange: function(val) {
				this.loading = true
				this.link2Page(val);
			},
			pageChange: function(val) {
				this.loading = true
				this.link2Page(val)
			},
			sortHandler: function(column) {
				this.searchParam.order = column.order.split("ending")[0]
				this.link2Page(1)
			},
			searchBtn: function() {
				this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.reload();
			},
			fmtItemStatus: function(row) {
				let status = row.status;
				if(status == 1) {
					return '总监审批';
				} else if(status == 2) {
					return '采购审批';
				} else if(status == 3) {
					return '邀请外围团队';
				} else if(status == 4) {
					return '外围团队评估';
				} else if(status == 5) {
					return '采购选标';
				} else if(status == 6) {
					return '副总审批';
				} else if(status == 7) {
					return '总经理审批';
				} else if(status == 8) {
					return 'VP以上审批';
				} else if(status == 9) {
					return '填写付款计划';
				} else if(status == 10) {
					return '正常';
				} else if(status == 11) {
					return '挂起';
				}  else if(status == 12) {
					return '中止';
				}   else if(status == 13) {
					return '结项';
				}   else {
					return '未知';
				}
			},
			fmtDateCreateTime: function(row) {
				let createTime = row.createTime;
				let date = new Date(createTime);
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let minute = date.getMinutes();
				let second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			rowClick: function(row, event, column) {
				this.$store.commit('outItemItem', row)
				this.$router.push({ path: `/out/outMgt/details/${row.id}` });
			}
		}
	}
</script>

<style scoped>
	.w190 {
		width: 190px;
	}
	.w110{
		width: 110px;
	}
	.searchbtn-area {
		position: absolute;
		right: 0;
		top: 0;
		margin: 0;
	}
</style>
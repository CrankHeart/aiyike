<!--项目管理-历史项目模块-->
<template>
	<section class="layout-o">
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：项目管理</el-breadcrumb-item>
			<el-breadcrumb-item>历史项目</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="list-wrap">
			<el-form :inline="true" class="hostoryfrom clearfix margin-left8" :model="searchParam" label-width="68px" label-position="left">
				<el-form-item label="项目名称：" class="mb2">
					<el-select v-model="searchParam.name" filterable placeholder="请选择" clearable>
						<el-option v-for="item in names" :key="item.id" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目类型：" class="mb2">
					<el-select v-model="searchParam.category" filterable placeholder="请选择" clearable>
						<el-option v-for="item in projectType" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="searchbtn-area">
					<el-button type="primary" @click="searchBtn" class="searchbtn">搜索</el-button>
				</el-form-item>
				<el-form-item label="客户公司：" class="mb2">
					<el-select v-model="searchParam.company" filterable placeholder="请选择" clearable>
						<el-option v-for="item in customerNames" :key="item.value" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="周期：" class="mb2" label-width="44px">
					<el-form-item class="mr0">
						<el-date-picker style="width: 100%;" type="date" :picker-options="pickerBeginDateBefore" placeholder="选择日期" v-model="searchParam.realStartTime"></el-date-picker>
					</el-form-item>
					<span>-</span>
					<el-form-item>
						<el-date-picker style="width: 100%;" type="date" :picker-options="pickerBeginDateAfter" placeholder="选择日期" v-model="searchParam.realEndTime"></el-date-picker>
					</el-form-item>
				</el-form-item>
			</el-form>
			<el-table v-loading="loading" @row-click="rowclick" :data="tableData" @sort-change="sortHandler" class="historyTable ayk-table__pointer" style="margin-top:22px;width: 100%">
				<el-table-column prop="name" label="项目名称">
				</el-table-column>
				<el-table-column prop="company" label="客户公司">
				</el-table-column>
				<el-table-column prop="category" label="项目类型" :formatter="categoryFormatter">
				</el-table-column>
				<el-table-column prop="profit" label="盈亏" v-if="HasPermission('profit')">
					<template slot-scope="props">
						<span :style="profitStyle(props.row.profit)">{{ profitText(props.row.profit) | moneyformat}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="actualCycle" label="实际周期" width="198px">
					<template slot-scope="props">
						<span>{{props.row.actualCycle}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="manager" label="项目经理" width="100px" align="left">
				</el-table-column>
			</el-table>
			<el-pagination class="mt10" small @current-change="handleCurrentChange" :current-page.sync="pagination.curPage" :page-size="pagination.pageSize" layout="prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
		</div>
	</section>
</template>

<script>
	let vm = null
	export default {
		name: 'HistoryProjectSearch',
		props: {
			authType: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				//搜索结束时间需大于等于开始时间
                pickerBeginDateBefore: {
		            disabledDate(time) { 
	              		return vm.searchParam.realEndTime && vm.searchParam.realEndTime.getTime && (time.getTime() > vm.searchParam.realEndTime.getTime())
		            }
			    },
          		pickerBeginDateAfter: {
		            disabledDate(time) {  
             	 		return vm.searchParam.realStartTime && vm.searchParam.realStartTime.getTime && (time.getTime() < vm.searchParam.realStartTime.getTime())
		            }  
		        },
				searchParam: {
					curPage: 1,
					name: '',
					category: '',
					customerName: '',
					startcycle: new Date().format("yyyy-M-d"),
					endcycle: new Date,
					realEndTime:'',
					realStartTime:''
					
				},
				loading: false,
				restFulUrl: '',
				itemFulUrl: '',
				busFulUrl: '',
				categoryFulUrl: '',
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 1
				},
				tableData: [],
				names: [{}],
				customerNames: [{}],
				projectType: [{
					/*value: '2',
					label: '短期项目'
				}, {
					value: '4',
					label: '售前项目'
				}, {
					value: '5',
					label: '内部研发项目'
				}, {
					value: '1',
					label: '长期项目'
				}, {
					value: '3',
					label: '维护项目'*/
				}]
			}
		},
		watch: {},
		components: {},
		mounted: function() {
			vm = this
			this.itemNameRequestUrl()
			this.busNameRequestUrl()
			this.categoryRequestUrl()
			this.obtainRequestUrl()
			this.link2Page(1)
			this.queryHistoryItem()
		},
		beforeDestroy() {},
		methods: {
			profitStyle(profit) {
				let p = `${profit}`
				
				if (p.indexOf('-') == -1) {
					return {
						//正数
						color: 'green'
					}
				}
				return {
					//负数
					color: 'red'
				}
			},
			profitText(profit) {
				if (Object.isEmpty(profit)) {
					return ''
				}
				let p = `${profit}`
				if (p.indexOf('-') == -1) {
					return '+' + p
				}
				return p
			},
			queryHistoryItem() {
				//项目类型下拉
					this.$http.post(this.categoryFulUrl, {
						emulateJSON: true
					}).then((res) => {
						this.projectType = res.data.result;
					}).catch((err) => {
						this.loading = false
						
					}),
				//项目名称下拉
				    this.$http.post(this.itemFulUrl, {
						emulateJSON: true
					}).then((res) => {
						this.names = res.data.result;
					}).catch((err) => {
						this.loading = false
						
					}),
					//客户名称下拉
					this.$http.post(this.busFulUrl, {
						emulateJSON: true
					}).then((res) => {
						this.customerNames = res.data.result;
					}).catch((err) => {
						this.loading = false
						
					})

			},
			categoryFormatter(row) {
				if(row.category == 2) {
					return "短期项目";
				}
				if(row.category == 4) {
					return "售前项目";
				}
				if(row.category == 5) {
					return "内部研发项目";
				}
				if(row.category == 1) {
					return "长期项目";
				}
				if(row.category == 3) {
					return "维护项目";
				} else {
					return "未知"
				}
			},
			handleCurrentChange(val) {
				this.link2Page(val)
			},
            dealTableData(){
			    let realStartTime,realEndTime
                this.tableData.forEach((item,i)=>{
                    if(!item.realStartTime){
                        item.realStartTime = ''
                        realStartTime = item.realStartTime
                    }else{
                        realStartTime = new Date(item.realStartTime).format("yyyy-M-d")
                    }
                    if(!item.realEndTime){
                        item.realEndTime = ''
                        realEndTime = item.realEndTime
					}else{
                        realEndTime = new Date(item.realEndTime).format("yyyy-M-d")
					}
                    item.actualCycle = realStartTime+'-'+realEndTime

                })
			},
			link2Page(curPage) {
			/*	this.tableData = [{
					name: 'x',
					customerName: 'x',
					category: '1',
					profit: '123456'
				}]*/
				this.loading = true
				this.searchParam.curPage = curPage
				this.$http.post(this.restFulUrl, this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					this.tableData = !!res.data.result.content ? res.data.result.content : []
					this.dealTableData()
					this.pagination.total = res.data.result.total
					this.pagination.pageSize = res.data.result.helper.pageSize
					this.pagination.curPage = res.data.result.helper.curPage
					this.loading = false
				}).catch((err) => {
					this.loading = false
					
				});
			},
			obtainRequestUrl() {
				switch(this.authType)   {
					case 'hisuc':
						this.restFulUrl = "/api/item/HistoryItemOrdinaryByUc"
						break
					case 'hisdepart':
						this.restFulUrl = "/api/item/queryHistoryByDepartIds"
						break
					case 'hisall':
						this.restFulUrl = "/api/item/queryHistoryItem"
						break
					case 'hismgr':
						this.restFulUrl = "/api/item/queryHistoryItemByMgr"
						break
					case 'hisba':
						this.restFulUrl = "/api/item/queryHistoryItemByBa"
						break
					default:
						alert("authType error")
						break
				}
			},
			itemNameRequestUrl() {
				switch(this.authType)   {
					case 'hisuc':
						this.itemFulUrl = "/api/item/searchItemNameByUc"
						break
					case 'hisdepart':
						this.itemFulUrl = "/api/item/searchItemNameByDepart"
						break
					case 'hisall':
						this.itemFulUrl = "/api/item/searchItemNameByAll"
						break
					case 'hismgr':
						this.itemFulUrl = "/api/item/searchItemNameByMgr"
						break
					case 'hisba':
						this.itemFulUrl = "/api/item/searchItemNameByBa"
						break
					default:
						alert("authType error")
						break
				}
			},
			busNameRequestUrl() {
				switch(this.authType)   {
					case 'hisuc':
						this.busFulUrl = "/api/item/searchBusNameByUc"
						break
					case 'hisdepart':
						this.busFulUrl = "/api/item/searchBusNameByDepart"
						break
					case 'hisall':
						this.busFulUrl = "/api/item/searchBusNameByAll"
						break
					case 'hismgr':
						this.busFulUrl = "/api/item/searchBusNameByMgr"
						break
					case 'hisba':
						this.busFulUrl = "/api/item/searchBusNameByBa"
						break
					default:
						alert("authType error")
						break
				}
			},
			categoryRequestUrl() {
				switch(this.authType)   {
					case 'hisuc':
						this.categoryFulUrl = "/api/item/searchCategoryByUc"
						break
					case 'hisdepart':
						this.categoryFulUrl = "/api/item/searchCategoryByDepart"
						break
					case 'hisall':
						this.categoryFulUrl = "/api/item/searchCategoryByAll"
						break
					case 'hismgr':
						this.categoryFulUrl = "/api/item/searchCategoryByMgr"
						break
					case 'hisba':
						this.categoryFulUrl = "/api/item/searchCategoryByBa"
						break
					default:
						alert("authType error")
						break
				}
			},
			sortHandler(column) {
				this.searchParam.order = column.order.split("ending")[0]
				//let field = this.fieldFormatter(column.prop) 格式化字段
				this.link2Page(1);
			},
			reload() {
				this.link2Page(1);
			},
			searchBtn() {
				this.searchParam.realStartTime = (!!this.searchParam.realStartTime) ? new Date(this.searchParam.realStartTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.searchParam.realEndTime = (!!this.searchParam.realEndTime) ? new Date(this.searchParam.realEndTime).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
				this.reload();
			},
			rowclick(row, event, column) {
				let authType = this.authType.replace('his', 'up')
				this.$store.commit('setUnFinishAuthType', authType)
				this.$store.commit('setPjManageUnFinishedItem', row)
                this.$router.push({ path: `/businessaffairs/pj/details/${row.id}-${row.status}` })
			}
		}
	}
</script>

<style scoped>
	.input_text {
		font-size: 12px;
		color: #999999;
	}
	.hostoryfrom {
		position: relative;
		padding-right: 94px;
	}
	
	.searchbtn-area {
		position: absolute;
		right: 0;
		top: 0;
		margin: 0;
	}
	
</style>
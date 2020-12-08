<!--项目管理-历史项目模块-->
<template>
	<section>
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：项目管理</el-breadcrumb-item>
			<el-breadcrumb-item>洽谈中</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="list-wrap">
			<el-form :inline="true" class="newinvitefrom clearfix" :model="searchParam" label-width="62px" label-position="left">
				<el-form-item label="项目名称：" class="mb12">
					<el-autocomplete :trigger-on-focus="false" v-model="searchParam.itemName" :fetch-suggestions="querySearchAsync" placeholder="请选择"></el-autocomplete>
				</el-form-item>
				<el-form-item class="searchbtn-area">
					<el-button type="primary" class="searchbtn" @click="searchBtn">搜索</el-button>
				</el-form-item>
				<el-form-item label="申请日期：" class="mb24">
					<el-date-picker type="date" placeholder="选择日期" v-model="searchParam.startTime"></el-date-picker>
				</el-form-item>
			</el-form>
			<el-table @cell-mouse-enter="cellenter" @row-click="rowclick" :data="tableData" class="historyTable" style="width: 100%">
				<el-table-column prop="itemName" label="项目名称"></el-table-column>
				<!--<el-table-column prop="busName" label="外围名称"></el-table-column>-->
				<!--<el-table-column prop="tAmount" label="外围总价（元）" align="right">
					<template slot-scope="props">
						<span>{{ props.row.tAmount | moneyformat }}</span>
					</template>
				</el-table-column>-->
				<el-table-column prop="bus" label="业务范围" width="320">
					<template slot-scope="props">
						<span class="ayk-listtag" v-if="index < 2" v-for="(item, index) in props.row.labels" :key="index">
						<span>{{item.name}}</span>
						</span>
						<div v-if="props.row.labels.length > 2" class="more" @mouseenter="moreover(props.row.labels)" @mouseleave="moreout($event)">
							<span>...</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="manager" label="艾艺负责人" align="center">
				</el-table-column>
				<!--<el-table-column prop="status" label="项目状态" align="center">
					<template slot-scope="props">
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 0">未中标</span>
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 2">弃标</span>
						<span class="state-text" :class="['type' + props.row.status]" v-if="parseInt(props.row.status) == 3">未中标</span>
					</template>
				</el-table-column>
				-->
					<el-table-column prop="status" label="项目状态" align="center" ></el-table-column>
				<el-table-column prop="date" label="申请日期" :formatter="fmtDateCreateTime" align="center">
				</el-table-column>
			</el-table>
			<el-pagination class="mt10" small @current-change="handleCurrentChange" :current-page.sync="pagination.curPage" :page-size="pagination.pageSize" layout="prev, pager, next, jumper" :total="pagination.total">
			</el-pagination>
			<Tooltip :tipData="tipData" :tipStatus="tipStatus" targetClass="more"></Tooltip>
		</div>
	</section>
</template>

<script>
    let Tooltip = ()=> import('@/components/Tooltip.vue')
	export default {
		name: 'TalksSearch',
		data() {
			return {
				searchParam: {
				name: '',
					startTime: '',
				  },
				 pagination: {
				 total: 0,
				 pagesize: 0,
				 curPage: 1
				  },
                tipData:[],
                tipStatus:false,
                comming:false,
                tipPosition:{},
				row: {},
				moreArea: false,
				tableData: []
			}
		},
		watch: {
   /*         'row.bus':{
                handler(val){
                    if(val.length<3){
                        return;
                    }
                    this.tipData = val
                },
                deep:true
            },*/
            'tipStatus'(val){

            }
		},
		components: {
            Tooltip
		},
		mounted: function() {
			this.$nextTick(()=>{
				this.link2Page(1)
			})
		},
		beforeDestroy() {},
		methods: {
			createTimeFm(row, column, cellValue) {
				return cellValue
			},
			search() {
				this.reload();
			},
			reload() {
				this.link2Page(1);
			},
			handleCurrentChange(val) {
				this.link2Page(val)
			},
			link2Page(curPage) {
				this.loading = true
				this.searchParam.curPage = curPage;
				this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd") : '';
				this.$http.post('/api/ioApply/talksSearch', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					let content = !!res.data.result.content?res.data.result.content:[]
					content.forEach((item, index) => {
						if (Object.isEmpty(item.labels)) {
							item.labels = []
						}
						if (String.isString(item.labels)) {
							item.labels = JSON.parse(item.labels)
						}
					})
					this.tableData = content
					this.pagination.total = res.data.result.total
					this.pagination.pageSize = res.data.result.helper.pageSize
					this.pagination.curPage = res.data.result.helper.curPage
					this.loading = false
				}).catch((err) => {
					this.loading = false
				});
			},
			getScrollTop() {
				var scrollPos;
				if(window.pageYOffset) {
					scrollPos = window.pageYOffset;
				} else if(document.compatMode && document.compatMode != 'BackCompat') {
					scrollPos = document.documentElement.scrollTop;
				} else if(document.body) {
					scrollPos = document.body.scrollTop;
				}
				return scrollPos;
			},
			cellenter(row, column, cell, event) {
				this.row = row
				
			},
			getStyle(obj, attr) {
				return document.defaultView.getComputedStyle(obj, null)[attr]
			},
			moreover(labels) {
				this.tipData = []
				labels.forEach((item, index) => {
					this.tipData.push(item.name)
				})
                this.tipStatus = true
			},
		    moreout(e) {
                this.tipStatus = false
			},
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random())
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.indexOf(queryString.toLowerCase()) === 0)
				}
			},
			searchBtn() {
				this.searchParam.startTime = (!!this.searchParam.startTime) ? new Date(this.searchParam.startTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.reload();
			},
	        fmtDateCreateTime: function(row) {
				let creatTime = row.creatTime || null;
				return new Date(creatTime).format("yyyy-MM-dd");
			},
			rowclick(row, event, column) {
                this.tipStatus = false
			}
		}
	}
</script>

<style scoped>
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
	
	.more-area {
		position: absolute;
		left: 40px;
		min-height: 126px;
		width: 340px;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 2px;
		padding: 20px 20px 10px 20px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.more-area li {
		margin-bottom: 10px;
	}
	
	.more-area li:nth-of-type(3n) {
		margin-right: 0;
	}
	
	.more-area:before {
		position: absolute;
		content: "";
		display: inline-block;
		border-top: 6px solid transparent;
		border-right: 6px solid rgba(0, 0, 0, 0.8);
		border-bottom: 6px solid transparent;
		left: -6px;
		top: 57px;
	}
	
	.more span {
		position: relative;
		top: -2px;
	}
	
	.state-text.type0 {
		font-size: 12px;
		color: #295DCF;
	}
	
	.state-text.type1 {
		font-size: 12px;
		color: #1ABF69;
	}
	
	
	.searchbtn-area {
		float: right;
	}
	
	.mb12 {
		margin-bottom: 2px;
	}
	
	.mb24 {
		margin-bottom: 20px;
	}
	
	.el-date-editor.el-input {
		width: 109px;
	}
</style>
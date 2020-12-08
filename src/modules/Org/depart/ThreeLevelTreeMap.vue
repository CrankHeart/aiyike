<template>
	<section class="wrap">
		<div class="backToPre" @click="backToPre">
			<i class="el-icon-arrow-left"></i>
			<span class="return">返回</span>
		</div>
		<div class="layout-container" ref="pane-o">
			<div class="layout-in" ref="pane-i">
				<section class="layout">
					<el-row :gutter="18" class="user_top">
						<el-col :span="6">
							<div class="user">
								<!--<span>{{sumDepartUc.usum | nullformat}}</span>-->
								<span>{{sumDepartUc.usum | nullformat}}</span>
								<span>总人数(人)</span>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="user">
								<span>{{sumPerformerUc.psum | nullformat}}</span>
								<span>执行人员(人)</span>
							</div>
						</el-col>
			<!--			<el-col :span="6" v-for="(item, index) in stationByDepartData" v-if="index < 2">
							<div class="user">
								<span>{{item.chName}}</span>
								<span>{{item.staName}}</span>
							</div>
						</el-col>-->
					</el-row>
					<el-table :data="tableData" style="width: 100%" v-loading="loading" :default-sort="{}">
						<el-table-column prop="chName" label="姓名" align="center">
						</el-table-column>
						<el-table-column prop="enName" label="英文名" align="center">
						</el-table-column>
						<el-table-column prop="jobNum" label="工号" align="center">
						</el-table-column>
						<el-table-column prop="gender" label="性别" width="70" align="center" :formatter="sexFormatter">
						</el-table-column>
						<el-table-column prop="email" label="电子邮件">
						</el-table-column>
						<el-table-column prop="phone" label="手机号码">
						</el-table-column>
						<el-table-column prop="station" label="岗位">
						</el-table-column>
					<!--	<el-table-column prop="label" label="部门">
						</el-table-column>-->
						<el-table-column prop="status" label="工作状态" width="100" align="center" :formatter="statusFormatter">
						</el-table-column>
					</el-table>
					<el-pagination class="mt10" small @current-change="handleCurrentChange" :current-page.sync="pagination.curPage" :page-size="pagination.pageSize" layout="prev, pager, next, jumper" :total="pagination.total">
					</el-pagination>
				</section>
			</div>
		</div>
	</section>

</template>

<script>
	export default {
		name: 'ThreeLevelTreeMap',
		data() {
			return {
				pdata: null,
				sumPerformerUc: {
					psum: '-'
				},
				sumDepartUc: {	
					usum: '-'
				},
				stationByDepartData: [{}, {}],
				pagination: {
					curPage: 1,
					pageSize: 10,
					total: 100
				},
				loading: false,
				resize: null,
				tableData: [],
				jobStatusArray:[]

			}
		},
		mounted() {
			if (this.$store.getters.org.link1Data == null) {
				this.$router.push('/org/orgMgt/depart')
				return
			}
			this.pdata = this.$store.getters.org.link1Data
			this.computedResize()
			this.link2Page(1)
			this.queryStationByDepart()
			this.querySumPerformerUc()
			
				//初始化工作的状态
			this.$http.post('/api/dictionary/queryDictionary', {
					categoryCode: 'job_status'
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success){
						let result = data.result;
						if(result&&result!=''){
							for(let i in result){
								let value = result[i].value;
								let name = result[i].name;
								this.jobStatusArray[value]=name;
							}
						}
					}
				}).catch((err) => {
					this.loading = false
					
				});
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizefn)
		},
		methods: { 
			statusFormatter(row){
				return this.jobStatusArray[parseInt(row.status)]
				/*switch (parseInt(row.status)){
					case 1:
						return '正常'
						break;
					case 2:
						return '休婚假'
						break;
					case 3:
						return '修产假'
						break;
					case 4:
						return '驻场'
						break;
					default:
						return '未知'
						break;
				}*/
            },
            sexFormatter(row) {
            	switch (parseInt(row.gender)){
					case 1:
						return '男'
						break;
					case 0:
						return '女'
						break;
					default:
						return '未知'
						break;
				}
            },
			queryStationByDepart() {
				this.$http.post('/api/depart/queryStationByDepart', {
					departId: this.pdata.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.stationByDepartData = res.data.result
				}).catch((err) => {
					
				})
			},
			querySumPerformerUc() {
				this.$http.post('/api/depart/sumPerformerUc', {
					departId: this.pdata.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.sumPerformerUc = res.data.result && res.data.result.length && res.data.result[0]
					this.sumPerformerUc = this.sumPerformerUc == null?{}:this.sumPerformerUc
					
				}).catch((err) => {
					
				}),
				this.$http.post('/api/depart/sumDepartUc', {
					departId: this.pdata.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.sumDepartUc = res.data.result && res.data.result.length && res.data.result[0]
					this.sumDepartUc = this.sumDepartUc == null?{}:this.sumDepartUc
					
				}).catch((err) => {
					
				})
			},
			backToPre() {
				this.$router.push('/org/orgMgt/depart')
			},
			handleCurrentChange(val) {
				this.loading = true
				this.link2Page(val)
			},
			link2Page(curPage) {
				this.$http.post('/api/depart/queryUcByDepartId', {
					curPage,
					departId: this.pdata.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.tableData = res.data.result.content
					this.pagination.total = res.data.result.total
					this.pagination.pageSize = res.data.result.helper.pageSize
					this.pagination.curPage = res.data.result.helper.curPage
					this.loading = false
				}).catch((err) => {
					this.loading = false
					this.tableData = []
					
				});
			},
			computedResize() {
				this.paneScrollHandler()
				this.resizefn = () => {
					this.paneScrollHandler()
				}
				window.addEventListener('resize', this.resizefn, true);
			},
			paneScrollHandler() {
				let paneWidth = this.$el?this.$el.clientWidth:0
				this.$refs['pane-o']?this.$refs['pane-o'].style.width = paneWidth + 'px':void 0
				this.$refs['pane-i']?this.$refs['pane-i'].style.width = (paneWidth + 20) + 'px':void 0
			},
			getStyle(obj, attr) {
				return document.defaultView.getComputedStyle(obj, null)[attr]
			}
		}
	}
</script>

<style scoped>
	.mt10 {
		margin-top: 10px;
	}
	
	.wrap {
		height: 100%;
		background: #f8f9fb;
		padding: 0 28px 24px;
		overflow: hidden;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.backToPre {
		font-size: 18px;
		height: 60px;
		line-height: 60px;
		color: #000;
		border-bottom: 1px solid #F1F2F3;
		cursor: pointer;
	}
	
	.layout-container {
		overflow-x: hidden;
		height: 100%;
		margin-top: -41px;
		padding-top: 61px;
		padding-bottom: 20px;
		margin-left: -56px;
		padding-left: 56px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.layout-in {
		overflow-x: hidden;
		overflow-y: scroll;
		height: 100%;
		background: #fff;
	}
	
	.mb24 {
		margin-bottom: 24px;
	}
	
	.layout {
		background: #fff;
		padding: 20px;
		height: 100%;
		padding-right: 78px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.user_top {
		margin-bottom: 20px;
	}
	
	.user_top .user {
		height: 80px;
		background: #F8F9FB;
		text-align: center;
	}
	
	.user_top .user span {
		display: block;
	}
	
	.user_top .user span:nth-child(1) {
		font-size: 20px;
		color: #333333;
		padding-top: 16px;
	}
	
	.user_top .user span:nth-child(2) {
		font-size: 12px;
		color: #CACACA;
	}
	.return{
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
</style>
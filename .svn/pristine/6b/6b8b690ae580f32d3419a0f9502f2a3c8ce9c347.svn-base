<template>
	<section class="layout-o">
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>人事管理 </el-breadcrumb-item>
			<el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户事业体验部</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap">
			<el-row :gutter="18" class="user_top">
				<el-col :span="6">
					<div class="user">
						   <span>{{sumDepartUc.usum}}</span>
							<!--<span>{{sumDepartUc.usum | nullformat}}</span>-->
						<span>总人数(人)</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="user">
						<span>{{sumPerformerUc.psum}}</span>
						<!--<span>{{sumPerformerUc.psum | nullformat}}</span>-->
						<span>执行人员(人)</span>
					</div>
				</el-col>
				<el-col :span="6" v-for="(item, index) in stationByDepartData" v-if="index < 2" :key="index">
					<div class="user">
						<span>{{item.chName | nullformat}}</span>
						<span>{{item.staName | nullformat}}</span>
					</div>
				</el-col>
			</el-row>
			<!--echarts-->
			<div id="twoLevelTreeMapChart"></div>
		</section>
	</section>

</template>

<script>
	let echartsPromise = (() => import('echarts'))()
	let echarts = null

	export default {
		name: 'TwoLevelTreeMap',
		data() {
			return {
				pdata: null,
				twoLevelTreeMapChart: null,
				twoLevelChartData: [],
				twoLevelQueryData: [],
				sumPerformerUc: {
					psum: '-'
				},
				sumDepartUc: {	
					usum: '-'
				},
				stationByDepartData: [{}, {}]
			}
		},
		mounted() {
			this.setPdata()
			this.init()
		},
		methods: {
			init() {
				this.querySumPerformerUc()
				this.queryStationByDepart()
				this.$nextTick(() => {
					const el = document.getElementById('twoLevelTreeMapChart')
					const twoLevelTreeMapChartInterval = setInterval(() => {
						if(el.offsetWidth > 0) {
							echartsPromise.then((ec)=>{
								echarts = ec
								this.queryTwoLevelChart()
								this.bindWindowResize()
							})
							clearInterval(twoLevelTreeMapChartInterval)
						}
					}, 0)
				})
			},
			setPdata(data) {
				this.pdata = !!data ? data : this.$store.getters.org.link1Data
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
			queryTwoLevelChart() {
				this.$http.get('/api/depart/queryTwoDepartNum/' + this.pdata.id, {}, {
					emulateJSON: true
				}).then((res) => {
					this.twoLevelQueryData = res.data.result
					this.sortQueryData()
					this.convert2ChartData()
					this.loadTwoLevelTreeMapChart()
				}).catch((err) => {
					
				})
			},
			sortQueryData() {
				this.twoLevelQueryData.sort(function(a, b) {
					return b.num - a.num
				})
			},
			convert2ColorByArr(i) {
				let index = i % 10
				let opacity = 1 - index * 0.1
				return `rgba(41, 93, 207, ${opacity})`
			},
			convert2ChartData() {
				this.twoLevelChartData = []
				for(let i in this.twoLevelQueryData) {
					let item = this.twoLevelQueryData[i]
					this.twoLevelChartData.push({
						name: `${item.label}\n总人数(人)`,
						value: item.num,
						itemStyle: {
							normal: {
								label: {
									show: true,
									textStyle: {
										color: '#fff',
										fontSize: 40
									}
								},
								color: this.convert2ColorByArr(i),
								borderWidth: 0
							}
						}
					})
				}
			},
			bindWindowResize() {
				let _self = this
				window.addEventListener('resize', function(e) {
					_self.twoLevelTreeMapChart && _self.twoLevelTreeMapChart.resize()
				})
			},
			queryIsLastChild(data) {
				this.$http.get('/api/depart/queryTwoDepartNum/' + data.id, {}, {
					emulateJSON: true
				}).then((res) => {
					let length = res.data.result.length
					if(length) {
						this.setPdata(data)
						this.init()
					} else {
						this.$store.commit('setOrgLink1Data', data)
						this.$emit('replace-module', 'three-level')
					}
				}).catch((err) => {
					
				})
			},
			bindTwoLevelTreeMapClick() {
				let _self = this
				this.twoLevelTreeMapChart.on('click', function(params) {
					let data = _self.twoLevelQueryData[params.dataIndex - 1]
					_self.queryIsLastChild(data)
				});
			},
			loadTwoLevelTreeMapChart() {
				if(!this.twoLevelTreeMapChart) {
					this.twoLevelTreeMapChart = echarts.init(document.getElementById('twoLevelTreeMapChart'))
					this.bindTwoLevelTreeMapClick()
				}
				this.twoLevelTreeMapChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{b}: {c}"
					},
					calculable: false,
					series: [{
						name: '矩形图',
						width: '100%',
						height: '100%',
						nodeClick: false,
						type: 'treemap',
						breadcrumb: {
							show: false
						},
						roam: false,
						itemStyle: {
							normal: {
								borderWidth: 1
							}
						},
						label: {
							normal: {
								show: true,
								formatter: [
									'{val|{c}}',
									'{tip|{b}}'
								].join('\n'),
								rich: {
									val: {
										width: 10,
										fontSize: 48,
										fontFamily: "PingFangSC-Semibold",
										color: '#eee',
										align: 'center',
										height: 60
									},
									tip: {
										fontSize: 18,
										color: '#eee',
										align: 'center'
									}
								}
							}
						},
						data: this.twoLevelChartData
					}]
				})
			}
		}
	}
</script>

<style scoped>
	.mb24 {
		margin-bottom: 24px;
	}
	
	.layout-o {
		width: 100%;
		height: 100%;
	}
	#twoLevelTreeMapChart {
		width: 100%;
		height: 494px;
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
</style>
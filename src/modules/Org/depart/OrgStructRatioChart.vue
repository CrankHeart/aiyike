<!--组织架构树形图 -->
<template>
	<section class="layout-o">
		<div class="org-struct-chart">
			<div class="header">
				<span class="middle text">组织架构专业占比</span>
				<el-date-picker @change="dateHandler" format="yyyy年全年" class="date-select" v-model="date" align="right" type="year" placeholder="选择年">
				</el-date-picker>
			</div>
			<div id="orgStructRatioChart"></div>
		</div>
	</section>
</template>

<script>
	let echartsPromise = (() => import('echarts'))()
	let echarts = null
	import FloatTool from "@/utils/FloatTool.js" 
	
	export default {
		name: 'OrgStructRatioChart',
		props: {},
		data() {
			return {
				orgStructRatioChart: null,
				resizeFlag: false,
				date: new Date,
				orgStructRatioData: {
					orgMajorPercent: null,
					sumPerformerNum: null
				},
				orgStructQueryData: []
			}
		},
		watch: {},
		mounted: function() {
			this.$nextTick(() => {
				this.init()
			})
		},
		methods: {
			init() {
				this.loadChartInit()
			},
			loadChartInit() {
				const el = document.getElementById('orgStructRatioChart')
				const orgStructRatioChartInterval = setInterval(() => {
					if(el.offsetWidth > 0) {
						echartsPromise.then((ec)=>{
							echarts = ec
							this.loadOrgStructRatioData()
							this.bindWindowResize()
						})
						clearInterval(orgStructRatioChartInterval)
					}
				}, 0)
			},
			async querySumPerformerNum(){
				try{
					await new Promise((resolve,reject)=>{
						this.$http.post('/api/depart/sumPerformerNum', {}, {
							emulateJSON: true
						}).then((res) => {
							if (res.data.success) {
								resolve()
								this.orgStructRatioData.sumPerformerNum = res.data.result
							} else {
								reject()
							}
						}).catch((err) => {
							console.log("async querySumBusNum server exception!")
						})
					})
				}catch(e){
					console.log("async querySumBusNum request fails!")
				}
			},
			async queryOrgMajorPercent() {
				try{
					await new Promise((resolve,reject)=>{
						this.$http.post('/api/depart/orgMajorPercent', {
							entryTime: new Date(this.date).format('yyyy-MM-dd hh:mm:ss')
						}, {
							emulateJSON: true
						}).then((res) => {
							if (res.data.success) {
								resolve()
								this.orgStructQueryData = res.data.result
								this.sortQueryData()
								this.convert2ChartData()
							} else {
								reject()
							}
						}).catch((err) => {
							console.log("async querySumBusNum server exception!")
						})
					})
				}catch(e){
					console.log(e,"async querySumBusNum request fails!")
				}
			},
			async loadOrgStructRatioData(){
				await this.querySumPerformerNum()
				await this.queryOrgMajorPercent()
				this.loadorgStructRatioChart()
			},
			switchBtnClick(index) {
				this.displayIndex = index
			},
			chartsResize() {
				this.orgStructRatioChart && this.orgStructRatioChart.resize()
			},
			bindWindowResize() {
				let _self = this
				if (!this.resizeFlag) {
					this.resizeFlag = true
					window.addEventListener('resize', function(e) {
						_self.chartsResize()
					})
				}
				
			},
			sortQueryData() {
				this.orgStructQueryData.sort(function(a, b) {
					return b.num - a.num
				})
			},
			convert2ColorByArr(i) {
				let index = i % 10
				let opacity = 1 - index * 0.1
				return `rgba(41, 93, 207, ${opacity})`
			},
			convert2ChartData() {
				this.orgStructRatioData.orgMajorPercent = []
				for (let i in this.orgStructQueryData) {
					let item = this.orgStructQueryData[i]
					let count = this.orgStructRatioData.sumPerformerNum
					let num = (FloatTool.divide(item.majornum,count)*100).toFixed(0)
					this.orgStructRatioData.orgMajorPercent.push({
						name: `${item.station}\n总人数(人)`,
						value: num,
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
			loadorgStructRatioChart() {
				if (!this.orgStructRatioChart) {
					this.orgStructRatioChart = echarts.init(document.getElementById('orgStructRatioChart'))
				}
				this.orgStructRatioChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{b}: {c}%"
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
						roam : false,
						itemStyle: {
							normal: {
								borderWidth: 1
							}
						},
						label: {
							normal: {
								show: true,
								formatter: [
									'{val|{c}%}',
									'{tip|{b}}'
								].join('\n'),
								rich: {
									val: {
										width: 10,
										fontSize: 48,
										fontFamily: "PingFangSC-Semibold",
										color: '#fff',
										align: 'center',
										height: 60
									},
									tip: {
										fontSize: 18,
										color: '#fff',
										align: 'center'
									}
								}
							}
						},
						data: this.orgStructRatioData.orgMajorPercent
					}]
				})
			},
			dateHandler(val) {
				this.loadOrgStructRatioData()
			},
		}
	}
</script>

<style scoped>
	#orgStructRatioChart {
		width: 100%;
		height: 625px;
	}
	.org-struct-chart {
		background: #fff;
		padding: 0 10px 20px 20px;
	}
	.header {
		height: 68px;
		line-height: 68px;
	}
	
	.header .text {
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.header .el-date-editor {
		float: right;
	}
</style>
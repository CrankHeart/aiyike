<!--组织架构树形图 -->
<template>
	<section class="layout-o">
		<div class="org-struct-chart">
			<div class="header">
				<span class="middle text">项目专业利用率</span>
				<el-date-picker ref="pick" @change="dateHandler" format="yyyy年全年" class="date-select" v-model="date" align="right" type="year" placeholder="选择年">
				</el-date-picker>
			</div>
			<div id="projectUtilRatio"></div>
		</div>
	</section>
</template>

<script>
	let echartsPromise = (() => import('echarts'))()
	let echarts = null
	import FloatTool from "@/utils/FloatTool.js" 
	
	export default {
		name: 'ProjectUtilRatio',
		props: {},
		data() {
			return {
				projectUtilRatio: null,
				resizeFlag: false,
				date: new Date,
				projectUtilRatioData: {
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
				const el = document.getElementById('projectUtilRatio')
				const projectUtilRatioInterval = setInterval(() => {
					if(el.offsetWidth > 0) {
						echartsPromise.then((ec)=>{
							echarts = ec
							this.loadProjectUtilRatioData()
							this.bindWindowResize()
						})
						clearInterval(projectUtilRatioInterval)
					}
				}, 0)
			},
			async querySumLogItemHour(){
				try{
					await new Promise((resolve,reject)=>{
						this.$http.post('/api/depart/sumLogItemHour', {}, {
							emulateJSON: true
						}).then((res) => {
							if (res.data.success) {
								resolve()
								this.projectUtilRatioData.sumPerformerNum = res.data.result
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
			async queryOrgMajorUtilization() {
				try{
					await new Promise((resolve,reject)=>{
						this.$http.post('/api/depart/orgMajorUtilization', {
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
							console.log(err,"async querySumBusNum server exception!")
						})
					})
				}catch(e){
					console.log(e,"async querySumBusNum request fails!")
				}
			},
			async loadProjectUtilRatioData(){
				await this.querySumLogItemHour()
				await this.queryOrgMajorUtilization()
				this.loadprojectUtilRatio()
			},
			switchBtnClick(index) {
				this.displayIndex = index
			},
			bindWindowResize() {
				let _self = this
				if (!this.resizeFlag) {
					this.resizeFlag = true
					window.addEventListener('resize', function(e) {
						_self.projectUtilRatio.resize()
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
				return `rgba(26, 191, 105, ${opacity})`
			},
			convert2ChartData() {
				this.projectUtilRatioData.orgMajorPercent = []
				for (let i in this.orgStructQueryData) {
					let item = this.orgStructQueryData[i]
					let count = this.projectUtilRatioData.sumPerformerNum
					let num = (FloatTool.divide(item.hour,count)*100).toFixed(0)
					this.projectUtilRatioData.orgMajorPercent.push({
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
			loadprojectUtilRatio() {
				if (!this.projectUtilRatio) {
					this.projectUtilRatio = echarts.init(document.getElementById('projectUtilRatio'))
				}
				this.projectUtilRatio.setOption({
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
						data: this.projectUtilRatioData.orgMajorPercent
					}]
				})
			},
			dateHandler(val) {
				this.loadProjectUtilRatioData()
			},
		}
	}
</script>

<style scoped>
	#projectUtilRatio {
		width: 100%;
		height: 625px;
	}
	.org-struct-chart {
		background: #fff;
		padding: 0 20px 20px 10px;
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
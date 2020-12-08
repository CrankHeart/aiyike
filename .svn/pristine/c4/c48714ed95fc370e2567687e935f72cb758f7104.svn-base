<!--组织架构树形图 -->
<template>
	<section class="layout-o">
		<div class="org-struct-chart">
			<div class="header">
				<span class="middle text">组织架构</span>
			</div>
			<div id="orgStructChart"></div>
		</div>
	</section>
</template>

<script>
	import Resize from '@/utils/resize.js'
	let echartsPromise = (() => import('echarts'))()
	let echarts = null
	
	export default {
		name: 'OrgStructChart',
		props: {},
		data() {
			return {
				orgStructChart: null,
				orgStructChartData: [],
				orgStructQueryData: [],
				resizeFlag: false,
				orgStructChartInterval: null
			}
		},
		watch: {},
		mounted: function() {
			this.$nextTick(() => {
				const el = document.getElementById('orgStructChart')
				const orgStructChartInterval = setInterval(() => {
					if(el.offsetWidth > 0) {
						echartsPromise.then((ec)=>{
							echarts = ec
							this.queryOrgStructChart()
						})
						clearInterval(orgStructChartInterval)
					}
				}, 0)
			})
		},
		methods: {
			switchBtnClick(index) {
				this.displayIndex = index
			},
			bindOrgStructChartClick() {
				let _self = this
				let store = this.$store
				this.orgStructChart.on('click', function(params) {
					let link1Data = _self.orgStructQueryData[params.dataIndex - 1]
					store.commit('setOrgLink1Data', link1Data)
					_self.$emit('org-struct-click')
				});
			},
			queryOrgStructChart() {
				this.$http.post('/api/depart/queryTopDepartNum', {}, {
					emulateJSON: true
				}).then((res) => {
					this.orgStructQueryData = res.data.result
					this.sortQueryData()
					this.convert2ChartData()
					this.loadOrgStructChart()
				}).catch((err) => {
					
				})
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
				this.orgStructChartData = []
				for (let i in this.orgStructQueryData) {
					let item = this.orgStructQueryData[i]
					this.orgStructChartData.push({
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
			chartsResize() {
				const _self = this
				const el = document.getElementById('orgStructChart')
				this.orgStructChartInterval = requestAnimationFrame(function req(){
					if (el.offsetWidth > 0) {
						cancelAnimationFrame(_self.orgStructChartInterval)
						_self.orgStructChart && _self.orgStructChart.resize()
					} else {
						_self.orgStructChartInterval = requestAnimationFrame(req)
					}
				})
			},
			loadOrgStructChart() {
				if(!this.orgStructChart) {
					this.orgStructChart = echarts.init(document.getElementById('orgStructChart'))
					Resize.on(document.getElementById('orgStructChart'), ()=>{
						this.chartsResize()
					})
					this.bindOrgStructChartClick()
				}
				this.orgStructChart.setOption({
					// tooltip: {
					// 	trigger: 'item',
					// 	formatter: "{b}: {c}"
					// },
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
						data: this.orgStructChartData
					}]
				})
			},
			dateHandler(val) {
				
			},
		}
	}
</script>

<style scoped>
	#orgStructChart {
		width: 100%;
		height: 800px;
	}
	
	.org-struct-chart {
		background: #fff;
		padding: 0 20px 20px 20px;
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
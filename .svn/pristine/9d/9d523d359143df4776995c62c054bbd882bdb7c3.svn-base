<!--高端定制事业部-->
<template>
	<dl class="layout">
		<dt class="header">
			<div class="tooltip">
				<span class="title">高端定制事业部&nbsp;&nbsp;10%</span>
			</div>
			<div class="dropdown_menu_btn">
				<span class="el-icon-icon-moreunfold"></span>
			</div>
			<div id="custom_allotment">
				
			</div>
		</dt>
		<dd class="content" v-if="false">
		</dd>
	</dl>
</template>

<script>
	let echartsPromise = (() => import('echarts'))()
	let echarts = null

	export default {
		name: 'Custom_Allotment',
		data: function() {
			return {
				bdepart_allotment_chart: null,
				ios_allotment_chart: null,
				ui_allotment_chart: null,
				interactive_allotment_chart: null
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				const el = document.getElementById('custom_allotment')
				const bdepart_allotmentInterval = setInterval(() => {
					if(el.offsetWidth > 0) {
						echartsPromise.then((ec)=>{
							echarts = ec
							this.loadChart()
						})
						clearInterval(bdepart_allotmentInterval)
					}
				}, 0)
			})
		},
		methods: {
			loadChart() {
				this.loadbpart()
			},
			loadbpart() {
				if(!this.bdepart_allotment_chart) {
					this.bdepart_allotment_chart = echarts.init(document.getElementById('custom_allotment'))
				}
				this.bdepart_allotment_chart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'line',
							lineStyle: {
								width: 0
							}
						},
						formatter: function(params) {
							let ret = ''
							for (let i in params) {
								if (params.length-1 != parseInt(i)) {
									ret += params[i].seriesName + ':' + params[i].value + '万' + '，'
								} else {
									ret += params[i].seriesName + ':' + params[i].value + '万'
								}
								 
							}
							return ret
						},
						backgroundColor: 'rgba(0,0,0,1)'
					},
					grid: {
						left: '0%',
						right: '0%',
					},
					xAxis: {
						type: 'value',
						axisLabel: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						splitLine: {
							show: false
						}
					},
					yAxis: {
						type: 'category',
						axisLabel: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						splitLine: {
							show: false
						},
						data: ['周一']
					},
					series: [{
							name: '已使用额度',
							type: 'bar',
							stack: '总量',
							barWidth: '6',
							itemStyle: {
								normal: {
									color: '#295DCF'
								}
							},
							label: {
								normal: {
									show: true,
									position: 'insideBottomRight',
									offset: [15, 20],
									textBorderColor: 'transparent',
									color: '#295DCF',
									formatter: function(obj) {
										return obj.value + '%';
									}
								}
							},
							data: [50]
						},
						{
							name: '总额度',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									color: '#D3DEF4'
								}
							},
							label: {
								normal: {
									show: false,
									position: 'insideBottomRight',
									offset: [15, 20],
									textBorderColor: 'transparent',
									color: '#D3DEF4'
								}
							},
							data: [50]
						}
					]
				})
			}
		}
	}
</script>

<style scoped>
	.layout {
		background: #F8F9FB;
		padding: 10px 20px 0px;
	}
	
	.content {
		position: relative;
		margin-top: 10px;
		padding: 10px 12px 0px 12px;
	}
	
	.line {
		position: absolute;
		top: 0;
		left: -18px;
		right: -18px;
		height: 0px;
		opacity: 0.26;
		border-bottom: 1px solid #D5D5D5;
	}
	
	.header {
		position: relative;
		padding-bottom: 4px;
	}
	
	.header .tooltip {
		position: relative;
	}
	
	.header .tooltip .title {
		font-size: 12px;
		color: #333333;
		font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	/*.header .tooltip .title:before {
		content: "";
		display: inline-block;
		width: 11px;
		height: 11px;
		background: url(../../assets/img/icon-star.png) no-repeat;
		background-size: 100% 100%;
		margin-right: 4px;
	}*/
	
	.dropdown_menu_btn {
		position: absolute;
		width: 22px;
		height: 22px;
		background: #EEF0F3;
		border-radius: 100%;
		text-align: center;
		font-size: 12px;
		cursor: pointer;
		line-height: 26px;
	}
	
	.dropdown_menu_btn .el-icon-icon-moreunfold {
		transform: scale(0.833333);
		color: #000000;
	}
	
	.header .dropdown_menu_btn {
		right: -4px;
		top: 0px;
	}
	
	#custom_allotment {
		height: 40px;
	}
	
	.content .subchart-area {
		margin-bottom: 4px;
		position: relative;
	}
	
	.content .subchart-area:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.content .subchart-area .tooltip {
		position: absolute;
		top: -6px;
	}
	
	.content .subchart-area .tooltip .title {
		font-size: 12px;
		color: #666666;
	}
	
	.content .subchart-area .chart {
		height: 40px;
		margin-top: 8px;
	}
</style>
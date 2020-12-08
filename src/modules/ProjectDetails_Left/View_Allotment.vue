<!--用户体验事业部-->
<template>
	<section class="layout-o">
		<dl class="layout">
			<dt class="header">
				<div class="tooltip">
					<span class="title">{{oneDepart.departName}}&nbsp;&nbsp;{{obtainRatioText(oneDepart,1)}}%</span>
				</div>
				<div class="dropdown_menu_btn" @click="openDown" v-show="twoDepart.length">
					<span class="el-icon-icon-moreunfold" :class="[iconIsShow?'el-icon-icon-less':'']"></span>
				</div>
				<div :id="obtainId('0')" class="bdepart_allotment">
					
				</div>
			</dt>
			<dd class="content" v-show="iconIsShow">
				<div class="line"></div>
				<section class="subchart-area" v-for="(item, index) in twoDepart">
					<div class="tooltip">
						<span class="title">{{item.departName}}&nbsp;&nbsp;{{obtainRatioText(item)}}%</span>
					</div>
					<div :id="obtainId('0' + index)" class="chart">

					</div>
				</section>
			</dd>
		</dl>
	</section>
</template>

<script>
	let echartsPromise = (() =>
		import('echarts'))()
	let echarts = null
	import FloatTool from '@/utils/FloatTool.js'
	export default {
		name: 'View_Allotment',
		props: {
			datasource: {
				type: Object,
				default: function() {
					return {}
				}
			},
			id: {}
		},
		data: function() {
			return {
				state: this.$store.state,
				leftData: {},
				oneDepart: {},
				twoDepart: {},
				iconIsShow: false,
				bdepart_allotment_chart: null,
				ios_allotment_chart: null,
				ui_allotment_chart: null,
				interactive_allotment_chart: null,
				chartCache: {},
				count: 1
			}
		},
		watch: {
			'state.pjDetails.leftData': {
				deep: true,
				handler(val) {
					this.leftData = {...val}
				}
			}
		},
		mounted: function() {
			this.leftData = {...this.$store.getters.pjDetailsLeftData}
			this.obtainDepartChartData()
			this.$nextTick(() => {
				
				const el = document.getElementById(this.obtainId('0'))
				const interval = setInterval(() => {
					if(el.offsetWidth > 0) {
						echartsPromise.then((ec) => {
							echarts = ec
							this.loadChart(this.obtainId('0'), this.oneDepart)
						})
						clearInterval(interval)
					}
				}, 0)
			})
		},
		methods: {
			obtainId(index) {
				return ['allotment', this.id, index].join('')
			},
			obtainRatioText(obj,level) {
				let ret = null
				if (level == 1) {
					ret = (Math.floor((FloatTool.divide(obj.totalTime,this.leftData.totalHours) * 10000)) / 100).toFixed(2)
				} else {
					ret = (FloatTool.divide(obj.totalTime,this.leftData.totalHours) * 100).toFixed(2)
				}
				if (Object.isEmpty(ret)) {
					ret = 0
				}
				return ret
			},
			obtainDepartChartData(){
				this.oneDepart = {...this.datasource}
				this.twoDepart = [...(this.oneDepart.sunDepart || [])]
			},
			openDown() {
				this.iconIsShow = !this.iconIsShow
				if (this.iconIsShow){
					this.loadSubChart()
				}
			},
			loadSubChart(){
				let interArr = []
				for (let i in this.twoDepart) {
					this.$nextTick(() => {
						let el = document.getElementById(this.obtainId('0' + i))
						interArr.push(setInterval(() => {
							if(el.offsetWidth > 0) {
								echartsPromise.then((ec) => {
									echarts = ec
									this.loadChart(this.obtainId('0' + i), this.twoDepart[i])
								})
								clearInterval(interArr[i])
							}
						}, 0))
					})
				}
			},
			loadChart(id, item) {
				if(!this.chartCache[id]) {
					this.chartCache[id] =  echarts.init(document.getElementById(id))
				}
				var getCompleteData = ()=>{
					let ret = (item.completed / this.leftData.totalHours * 100).toFixed(0)
					let sp = `${ret}`.split('.')
					if (sp[1] == 0) {
						ret = sp[0]
					}
					return ret
				}
				var getVerify = ()=>{
					let ret = null
					if(item.verify == 0){
						ret = (item.verify / this.leftData.totalHours * 100).toFixed(0)
					}else{
						ret = ((item.completed + item.verify) / this.leftData.totalHours * 100).toFixed(0)
					}
					let sp = `${ret}`.split('.')
					if (sp[1] == 0) {
						ret = sp[0]
					}
					return ret
				}
				var getUnCompleteData = ()=>{
					let ret = ((item.totalTime - item.completed - item.verify) / this.leftData.totalHours * 100).toFixed(0)
					let sp = `${ret}`.split('.')
					if (sp[1] == 0) {
						ret = sp[0]
					}
					
					return ret
				}
				this.chartCache[id].setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'line',
							lineStyle: {
								width: 0
							}
						},
						formatter: function(params) {
							let cost = item.cost
							let amount = item.amount
							if (Object.isEmpty(item.cost)){
								cost = 0
							}
							if (Object.isEmpty(item.amount)){
								amount = 0
							}
							cost = cost.toFixed(2)
							return `已使用额度：${cost}，总额度：${amount}`
						},
						backgroundColor: 'rgba(0,0,0,1)'
					},
					grid: {
						left: '15',
						right: '15',
					},
					xAxis: {
						type: 'value',
						max: function(value) {
				            return 100
				        },
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
							name: '已完成工时',
							type: 'bar',
							stack: '总量',
							barWidth: '5',
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
										if (Object.isEmpty(obj.value) || obj.value == 0){
											return ''
										} else {
											return obj.value + '%';
										}
									}
								}
							},
							data: [getCompleteData()]
						},
						{
							name: '待审核工时',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									color: '#F5BF3C'
								}
							},
							label: {
								normal: {
									show: true,
									position: 'insideBottomRight',
									offset: [15, 20],
									textBorderColor: 'transparent',
									color: '#F5BF3C',
									formatter: function(obj) {
										if (Object.isEmpty(obj.value) || obj.value == 0){
											return ''
										} else {
											return obj.value + '%';
										}
									}
								}
							},
							data: [getVerify()]
						},
						{
							name: '未完成工时',
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
							data: [getUnCompleteData()]
						}
					]
				})
			},
		}
	}
</script>

<style scoped>
	.layout {
		background: #F8F9FB;
		padding: 10px 20px 10px;
	}
	
	.content {
		position: relative;
		padding: 10px 12px 0px 12px;
	}
	.layout-o {
		margin-top: 14px;
	}
	.layout-o .line {
		margin-bottom: 14px;
		position: relative;
		margin-left: -32px;
		margin-right: -32px;
		height: 1px;
		opacity: 0.26;
		background: #D5D5D5;
		border: none;
	}
	
	.layout-o>.title {
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		margin-bottom: 14px;
		padding-left: 20px;
	}
	
	.header {
		position: relative;
	}
	
	.header .tooltip {
		position: relative;
	}
	
	.header .tooltip .title {
		font-size: 12px;
		color: #333333;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.header .tooltip .title:before {
		content: "";
		display: inline-block;
		width: 11px;
		height: 11px;
		background: url(../../assets/img/icon-star.png) no-repeat;
		background-size: 100% 100%;
		margin-right: 4px;
	}
	
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
	
	.bdepart_allotment {
		height: 40px;
		margin-left: -14px;
		margin-right: -14px;
	}
	
	.content .subchart-area {
		padding-bottom: 4px;
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
		margin-left: -14px;
		margin-right: -14px;
	}
</style>
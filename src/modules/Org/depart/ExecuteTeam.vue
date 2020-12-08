<!--执行团队占比 -->
<template>
	<section class="layout-o">
		<el-breadcrumb separator=">" class="mb24">
		  <el-breadcrumb-item>人事管理 </el-breadcrumb-item>
		  <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="execute-team-chart">
			<div class="header">
				<span class="middle text">部门执行团队占比</span>
			</div>
			<div class="charts-area">
				<div id="executeteamChart"></div>
				<div class="text-area">
					<p class="num">{{executeTeamChartData.sumBusNum | nullformat}}</p>
					<p class="util">总人数</p>
				</div>
			</div>
			<ul class="lenged">
				<li v-for="(item,index) in executeTeamChartData.performDepartNum">
					<span class="tip" :type="item.label"><span :style="makeCircleStyle(index)"></span>{{item.label}}</span>
					<span class="num">{{item.num}}人</span>
					<span class="ratio">{{makeCircleRatio(index)}}%</span>
				</li>
			</ul>
			<div class="btn-area">
				<el-button @click="switchBtnClick(1)" :class="[displayIndex==1?'active':'']" class="struct_btn" type="text">组织架构</el-button>
				<el-button @click="switchBtnClick(3)" :class="[displayIndex==3?'active':'']" class="structlist_btn" type="text">组织架构编辑</el-button>
				<el-button @click="switchBtnClick(2)" :class="[displayIndex==2?'active':'']" class="ratio_btn" type="text">专业利用率</el-button>
			</div>
		</div>
		<OrgStructChart ref="orgStructChart" v-show="displayIndex == 1" @org-struct-click="orgStructClick"></OrgStructChart>
		<el-row class="bg-w" v-show="displayIndex == 2">
		  	<el-col :span="12">
		  		<OrgStructRatioChart></OrgStructRatioChart>
		  	</el-col>
		  	<el-col :span="12">
		  		<ProjectUtilRatio></ProjectUtilRatio>
		  	</el-col>
		</el-row>
		<OrgStructList v-show="displayIndex == 3" ref="OrgStructList"></OrgStructList>
	</section>
</template>

<script>
	let echartsPromise = (() => import('echarts'))()
	let echarts = null
	let OrgStructChart = () => import('@/modules/Org/depart/OrgStructChart.vue')
	let OrgStructList = () => import('@/modules/Org/depart/OrgStructList.vue')
	let OrgStructRatioChart = () => import('@/modules/Org/depart/OrgStructRatioChart.vue')
	let ProjectUtilRatio = () => import('@/modules/Org/depart/ProjectUtilRatio.vue')
	import FloatTool from "@/utils/FloatTool.js" 
	export default {
		name: 'ExecuteTeam',
		props: {},
		data() {
			return {
				displayIndex: 1,
				executeTeamChart: null,
				executeTeamChartData: {
					performDepartNum: null,
					sumBusNum: null
				},
				colors: []
			}
		},
		watch: {},
		components: {
			OrgStructChart,
			OrgStructRatioChart,
			ProjectUtilRatio,
			OrgStructList
		},
		mounted: function() {
			this.$nextTick(() => {
				this.init()
			})
		},
		methods: {
			makeCircleRatio(index) {
				let [num,count] = [this.executeTeamChartData.performDepartNum[index].num,this.executeTeamChartData.sumBusNum]
				return (FloatTool.divide(num,count) * 100).toFixed(0)
			},
			makeCircleStyle(index){
				return {
					background: this.colors[index]
				}
			},
			init() {
				this.loadChartInit()
			},
			async querySumBusNum() {
				try{
					await new Promise((resolve,reject)=>{
						this.$http.post('/api/depart/sumBusNum', {}, {
							emulateJSON: true
						}).then((res) => {
							if (res.data.success) {
								resolve()
								this.executeTeamChartData.sumBusNum = res.data.result
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
			async queryPerformDepartNum(){
				try{
					await new Promise((resolve,reject)=>{
						this.$http.post('/api/depart/queryisPerformDepartNum', {}, {
							emulateJSON: true
						}).then((res) => {
							if (res.data.success) {
								resolve()
								this.executeTeamChartData.performDepartNum = res.data.result
							} else {
								reject()
							}
						}).catch((err) => {
							console.log("async queryPerformDepartNum server exception!")
						})
					})
				}catch(e){
					console.log("async queryPerformDepartNum request fails!")
				}
			},
			async loadExecTeamChartData(){
				await this.querySumBusNum()
				await this.queryPerformDepartNum()
				this.loadExecuteTeamChart()
			},
			loadChartInit() {
				const el = document.getElementById('executeteamChart')
				const executeTeamChartInterval = setInterval(() => {
					if(el.offsetWidth > 0) {
						echartsPromise.then((ec)=>{
							echarts = ec
							this.loadExecTeamChartData()
						})
						clearInterval(executeTeamChartInterval)
					}
				}, 0)
			},
			orgStructClick() {
				this.$emit('replace-module', 'two-level')
			},
			switchBtnStage_1() {
				this.$refs.orgStructChart && this.$refs.orgStructChart.chartsResize()
			},
			switchBtnStage_2() {
			},
			switchBtnStage_3() {
			},
			switchBtnStageExec(index) {
				this[`switchBtnStage_${index}`]()
			},
			switchBtnClick(index) {
				this.displayIndex = index
				this.switchBtnStageExec(index)
			},
			*genColorHex(){
	            let r = Math.floor(Math.random()*256).toString(16),
	                g = Math.floor(Math.random()*256).toString(16),
	                b = Math.floor(Math.random()*256).toString(16),
	                cs = ['#1ABF69','#F5BF3C','#295DCF','#AD47C1','#EE5A5A']
	            for (let i in cs) {
	            	yield cs[i]
	            }
	            while (true){
	            	yield `#${r}${g}${b}`
	            }
			},
			loadExecuteTeamChart() {
				if(!this.executeTeamChart) {
					this.executeTeamChart = echarts.init(document.getElementById('executeteamChart'))
				}
				this.colors = []
				let dataHandler = () => {
					let [g,ret,num,label,data,count] = [this.genColorHex(),[],0,'',this.executeTeamChartData.performDepartNum,this.executeTeamChartData.sumBusNum]
					if (Object.isEmpty(data)) return []
					for (let i in data) {
						num = (FloatTool.divide(data[i].num,count)*100).toFixed(0)
						label = data[i].label
						this.colors.push(g.next().value)
						ret.push({
							value: num,
							name: label,
							itemStyle: {
								normal: {
									color: this.colors[i]
								}
							}
						})
					}
					return ret
				}
				this.executeTeamChart.setOption({
                    tooltip: {
                        show:false,
						trigger:'none'
                    },
					grid: {
						left: '0%',
						right: '0%',
						top: '0%',
						bottom: '0%'
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['80%', '90%'],
						hoverOffset: 4,
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: dataHandler()
					}]
				})
			},
			dateHandler(val) {
				
			},
		}
	}
</script>

<style scoped>
	.mb24{
		margin-bottom: 24px;
	}
	.bg-w{
		background: #FFFFFF;
	}
	.execute-team-chart {
		background: #fff;
		padding: 0px 20px 64px 20px;
		border-bottom: 1px solid #D5D5D5;
		overflow: hidden;
		position: relative;
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
	
	.charts-area {
		width: 150px;
		height: 150px;
		float: left;
		margin-left: 111px;
		position: relative;
	}
	
	.text-area {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		text-align: center;
		height: 60px;
		margin: auto;
		z-index: 1;
	}
	
	.text-area .util {
		font-size: 12px;
		color: #CACACA;
	}
	
	.text-area .num {
		font-size: 32px;
		color: #333333;
	}
	
	#executeteamChart {
		width: 150px;
		height: 150px;
		position: relative;
		z-index: 10;
	}
	
	.lenged {
		margin-left: 332px;
		width: 540px;
		margin-top: 16px;
	}
	
	.lenged li {
		display: inline-block;
		margin-bottom: 24px;
	}
	
	.lenged li:nth-last-of-type(1),
	.lenged li:nth-last-of-type(2) {
		margin-bottom: 0px;
	}
	
	.lenged span {
		display: inline-block;
	}
	
	.lenged li:nth-of-type(2n) {
		margin-left: 20px;
	}
	@media screen and (max-width: 1390px){
		.lenged li:nth-of-type(2n) {
			margin-left: 0px;
		}
		.lenged{
			margin-left: 320px;
		}
	}
	.lenged li:nth-of-type(2n) .tip {
		width: 110px;
	}
	
	.lenged li .tip>span {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		margin-right: 8px;
	}
	.lenged li .tip {
		font-size: 12px;
		color: #333333;
		width: 130px;
	}
	
	.lenged li .num {
		font-size: 14px;
		color: #333333;
		width: 60px;
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.lenged li .ratio {
		font-size: 12px;
		color: #333333;
		width: 60px;
	}
	
	.btn-area {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 28px;
		height: 30px;
		margin: auto;
	}
	
	.struct_btn,
	.ratio_btn,.structlist_btn {
		width: 100px;
		height: 30px;
		background: #F2F2F2;
		border-radius: 2px;
		border: none;
		padding: 0;
		line-height: 1.3;
		color: #666;
		font-size: 12px;
	}
	
	.struct_btn.active,
	.ratio_btn.active,
	.structlist_btn.active {
		background: #295DCF;
		color: #fff;
	}
	
	.ratio_btn,.structlist_btn {
		margin-left: 20px;
	}
</style>
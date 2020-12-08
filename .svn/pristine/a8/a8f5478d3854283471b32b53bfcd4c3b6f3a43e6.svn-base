<!--项目管理-未完结项目详情-左侧模块-->
<template>
	<dl class="layout">
		<dt class="header">
			<div class="state-tag-area">
				<span class="state-tag" :state="projectStatusText"><span>{{projectStatusText}}</span></span>
			</div>
			<div class="title">
				{{leftDetail.name | nullformat}}
			</div>
			<div class="dropdown_menu_btn" @click.stop="opendsc">
				<span class="el-icon-icon-moreunfold" :class="[dscIconIsShow?'el-icon-icon-less':'']"></span>
			</div>
			<div class="line"></div>
		</dt>
		<dd class="content">
			<ProjectDsc :show="dscIconIsShow" :details="leftDetail"></ProjectDsc>
			<ul class="lenged-not-depart" v-if="hasPm2Role('progessChartNotDepartLegend')">
				<li>未完成</li>
				<li>已审核</li>
				<li>待审核</li>
			</ul>
			<ul class="lenged-depart" v-if="hasPm2Role('progessChartDepartLegend')">
				<li>未完成</li>
				<li>已审核</li>
				<li>待审核</li>
				<li>其它部门进度</li>
			</ul>
			<div id="project-details-progess-charts" @mouseenter.stop="mouseover($event)" @mouseleave.stop="mouseout($event)" v-if="HasPermission('progessChartNotDepart') || HasPermission('progessChartDepart')">
			</div>
			<div class="project-projess-text" :style="projessTextStyle" v-if="HasPermission('progessChartNotDepart') || HasPermission('progessChartDepart')">
				<p class="num">{{progressText}}%</p>
				<p class="dsc">项目进度</p>
			</div>
			<div class="project-state" state="审核中" v-if="!chartDataStatus(chartData.status)">
				<template v-if="chartData.status == 1">审核中</template>
				<template v-if="chartData.status == 2">会审中</template>
			</div>
			<div class="chart-dsc clearfix">
				<section class="l" :style="obtainChartDscStyleByLen()" v-if="hasPm2Role('residualCycle')">
					<p class="num">{{chartData.residualCycle | nullformat}}</p>
					<p class="dsc">剩余周期(天)</p>
				</section>
				<section class="l" :style="obtainChartDscStyleByLen()" v-if="hasPm2Role('profitAndLoss')">
					<p class="num">{{profitText | nullformat}}</p>
					<p class="dsc">项目盈亏(元)</p>
				</section>
				<section class="l" :style="obtainChartDscStyleByLen()" v-if="hasPm2Role('surplusTime')">
					<p class="num">{{chartData.surplusTime | nullformat}}</p>
					<p class="dsc">剩余工时(h)</p>
				</section>
				<section class="l" :style="obtainChartDscStyleByLen()" v-if="hasPm2Role('residualMoney')">
					<p class="num">{{chartData.residualMoney | nullformat}}</p>
					<p class="dsc">剩余实施额度(元)</p>
				</section>
			</div>
		</dd>
		<dd>
			<ProgressPopMenu v-if="hasPm2Role('ProgressPopMenu')" :visible="show"></ProgressPopMenu>
			<ProgressPopMenu2 v-if="hasPm2Role('ProgressPopMenu2')" :visible="show"></ProgressPopMenu2>
		</dd>
	</dl>
</template>

<script>
	let echartsPromise = (() => import('echarts'))()
	let echarts = null
	let ProjectDsc = () =>
		import('./ProjectDsc.vue')
	let ProgressPopMenu = () =>
		import('./ProgressPopMenu.vue')
	let ProgressPopMenu2 = () =>
		import('./ProgressPopMenu2.vue')
	import pjdetailsMinxins from '@/mixin/pjdetails.js'
	
	export default {
		mixins: [pjdetailsMinxins],
		name: 'Progress',
		data() {
			return {
				leftDetail: {},
				state: this.$store.state,
				progessChart: null,
				show: false,
				showInter: null,
				dscIconIsShow: false,
				chartData: {}
			};
		},
		components: {
			ProjectDsc,
			ProgressPopMenu,
			ProgressPopMenu2
		},
		watch: {
			'state.pjDetails.leftData': {
				deep: true,
				handler(val) {
					this.chartData = {...val.itemProgressVo}
					this.leftDetail = {...val}
					this.loadProgessRatioChartDec()
				}
			}
		},
		mounted: function() {
			this.chartData = {...this.$store.getters.pjDetailsLeftData.itemProgressVo}
			this.leftDetail = {...this.$store.getters.pjDetailsLeftData}
			this.$nextTick(() => {
               this.loadProgessRatioChartDec()
			})
			this.documentClick()
		},
		computed: {
			projessTextStyle() {
				if (this.hasPm2Role('progessChartNotDepartLegend') || this.hasPm2Role('progessChartDepartLegend')) {
					return {
						'top': '85px'
					}
				} else {
					return {
						'top': '65px'
					}
				}
			},
			profitText() {
				if (Object.isEmpty(this.chartData.profitAndLoss)) {
					return ''
				}
				let p = `${this.chartData.profitAndLoss}`
				if (p.indexOf('-') == -1) {
					return '+' + p
				}
				return p
			},
			progressText(){
				let ret = this.chartData.completed / this.chartData.hour * 100
				ret = +parseFloat(ret).toFixed(0)
				if (Object.isEmpty(ret)){
					ret = 0
				}
				return ret
			},
			obtainChartData() {
				this.chartData = {...this.$store.getters.pjDetailsLeftData.itemProgressVo}
			},
			projectStatusText() {
				let ret = ''
				if (Number.isNaN(parseInt(this.leftDetail.status))) {
					return
				}
				switch (parseInt(this.leftDetail.status)){
					case 1:
						ret = "待PMO审核"
						break;
					case 2:
						ret = "待立项"
						break;
					case 3:
						ret = "驳回"
						break;
					case 4:
						ret = "待PMO审核"
						break;
					case 5:
						ret = "驳回"
						break;
					case 6:
						ret = "待分配部门"
						break;
					case 7:
						ret = "正常"
						break;
					case 8:
						ret = "挂起"
						break;
					case 9:
						ret = "中止"
						break;
					case 10:
						ret = "结项"
						break;
					default:
						alert('projectStatusText unknow status')
						break;
				}
				return ret
			},
		},
		methods: {
			chartDataStatus(text){
				if (Object.isEmpty(text)){
					return true
				}
				if (text == 0) {
					return true
				}
				if (text == '0') {
					return true
				}
				return false
			},
			obtainChartDscStyleByLen() {
				let len = 0
				if (this.HasPermission('residualCycle')){
					len++
				}
				if (this.HasPermission('profitAndLoss')){
					len++
				}
				if (this.HasPermission('surplusTime')){
					len++	
				}
				if (this.HasPermission('residualMoney')){
					len++	
				}
				if (len == 1) {
					return {
						width: '100%'
					}
				}
				return {}
			},
			loadProgessRatioChartDec() {
				let _self = this
				if (!(this.HasPermission('progessChartNotDepart') || this.HasPermission('progessChartDepart'))) {
					return void 0
				}
				const el = document.getElementById('project-details-progess-charts')
                let progesschartsInterval = requestAnimationFrame(function fn(){
                    if(el.offsetWidth > 0) {
                        echartsPromise.then((ec)=>{
                            echarts = ec
                            _self.loadProgessRatioChart()
                        })
                        cancelAnimationFrame(progesschartsInterval)
                    }else{
                        progesschartsInterval = requestAnimationFrame(fn)
                    }
                })
			},
			documentClick() {
				let _self = this
				document.addEventListener('click', function() {
					_self.dscIconIsShow = false
				}, false)
			},
			opendsc() {
				this.dscIconIsShow = !this.dscIconIsShow
			},
			mouseout(e) {
				this.show = false
			},
			mouseover(e) {
				this.show = true
			},
			loadProgessRatioChart() {
				if(!this.progessChart) {
					this.progessChart = echarts.init(document.getElementById('project-details-progess-charts'))
				}
				var getData = () => {
					let ret = [{
								value: this.chartData.completed || 0,
								name: '已审核',
								itemStyle: {
									normal: {
										color: '#295DCF'
									}
								}
							},
							{
								value: this.chartData.verify || 0,
								name: '待审核',
								itemStyle: {
									normal: {
										color: '#f5bf3c'
									}
								}
							},
							{
								value: this.chartData.remainder || 1,
								name: '未完成',
								itemStyle: {
									normal: {
										color: '#D3DEF4'
									}
								}
							}
						]
					if (this.HasPermission('progessChartDepart')) {
						ret.push({
							value: this.chartData.otherDepart || 0,
							name: '其它部门进度',
							itemStyle: {
								normal: {
									color: '#00CED1'
								}
							}
						})
					}
					return ret
				}
				this.progessChart.setOption({
					grid: {
						top: '0%',
						left: '0%',
						right: '0%',
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
						data: getData()
					}]
				})
			}
		}
	}
</script>

<style scoped>
	
	.mt20 {
		margin-top: 20px;
	}
	
	.mt14 {
		margin-top: 14px;
	}
	
	.mb14 {
		margin-bottom: 14px;
	}
	
	.mt10 {
		margin-top: 10px;
	}
	
	.mb10 {
		margin-bottom: 10px;
	}
	
	#project-details-progess-charts {
		width: 128px;
		height: 128px;
		margin: 20px auto 12px auto;
		position: relative;
		z-index: 10;
	}
	
	.state-tag {
		border-radius: 2px;
		font-size: 12px;
		letter-spacing: 0;
		text-align: center;
		padding: 2px 8px;
		display: inline-block;
		line-height: 18px;
	}
	/*.state-tag[state="进行中"] {
		border: 1px solid #1ABF69;
		color: #1ABF69;
	}*/
	/*.state-tag[state="待立项"] {
		background: #F9F9F9;
		color: #295DCF;
	}*/
	.state-tag {
		background: #F9F9F9;
		color: #295DCF;
	}
	.state-tag span {
		transform: scale(0.8333333);
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.dropdown_menu_btn {
		position: absolute;
		width: 22px;
		height: 22px;
		background: #F6F7F9;
		border-radius: 100%;
		text-align: center;
		font-size: 12px;
		cursor: pointer;
		line-height: 24px;
	}
	
	.dropdown_menu_btn .el-icon-icon-moreunfold {
		transform: scale(0.833333);
		color: #000000;
	}
	
	.layout .header .dropdown_menu_btn {
		right: 20px;
		top: 29px;
	}
	
	.layout {
		position: relative;
		background: #fff;
	}
	
	.layout .header {
		position: relative;
		min-height: 85px;
		padding: 20px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.layout .header .line {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0px;
		opacity: 0.26;
		border-bottom: 1px solid #D5D5D5;
	}
	
	.layout .header .title {
		font-size: 16px;
		color: #000000;
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		padding-top: 6px;
	}
	
	.lenged-not-depart li,.lenged-depart li {
		display: inline-block;
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		margin-right: 4px;
	}
	
	.lenged-not-depart li:nth-last-of-type(1),.lenged-depart li:nth-last-of-type(1) {
		margin-right: 0;
	}
	
	.lenged-not-depart li:before,.lenged-depart li:before {
		content: "";
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 100%;
		vertical-align: baseline;
		margin-right: 5PX;
	}
	
	.lenged-not-depart li:nth-child(1):before,.lenged-depart li:nth-child(1):before {
		background: #D3DEF4;
	}
	
	.lenged-not-depart li:nth-child(2):before,.lenged-depart li:nth-child(2):before {
		background: #295DCF;
	}
	
	.lenged-not-depart li:nth-child(3):before,.lenged-depart li:nth-child(3):before {
		background: #F5BF3C;
	}
	.lenged-depart li:nth-child(4):before {
		background: #00CED1;
	}
	.layout .content {
		padding: 10px 20px 20px 20px;
		position: relative;
	}
	
	.layout .content .project-projess-text {
		position: absolute;
		left: 20px;
		text-align: center;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		right: 20px;
		display: block;
		width: auto;
		z-index: 1;
	}
	
	.layout .content .project-projess-text .num {
		font-size: 32px;
		color: #000000;
	}
	
	.layout .content .project-projess-text .dsc {
		font-size: 12px;
		color: #CACACA;
	}
	
	.layout .content .chart-dsc .l {
		width: 50%;
		display: inline-block;
		float: left;
		text-align: center;
	}
	
	.layout .content .chart-dsc .num {
		font-size: 24px;
		color: #333333;
	}
	
	.layout .content .chart-dsc .dsc {
		font-size: 12px;
		color: #CACACA;
	}
	
	.project-state {
		background: #F8F9FB;
		border-radius: 2px;
		width: 64px;
		height: 30px;
		font-size: 12px;
		color: #666666;
		text-align: center;
		margin: 0px auto 14px auto;
		line-height: 30px;
	}
</style>
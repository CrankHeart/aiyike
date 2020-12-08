<!--项目管理-未完结项目详情-左侧模块-->
<template>
	<section class="layout-o">
		<dl class="layout">
			<dt class="header">
				<div class="state-tag-area">
					<span class="state-tag" state="进行中"><span>进行中</span></span>
				</div>
				<div class="title">
					联想SQE项目
				</div>
				<div class="line"></div>
			</dt>
			<dd class="content">
				<div id="already-progess-charts">
	
				</div>
				<div class="project-projess-text">
					<p class="num">80%</p>
					<p class="dsc">项目进度</p>
				</div>
				<div class="chart-dsc clearfix">
					<section class="l">
						<p class="num">80</p>
						<p class="dsc">剩余周期(天)</p>
					</section>
					<section class="l">
						<p class="num">+42251</p>
						<p class="dsc">项目盈亏(元)</p>
					</section>
				</div>
				<div class="line"></div>
				<table>
					<tr>
						<td class="tip">艾艺负责人:</td>
						<td>宿瑞利</td>
					</tr>
					<tr>
						<td class="tip">外围总价:</td>
						<td>15,000元</td>
					</tr>
					<tr>
						<td class="tip">合作方式:</td>
						<td>项目外包</td>
					</tr>
					<tr>
						<td class="tip">截止日期:</td>
						<td>2017-09-30</td>
					</tr>
				</table>
			</dd>
			<dd class="range_dsc">
				<div class="line"></div>
				<div class="title">
					业务范围
				</div>
				<ul class="tag-area">
					<li><span>交互设计</span></li>
					<li><span>UI设计</span></li>
					<li><span>WEB前端开发</span></li>
					<li><span>动画制作</span></li>
					<li><span>.net开发</span></li>
				</ul>
			</dd>
		</dl>
	</section>
</template>

<script>
	let echartsPromise = (() => import('echarts'))()
	let echarts = null
			
	export default {
		name: 'AlreadyCpProjectDsc',
		data() {
			return {
			};
		},
		components: {
		},
		mounted: function() {
			this.$nextTick(() => {
				const el = document.getElementById('already-progess-charts')
				const progesschartsInterval = setInterval(() => {
					if(el.offsetWidth > 0) {
						echartsPromise.then((ec)=>{
							echarts = ec
							this.loadProgessRatioChart()
						})
						clearInterval(progesschartsInterval)
					}
				}, 0)
			})
		},
		methods: {
			loadProgessRatioChart() {
				if(!this.progessChart) {
					this.progessChart = echarts.init(document.getElementById('already-progess-charts'))
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
						data: [{
								value: 335,
								name: '直接访问',
								itemStyle: {
									normal: {
										color: '#295DCF'
									}
								}
							},
							{
								value: 310,
								name: '邮件营销2',
								itemStyle: {
									normal: {
										color: '#D3DEF4'
									}
								}
							}
						]
					}]
				})
			}
		}
	}
</script>

<style scoped>
	#already-progess-charts {
		width: 128px;
		height: 128px;
		margin: 20px auto;
		position: relative;
		z-index: 10;
	}
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
	
	.state-tag {
		border-radius: 2px;
		font-size: 12px;
		letter-spacing: 0;
		text-align: center;
		width: 50px;
		height: 18px;
		display: inline-block;
		line-height: 20px;
	}
	
	.state-tag[state="待投标"] {
		border: 1px solid #F5BF3C;
		color: #F5BF3C;
	}
	.state-tag[state="进行中"] {
		border: 1px solid #00C45E;
		color: #00C45E;
	}
	.state-tag[state="已完结"] {
		border: 1px solid #295DCF;
		color: #295DCF;
	}
	.state-tag span {
		display: inline-block;
		transform: scale(0.8333333);
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.layout {
		position: relative;
		background: #FFFFFF;
	}
	
	.layout .header {
		position: relative;
		height: 85px;
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
	
	.layout .title {
		font-size: 16px;
		color: #000000;
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		padding-top: 6px;
	}
	
	.layout .content {
		padding: 20px;
		position: relative;
	}
	.layout .content .line{
		opacity: 0.26;
		border-bottom: 1px solid #D5D5D5;
		margin-top: 20px;
		margin-bottom: 20px;
		margin-left: -20px;
		margin-right: -20px;
	}
	.layout .content table {
		width: 100%;
	}
	
	.layout .content table td {
		padding-bottom: 9px;
		font-size: 12px;
		color: #999999;
	}
	
	.layout .content table tr:nth-last-of-type(1) td {
		padding-bottom: 0;
	}
	
	.layout .content table .tip {
		width: 74px;
	}
	.range_dsc{
		padding: 0px 20px 14px 20px;
	}
	.range_dsc .line {
		margin-left: -20px;
		margin-right: -20px;
		opacity: 0.26;
		border-bottom: 1px solid #D5D5D5;
	}
	.range_dsc .title{
		padding-top: 18px;
		padding-bottom: 8px;
	}
	.tag-area li{
		display: inline-block;
		width: 90px;
		height: 24px;
		line-height: 24px;
		font-size: 12px;
		color: #666666;
		background: #F8F9FB;
		margin-right: 10px;
		margin-top: 10px;
		text-align: center;
	}
	.tag-area li:nth-of-type(3n) {
		margin-right: 0;
	}
	.tag-area li span{
		display: inline-block;
		transform: scale(0.83333);
	}
	.btn-area{
		padding-top: 200px;
		text-align: center;
	}
	.btn{
		width: 100px;
		height: 30px;
		padding: 0;
		font-size: 12px;
		border-radius: 2px;
		border: none;
	}
	.btn.sure{
		color: #FFFFFF;
		background: #295DCF;
	}
	.btn.cancel{
		color: #666666;
		background: #F2F2F2;
	}
	
	
	
	
	
	.layout .content {
		padding: 10px 20px 20px 20px;
		position: relative;
	}
	
	.layout .content .project-projess-text {
		position: absolute;
		left: 20px;
		text-align: center;
		top: 66px;
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
</style>
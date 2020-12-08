<!--需求变动成本-->
<template>
	<dl class="layout">
		<dt class="header">
			<div class="line"></div>
			<span class="title middle">需求变动成本</span>
			<i class="el-icon-icon-more_light middle" @click="showDetails"></i>
		</dt>
		<dd class="content">
			<el-row :gutter="10">
				<el-col :span="obtainDemandItemStyleByLen()" v-if="hasPm2Role('workTimeDemand')">
					<div class="area">
						<p class="num">{{demandData.itemRequireWordTime | nullformat}}</p>
						<p class="dsc">消耗工时(小时)</p>
					</div>
				</el-col>
				<el-col :span="obtainDemandItemStyleByLen()" v-if="hasPm2Role('costDemand')">
					<div class="area">
						<p class="num">{{demandData.cost | nullformat}}</p>
						<p class="dsc">消耗成本(元)</p>
					</div>
				</el-col>
			</el-row>
			<div class="line"></div>
			<!--需求变更详情-->
			<el-dialog title="需求变更详情" :visible.sync="dialogVisible" class="demand-dialog">
				<table v-for="demand in dataList">
					<tr>
						<td class="tip">主题:</td>
						<td class="text">{{demand.theme | nullformat}}</td>
					</tr>
					<tr>
						<td class="tip">变更时间:</td>
						<td class="text">{{demand.createTime | nullformat}}</td>
					</tr>
					<tr v-if="hasPm2Role('demandDialogMoney')">
						<td class="tip">补充金额:</td>
						<td class="text">{{demand.money | nullformat}}元</td>
					</tr>
					<tr v-if="hasPm2Role('demandDialogTime')">
						<td class="tip">评估工时:</td>
						<td class="text">{{demand.hour | nullformat}}h</td>
					</tr>
					<tr>
						<td class="tip">内容:</td>
						<td class="text">{{demand.description | nullformat}}</td>
					</tr>
				</table>
			</el-dialog>
		</dd>
	</dl>
</template>

<script>
	import pjdetailsMinxins from '@/mixin/pjdetails.js'
	
	export default {
		mixins: [pjdetailsMinxins],
		name: 'Demand_Change',
		props:{
				itemId: {
				type: String,
				default: 0
			}
		},
		data: function() {
			return {
				state: this.$store.state,
				dialogVisible: false,
				dataList:[],
				demandData: {}
			}
		},
		watch: {
			'state.pjDetails.leftData': {
				deep: true,
				handler(val) {
					this.demandData = {...val.itemProgressVo}
				}
			},
			dialogVisible(val) {
				if (val) {
					this.$nextTick(()=>{
						this.queryItemRequires()
					})
				}
			}
		},
		mounted: function() {
			this.demandData = {...this.$store.getters.pjDetailsLeftData.itemProgressVo}
		},
		methods: {
			obtainDemandItemStyleByLen() {
				let len = 0
				if (this.hasPm2Role('workTimeDemand')){
					len++
				}
				if (this.hasPm2Role('costDemand')){
					len++
				}
				if (len == 1) {
					return 24
				}
				return 12
			},
			showDetails() {
				this.dialogVisible = true
			},
			queryItemRequires(){
					this.$http.post('/api/itemRequire/getItemRequireByItemId?itemId='+ parseInt(this.itemId.split('-')[0]), {
					emulateJSON: true
				}).then((res) => {
					let success = res.data.success
					let result=res.data.result
					if(success) {
						this.dataList=res.data.result
					} else {
						this.$message({
							message: res.data.message,
							type: 'info'
						})
					}
				}).catch((err) => {
					this.loading = false;
					
				});
			}
		}
	}
</script>

<style scoped>
	.layout{
		background: #fff;
	}
	.header {
		height: 50px;
		font-size: 14px;
		color: #000000;
		padding-left: 20px;
		padding-right: 20px;
		position: relative;
	}
	
	.el-icon-icon-more_light {
		position: absolute;
		right: 20px;
		top: 18px;
		cursor: pointer;
	}
	
	.content {
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 20px;
		position: relative;
	}
	.line {
		position: absolute;
		bottom: 0;
		left: 0px;
		right: 0px;
		height: 0px;
		opacity: 0.26;
		border-bottom: 1px solid #D5D5D5;
	}
	.header .line{
		position: relative;
		margin-left: -20px;
		margin-right: -20px;
		height: 1px;
		opacity: 0.26;
		background: #D5D5D5;
		border: none;
	}
	.area {
		height: 92px;
		background: #F8F9FB;
		border-radius: 4px;
		text-align: center;
	}
	
	.area .num {
		padding-top: 20px;
		font-size: 24px;
		color: #333333;
	}
	
	.area .dsc {
		font-size: 12px;
		color: #CACACA;
	}
	
	.demand-dialog .tip {
		width: 70px;
	}
	
	.demand-dialog table {
		padding: 16px;
		background: rgba(249, 250, 252, 0.88);
	}
	
	.demand-dialog table td {
		vertical-align: baseline;
		padding-bottom: 8px;
	}
	
	.demand-dialog table tr:nth-last-of-type(1) td {
		padding-bottom: 0;
	}
	
	.demand-dialog table {
		margin-bottom: 12px;
	}
	
	.demand-dialog table:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.demand-dialog table .tip {
		font-size: 12px;
		color: #999999;
	}
	
	.demand-dialog table .text {
		font-size: 12px;
		color: #000000;
	}
	.demand-dialog table{
		width: 100%;
	}
	.header .title{
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
</style>
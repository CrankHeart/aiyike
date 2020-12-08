<!--新邀请-洽谈中-已合作--收款记录模块-->
<template>
	<div class="layout">
		<div class="receipts">
			<dl class="money clearfix">
				<dt>
			    	<div class="area-one">
			    		<p class="text-content">{{totalMoney | moneyformat | nullformat}} <span class="util">元</span></p>
						<p class="text-footer">外围总价</p>
			    	</div>
					<el-row class="area-two">
					  <el-col :span="12" class="col">
					  	<div class="yetpay">
							<p class="text-content">{{receiveMoney | moneyformat | nullformat}} 元</p>
							<p class="text-footer">已付款</p>
					  	</div>
					  </el-col>
					   <el-col :span="12" class="col">
					  	<div class="unpay">
							<p class="text-content">{{waitMoney | moneyformat | nullformat}} 元</p>
							<p class="text-footer">待付款</p>
					  	</div>
					  </el-col>
					</el-row>
			    </dt>
				<dd>
					<el-row :key="oi" v-for="(oitem, oi) in payPlanList">
						<el-col :span="8" class="col" v-for="(iitem, ii) in oitem" :key="ii">
							<div class="text-area">
								<p class="text-header">第{{count2Str(oi, ii) | n2cformat}}笔</p>
								<p class="text-content">{{iitem.payAmount | moneyformat | nullformat}} 元</p>
								<p class="text-footer">{{iitem.payDate | timeStr2Text | nullformat}}</p>
							</div>
						</el-col>
					</el-row>
				</dd>
			</dl>
			<div class="operation_record">
				<p class="title">付款记录</p>
				<div class="operation clearfix" v-for="(item, oindex) in records">
					<div class="operation_time">
						<p class="date">{{item[0]._month}}/{{item[0]._day}}</p>
						<p class="year">{{item[0]._year}}</p>
					</div>
					<div class="operation_con">
						<ul>
							<li v-for="(sitem, inindex) in item">
								<dl class="operdl">
									<dt>{{sitem._hours}}:{{sitem._minute}}</dt>
									<dd>
										<span class="opcon">{{sitem.amount | moneyformat | nullformat}}元</span>
										<p class="remark">备注：{{sitem.remark | nullformat}}</p>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Collection_Record',
		data() {
			return {
				totalMoney: '',
				receiveMoney: '',
				waitMoney: '',
				payPlanList: [],
				records: []
			}
		},
		components: {},
		mounted() {
			this.obtainDataSource()
		},
		methods: {
			count2Str(oi, ii) {
				return oi * 3 + (ii + 1)
			},
			obtainDataSource() {
				let formatPayPlanList = (payPlanList) => {
					let _payPlanList = []
					let _arr = []
					payPlanList.forEach((item, index) => {
						console.log(item, index)
						let m = (index + 1) % 3
						_payPlanList.push(item)
						if (m == 0) {
							_arr.push(_payPlanList)
							_payPlanList = []
						}
					})
					if (_payPlanList.length) {
						_arr.push(_payPlanList)
						_payPlanList = []
					}
					this.payPlanList = _arr
				}
				this.$http.post('/api/ioApply/paymentInfo', {
					ioApplyId: +this.$route.params.id.split('-')[0]
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data,result = data.result
					if(data.success) {
						this.totalMoney = result.totalMoney.toFixed(2)
						this.receiveMoney = result.receiveMoney.toFixed(2)
						this.waitMoney = this.totalMoney - this.receiveMoney
						this.records = this.sortListDataSource(result.paymentList)
						formatPayPlanList(result.payPlanList)
					}
				}).catch((err) => {

				});
			},
			add0ToString(str) {
				if (str < 10 && `${str}`.length == 1) {
					str = '0' + str
				}
				return str
			},
			sortListDataSource(ret) {
				let mapSg = {}
				let mapSort = []
				let mapSortRet = []
				for (let index in ret) {
					let timeObj = new Date(ret[index].ymd)
					let year = timeObj.getFullYear()
					let month = this.add0ToString(timeObj.getMonth() + 1)
					let day = this.add0ToString(timeObj.getDate())
					let hours = this.add0ToString(timeObj.getHours())
					let minute = this.add0ToString(timeObj.getMinutes())
					ret[index]._year = year
					ret[index]._month = month
					ret[index]._day = day
					ret[index]._hours = hours
					ret[index]._minute = minute
					let key = `${year}-${month}-${day}`
					if (!Array.isArray(mapSg[key])) {
						mapSg[key] = []
						mapSort.push(key)
					}
					mapSg[key].push(ret[index])
				}
				mapSort = mapSort.sort(function(a, b) {
					return b - a
				})
				for (let i in mapSort) {
					let key = mapSort[i]
					mapSortRet.push(mapSg[key])
				}
				return mapSortRet
			}
		}
	}
</script>

<style scoped>
	.money dt,
	.money dd {
		display: inline-block;
	}
	
	.money {
		background: #F9FAFC;
		border-radius: 2px;
		padding-top: 40px;
		padding-bottom: 40px;
		margin: 20px auto 20px auto;
	}
	
	.money dd .col {
		border-left: 1px dashed #E0E0E0;
		padding-left: 34px;
	}
	
	.money dt {
		width: 30%;
		float: left;
		text-align: center;
	}
	
	.money dd {
		width: 70%;
		float: left;
	}
	
	.money dd .text-header {
		margin-top: 20px;
		font-size: 12px;
		color: #747474;
		letter-spacing: 0;
	}
	
	.money dd .text-content {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 18px;
		color: #333333;
		letter-spacing: 0;
		margin-top: 10px;
	}
	
	.money dd .text-footer {
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		margin-top: 26px;
		margin-bottom: 20px;
	}
	.money dt .area-one {
		margin-top: 10px;
	}
	.money dt .area-one .text-content {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 32px;
		color: #000000;
		letter-spacing: 0;
		text-align: center;
	}
	
	.money dt .area-one .text-footer {
		font-size: 14px;
		color: #999999;
	}
	
	.money dt .area-one .util {
		font-size: 12px;
		color: #000000;
	}
	.money dt .area-two{
		margin-top: 18px;
	}
	.money dt .area-two .yetpay .text-content{
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 14px;
		color: #1ABF69;
	}
	.money dt .area-two .yetpay .text-footer{
		font-size: 12px;
		color: #999999;
	}
	.money dt .area-two .unpay .text-content{
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 14px;
		color: #EE5A5A;
	}
	.money dt .area-two .unpay .text-footer{
		font-size: 12px;
		color: #999999;
	}
	.money dt .area-two .col:nth-child(1) {
		text-align: right;
	}
	.money dt .area-two .col:nth-child(2) {
		text-align: left;
	}
	.money dt .area-two .yetpay{
		display: inline-block;
    	text-align: center;
    	margin-right: 20px;
	}
	.money dt .area-two .unpay{
		display: inline-block;
    	text-align: center;
    	margin-left: 20px;
	}
	    
	.layout {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.title {
		font-size: 14px;
		color: #333333;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		letter-spacing: 0;
		width: 62px;
		text-align: right;
		margin-bottom: 20px;
	}
	
	.operation_con ul {
		padding-top: 20px;
		padding-bottom: 20px;
		padding-right: 20px;
	}
	
	.operation_record {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.operation_record .operation {
		margin-bottom: 20px;
	}
	
	.operation_record .operation_time {
		width: 56px;
		margin-right: 20px;
		float: left;
	}
	
	.operation_record .operation_con {
		opacity: 0.88;
		background-color: #F8F9FB;
		margin-left: 76px;
	}
	
	.operation_record .operation_time .date {
		font-size: 18px;
		color: #333333;
		letter-spacing: 0;
		text-align: right;
	}
	
	.operation_record .operation_time .year {
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 25px;
		text-align: right;
	}
	
	.operation_record .operdl {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	.operation_record .operdl dt {
		padding-left: 20px;
		margin-right: 20px;
		font-size: 12px;
		color: #333333;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		letter-spacing: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.operation_record .operdl dd {
		font-size: 12px;
		color: #333333;
		letter-spacing: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.operation_record .operation_con ul li {
		margin-bottom: 10px;
	}
	.operation_record .operation_con ul li:nth-last-of-type(1) {
		margin-bottom: 0px;
	}
	.remark {
		font-size: 12px;
		color: #666666;
		margin-top: 2px;
	}
	.opcon {
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
</style>
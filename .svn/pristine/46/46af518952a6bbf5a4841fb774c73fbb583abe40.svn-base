<template>
	<div class="layout">
		<dl class="them-area">
			<dt class="them-area__header">业务范围</dt>
			<dd class="them-area__body tag__body">
				<span class="el-tag ayk-tag" v-for="(item, index) in labels" :key="index">
					<el-tooltip class="item" effect="dark" :content="item.name" placement="top">
						<span>
							<span>{{item.name}}</span>
				</span>
				</el-tooltip>
				</span>
			</dd>
		</dl>
		<dl class="them-area">
			<dt class="them-area__header">基础信息</dt>
			<dd class="them-area__body info__body">
				<el-row>
					<el-col :span="12">
						<table>
							<tr>
								<td class="name">
									<span>公司类型:</span>
								</td>
								<td class="text">
									<span>{{categoryText()}}</span>
								</td>
							</tr>
							<tr>
								<td class="name">
									<span>公司规模:</span>
								</td>
								<td class="text">
									<span>{{scopeText()}}</span>
								</td>
							</tr>
							<tr>
								<td class="name">
									<span>推荐人:</span>
								</td>
								<td class="text">
									<span>{{teamDetails.bus && teamDetails.bus.recommend}}</span>
								</td>
							</tr>
							<tr>
								<td class="name">
									<span>法人代表:</span>
								</td>
								<td class="text">
									<span>{{teamDetails.bus && teamDetails.bus.legalName}}</span>
								</td>
							</tr>
						</table>
					</el-col>
					<el-col :span="12">
						<table>
							<tr>
								<td class="name">
									<span>收款人:</span>
								</td>
								<td class="text">
									<span>{{teamDetails.bank && teamDetails.bank.accountName}}</span>
								</td>
							</tr>
							<tr>
								<td class="name">
									<span>开户账户:</span>
								</td>
								<td class="text">
									<span>{{teamDetails.bank && teamDetails.bank.bankCode}}</span>
								</td>
							</tr>
							<tr>
								<td class="name">
									<span>开户行:</span>
								</td>
								<td class="text">
									<span>{{teamDetails.bank && teamDetails.bank.bankName}}</span>
								</td>
							</tr>
						</table>
					</el-col>
				</el-row>
			</dd>
		</dl>
		<dl class="them-area">
			<dt class="them-area__header">联系人信息</dt>
			<dd class="them-area__body contacts__body">
				<el-row :gutter="20">
					<el-col :span="12" v-for="(item, index) in busContactList" :key="index">
						<div class="ayk-contactscard">
							<div class="ayk-contactscard__left">
								<div class="ayk-contactscard__tx">
									<img src="../../../assets/img/tx2.png" />
								</div>
								<p class="ayk-contactscard__txname">
									{{item.name}}
								</p>
							</div>
							<div class="ayk-contactscard__right">
								<table class="ayk-contactscard__info">
									<tr>
										<td class="name">
											<span>职位:</span>
										</td>
										<td class="text">
											<span>{{item.position}}</span>
										</td>
									</tr>
									<tr>
										<td class="name">
											<span>电话:</span>
										</td>
										<td class="text">
											<span>
												<p>{{item.phone}}</p>
												<!--<p>021-75243522</p>-->
											</span>
										</td>
									</tr>
									<tr>
										<td class="name">
											<span>邮件:</span>
										</td>
										<td class="text">
											<span>{{item.email}}</span>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</el-col>
				</el-row>
			</dd>
		</dl>
	</div>
</template>

<script>
	export default {
		name: 'TeamInfo',
		data() {
			return {
				state: this.$store.state,
				teamDetails: {},
				labels: [],
				busContactList: []
			}
		},
		components: {},
		watch: {
			'state.teamDetails': {
				deep: true,
				handler(val) {
					this.teamDetails = Object.deepClone(val)
					Object.isNotEmpty(this.teamDetails) && this.init()
				}
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				this.teamDetails = Object.deepClone(this.$store.getters.teamDetails)
				Object.isNotEmpty(this.teamDetails) && this.init()
			})
		},
		methods: {
			init() {
				this.labelsHandler()
				this.busContactListHandler()
			},
			labelsHandler() {
				if(Object.isEmpty(this.teamDetails.bus.labels)) {
					this.teamDetails.bus.labels = []
				}
				if(String.isString(this.teamDetails.bus.labels)) {
					this.teamDetails.bus.labels = JSON.parse(this.teamDetails.bus.labels)
				}
				this.labels = this.teamDetails.bus.labels
			},
			busContactListHandler() {
				if(Object.isEmpty(this.teamDetails.busContactList)) {
					this.teamDetails.busContactList = []
				}
				this.busContactList = this.teamDetails.busContactList
			},
			categoryText() {
				let ret = '',
					category = this.teamDetails.bus && this.teamDetails.bus.category
				switch(parseInt(category)) {
					case 1:
						ret = '公司';
						break
					case 2:
						ret = '工作室';
						break
					case 3:
						ret = '个人';
						break
					default:
						ret = '公司';
						break;
				}
				return ret
			},
			scopeText() {
				let ret = '',scope = this.teamDetails.bus && this.teamDetails.bus.scope
				switch(parseInt(scope)) {
					case 1:
						ret = '10人以下';
						break
					case 2:
						ret = '10-50人';
						break
					case 3:
						ret = '50-100人';
						break
					case 4:
						ret = '100-200人';
						break
					case 5:
						ret = '200人以上';
						break
					default:
						ret = '未知';
						break;
				}
				return ret
			}
		}
	}
</script>

<style scoped>
	
	.ayk-contactscard__left {
		width: 100px;
		float: left;
	}
	
	.ayk-contactscard__tx {
		width: 56px;
		height: 56px;
		background: #fff;
		border-radius: 100%;
		overflow: hidden;
		margin: auto;
		margin-top: 3px;
	}
	
	.ayk-contactscard__tx img {
		width: 100%;
		height: 100%;
	}
	
	.ayk-contactscard__txname {
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 12px;
		color: #333333;
		letter-spacing: 0;
		text-align: center;
		margin-top: 10px;
	}
	
	.ayk-contactscard__right {
		margin-left: 100px;
	}
	
	.ayk-contactscard__info {
		/*width: 100%;*/
	}
	
	.ayk-contactscard__info td {
		vertical-align: baseline;
	}
	
	.ayk-contactscard__info td.name {
		font-size: 12px;
		color: #999999;
	}
	
	.ayk-contactscard__info td.text {
		font-size: 12px;
		color: #333333;
	}
	
	.ayk-contactscard__info td.text span {
		margin-left: 8px;
	}
	
	.ayk-contactscard__info td>span {
		margin-bottom: 8px;
		display: block;
	}
	
	.ayk-contactscard__info tr:nth-last-of-type(1) td>span {
		margin-bottom: 0px;
	}
	
	.info__body table {
		/*width: 100%;*/
	}
	
	.info__body table td.name {
		font-size: 12px;
		color: #999999;
	}
	
	.info__body table td.text {
		font-size: 12px;
		color: #333333;
	}
	
	.info__body table td.text span {
		margin-left: 20px;
	}
	
	.info__body table td>span {
		margin-bottom: 8px;
		display: block;
	}
	
	.info__body table tr:nth-last-of-type(1) td>span {
		margin-bottom: 0px;
	}
	
	.layout {
		width: auto;
		padding-top: 24px;
		position: relative;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.them-area {}
	
	.them-area .them-area__header {
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 14px;
		color: #000000;
		border-bottom: 1px solid rgba(213, 213, 213, .26);
		padding-bottom: 8px;
		padding-top: 8px;
	}
	
	.them-area .them-area__body {
		padding-top: 24px;
		padding-bottom: 24px;
	}
	
	.ayk-tag {
		margin-left: 14px;
		margin-right: 14px;
		margin-bottom: 10px;
	}
	
	.them-area .them-area__body.tag__body {
		margin-left: -14px;
		margin-right: -14px;
		padding-bottom: 14px;
	}
	.them-area__body.contacts__body {
		padding-top: 0;
	}
	.ayk-contactscard {
		min-height: 150px;
		background: #F8F9FB;
		border-radius: 4px;
		box-sizing: border-box;
		overflow: hidden;
		padding: 32px 0px;
		margin-top: 24px;
	}
</style>
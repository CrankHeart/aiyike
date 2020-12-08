<template>
	<div class="wrap">
		<h3 class="project-title">{{projectName}}</h3>
		<div class="clearfix">
			<div class="fl project-type">{{projectType | itemType}}</div>
			<div class="project-number">
				<span>项目编号：</span>
				<span>{{projectNumber}}</span>
			</div>
		</div>
		<div class="project-brief">{{projectBrief}}</div>
		<ul class="details-list">
			<li><span class="list-title">客户公司:</span><span>{{projectDetails.customerCompay}}</span></li>
			<li><span class="list-title">所属行业:</span><span>{{projectDetails.industryType|industryType}}</span></li>
			<li><span class="list-title">甲方负责人:</span><span>{{projectDetails.ACharge}}</span></li>
			<li><span class="list-title">联系电话:</span><span>{{projectDetails.phone}}</span></li>
			<li><span class="list-title">联系邮箱:</span><span>{{projectDetails.email}}</span></li>
			<li><span class="list-title">商务经理:</span><span>{{projectDetails.businessManager}}</span></li>
			<li v-if="htnVisible"><span class="list-title">合同编号:</span><span>{{projectDetails.contractNumber}}</span></li>
			<li v-if="psbVisible"><span class="list-title">售前预算:</span><span>{{projectDetails.budget}}元</span></li>
			<li v-if="cqhtjVisible"><span class="list-title">合同金额:</span><span>{{projectDetails.budget}}元</span></li>
			<li v-if="pamVisible"><span class="list-title">项目金额:</span><span>{{projectDetails.budget}}元</span></li>
			<li><span class="list-title">评估工时:</span><span>{{projectDetails.hours}}h</span></li>
			<li><span class="list-title">计划周期:</span><span>{{projectDetails.date1}} - {{projectDetails.date2}}</span></li>
			<li class="clearfix" v-if="crnVisible">
				<span class="fl list-title">支付方式:</span>
				<div class="pay-type-price clearfix">
					<span v-for="(item,index) in projectDetails.price" class="fl">第{{index+1 | n2cformat}}笔({{item.money}}元)&nbsp;&nbsp;;&nbsp;&nbsp;</span>
				</div>
			</li>
		</ul>
		<div class="line">
		</div>
		<ul class="details-list">
			<li><span class="list-title">项目经理:</span><span>{{projectDetails.projectManager}}</span></li>
			<li v-if="craVisible"><span class="list-title">合同金额:</span><span>{{projectDetails.contractAmount}}元</span></li>
			<li><span class="list-title">实施额度:</span><span>{{projectDetails.implementationQuota||0}}元</span></li>
			<li><span class="list-title">资料库:</span><span>{{projectDetails.Database}}</span></li>
		</ul>
		<div class="line">
		</div>
		<div class="quota-allocation-modules">

			<div class="quota-allocation">
				<b>实施额度分配</b>&nbsp;&nbsp;<span>未分配额度</span>&nbsp;&nbsp;<i>{{!!balance?balance:0}}（元）,<span>未分配工时</span>&nbsp;&nbsp;<i>{{available_hours}}h</i></i>
			</div>
			<!--<div class="quota-allocation" v-if="!qavisible">-->
				<!--<span>未分配工时</span>&nbsp;&nbsp;<i>{{available_hours}}h</i>-->
			<!--</div>-->
			<ul>
				<li class="clearfix" v-for="(item ,index) in Bdepartment">
					<span class="fl" style="width: 10%;">{{item.type==2?'担当事业部':'分包事业部'}}:</span>
					<div class="fl" style="width: 90%;">
						<span >{{item.buName}}&nbsp;&nbsp;
							<span>{{item.amount}}元&nbsp;;&nbsp;</span>
							<span>{{item.hour}}h</span>
						</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="project-details-btn clearfix">
			<el-button class="reject-req fr" :plain="true" @click="rejectReq()">驳回</el-button>
			<el-button class="audit-passed fr" type="primary" @click="auditPassed()">审核通过</el-button>
		</div>
		<sure-tip :visible.sync="SureTipVisible" @submit="submitSteps"></sure-tip>
		<rejectDialog :visible.sync="rejectDialogVisible" @rejectCreate="rejectCreate"></rejectDialog>
	</div>
</template>

<script>
    let SureTip = () =>
        import('@/components/PjManagement_UnFinished_Steps/SureTip.vue')
	let rejectDialog = () =>
		import('@/components/PjManagement_UnFinished_Steps/rejectDialog.vue')
    import FC from '@/utils/float-calculate.js'
	export default {
		props: ['stepsData'],
		data() {
			return {
				logInfo: JSON.parse(Cache.local(Config.Login)),
                SureTipVisible:false,
                submitData:{},
				projectName: '',
				projectType: '',
				projectNumber: '',
				projectBrief: '',
				projectDetails: {
					customerCompay: '',
					industryType: '',
					ACharge: '',
					phone: '',
					email: '',
					businessManager: '',
					projectManager: '',
					contractAmount: '',
					contractNumber: '',
                    budget:'',
					Database: '',
					date1: '',
					date2: '',
					hours: '',
					price:{

					},
                    implementationQuota:''
				},
				//事业部
				Bdepartment: [

				],
				BusinessDepartmentValue: '',
				labelPosition: 'left',
				rejectDialogVisible: false, //是否驳回弹框状态
				balance: '',
				available_hours: '',
				content: '同意',
				isPass: 'Y',
				item: {}
			};
		},
		components: {
            SureTip,
			rejectDialog
		},
		mounted: function() {
			this.setDataToView()
		},
		computed: {
            htnVisible(){
                let category = parseInt(this.stepsData.item.category)
                if(category == 2 || category == 1) {
                    return true
                }
                return false
            },
			crnVisible() {
				let category = parseInt(this.stepsData.item.category)
                if (category == 2) {
                    return true
                }
                return false
			},
			craVisible() {
				let category = parseInt(this.stepsData.item.category)
                if (category == 2) {
                    return true
                }
                return false
			},
			qavisible() {	//未分配工时
				let category = parseInt(this.stepsData.item.category)
				if(category == 2||category == 1) {
					return true
				}
				return false
			},
			amountVisible() {		//未分配金额
				let category = parseInt(this.stepsData.item.category)
				if(category == 2 || category == 4) {
					return true
				}
				return false
			},
            cqhtjVisible(){
                let category = parseInt(this.stepsData.item.category)
                if (category == 1) {
                    return true
                }
                return false
            },
            psbVisible(){
                let category = parseInt(this.stepsData.item.category)
                if (category ==4) {
                    return true
                }
                return false
            },
            pamVisible(){
                let category = parseInt(this.stepsData.item.category)
                if (category == 3||category == 5) {
                    return true
                }
                return false
            }
		},
		methods: {
            submitSteps(value){
                if(!!value){
                    this.approval()
                }
            },
			auditPassed() {
				this.item.id = this.stepsData.item.id
				this.submitData = {
					ucId: this.logInfo.uc.id,
					departId: this.stepsData.item.depart_id,
					managerId: this.stepsData.item.manager_id,
					buId: this.stepsData.item.bu_id,
					taskId: this.stepsData.item.taskId,
					content: this.content,
					isPass: this.isPass,
					item: this.item,
					itemDistribute:this.Bdepartment
				}
                this.SureTipVisible = true
			},
            approval(){
                this.$http.post("/api/item/pmoAuth", this.submitData, {
                    emulateJSON: false
                }).then((res) => {
                    let data = res.data;
                    if(data.success) {
                        this.$message({
                            customClass: 'success',
                            message: '项目审核成功',
                            duration:'1000',
                            onClose:()=>{
                                this.$router.push('/businessaffairs/pj')
                            }
                        })
                    } else {
                        this.$message({
                            customClass: 'error',
                            message: '项目审核失败'
                        })
                    }
                }).catch((err) => {

                })
			},
			rejectReq() {
				this.rejectDialogVisible = true;
			},
			formatDate(row) {
				let date = new Date(row);
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			//将指定类型的元素放置数组index为0的位置
			dealItemDistributeList(arr,type){
				if(arr.length==0){
					return [];
				}
				let index=-1;
				for(let i=0;i<arr.length;i++){
					if(arr[i].type==type){
						index=i;
					}
				}
				if(index!=-1){
					let p=arr.splice(index,1)[0];
					arr.unshift(p)
				}
			},
			setDataToView() {
				this.projectName = this.stepsData.item.name
				this.projectType = this.stepsData.item.category
				this.projectNumber = this.stepsData.item.code
				this.projectBrief = this.stepsData.item.description
				this.projectDetails.customerCompay = this.stepsData.item.bus.name
				this.projectDetails.projectManager = this.stepsData.item.manager
				this.projectDetails.industryType = this.stepsData.item.industry
				this.projectDetails.ACharge = !!this.stepsData.item.uc?this.stepsData.item.uc.ch_name:''
				this.projectDetails.contractNumber = this.stepsData.item.contract
				this.projectDetails.email = !!this.stepsData.item.uc?this.stepsData.item.uc.email:''
				this.projectDetails.businessManager = this.stepsData.item.ba_name
				this.projectDetails.phone = !!this.stepsData.item.uc?this.stepsData.item.uc.phone:''
				this.projectDetails.contractAmount = this.stepsData.item.contract_money
				this.projectDetails.hours = this.stepsData.item.hours
                this.projectDetails.budget = this.stepsData.item.budget
				
				this.projectDetails.date1 = this.formatDate(new Date(this.stepsData.item.plan_start_time))
				this.projectDetails.date2 = this.formatDate(new Date(this.stepsData.item.plan_end_time))
                this.projectDetails.price = this.stepsData.item.itemAmountList
				this.projectDetails.Database = this.stepsData.item.url
				this.Bdepartment = this.stepsData.item.itemDistributeList
				this.dealItemDistributeList(this.Bdepartment,2)
				this.balance = FC.sub(this.stepsData.item.balance,this.calculationAmount())
				this.available_hours = FC.sub(this.stepsData.item.available_hours,this.calculationHour())
                this.projectDetails.implementationQuota = this.stepsData.item.money
			},
            calculationAmount(){
                let flags = 0;
                this.Bdepartment.forEach((item,index)=>{
                    flags = FC.add(flags,item['amount'])
                })
                return flags
            },
            calculationHour(){
                let flags = 0;
                this.Bdepartment.forEach((item,index)=>{
                    flags = FC.add(flags,item['hour'])
                })
                return flags
            },
			rejectCreate(reason) {
				//TODO 驳回把分配的总金额
				this.isPass = "N"
				let submitData = {
					taskId: this.stepsData.item.taskId,
					isPass: this.isPass,
					itemId: this.stepsData.item.id,
					reason: reason
				}
				this.$http.post("/api/item/reject", submitData, {
					emulateJSON: false
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '处理成功',
                            duration:'1000',
                            onClose:()=>{
                                this.$router.go(-1)
                            }
						})
					} else {
						this.$message({
							customClass: 'error',
							message: '处理失败'
						})
					}
				}).catch((err) => {
					;
				});
			}
		}
	}
</script>

<style scoped>
	.line {
		height: 1px;
		background: #F0F0EE;
		margin-bottom: 10px;
	}
	
	.wrap {
		background: transparent;
		height: 100%;
		/*width: 100%;*/
		width: 825px;
		margin: 0 auto;
		padding: 20px;
		padding-left: 30px;
		box-sizing: border-box;
	}
	
	.project-title {
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 16px;
		color: #000000;
		letter-spacing: 0;
		margin-bottom: 6.1px;
	}
	
	.project-type {
		padding: 1.7px 6px 1.9px;
		color: #295DCF;
		font-size: 12px;
		opacity: 0.66;
		background: #E9EEF8;
	}
	
	.project-number {
		font-size: 12px;
		color: #333333;
		padding: 1.7px 0 1.9px;
		margin-bottom: 14px;
	}
	
	.project-brief {
		width: 718px;
		font-size: 12px;
		color: #333333;
		line-height: 17px;
		margin-bottom: 14px;
	}
	
	.details-list li {
		margin-bottom: 10px;
	}
	
	.details-list span {
		font-size: 12px;
		color: #333333;
	}
	
	.details-list span.list-title {
		font-size: 12px;
		color: #999999;
		margin-right: 9px;
		display: inline-block;
		width: 64px;
	}
	
	.audit-passed {
		margin-right: 16px;
	}
	
	hr {
		margin-top: 14px;
		margin-bottom: 14px;
	}
	
	.quota-allocation {
		font-size: 12px;
		margin-bottom: 12px;
	}
	
	.quota-allocation b {
		color: #333;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.quota-allocation span {
		color: #3F3F3F;
	}
	
	.quota-allocation i {
		font-style: normal;
		color: #3667D2;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.quota-allocation-modules ul li {
		font-size: 12px;
		color: #000000;
		margin: 8px 0;
	}
	.project-details-btn{
		margin-right: 20px;
	}
</style>
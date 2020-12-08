<template>
	<div class="wrap">
		<h3 class="project-title">{{projectName}}</h3>
		<div class="clearfix">
			<div class="fl project-type" style="margin-bottom: 6.1px;">{{projectDetails.projectType | itemType}}</div>
			<div class="project-number">
				<span>项目编号：</span>
				<span>{{projectNumber}}</span>
			</div>
		</div>
		<div class="project-brief">{{projectBrief}}</div>
		<ul class="details-list">
			<li><span class="list-title">客户公司:</span><span>{{projectDetails.companyName}}</span></li>
			<li><span class="list-title">所属行业:</span><span>{{projectDetails.industryType | industryType}}</span></li>
			<li><span class="list-title">甲方负责人:</span><span>{{projectDetails.ACharge}}</span></li>
			<li><span class="list-title">联系电话:</span><span>{{projectDetails.phone}}</span></li>
			<li><span class="list-title">联系邮箱:</span><span>{{projectDetails.email}}</span></li>
			<li><span class="list-title">商务经理:</span><span>{{projectDetails.businessManager}}</span></li>
			<li v-if="htnVisible"><span class="list-title">合同编号:</span><span>{{projectDetails.contractNumber}}</span></li>
			<li v-if="psbVisible"><span class="list-title">售前预算:</span><span>{{projectDetails.budget}}元</span></li>
			<li v-if="pamVisible"><span class="list-title">项目金额:</span><span>{{projectDetails.budget}}元</span></li>
			<li v-if="cqhtjVisible"><span class="list-title">合同金额:</span><span>{{projectDetails.budget}}元</span></li>
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
			<li><span class="list-title">项目经理:</span><span>{{projectDetails.customerName}}</span></li>
			<!--<li style="display:none"><span class="list-title">项目类型:</span><span>{{projectDetails.projectType | itemType}}</span></li>-->
			<li v-if="craVisible"><span class="list-title">合同金额:</span><span>{{!!projectDetails.contractAmount?projectDetails.contractAmount:'0'}}元</span></li>
			<!--<li style="display:none"><span class="list-title">项目编号:</span><span>{{projectDetails.contactNumber}}</span></li>-->
			<li><span class="list-title">评估工时:</span><span>{{!!projectDetails.hours?projectDetails.hours:'0'}}h</span></li>
			<li><span class="list-title">资料库:</span><span>{{projectDetails.Database}}</span></li>
		</ul>
		<div class="line">
		</div>
		<div class="quota-allocation-modules">
			<ul>
				<li class="clearfix">
					<span class="fl" style="width: 10%; color: #999;">分配部门:</span>
					<div class="fl" style="width: 90%;">
						<span>未分配额度{{(!!Bdepartment.amount?Bdepartment.amount:'0.00')|supplement0}}元,&nbsp;未分配工时{{!!Bdepartment.hours?Bdepartment.hours:'0'}}h</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="line">
		</div>
		<el-form :model="deInformation" ref="deInformation" :label-position="labelPosition" label-width="85px" class="clearfix">
			<div class="business-department clearfix">
				<div v-for="(item,index) in deInformation.businessDepartment" class="businessDepartment-list clearfix">
					<el-form-item class="fl"
								  style="width: 190px"
								  :prop="'businessDepartment.' + index + '.id'"
								  :rules="[
									  { required: true, message: '请选择分配部门', trigger: 'change' }
									]">
						<el-select placeholder="请选择分配部门" v-model="item['id']" v-sicon1 @change="disableOption">
							<el-option
									v-for="item in businessDepartmentSelect"
									:key="item.id"
									:label="item.label"
									:value="item.id"
									:disabled="item.disabled">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="fl"
								  style="width: 190px; margin-left: 10px"
								  :prop="'businessDepartment.' + index + '.amount'"
								  v-if="projectDetails.projectType == 2||projectDetails.projectType == 4"
								  :rules="[
									 {required: true,message: '请输入分配额度',trigger: 'blur'},
									 { pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}(\.\d{2}){1}))$/, message: '额度输入不正确', trigger: 'blur,change' }
									]">
						<el-input placeholder="输入分配额度" class="allocation-amount" style="width: 190px;"
								  v-model="item['amount']"
								  ref="allocationAmount"
								  @change = "realTimeCalculationAmount()">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item class="fl"
								  style="width: 190px; margin-left: 10px"
								  v-else
								  :prop="'businessDepartment.' + index + '.amount'"
								  :rules="[
									 {required: true,message: '请输入分配额度',trigger: 'blur'},
									 { pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}((\.\d{2}){1})?))$/, message: '额度输入不正确', trigger: 'blur,change' }
									]">
						<el-input placeholder="输入分配额度" class="allocation-amount" style="width: 190px;"
								  v-model="item['amount']"
								  ref="allocationAmount"
								  @change = "realTimeCalculationAmount()">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item class="fl"  v-if="category == 2"
								  style="width: 190px; margin-left: 10px"
								  :prop="'businessDepartment.' + index + '.hour'"
								  :rules="[
						     		{required: true,message: '请输入分配工时',trigger: 'blur'},
							  		{ pattern: /^\+?[1-9][0-9]{0,7}$/, message: '工时输入不正确', trigger: 'blur,change' }
								  ]">
						<el-input placeholder="输入预估工时" class="allocation-amount" style="width: 190px;"
								  v-model="item['hour']"
								  ref="allocationHour"
								  @change="realTimeCalculationHour()">
							<template slot="append">h</template>
						</el-input>
					</el-form-item>
					<el-form-item class="fl"  v-if="category != 2"
								  style="width: 190px; margin-left: 10px"
								  :prop="'businessDepartment.' + index + '.hour'"
								  :rules="[
						     		{required: true,message: '请输入分配工时',trigger: 'blur'},
							  		{ pattern: /^\+?\d{0,7}$/, message: '工时输入不正确', trigger: 'blur,change' }
								  ]">
						<el-input placeholder="输入预估工时" class="allocation-amount" style="width: 190px;"
								  v-model="item['hour']"
								  ref="allocationHour"
								  @change="realTimeCalculationHour()">
							<template slot="append">h</template>
						</el-input>
					</el-form-item>
					<span class="delete" v-if="index!=0" @click="deleteDepartment(index)">X</span>
				</div>
				<el-button class="add-business-department" @click="addBussinessDepartment()">+ 添加</el-button>
			</div>
			<div class="project-details-btn clearfix">
				<el-button class="reject-req cancelbtn fr" :plain="true" @click="cancel()">取消</el-button>
				<el-button class="audit-passed submitbtn fr" type="primary" @click="auditPassed('deInformation')">提交</el-button>
			</div>
		</el-form>
		<sure-tip :visible.sync="SureTipVisible" @submit="submitSteps" :currStepsTip="currStepsTip"></sure-tip>
	</div>
</template>

<script>
	let DepartmentDialogTree = () =>
		import('@/components/DepartmentDialogTree.vue')
    let SureTip = () =>
        import('@/components/PjManagement_UnFinished_Steps/SureTip.vue')
    import FC from '@/utils/float-calculate.js'
	export default {
		props: ['stepsData'],
		data() {
			return {
				logInfo: JSON.parse(Cache.local(Config.Login)),
                SureTipVisible:false,
                submitData:{},
                currStepsTip:'提交后',
				projectName: '',
				projectNumber: '',
				projectBrief: '',
				projectDetails: {
                    companyName:'',
					customerName: '',
					industryType: '',
					ACharge: '',
					contactNumber: '',
                    phone:'',
					email: '',
                    budget:'',
					businessManager: '',
					projectManager: '',
					projectType: '',
					contractAmount: '',
					contractNumber: '',
					Database: '',
                    hours: '',
                    price:{}
				},
				businessDepartmentSelect: [{},{}],
				proxySelectData:[],
				deInformation:{
                    businessDepartment: [{
                        "id": '',
                        "label": '',
                        "amount": '',
                        "hour": ''
                    }]
				},
				//事业部
				Bdepartment: [],
				businessDepartmentNumber: 0,
				BusinessDepartmentValue: '',
				projectManagerValue: '',
				labelPosition: 'left',
				isedit: false,
				getOkData: {},
				departmentDialogVisible: false,
				rejectDialogVisible: false,
				departmentIndex: 0,
				item:{},
				content: '同意',
				isPass: 'Y',
                initAmount:'',
                initHour:'',
                _isWait:false,
                category:parseInt(this.stepsData.item.category)
			};
		},
		components: {
            SureTip,
			DepartmentDialogTree
		},
		mounted: function() {
			this.dealData();
			this.queryCurUserDepart();
		},
		watch: {},
		computed:{
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
            craVisible(){
                let category = parseInt(this.stepsData.item.category)
                if (category == 2) {
                    return true
                }
                return false
            },
            allcAmountVisible(){
                let category = parseInt(this.stepsData.item.category)
                if(category == 2 || category ==4) {
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
            cqhtjVisible(){
                let category = parseInt(this.stepsData.item.category)
                if (category == 1) {
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
            showPrice(status){
                if(this._isWait){
                    return
                }
                this._isWait = true
                if(this.Bdepartment.amount<0){
                    this.$message({
                        customClass: 'error',
                        message: '分配额度总和大于未分配额度',
                        onClose:()=>{
                            this._isWait = false
                        }
                    })
                    return false
                }

                if(this.Bdepartment.hours<0){
                    this.$message({
                        customClass: 'error',
                        message: '分配工时总和大于总工时',
                        onClose:()=>{
                            this._isWait = false
                        }
                    })
                    return false
                }
                this._isWait = false
                return true
            },
            //实时计算未分配额度的值
            realTimeCalculationAmount(){
                let amount = 0
                this.$refs.allocationAmount.forEach((item)=>{
                    item.$refs.input.addEventListener('keyup',this.throttle(()=>{
                        amount = this.calculationAmount()
                        let sub = FC.sub(this.initAmount, amount)
                        if(sub < 0){
                            this.Bdepartment.amount = sub
                            return
                        }
                        this.Bdepartment.amount = sub
                    },200))
                })
            },
            //实时计算工时
            realTimeCalculationHour(){
                let hours = 0
                this.$refs.allocationHour.forEach((item)=>{
                    item.$refs.input.addEventListener('keyup',this.throttle(()=>{
                        hours = this.calculationHour('hour')
                        let sub = FC.sub(this.initHour, hours)
                        if(sub < 0){
                            this.Bdepartment.hours = sub
                            return
                        }
                        this.Bdepartment.hours = sub
                    },200))
                })
            },
            calculationAmount(){
                let flags = 0;
                this.deInformation.businessDepartment.forEach((item,index)=>{
                    flags = FC.add(flags,item['amount'])
                })
                return flags
            },
            calculationHour(){
                let flags = 0;
                this.deInformation.businessDepartment.forEach((item,index)=>{
                    flags = FC.add(flags,item['hour'])
                })
                return flags
            },
			auditPassed(formName) {

                let category = parseInt(this.stepsData.item.category)
				this.item.id=this.stepsData.item.id
                this.submitData = {
					ucId:this.logInfo.uc.id,
				    item:this.item,
				    depart:this.deInformation.businessDepartment,
				    taskId:this.stepsData.item.taskId,
				    content:this.content,
				    isPass:this.isPass,
				    budepartment:this.Bdepartment
				}
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let isDoing = this.showPrice(category)
                        if(!isDoing){
                            return
                        }
                        this.SureTipVisible = true

                    } else {
                        return false
                    }
                })
			},
            submitSteps(value){
                if(!!value){
                    this.submitForm(this.submitData)
                }
            },
			submitForm(submitData){
                this.$http.post("/api/item/distributeDepart", submitData, {
                    emulateJSON: false
                }).then((res) => {
                    let data = res.data;
                    if(data.success) {
                        this.$message({
                        	customClass: 'success',
                            message: '分配部门成功',
                            duration:'1000',
                            onClose:()=>{
                                this.$router.go(-1)
                            }
                        })
                    } else {
                        this.$message({
                        	customClass: 'error',
                            message: data.message,
                            duration:'1000'
                        })
                    }
                }).catch((err) => {

                });
			},
			cancel() {
                this.$router.go(-1)
			},
			//点击添加事业部
			addBussinessDepartment() {
				this.deInformation.businessDepartment.push({
					"id": '',
					"label": '',
					"amount": '',
					"hour": ''
				});
			},
            deleteDepartment(index){
                this.deInformation.businessDepartment.splice(index,1)
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
			dealData() {
				this.projectName = this.stepsData.item.name
				this.projectNumber = this.stepsData.item.code
				this.projectBrief = this.stepsData.item.description
				this.projectDetails.projectType = this.stepsData.item.category
                this.projectDetails.companyName = this.stepsData.item.bus.name
				this.projectDetails.customerName = this.stepsData.item.manager
				this.projectDetails.industryType = this.stepsData.item.industry
				this.projectDetails.ACharge = !!this.stepsData.item.uc?this.stepsData.item.uc.ch_name:''
				this.projectDetails.contactNumber = this.stepsData.item.code
                this.projectDetails.phone = !!this.stepsData.item.uc?this.stepsData.item.uc.phone:''
				this.projectDetails.email = !!this.stepsData.item.uc?this.stepsData.item.uc.email:''
				this.projectDetails.businessManager = this.stepsData.item.ba_name
				this.projectDetails.contractNumber = this.stepsData.item.contract
				this.projectDetails.contractAmount = this.stepsData.item.contract_money
                this.projectDetails.budget = this.stepsData.item.budget
				this.projectDetails.date1 = this.formatDate(new Date(this.stepsData.item.plan_start_time))
				this.projectDetails.date2 = this.formatDate(new Date(this.stepsData.item.plan_end_time))
				this.projectDetails.Database = this.stepsData.item.url
                this.projectDetails.hours = this.stepsData.item.hours
				this.Bdepartment = this.stepsData.item.itemDistribute
                this.projectDetails.price = this.stepsData.item.itemAmountList


                this.initHour = this.Bdepartment.hours			//初始化保存未分配总工时
                this.initAmount = this.Bdepartment.amount			//初始化保存未分配总工时

			},
			queryCurUserDepart(){
				this.$http.post('/api/depart/queryCurUserDepart', null, {emulateJSON: true})
					.then((res) => {
						let data = res.data;
						if(data.success) {
							this.dealIdToString(data.result)
							// this.businessDepartmentSelect=data.result
						}
					}).catch((err) => {
						
					})
			},
            dealIdToString(data){
                this.proxySelectData = data.map(function (v,i) {
                    v.id = JSON.stringify(v.id)
					return v
                })
                this.businessDepartmentSelect = JSON.parse(JSON.stringify(this.proxySelectData))

            },
            disableOption(val){
				let _self = this
                let protectProxySelectData = JSON.parse(JSON.stringify(this.proxySelectData))			//拷贝份数据
                let data = protectProxySelectData.map(function(v,i){				//遍历判断businessDepartment的id如果有与数据中id相等的，对应加上disabled：true
                    _self.deInformation.businessDepartment.forEach(function (item,j) {
                        if(v.id == item.id){
                            v.disabled = true
						}
                    })
					return v
				})
                this.businessDepartmentSelect = data
            },
            throttle(fn,interval){
                var _self = this,	// 保存需要被延迟执行的函数引用
                    timer;			// 定时器
                return function(){
                    var args = arguments,
                        _me =  this;
                    if(timer){			//如果定时器还在，说明前一次的延迟执行还没有完成
                        return false;
                    }
                    timer = setTimeout(function(){		// 延迟一段时间执行
                        clearTimeout(timer);
                        timer = null;
                        fn.apply(_me,args);
                    },interval||500)
                }
            }
		}

	}
</script>

<style scoped>
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
	.line {
		height: 1px;
		background: #F0F0EE;
		margin-bottom: 10px;
	}
	
	.project-title {
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
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
	
	.quota-allocation {
		font-size: 12px;
		margin-bottom: 12px;
	}
	
	.quota-allocation b {
		color: #333;
		font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.quota-allocation span {
		color: #3F3F3F;
	}
	
	.quota-allocation i {
		font-style: normal;
		color: #3667D2;
		font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.quota-allocation-modules ul li {
		font-size: 12px;
		color: #000000;
		margin: 8px 0;
	}
	
	.businessDepartment-list {
		margin-bottom: 12px;
	}
	
	.allocation-amount {
		margin-right: 18px;
	}
	
	.project-details-btn {
		margin-top: 20px;
		margin-right: 20px;
	}
	.add-business-department{
		display: block;
	}
	.delete{
		display: inline-block;
		margin-top: 2px;
		margin-left: 20px;
		color: #D0D0D0;
		cursor: pointer;
	}
</style>
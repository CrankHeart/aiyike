<template>
	<div class="wrap">
		<h3 class="project-title">{{projectName}}</h3>
		<div class="clearfix">
			<div class="fl project-type" style="margin-bottom: 6.1px;">{{projectType | itemType}}</div>
			<div class="project-number">
				<span>项目编号：</span>
				<span>{{basicInfor.projectNumber}}</span>
			</div>
		</div>
		<div class="project-brief">{{projectBrief}}</div>
		<ul class="details-list">
			<li><span class="list-title">客户公司:</span><span>{{projectDetails.customerName}}</span></li>
			<li><span class="list-title">所属行业:</span><span>{{projectDetails.industryType|industryType}}</span></li>
			<li><span class="list-title">商务经理:</span><span>{{projectDetails.businessManager}}</span></li>
			<li><span class="list-title">甲方负责人:</span><span>{{projectDetails.ACharge}}</span></li>
			<li><span class="list-title">联系电话:</span><span>{{projectDetails.contactNumber}}</span></li>
			<li><span class="list-title">联系邮箱:</span><span>{{projectDetails.email}}</span></li>
			<li v-if="htnVisible"><span class="list-title">合同编号:</span><span>{{projectDetails.contractNumber}}</span></li>
			<!--<li v-if="codeVisible" ><span class="list-title">合同金额:</span><span>{{projectDetails.contractAmount}}</span></li>-->
			<li><span class="list-title">评估工时:</span><span>{{projectDetails.hours}}h</span></li>
			<!--<li v-if="psbVisible"><span class="list-title">售前预算:</span><span>{{projectDetails.budget}}元</span></li>-->
			<!--<li v-if="pamVisible"><span class="list-title">项目金额:</span><span>{{projectDetails.budget}}元</span></li>-->
			<!--<li v-if="cqhtjVisible"><span class="list-title">合同金额:</span><span>{{projectDetails.budget}}元</span></li>-->
			<li><span class="list-title">计划周期:</span><span>{{projectDetails.date1}} - {{projectDetails.date2}}</span></li>
			<li class="clearfix" v-if="crnVisible" style="display:none">
				<span class="fl list-title">支付方式:</span>
				<div class="pay-type-price clearfix">
					<span v-for="(item,index) in projectDetails.price" class="fl">第{{index+1 | n2cformat}}笔({{item.money}}元)&nbsp;&nbsp;;&nbsp;&nbsp;</span>
				</div>
			</li>
		</ul>
		<div class="line"></div>
		<div class="project-allocation">基本信息</div>
		<el-form :model="basicInfor" ref="basicInfor" :label-position="labelPosition" label-width="85px" class="clearfix">
			<div class="implementation-quota">
				<span class="infor-list-title">实施额度:</span>
				<span style="font-size: 12px;">{{basicInfor.implementationQuota||0}}元</span>
			</div>
			<el-form-item label="资料库："
						  prop="Database"
						  :rules="[
							  {required: true,message: '请输入资料库',trigger: 'blur'},
							  { pattern: /(^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$)|(^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$)/, message: '请输入正确的网址', trigger: 'blur,change' }
							]">
				<el-input placeholder="请输入资料库"
						  v-model="basicInfor.Database"
						  style="width: 458px;"></el-input>
			</el-form-item>
			<div class="quota-allocation">
				<b>实施额度分配</b>&nbsp;&nbsp;&nbsp;<span>未分配额度</span>&nbsp;&nbsp;<i>{{((basicInfor.ImplementationQuotaAllocation-calAmount)||'0.00')|supplement0 }}（元）,<span>未分配工时</span>&nbsp;&nbsp;<i>{{(basicInfor.available_hours-calHours)||0}} h</i></i>
				<!--<span class="infor-list-title">实施额度分配 :</span>-->
				<!--<span style="font-size: 12px;">未分配额度{{basicInfor.ImplementationQuotaAllocation||0}}元</span>-->
			</div>
			<div class="business-department clearfix">
				<span class="infor-list-title fl" style="padding-top: 4px;">担当事业部:</span>
				<div v-for="(item,index) in basicInfor.businessDepartment" class="businessDepartment-list clearfix" :gutter="20">
					<el-form-item class="fl" style="width: 190px">
						<el-input :disabled='index==0?true:false' placeholder="请选择分包事业部" v-model="item['buName']" @focus="setDepartment(item['buName'],index)"></el-input>
					</el-form-item>
					<el-form-item class="fl" style="width: 190px; margin-left: 10px"
						  :prop="'businessDepartment.' + index + '.amount'"
								  v-if="projectType == 2||projectType == 4"
						  :rules="[
						     {required: true,message: '请输入分配金额',trigger: 'blur'},
							  { pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}(\.\d{2}){1}))$/, message: '金额输入不正确', trigger: 'blur' }
							]">
						<el-input
								placeholder="请输入分配额度"
								class="allocation-amount" style="width: 190px;" v-model="item['amount']"
								ref="allocationAmount"
								@change = "realTimeCalculationAmount()"
								></el-input>
						<span class="danwei" style="left: 168px;">元</span>
					</el-form-item>
					<el-form-item class="fl" style="width: 190px; margin-left: 10px"
								  v-else
								  :prop="'businessDepartment.' + index + '.amount'"
								  :rules="[
						     {required: true,message: '请输入分配金额',trigger: 'blur'},
							  { pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}((\.\d{2}){1})?))$/, message: '金额输入不正确', trigger: 'blur' }
							]">
						<el-input
								placeholder="请输入分配额度"
								class="allocation-amount" style="width: 190px;" v-model="item['amount']"
								ref="allocationAmount"
								@change = "realTimeCalculationAmount()"
						></el-input>
						<span class="danwei" style="left: 168px;">元</span>
					</el-form-item>
					<el-form-item class="fl" style="width: 190px; margin-left: 10px" v-if="category == 2"
								  :prop="'businessDepartment.' + index + '.hour'"
								  :rules="[
						     		{required: true,message: '请输入分配工时',trigger: 'blur'},
							  		{ pattern:/^\+?[1-9][0-9]{0,7}$/, message: '工时输入不正确', trigger: 'blur'}
								  ]">
						<el-input placeholder="请输入分配工时" class="allocation-hour" ref="allocationHour" style="width: 190px;" v-model="item['hour']" @change="realTimeCalculationHour()"></el-input>
						<span class="danwei" style="left: 168px;">h</span>
					</el-form-item>
					<el-form-item class="fl" style="width: 190px; margin-left: 10px" v-if="category != 2"
								  :prop="'businessDepartment.' + index + '.hour'"
								  :rules="[
						     		{required: true,message: '请输入分配工时',trigger: 'blur'},
							  		{ pattern: /^\+?\d{0,7}$/, message: '工时输入不正确', trigger: 'blur' }
								  ]">
						<el-input placeholder="请输入分配工时" class="allocation-hour" ref="allocationHour" style="width: 190px;" v-model="item['hour']" @change="realTimeCalculationHour()"></el-input>
						<span class="danwei" style="left: 168px;">h</span>
					</el-form-item>
					<span class="delete" v-if="index!=0" @click="deleteDepartment(index)">X</span>
				</div>
				<el-button class="add-business-department" @click="addBussinessDepartment()"><span>+ 添加分包事业部</span></el-button>
			</div>
		</el-form>

		<div class="project-details-btn clearfix">
			<el-button class="reject-req cancelbtn fr" :plain="true" @click="rejectReq()">取消</el-button>
			<el-button class="audit-passed submitbtn fr" type="primary" @click="submitPassed('basicInfor')">提交</el-button>
		</div>
		<sure-tip :visible.sync="SureTipVisible" @submit="submitSteps"></sure-tip>
		<rejectDialog :visible.sync="rejectDialogVisible"></rejectDialog>
		<department-dialog-tree :visible.sync="departmentDialogVisible" :isedit='isedit' @ok="getOk"></department-dialog-tree>
	</div>
</template>

<script>
    let SureTip = () =>
        import('@/components/PjManagement_UnFinished_Steps/SureTip.vue')
	let rejectDialog = () =>
		import('@/components/PjManagement_UnFinished_Steps/rejectDialog.vue')
	let DepartmentDialogTree = () =>
		import('@/components/DepartmentDialogTree.vue')
    import FC from '@/utils/float-calculate.js'
	export default {
		props: ['stepsData'],
		data() {
			return {
                SureTipVisible:false,
                submitData:{},
				depart: [],
				item: {},
				logInfo: JSON.parse(Cache.local(Config.Login)),
				projectName: '',
				projectType: '',
				projectNumber: '',
				projectBrief: '',
                hpattern:'/^\\+?[1-9][0-9]{0,7}$/',
				projectDetails: {
					customerName: '',
					industryType: '',
					ACharge: '',
					contactNumber: '',
					email: '',
					businessManager: '',
					contractNumber: '',
					contractAmount: '',
                    budget:'',
					date1: '',
					date2: '',
					hours: '',
                    price: {

                    }
				},
				labelPosition: 'left',
				//基本信息
				basicInfor: {
                    available_hours: '',
					implementationQuota: '',
					externalCauses: '',
					Database: '', //资料库
					ImplementationQuotaAllocation: '', //实施额度分配
                    //担当事业部
                    businessDepartment: [{
                        amount: '',
                        id: '',
                        buName: '',
                        hour: ''
                    }]
				},

				businessDepartmentNumber: 0,
				getOkData: {},
				isedit: false,
				departmentDialogVisible: false,
				departmentIndex: 0,
				rejectDialogVisible: false, //是否驳回弹框状态
				content: '同意',
				isPass: 'Y',
                initAmount:'',
				initHour:'',
				_isWait:false,
                category:parseInt(this.stepsData.item.category),
                calAmount:0,
                calHours:0
			};
		},
		components: {
            SureTip,
			rejectDialog,
			DepartmentDialogTree
		},
		mounted() {
			this.getQuto()
			this.dealData()
			if(this.stepsData.item.is_pass == 0) {
				this.getReApplyInfo();
			}
			this.getCalculation();
			// this.setHourPattern()
		},
		watch: {},
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
				if(category == 2) {
					return true
				}
				return false
			},
			implqVisible() {
				let category = parseInt(this.stepsData.item.category)
                if(category == 2) {
                    return true
                }
                return false
			},
			implqaVisible() {
				let category = parseInt(this.stepsData.item.category)
                if(category == 2 || category == 4) {
                    return true
                }
                return false
			},
			allcAmountVisible() {
				let category = parseInt(this.stepsData.item.category)
                if(category == 2 || category == 4) {
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
            },codeVisible(){
            	let roleList = JSON.parse(localStorage.LOGIN_KEY).roleList
            	if(!roleList||roleList.length<=0){
            		return false;
            	}
            	for(let i in roleList){
            		if("director" == roleList[i].code){
            			return true;
            		}
            	}
            	return false
            }
		},
		methods: {
			getCalculation(){
				let itemList = this.stepsData.item.itemDistributeList;
				for(let i=0;i<itemList.length;i++){
					this.calAmount += Number(itemList[i].amount);
					this.calHours += Number(itemList[i].hour);			
				}
			},
		    //设置工时的正则
            setHourPattern(){
                let category = parseInt(this.stepsData.item.category)
				if(category!=2){
                    this.$set(this.$data,'hpattern','/^\\+?\\d{0,7}$/')
				}
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
			dealData() {
				this.projectName = this.stepsData.item.name
				this.projectType = this.stepsData.item.category
				this.basicInfor.projectNumber = this.stepsData.item.code
				this.projectBrief = this.stepsData.item.description
				this.projectDetails.customerName = this.stepsData.item.bus.name
				this.projectDetails.industryType = this.stepsData.item.industry
				this.projectDetails.ACharge = !!this.stepsData.item.uc?this.stepsData.item.uc.ch_name:''
				this.projectDetails.contactNumber = !!this.stepsData.item.uc?this.stepsData.item.uc.phone:''
                this.projectDetails.contractAmount = this.stepsData.item.contract_money
                this.projectDetails.hours = this.stepsData.item.hours
				this.projectDetails.email = !!this.stepsData.item.uc?this.stepsData.item.uc.email:''
				this.projectDetails.businessManager = this.stepsData.item.ba_name
				this.projectDetails.contractNumber = this.stepsData.item.contract
				this.projectDetails.hours = JSON.stringify(this.stepsData.item.hours)
                this.projectDetails.budget = this.stepsData.item.budget
				this.projectDetails.date1 = this.formatDate(new Date(this.stepsData.item.plan_start_time))
				this.projectDetails.date2 = this.formatDate(new Date(this.stepsData.item.plan_end_time))
                this.projectDetails.price = this.stepsData.item.itemAmountList
				//todo
                this.basicInfor.businessDepartment[0].amount = JSON.stringify(this.stepsData.item.amount)
				this.basicInfor.businessDepartment[0].id = this.stepsData.item.bu_id
				this.basicInfor.businessDepartment[0].buName = this.stepsData.item.buName
                this.basicInfor.available_hours = this.stepsData.item.available_hours
                // this.basicInfor.implementationQuota = this.stepsData.item.money
				
                this.dealItemDistributeList(this.stepsData.item.itemDistributeList,2)
				
				this.initHour = this.basicInfor.available_hours			//初始化保存未分配总工时
			},
			//判断部门不能重复
            judgeDepartment(){
                let res =[]
                let json = {}
                let item  = this.basicInfor.businessDepartment
                for(let i=0,l=this.basicInfor.businessDepartment.length;i<l;i++){
                    if(!json[item[i]['id']]){
                        res.push(item[i]['id'])
                        json[item[i]['id']] = 1
                    }else{
                        //如果有重复的
                        this.$message({
                        	customClass: 'error',
                            message: '所选部门重复',
                            duration:'2000'
                        })
                        return false
                    }
                }
                return true
			},
            showPrice(status){
                if(this._isWait){
                    return
                }
                this._isWait = true
                if(this.basicInfor.ImplementationQuotaAllocation<0){
                    this.$message({
                    	customClass: 'error',
                        message: '分配额度总和大于未分配额度',
                        onClose:()=>{
                            this._isWait = false
						}
                    })
                    return false
                }

                if(this.basicInfor.available_hours<0){
                    this.$message({
                    	customClass: 'error',
                        message: '分配工时总和大于总工时',
                        onClose:()=>{
                            this._isWait = false
                        }
                    })
                    this._isWait = false
					return false
				}
				return true
			},
			//实时计算未分配额度的值
            realTimeCalculationAmount(){
            	this.$nextTick(() => {
            		let amount = 0
	                const fn = (item)=>{
	                	return () => {
	                		amount = this.calculationAmount()
							if(Number.isNaN(amount)||item.$refs.input.value==''){
		                        this.basicInfor.ImplementationQuotaAllocation = Number(this.initAmount) + Number(this.calAmount)
		                        return
							}
							let sub = FC.sub(this.initAmount, amount)
		                    if(sub < 0){
		                        this.basicInfor.ImplementationQuotaAllocation = sub + this.calAmount
		                        return
		                    }
		                    this.basicInfor.ImplementationQuotaAllocation = sub + this.calAmount
	                	}
	                }
	                this.$refs.allocationAmount.forEach((item)=>{
	                	fn(item)()
	                    item.$refs.input.addEventListener('keyup',this.throttle(fn(item),200))
					})
            	})
			},
			//实时计算工时
            realTimeCalculationHour(){
            	this.$nextTick(() => {
            		let hours = 0
	                const fn = ()=>{
	                	return () => {
	                		hours = this.calculationHour('hour')
		                    if(Number.isNaN(hours)){
		                        return
		                    }
		                    let sub = FC.sub(this.initHour, hours)
		                    if(sub < 0){
		                        this.basicInfor.available_hours = sub + this.calHours
		                        return
		                    }
		                    this.basicInfor.available_hours = sub + this.calHours
	                	}
	                }
	                this.$refs.allocationHour.forEach((item)=>{
	                	fn(item)()
	                    item.$refs.input.addEventListener('keyup',this.throttle(fn(item),200))
	                })
            	})
            },
            calculationAmount(){
                let flags = 0;
                this.basicInfor.businessDepartment.forEach((item,index)=>{
                    flags = FC.add(flags,item['amount'])
                })
                return flags
            },
            calculationHour(){
                let flags = 0;
                this.basicInfor.businessDepartment.forEach((item,index)=>{
                    flags = FC.add(flags,item['hour'])
                })
                return flags
            },
            submitSteps(value){
                if(!!value){
                    this.approval(this.submitData)
                }
            },
			//点击提交
			submitPassed(formName) {
				this.submitData = {
					itemId: this.stepsData.item.id,
					url: this.basicInfor.Database,
					ucId: this.logInfo.uc.id,
					departId: this.logInfo.uc.departId,
					taskId: this.stepsData.item.taskId,
					isPass: this.isPass,
					depart: this.basicInfor.businessDepartment
				}
				if(!!(this.stepsData.item)) {
					if(this.stepsData.item.is_pass == 0) {
                        this.submitData.isEdit = "edit"
					}
				}
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        //筛选重复部门
                        let reDepart = this.judgeDepartment()
                        if(!reDepart){
                            return
                        }
                        let category = parseInt(this.stepsData.item.category)
                        let isDoing = this.showPrice(category)
                        if(!isDoing){
                            return
                        }
                        this.SureTipVisible = true
					}else{
                        return false
					}
				})
			},
			//驳回
			rejectReq() {
                this.$router.go(-1)
				// this.rejectDialogVisible = true
			},
			//点击添加当担事业部
			addBussinessDepartment() {
				this.basicInfor.businessDepartment.push({
                    "amount": '',
					"id": '',
					"buName": '',
					"hour": ''
				});
			},
            deleteDepartment(index){
                if(this.stepsData.item.is_pass!=0 || !this.stepsData.item.itemDistributeList[index].departId){		//添加状态或者无id状态 直接删除不请求
                    this.basicInfor.businessDepartment.splice(index,1)
                    this.calcAmountHour()
				} else {
					//编辑状态
	                let submitDeleteData = {
						itemId:this.stepsData.item.id,
	                    departId:this.stepsData.item.itemDistributeList[index].departId,
						id:this.stepsData.item.itemDistributeList[index].id
					}
	                this.$http.post("/api/item/delDistributeDepart", submitDeleteData, {
	                    emulateJSON: true
	                })
	                    .then((res) => {
	                        let data = res.data;
	                        if(data.success) {
	                            this.basicInfor.businessDepartment.splice(index,1)
	                            this.calcAmountHour()
	                        }
	                    }).catch((err) => {
	                    
	                });
				}
			},
			calcAmountHour() {
				this.realTimeCalculationAmount()
				this.realTimeCalculationHour()
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
			getQuto: function() {
				var amount
				if(this.stepsData.item.category!=2){
					amount=parseFloat(this.stepsData.item.budget)
				}else if(this.stepsData.item.category==2){
					amount=parseFloat(this.stepsData.item.contract_money);
				}
				this.$http.post("/api/item/getQuota?amount=" +amount, null, {emulateJSON: true})
					.then((res) => {
						let data = res.data;
						if(data.success) {
							let result = data.result;
							this.basicInfor.ImplementationQuotaAllocation = result.quoto
                            this.basicInfor.implementationQuota = result.quoto
                            this.initAmount = this.basicInfor.ImplementationQuotaAllocation	//初始化时得到未分配额度，方便实时计算
						}
					}).catch((err) => {
						
					});
			},
			getOk(val) {
				this.getOkData.label = val.label
				this.getOkData.id = val.id
				this.basicInfor.businessDepartment[this.departmentIndex]['buName'] = this.getOkData.label
				this.basicInfor.businessDepartment[this.departmentIndex]['id'] = this.getOkData.id

			},
			setDepartment(val, index) {
				this.departmentIndex = index;
				if(val) {
					this.isedit = true
				} else {
					this.isedit = false
				}
				this.departmentDialogVisible = true
			},
			getReApplyInfo: function(val) {
				this.basicInfor.Database = !!this.stepsData ? this.stepsData.item.url : void 0
				this.stepsData.item.itemDistributeList = this.stepsData.item.itemDistributeList.map(function(item,index){
					item.amount = item.amount.toString()
					item.hour = item.hour.toString()
					return item
				})
				this.basicInfor.businessDepartment = !!this.stepsData ? this.stepsData.item.itemDistributeList : void 0
			},
			approval: function(submitData) {
				this.$http.post("/api/item/approval", submitData, {
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
					} else{
						this.$message({
							customClass: 'error',
							message:data.message
						})
					}
				}).catch((err) => {
					
				});
			},
            throttle(fn,interval){
                var _self = this,	// 保存需要被延迟执行的函数引用
                    timer			// 定时器
                return function(){
                    var args = arguments,
                        _me =  this
                    if(timer){			//如果定时器还在，说明前一次的延迟执行还没有完成
						// console.log(2222)
                        return false
                    }
                    // console.log('XXXXXXXXXXXXXXX')
                    timer = setTimeout(function(){		// 延迟一段时间执行
                        clearTimeout(timer)
                        timer = null
                        fn.apply(_me,args)
                    },interval||500)
                }
            }
		}
	}
</script>

<style scoped>
	.line {
		height: 1px;
		background: #F0F0EE;
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
		/*overflow-y: scroll;*/
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
		margin-right: 12px;
	}
	
	.project-number {
		font-size: 12px;
		color: #333333;
		padding: 1.7px 0 1.9px;
		margin-bottom: 14px;
	}
	
	.project-brief {
		width: 718px;
		font-family: "PingFangSC-Regular","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 12px;
		color: #333333;
		line-height: 17px;
		margin-bottom: 14px;
	}
	
	.details-list li {
		margin-bottom: 10px;
	}
	
	.details-list span {
		font-family: "PingFangSC-Regular","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
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
	
	.implementation-quota,
	.quota-allocation {
		font-size: 12px;
		margin-bottom: 16px;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
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

	.form-item {
		margin-bottom: 12px;
	}
	
	.project-allocation {
		margin-bottom: 14px;
		margin-top: 14px;
		font-size: 12px;
		color: #333333;
		font-weight: bold;
	}
	
	.audit-passed {
		margin-right: 16px;
	}
	
	hr {
		margin-top: 14px;
	}
	
	.add-business-department {
		font-size: 12px;
		color: #D0D0D0;
		padding: 5px 17px 4px 12px;
		background: #fff;
		border: 1px solid #D0D0D0;
		margin-top: 19px;
	    display: inline-block;
	    line-height: 1.5;
	    margin-left: 85px;
	}
	.add-business-department span{
		position: relative;
		top: -1px;
	}
	.businessDepartment-list:not(:first-of-type) {
		margin-left: 85px;
		margin-top: 12px;
	}
	
	.infor-list-title {
		font-size: 12px;
		color: #000;
		margin-right: 5px;
		display: inline-block;
		width: 80px;
	}
	
	.project-details-btn {
		margin-top: 20px;
		margin-right: 20px;
	}
	.delete{
		display: inline-block;
		margin-top: 2px;
		margin-left: 20px;
		color: #D0D0D0;
		cursor: pointer;
	}
	.danwei{
		font-size: 12px;
		color: #D0D0D0;
		position: absolute;
		top: 1px;
	}
</style>
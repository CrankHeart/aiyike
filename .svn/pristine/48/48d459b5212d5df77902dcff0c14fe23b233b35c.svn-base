<template>
	<div class="wrap">
		<h3 class="project-title">{{projectName}}</h3>
		<div class="clearfix">
			<div class="fl project-type">{{projectType|itemType}}</div>
			<div class="project-number">
				<span>项目编号：</span>
				<span>{{projectNumber}}</span>
			</div>
		</div>
		<div class="project-brief">{{projectBrief}}</div>
		<ul class="details-list">
			<li v-if="cusnameVisible"><span class="list-title">客户公司:</span><span>{{projectDetails.customerName}}</span></li>
			<li v-if="industryTypeVisible"><span class="list-title">所属行业:</span><span>{{projectDetails.industryType|industryType}}</span></li>
			<li v-if="aChargeVisible"><span class="list-title">甲方负责人:</span><span>{{projectDetails.ACharge}}</span></li>
			<li v-if="cnVisible"><span class="list-title">联系电话:</span><span>{{projectDetails.contactNumber}}</span></li>
			<li v-if="emailVisible"><span class="list-title">联系邮箱:</span><span>{{projectDetails.email}}</span></li>
			<li v-if="bmVisible"><span class="list-title">商务经理:</span><span>{{projectDetails.businessManager}}</span></li>
			<li v-if="crnVisible"><span class="list-title">合同编号:</span><span>{{projectDetails.contractNumber}}</span></li>
			<li v-if="craVisible"><span class="list-title">合同金额:</span><span>{{projectDetails.contractAmount}}元</span></li>
			<li v-if="psbVisible"><span class="list-title">售前预算:</span><span>{{projectDetails.budget}}元</span></li>
			<li v-if="pamVisible"><span class="list-title">项目金额:</span><span>{{projectDetails.budget}}元</span></li>
			<li v-if="cqhtjVisible"><span class="list-title">合同金额:</span><span>{{projectDetails.budget}}元</span></li>
			<li v-if="hoursVisible"><span class="list-title">评估工时:</span><span>{{!!projectDetails.hours?projectDetails.hours:0}}h</span></li>
			<li v-if="cycleVisible"><span class="list-title">计划周期:</span><span>{{projectDetails.date1}} - {{projectDetails.date2}}</span></li>
			<li class="clearfix" v-if="payTypeVisible">
				<span class="fl list-title">支付方式:</span>
				<div class="pay-type-price clearfix">
					<span v-for="(item,index) in projectDetails.price" class="fl">第{{index+1 | n2cformat}}笔({{item.money}}元)&nbsp;&nbsp;;&nbsp;&nbsp;</span>
				</div>
			</li>
		</ul>
		<hr v-if="whetherPass==1">
		<div class="project-allocation" v-if="whetherPass==1">项目分配</div>
		<el-form :model="adoptForm" ref="adoptForm" :label-position="labelPosition" label-width="75px" class="clearfix" v-if="whetherPass==1">
			<el-form-item
					label="担当事业部："
					prop="buDepartment"
					:rules="[
				  { required: true, message: '请选择担当事业部',trigger: 'change'},
				]">
                <el-input placeholder="请选择担当事业部" v-model="adoptForm.buDepartment" @focus="setDepartment"></el-input>
			</el-form-item>
			<el-form-item
					label="项目经理:"
					prop="projectManagerValue"
					:rules="[
							  { required: true, message: '请选择项目经理', trigger: 'change' }
							]">
				<el-select v-model="adoptForm.projectManagerValue" placeholder="请选择">
					<el-option v-for="item in projectManager" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="project-details-btn clearfix" v-if="whetherPass==0">
			<el-button class="cancelbtn fr" :plain="true" @click="rejectReq()">驳回</el-button>
			<el-button class="audit-passed submitbtn fr" type="primary" @click="auditPassed()">审核通过</el-button>
		</div>
		<div class="project-details-btn clearfix" v-if="whetherPass==1">
			<el-button class="cancelbtn fr" :plain="true" @click="cancel('adoptForm')">取消</el-button>
			<el-button class="audit-passed submitbtn fr" type="primary" @click="submitAudit('adoptForm')">提交</el-button>
		</div>
		<sure-tip :visible.sync="SureTipVisible" @submit="submitSteps"></sure-tip>
		<reject-dialog :visible.sync="rejectDialogVisible" @rejectCreate="rejectCreate"></reject-dialog>
		<department-dialog-tree :visible.sync="departmentDialogVisible" :isedit='isedit' @ok = "getOk"></department-dialog-tree>
	</div>
</template>

<script>
	let rejectDialog = () =>
		import('@/components/PjManagement_UnFinished_Steps/rejectDialog.vue')
		
    let DepartmentDialogTree = () =>
        import('@/components/DepartmentDialogTree.vue')

    let SureTip = () =>
        import('@/components/PjManagement_UnFinished_Steps/SureTip.vue')

	export default {
		props: ['stepsData'],
		data() {
			return {
				whetherPass: 0, //1:pmo点击审核通过
				projectName: '',
				projectType: '',
				projectNumber: '',
				projectBrief: '',
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
					price: {

					},
					hours:''
				},
				//项目经理
				projectManager: [],
				BusinessDepartmentValue: '',
				labelPosition: 'left',
				isedit: false,
				getOkData: {},
				departmentDialogVisible: false,
				rejectDialogVisible: false,
				dataTree: [],
				pDefaultProps: {
					children: 'children',
					label: 'label'
				},
				dataList: JSON.parse(Cache.local(Config.Login)),
			    content:'同意',
			    item:{},
			    depart:[],
			    isPass:'Y',
                adoptForm:{
                    buDepartment:null,
                    projectManagerValue: null
				},
                SureTipVisible:false,
                submitData:{}
			}
		},
		components: {
            SureTip,
			rejectDialog,
			DepartmentDialogTree
		},
		mounted() {
			this.projectName = this.stepsData.item.name
			this.projectType = this.stepsData.item.category
			this.projectNumber = this.stepsData.item.code
			this.projectBrief = this.stepsData.item.description
			this.projectDetails.customerName = this.stepsData.item.bus.name
			this.projectDetails.industryType = this.stepsData.item.industry
			this.projectDetails.ACharge = !!this.stepsData.item.uc?this.stepsData.item.uc.ch_name:''
			this.projectDetails.contactNumber = !!this.stepsData.item.uc?this.stepsData.item.uc.phone:''
			this.projectDetails.email = !!this.stepsData.item.uc?this.stepsData.item.uc.email:''
			this.projectDetails.businessManager = this.stepsData.item.ba_name
			this.projectDetails.contractNumber = this.stepsData.item.contract
			this.projectDetails.contractAmount = this.stepsData.item.contract_money
            this.projectDetails.budget = this.stepsData.item.budget

			this.projectDetails.date1 = this.formatDate(new Date(this.stepsData.item.plan_start_time))
			this.projectDetails.date2 = this.formatDate(new Date(this.stepsData.item.plan_end_time))
			this.projectDetails.price = this.stepsData.item.itemAmountList
			
			this.projectDetails.hours = this.stepsData.item.hours
			this.$postManager()
			

		},
		computed: {
			cusnameVisible() {
				return true
			},
			industryTypeVisible() {
				return true
			},
			aChargeVisible() {
				return true
			},
			cnVisible() {
				return true
			},
			emailVisible() {
				return true
			},
			bmVisible() {
				return true
			},
			crnVisible() {
				let category = parseInt(this.stepsData.item.category)
				if (category == 2 || category == 1) {
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
			cycleVisible() {
				return true
			},
			payTypeVisible() {
				let category = parseInt(this.stepsData.item.category)
				if (category ==2) {
					return true
				}
				return false
			},
			hoursVisible() {
				return true
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
			$postManager(){
				this.$http.post("/api/uContact/queryProManager", {"code":"mgr"}, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {

								let result = data.result.map((v,i)=>{
									return {
										id:JSON.stringify(v.id),
										name:v.name
									}
								})
								this.projectManager = result
							}
						}).catch((err) => {

						});
			},
			auditPassed() {
				this.whetherPass = 1
				this.initDepartTree();
			},
			rejectReq() {
				this.rejectDialogVisible = true;
			},
			cancel(formName){
			    this.whetherPass = 0
                this.$refs[formName].resetFields()
                // this.$router.go(-1)
			},
            submitSteps(value){
                if(!!value){
                    this.auth(this.submitData,"项目审核")
                    // this.saveItem(this.submitData)
                }
            },
			//审核通过分配部门之后提交
			submitAudit(formName) {

			    this.$refs[formName].validate((valid)=>{
			        if(valid){
                        this.item.id=this.stepsData.item.id
                        this.item.description="同意"
                        this.whetherPass==1
                        this.submitData = {
                            ucId:this.dataList.uc.id,
                            departId:this.stepsData.item.depart_id,
                            managerId:this.adoptForm.projectManagerValue,
                            buId:this.getOkData.id,
                            taskId:this.stepsData.item.taskId,
                            content:this.content,
                            isPass:this.isPass,
                            item:this.item
                        }
                        this.SureTipVisible = true
					}
				})

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
			initDepartTree() {
				this.$http.post("/api/depart/departTree", null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.dataTree = data.result;
						}
					}).catch((err) => {
						
					});
			},
			handleNodeClick(data) {
				this.depart=data
			},
			getOk(val) {
				this.getOkData.label = val.label;
				this.getOkData.id = val.id;
				this.adoptForm.buDepartment = this.getOkData.label
			},
			setDepartment(val) {
				this.departmentDialogVisible = true
			},
			rejectCreate(reason){
				this.isPass = "N"
				this.item.id=this.stepsData.item.id
				this.item.description=reason
				let submitData = {
					ucId:this.dataList.uc.id,
					isPass:this.isPass,
				    item:this.item,
				    taskId:this.stepsData.item.taskId
				}
				this.auth(submitData,"驳回");
			},
			auth(submitData,tip){
					this.$http.post("/api/item/pmoAuth", submitData, {
						emulateJSON: false
					}).then((res) => {
						let data = res.data;
						if(data.success) {
							this.$message({
								customClass: 'success',
								message: tip+'成功',
                                duration:'1000',
                                onClose:()=>{
                                    this.$router.go(-1)
								}
							})
						} else {
							this.$message({
								customClass: 'error',
								message: data.message
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
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #333333;
		line-height: 17px;
		margin-bottom: 14px;
	}
	
	hr {
		margin-top: 14px;
	}
	
	.details-list li {
		margin-bottom: 10px;
	}
	
	.details-list span {
		font-family: PingFangSC-Regular;
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
	
	.project-allocation {
		margin-bottom: 14px;
		margin-top: 14px;
		font-size: 12px;
		color: #333333;
		font-weight: bold;
	}
	
	.project-details-btn {
		padding-right: 20px;
		margin-top: 30px;
	}
	
	.reject-req {}
</style>
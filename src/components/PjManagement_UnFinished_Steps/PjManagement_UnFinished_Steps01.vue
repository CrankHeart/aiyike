<template>
	<div class="wrap">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="100px" class="demo-ruleForm create_project_form clearfix">
			<el-form-item label="项目名称:" prop="entryName">
				<el-input v-model="ruleForm.entryName" placeholder="客户简称+产品类型+业务类型+第几次开发" :maxlength="15"></el-input>
			</el-form-item>

			<el-form-item label="客户公司:" prop="companyName">
				<el-autocomplete v-model="ruleForm.companyName" :fetch-suggestions="querySearchAsync" placeholder="客户公司"></el-autocomplete>
			</el-form-item>

			<el-form-item label="所属行业:" prop="industry">
				<el-select v-model="ruleForm.industry" placeholder="请选择" v-sicon1 class="width150">
					<el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="甲方负责人:" prop="name">
				<el-input v-model="ruleForm.name" placeholder="姓名" style="width: 150px;" :maxlength="10"></el-input>
			</el-form-item>
			<el-form-item label="联系电话:" prop="mobile">
				<el-input v-model="ruleForm.mobile" placeholder="手机／座机" :maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="联系邮箱:" prop="email">
				<el-input v-model="ruleForm.email" placeholder="邮箱地址"></el-input>
			</el-form-item>
			<el-form-item label="商务经理:" prop="businessManager" class="width150">
				<el-input v-model="ruleForm.businessManager" disabled></el-input>
			</el-form-item>
			<el-form-item label="项目类型:" prop="category">
				<el-select v-model="ruleForm.category" placeholder="请选择" @change="changeViewByType(ruleForm.category)" v-sicon1>
					<el-option v-for="item in projectType" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-form :model="projectInforForm" :rules="projectInforRules" ref="projectInforForm" :label-position="labelPosition" label-width="100px" class="demo-ruleForm create_project_form clearfix">
			<el-form-item label="项目简介:" prop="description" class="textareaForm">
				<el-input type="textarea" v-model="projectInforForm.description" placeholder="请输入项目简介" class="" :maxlength="200"></el-input>
			</el-form-item>
			<el-form-item label="合同编号:" prop="contract" v-if="projectType_status==2||projectType_status == 1">
				<el-input v-model="projectInforForm.contract" placeholder="请输入合同编号"></el-input>
			</el-form-item>
			<el-form-item label="合同金额:" prop="contractMoney" v-if="projectType_status==2">
				<el-input v-model="projectInforForm.contractMoney" placeholder="请输入合同金额" style="width: 150px;"></el-input>
				<span class="danwei" style="left: 128px;">元</span>
			</el-form-item>
			<el-form-item label="评估工时:" prop="hours" v-if="projectType_status==2">
				<el-input v-model="projectInforForm.hours" placeholder="请输入工时"></el-input>
				<span class="danwei" style="left: 228px;">h</span>
			</el-form-item>
			<el-form-item label="评估工时:" prop="phours" v-if="projectType_status!=2">
				<el-input v-model="projectInforForm.phours" placeholder="请输入评估的工时"></el-input>
				<span class="danwei" style="left: 228px;">h</span>
			</el-form-item>
			<el-form-item label="售前预算:" prop="budget" v-if="projectType_status==4">
				<el-input v-model="projectInforForm.budget" placeholder="金额" style="width: 243px;"></el-input>
				<span class="danwei" style="left: 226px;">元</span>
			</el-form-item>
			<el-form-item label="合同金额:" prop="pbudget" v-if="projectType_status == 1">
				<el-input v-model="projectInforForm.pbudget" placeholder="金额" style="width: 243px;"></el-input>
				<span class="danwei" style="left: 226px;">元</span>
			</el-form-item>
			<el-form-item label="项目金额:" prop="pbudget" v-if="projectType_status == 3||projectType_status == 5">
				<el-input v-model="projectInforForm.pbudget" placeholder="金额" style="width: 243px;"></el-input>
				<span class="danwei" style="left: 226px;">元</span>
			</el-form-item>
			<el-form-item label="计划周期:" class="clearfix plans-date">
				<div class="fl">
					<el-form-item prop="st" style="margin-bottom: 0">
						<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="projectInforForm.st"
								:picker-options="pickerBeginDateBefore"
								style="width: 109px;"></el-date-picker>
					</el-form-item>
				</div>
				<div class="line fl" style="width: 20px; text-align: center;color: #D0D0D0;">-</div>
				<div class="fl">
					<el-form-item prop="et" style="margin-bottom: 0">
						<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="projectInforForm.et"
								:picker-options="pickerBeginDateAfter"
								style="width: 109px;"></el-date-picker>
					</el-form-item>
				</div>
			</el-form-item>
			<el-form-item label="支付方式:" class="clearfix" required v-if="projectType_status==2">
				<div class="amountData-modules" v-for="(item,index) in projectInforForm.amountData" ref="amountDataModules">
					<el-form-item :prop="'amountData.' + index + '.payAmount'" :rules="[ { required: true, message: '请输入支付金额', trigger: 'blur' }, { pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}((\.\d{2}){1})?))$/, message: '请输入正确的金额', trigger: 'change,blur' }]">
						<el-input type="text" class="special-input" placeholder="" v-model="item.payAmount" style="width: 191px;">
							<template slot="prepend">第{{index+1 | n2cformat}}笔</template>
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</div>
				<span @click="addAmount" class="addamountinput" v-if="amountLenAdd">+</span>
				<span @click="deleteAmount" class="deleteamountinput" v-if="amountLenDelete">-</span>
			</el-form-item>
		</el-form>
		<div class="fr bottom-btn">
			<el-button type="primary" class="submitbtn" @click="submitForm(['ruleForm','projectInforForm'])">提交</el-button>
			<el-button @click="cancel()" class="cancelbtn">取消</el-button>
		</div>
		<sure-tip :visible.sync="SureTipVisible" @submit="submitSteps"></sure-tip>
	</div>
</template>

<script>
    let SureTip = () =>
        import('@/components/PjManagement_UnFinished_Steps/SureTip.vue')
    import Type from '@/utils/type-util.js'
    import FC from '@/utils/float-calculate.js'
    let vm = null
    export default {
        props: {
            stepsData: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            activeType: {}
        },
        data() {
            return {
                dataList: JSON.parse(Cache.local(Config.Login)),
                SureTipVisible:false,
                submitData:{},
                //搜索结束时间需大于等于开始时间
                pickerBeginDateBefore: {
                    disabledDate(time) {
						return vm.projectInforForm.et && vm.projectInforForm.et.getTime && (time.getTime() > vm.projectInforForm.et.getTime())
                    }
                },
                pickerBeginDateAfter: {
                    disabledDate(time) {
                        return vm.projectInforForm.st && vm.projectInforForm.st.getTime && (time.getTime() < vm.projectInforForm.st.getTime())
                    }
                },
                priceNum: 2,
                labelPosition: 'left',
                restaurants: [],
                timeout: null,
                _isWait:false,				//提交方式狂点击
                editData:'',
                companyNameTimeOut: null,
                ruleForm: {
                    bus: {
                        id:null
					},
                    item: {
                        amount: []
                    },
                    user: {},

                    entryName:'',
                    companyName:'',
                    industry:'',
                    name:'',
                    mobile:'',
                    email:'',
                    businessManager: '',
                    category:'2'

                },
                projectInforForm:{
                    description:'',
                    contract:'',
                    contractMoney:'',
                    budget:'',
                    pbudget:'',
                    hours:'',
                    phours:'',
					st: '',
					et: '',
                    amountData: [
                        {
                            payAmount:'',
                        }
                    ],
				},
                projectType: [{
                    value: '2',
                    label: '短期项目'
                },{
                    value: '1',
                    label: '长期项目'
                }, {
                    value: '3',
                    label: '维护项目'
                }, {
                    value: '4',
                    label: '售前项目'
                }, {
                    value: '5',
                    label: '内部研发项目'
                }],
                industry: [{
                    value: '1',
                    label: '金融'
                }, {
                    value: '2',
                    label: '教育'
                }, {
                    value: '3',
                    label: '医疗'
                }, {
                    value: '4',
                    label: '化工'
                }, {
                    value: '5',
                    label: '物流'
                }, {
                    value: '6',
                    label: '电器'
                },
				{
					value: '7',
					label: '互联网'
				}, {
					value: '8',
					label: '事业单位'
				}, {
					value: '9',
					label: '电力能源'
				}, {
					value: '10',
					label: '通信'
				}, {
					value: '11',
					label: '房产'
				}, {
					value: '12',
					label: '广告'
				},
				{
					value: '13',
					label: '餐饮'
				}, {
					value: '14',
					label: '零售'
				}, {
					value: '15',
					label: '旅游'
				}, {
					value: '16',
					label: '文化艺术'
				}, {
					value: '17',
					label: '工业'
				}, {
					value: '18',
					label: '其他'
				}],
                rules: {
                	industry:
                	 [{
                        required: true,
                        message: '请选择所属行业',
                        trigger: 'blur'
                    }],
                    companyName:[{
                        required: true,
                        message: '请输入客户名称',
                        trigger: 'change,blur'
					}],
                    entryName:[{
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur'
					}],
                    name: [{
                        required: true,
                         pattern: /^[\u0391-\uFFE5A-Za-z]+$/,
                         message: '请输入中文或英文',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    },
                        {
                            pattern: /^(([1][\d]{10})|([0]{1}\d{2,3}-?\d{7,8})|(\d{3}-?\d{3,4}-?\d{3,4}))$/,
                            message: '请输入正确的手机/座机号',
                            trigger: 'blur'
                        }
                    ],
                    email: [{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    },
                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '请输入正确的邮箱',
                            trigger: 'blur'
                        }
                    ],

                    businessManager: [{
                        required: true,
                        message: '商务经理必填'
                    }]
                },
                projectInforRules:{
                    category: [{
                        required: true,
                        message: '请选择项目类型',
                        trigger: 'change'
                    }],
                    contract: [{
                        required: true,
                        message: '请输入合同编号',
                        trigger: 'blur'
                    },
                        {
                            pattern: /^[A-Za-z0-9]+$/,
                            message: '合同编号只能为英文和数字',
                            trigger: 'change,blur'
                        }
                    ],
                    contractMoney: [{
                        required: true,
                        message: '请输入合同金额',
                        trigger: 'blur'
                    },
					{
						pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}(\.\d{2}){1}))$/,
						message: '合同金额输入不正确',
						trigger: 'blur'
					}
                    ],
                    hours:[{
                        required: true,
                        message: '请输入评估工时',
                        trigger: 'blur'
                    },
					{
						pattern: /^\+?[1-9][0-9]{0,7}$/,
						message: '工时输入不正确',
						trigger: 'change,blur'
					}],
                    phours:[{
                        required: true,
                        message: '请输入评估工时',
                        trigger: 'blur'
                    },
					{
						pattern: /^\+?\d{0,7}$/,
						message: '工时输入不正确',
						trigger: 'change,blur'
					}],
                    budget: [{
                        required: true,
                        message: '请输入金额',
                        trigger: 'blur'
                    },
					{
						pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}(\.\d{2}){1}))$/,
						message: '金额输入不正确',
						trigger: 'blur'
					}
                    ],
                    pbudget: [{
                        required: true,
                        message: '请输入金额',
                        trigger: 'blur'
                    },
					{
						pattern: /^((([1-9]+[0-9]*)+(\.\d{2})?)|(0{1}((\.\d{2}){1})?))$/,
						message: '金额输入不正确',
						trigger: 'blur'
					}
                    ],
                    st: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur'
                    }],
                    et: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur'
                    }],
				},
                //根据项目类型判断显示的内容
                projectType_status: 2,
                copyProjectInforForm:null
            };
        },
		components:{
            SureTip
		},
        watch: {
            bus: function(val) {},
            'ruleForm.businessManager' (val) {},
            stepsData: {
                deep: true,
                handler(val) {
                    this.$nextTick(()=>{
                        this.init()
                    })
                }
            },
            'ruleForm.companyName'(cval, oval) {
            	clearTimeout(this.companyNameTimeOut)
            	this.companyNameTimeOut = setTimeout(()=>{
            		let restaurants = [...this.restaurants]
	                let items = restaurants.filter((state) => {
	                    return state.value == cval
	                })
	                if (Array.isArray(items) && items.length == 1) {
	                	this.ruleForm.bus.id = items[0].id
		                if(this.ruleForm.bus.id!=null){
		                	this.queryComHeadById(this.ruleForm.bus.id)
		                }
		                this.ruleForm.bus.name = items[0].value
	                } else {
	                	this.ruleForm.name = ''
	                }
            	}, 500)
            }
        },
		created() {
            vueIns = this
		},
        mounted: function() {
            vm = this
            this.copyProjectInforForm = JSON.parse(JSON.stringify(this.projectInforForm))
            this.$nextTick(()=>{
                this.init()
            })
        },
        computed: {
            amountLenDelete(){
                if(this.projectInforForm.amountData.length >= 2){
					return true
				}
				return false
			},
            amountLenAdd(){
                if(this.projectInforForm.amountData.length < 5){
                    return true
                }
                return false
			}
        },
        methods: {
            init() {
                this.checkStepData(()=>{
                    this.ruleForm.businessManager = this.dataList.uc.chName
                    this.loadBus()
                    if(!!(this.stepsData.item)){
                        if(this.stepsData.item.is_pass == 0) {
                            this.getReApplyInfo();
                        }
                    }
                })
            },
            checkStepData(callback) {
                let activeType = sessionStorage.getItem(Config.CreateStep.NAME)
                if (
                    !this.stepsData.item &&
                    activeType != Config.CreateStep.ACTION_TYPE.CREATE_PROJECT_INTO
                ) {
                    this.$emit('update:stepsData', JSON.parse(sessionStorage.getItem("editData")))
                } else {
                    sessionStorage.setItem("editData",JSON.stringify(this.stepsData))
                }
                callback()
            },
            //改变项目类型切换视图
            changeViewByType: function(value) {
            	let _self = this
                let tempInterval = requestAnimationFrame(function req(){
                    if (_self.$refs && _self.$refs.ruleForm && _self.$refs.projectInforForm) {
                        cancelAnimationFrame(tempInterval)
                        _self.$refs.ruleForm.$data.fields.forEach(field => {
                            field.$data.validateState = "success"
                        })
                        _self.$refs.projectInforForm.$data.fields.forEach(field => {
							_self.$set(_self.$data, 'projectInforForm', Object.deepClone(_self.copyProjectInforForm))
                            field.$data.validateState = "success"
                        })
                        _self.projectType_status = value
                    } else {
                    	tempInterval = requestAnimationFrame(req)
                    }
                })
            },
            setSubmitFormData(type,obj,formName){				//type可传字符串或者数组,obj是要存入的数组对象,formName从哪个表单取数据的表单名

				if(Type.isArray(type)){
					type.forEach((item,index)=>{
						this.ruleForm[obj][item] = this[formName][item]			//将数组内的每一项存到对象
					})
				}else{
				    new Error('第一个参数必须为数组')
				}

            },
            compare(){
                if(this.ruleForm.category!=2){
					return true
				}
                let amount = this.calculationAmount()
				if(amount!=this.projectInforForm.contractMoney){
                    this.$message({
                    	customClass: 'error',
                        message: '支付总额必须等于合同金额'
                    })
					return false
				}
				return true
			},
            calculationAmount(){
                let amount = 0;
				this.projectInforForm.amountData.forEach((item,index)=>{
                    amount = FC.add(amount,item.payAmount)
				})
				return amount
			},
            forEachCompany(){
                for(var i = 0; i<this.restaurants.length; i++){
                    if(this.ruleForm.companyName == this.restaurants[i].value && this.restaurants[i].id == this.ruleForm.bus.id){
                        this.ruleForm.bus.name == this.restaurants[i].value
                        this.ruleForm.bus.id == this.restaurants[i].id
                        break
                    }else if(i == this.restaurants.length-1 && this.ruleForm.companyName != this.restaurants[i].value){
                        this.ruleForm.bus.name = this.ruleForm.companyName
                        delete this.ruleForm.bus.id
                    }
                }
			},
			dealSubmitData(){
                //客户信息
                this.setSubmitFormData(['name','mobile','email'],'user','ruleForm')
                //项目信息
                this.setSubmitFormData(['industry','category'],'item','ruleForm')
                this.setSubmitFormData(['description','contract','hours','contractMoney','budget'],'item','projectInforForm')		//将projectInforForm里的数据处理后放进user
				//特殊数据特殊处理，手动放置
				if(this.projectType_status!=4){
                    this.ruleForm.item.budget = this.projectInforForm.pbudget
				}
                if(this.projectType_status!=2){
                    this.ruleForm.item.hours = this.projectInforForm.phours
                }
                this.ruleForm.item.name = this.ruleForm.entryName
                this.ruleForm.item.planStartTime = (!!this.projectInforForm.st) ? new Date(this.projectInforForm.st).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
                this.ruleForm.item.planEndTime = (!!this.projectInforForm.et) ? new Date(this.projectInforForm.et).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';

                let amountArr = this.projectInforForm.amountData?this.projectInforForm.amountData.map(function(value, index, array) {
                    return value['payAmount']
                }):''
                this.ruleForm.item.amount = amountArr
			},
            submitSteps(value){
				if(!!value){
                    this.saveItem(this.submitData)
				}
			},
            submitForm: function(formNameArr) {
				//处理公司名称的选择（即使不选，只输入已经存在的公司名称，给他处理匹配一个）
				this.forEachCompany()
				//处理提交的数据
				this.dealSubmitData()
				let ruleFormStatus
                
                this.$refs['ruleForm'].validate((ruleFormValid) => {

                    this.$refs['projectInforForm'].validate((projectInforValid)=>{

						if(ruleFormValid && projectInforValid){
							//验证金额
                            let isDoing = this.compare()
                            if(!isDoing){
                                return			//计算支付金额的总值必须等于合同金额
                            }
                            this.submitData = {
                                bus: this.ruleForm.bus,
                                user: this.ruleForm.user,
                                item: this.ruleForm.item
                            }
                            if(!!(this.stepsData.item)){
                                if(this.stepsData.item.is_pass == 0) {
                                    this.submitData.reapply = "Y",
									this.submitData.isEdit="edit",
									this.submitData.taskId = this.stepsData.item.taskId,
									this.submitData.item.itemId = this.stepsData.item.id
                                }
                            }
                            this.SureTipVisible = true
						}else{
                            return false;
						}
					})
                });
            },
            cancel(){
                this.$router.go(-1)
			},
            addAmount: function() {
                let amountDataLen = this.$refs.amountDataModules.length
                if(amountDataLen == 5) {
                    return
                } else {
                    this.projectInforForm.amountData.push({
                        payAmount:''
                    })
                }
            },
            deleteAmount(){
                let amountDataLen = this.$refs.amountDataModules.length
                this.projectInforForm.amountData.pop()
			},
            querySearchAsync: function(queryString, cb) {
                let restaurants = this.restaurants
                let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
                cb(results)
            },
            createStateFilter: function(queryString) {
                return (state) => {
                    return(state.value.indexOf(queryString.toLowerCase()) === 0)
                }
            },
            handleSelect: function(item) {
                this.ruleForm.bus.id = item.id
                if(this.ruleForm.bus.id!=null){
                	this.queryComHeadById(this.ruleForm.bus.id)
                }
                this.ruleForm.bus.name = item.value
            },
            loadBus: function() {
                this.$http.post('/api/bus/loadBus', null, {
                    emulateJSON: true
                })
                    .then((res) => {
                        let data = res.data;
                        if(data.success) {
                            let result = data.result;
                            let reformatted = result.map(function(obj) {
                                obj.id = obj.id
                                obj.value = !!obj.name?obj.name:''
                                delete obj.name

                                return obj
                            });
                            this.restaurants = reformatted

                        }
                    }).catch((err) => {
                    
                })
            },
            getReApplyInfo: function() {
                // this.ruleForm.code = this.stepsData.item.code
                this.ruleForm.entryName =  this.stepsData.item.name
                this.ruleForm.companyName =  this.stepsData.item.company
                this.ruleForm.bus.id =  this.stepsData.item.company_id

                this.ruleForm.user.ucId = this.stepsData.item.customer_id

                this.ruleForm.industry =  JSON.stringify(this.stepsData.item.industry)
                this.ruleForm.name =  !!this.stepsData.item.uc?this.stepsData.item.uc.ch_name:''
                this.ruleForm.mobile =  !!this.stepsData.item.uc?this.stepsData.item.uc.phone:''
                this.ruleForm.email =  !!this.stepsData.item.uc?this.stepsData.item.uc.email:''
                this.ruleForm.businessManager =  this.stepsData.item.ba_name
                this.ruleForm.category =  JSON.stringify(!!this.stepsData?this.stepsData.item.category:void 0)
                this.projectInforForm.description =  this.stepsData.item.description
                this.projectInforForm.contract =  this.stepsData.item.contract
                this.projectInforForm.hours=  JSON.stringify(this.stepsData.item.hours)
                this.projectInforForm.contractMoney =  JSON.stringify(!!this.stepsData.item.contract_money?this.stepsData.item.contract_money:0)
                this.projectInforForm.budget =  JSON.stringify(this.stepsData.item.budget)
                this.projectInforForm.pbudget =  JSON.stringify(this.stepsData.item.budget)
                this.projectInforForm.phours =  this.stepsData.item.hours.toString()
                this.projectInforForm.st = new Date(this.stepsData.item.plan_start_time)
                this.projectInforForm.et = new Date(this.stepsData.item.plan_end_time)
                
                let itemAmountList = !!this.stepsData?this.stepsData.item.itemAmountList:void 0
                this.projectInforForm.amountData = itemAmountList.map(function(value, index, array) {
                    return {
                        payAmount : JSON.stringify(value['money'])
                    };
                })
                this.copyProjectInforForm = Object.deepClone(this.projectInforForm)
                // 
            },
            queryComHeadById:function(comId){
            	this.$http.post("/api/busContact/queryComHead/"+comId,null,{emulateJSON: false})
            	.then((res) => {
                    let data = res.data;
                    if(data.success) {
						this.ruleForm.mobile = data.result.headPhone
                        this.ruleForm.email = data.result.headEmail
                        this.ruleForm.name = data.result.headName
                    } 
                }).catch((err) => {

                });
            },
            saveItem: function(submitData) {
                if(this._isWait){
                    return;
                }
                this._isWait = true
                this.$http.post("/api/item/saveItem", submitData, {
                    emulateJSON: false
                }).then((res) => {
                    this._isWait = false
                    let data = res.data;
                    if(data.success) {
                        this.$message({
                        	customClass: 'success',
                            message: '创建项目成功',
                            duration:'1000',
                            onClose:()=>{
                                this.$router.go(-1)
							}
                        })
                    } else {
                        this._isWait = false
                        this.$message({
                        	customClass: 'error',
                            message: data.message
                        })
                    }
                }).catch((err) => {
                    this._isWait = false
                });
            }
        }
    }
</script>

<style scoped>
	.addamountinput {
		display: inline-block;
		cursor: pointer;
		width: 20px;
    	height: 26px;
		line-height: 26px;
		text-align: center;
	}
	.deleteamountinput{
		display: inline-block;
		cursor: pointer;
		width: 20px;
		height: 26px;
		line-height: 26px;
		font-size: 18px;
		text-align: center;
	}
	.wrap {
		height: 100%;
		/*width: 100%;*/
		width: 825px;
		margin: 0 auto;
		padding: 20px;
		padding-left: 30px;
		background: transparent;
	}

	.amount-modules {
		margin-right: 18px;
	}
	.amountData-modules{
		margin-right: 10px;
		display: inline-block;
		vertical-align: top;
	}
	.bottom-btn {
		margin-top: 10px;
		margin-bottom: 0;
	}
	.danwei{
		font-size: 12px;
		color: #D0D0D0;
		position: absolute;
		top: 1px;
	}
</style>
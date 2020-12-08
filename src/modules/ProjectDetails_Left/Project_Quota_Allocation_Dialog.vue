<template>
	<div class="ammx" @click="bodyclick">
		<!--项目额度分配 --弹窗 -->
		<el-dialog title="项目额度分配" :visible.sync="dialogVisible" class="dialog442" :close-on-click-modal="false">
			<div class="implement">
				<span>实施额度分配</span>
				<span>未分配额度 </span>
				<span>{{balanceText | nullformat('0')}}元</span>
				<span>未分配工时 </span>
				<span>{{availableHoursText | nullformat('0')}}h</span>
			</div>
			<el-form :model="yetForm" ref="yetForm">
				<el-form-item v-for="(division, index) in yetForm.quotaDistribution" :key="index">
					<label class="rowlabel">{{division.title}}</label>
					<el-row class="clearfix" :gutter="20" style="margin-left: 74px;display: block;">
						<el-col :span="8">
							<el-form-item>
								<el-input v-model="division.namex" :readonly="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item unit="元" :prop="'quotaDistribution.' + index + '.amount'" :rules="yetFormAmountRule(index)">
								<div v-show="poptipsindex == ('元'+index)" class="poptips">
									<span @click.stop="poptipsitemclick(index,1)">上游</span>
									<span @click.stop="poptipsitemclick(index,2)">下游</span>
									<span @click.stop="poptipsitemclick(index,3)">和平解决</span>
								</div>
								<div @click.stop="()=>{}">
									<el-input :readonly="noEditDepart && division.noedit" @focus="poptipsbox(index, '元'+index)" @blur="poptipshide" v-model="division.amount" placeholder="额度(元)" auto-complete="off" class="elinput"></el-input>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item unit="h" :prop="'quotaDistribution.' + index + '.hour'" :rules="yetFormHoursRule(index)">
								<div v-show="poptipsindex == ('h'+index)" class="poptips">
									<span @click.stop="poptipsitemclick(index,1)">上游</span>
									<span @click.stop="poptipsitemclick(index,2)">下游</span>
									<span @click.stop="poptipsitemclick(index,3)">和平解决</span>
								</div>
								<div @click.stop="()=>{}">
									<el-input :readonly="noEditDepart && division.noedit" @focus="poptipsbox(index, 'h'+index)" @blur="poptipshide" v-model="division.hour" placeholder="时间(h)" auto-complete="off" class="elinput"></el-input>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<span class="delete el-icon-close" v-if="delAbtYetVisible(division)" @click="delAbtYet(index, division)"></span>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<el-form :model="openForm" ref="openForm">
				<el-form-item v-for="(division, index) in openForm.quotaDistribution" :key="index">
					<label class="rowlabel">{{division.title}}</label>
					<el-row class="clearfix" :gutter="20" style="margin-left: 74px;display: block;">
						<el-col :span="8">
							<el-form-item>
								<GroupSelect v-model="division.departModel" :treeData="dataTree" placeholder="担当事业部"></GroupSelect>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item unit="元" :prop="'quotaDistribution.' + index + '.amount'" :rules="openFormAmountRule(index)">
								<el-input v-model="division.amount" placeholder="额度(元)" auto-complete="off" class="elinput"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item unit="h" :prop="'quotaDistribution.' + index + '.hour'" :rules="openFormHoursRule(index)">
								<el-input v-model="division.hour" placeholder="时间(h)" auto-complete="off" class="elinput"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<span class="delete el-icon-close" @click="deleteDepart(index)"></span>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="" label-width="74px">
					<el-row class="clearfix marginLeft">
						<el-col :span="9">
							<el-button class="addDivision" @click="addBranch">+ 添加事业部</el-button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="submitbtn" type="primary" @click="sure('openForm')">确定</el-button>
				<el-button class="cancelbtn" @click="cancel">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="poptipsDialogVisible" class="dialog442" :close-on-click-modal="false">
			<span class="dialog-text">{{popTipsDialogText}}</span>
			<div slot="footer" class="dialog-footer">
				<el-button class="submitbtn" type="primary" @click.stop="popsure">确定</el-button>
				<el-button class="cancelbtn" @click.stop="popcancel">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import ResponseChain from '@/utils/responseChain.js'
	
	let GroupSelect = () =>
		import('@/components/select/GroupSelect.vue')
	
	export default {
		name: 'Project_Quota_Allocation_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				if(val) {
					this.$nextTick(() => {
						this.validateProgress(this.init)
					})
				}
				this.$emit('update:visible', val)
			},
			'state.doTaskItem': {
				deep: true,
				handler(val) {
					this.openForm.taskId = val.taskId
				}
			}
		},
		data() {
			return {
				progressData: {
					percent: 0,
					quota: 0
				},
				popTipsDialogText: '',
				poptipsDialogVisible: false,
				poptipsindex: -1,
				noEditDepart: true,
				dataTree: [],
				loginInfo: JSON.parse(Cache.local(Config.Login)),
				item: {},
				balance: 0,
				availableHours: 0,
				state: this.$store.state,
				foucsModel: null,
				departmentDialogVisible: false,
				dialogVisible: false,
				yetForm: {
					quotaDistribution: [],
					copyquotaDistribution: [],
					copylen: 0
				},
				openForm: {
					quotaDistribution: [],
					copyquotaDistribution: [],
					itemId: '',
					taskId: '',
					ucId: '',
					departId: '',
					isEdit: ''
				},
				retForm: {},
				type: '',
				formLabelWidth: '65px'
			};
		},
		components: {
			GroupSelect
		},
		computed: {
			balanceText() {
				let ret
				let b = 0
				let _quo
				let _copyquo
				;(function() {
					for (let i in this.yetForm.quotaDistribution) {
						_quo = this.yetForm.quotaDistribution[i].amount
						_copyquo = this.yetForm.copyquotaDistribution[i].amount
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`) && 
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_copyquo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							_copyquo = this.octToDecNot0(_copyquo)
							b += _quo - _copyquo
						}
					}
					for (let i in this.openForm.quotaDistribution) {
						_quo = this.openForm.quotaDistribution[i].amount
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							b += _quo
						}
					}
				}.call(this))
				if (Object.isNotEmpty(this.type)) {
					if (b <= this.balance) {
						ret = this.balance - b
					}else {
						ret = this.balance
					}
				} else {
					ret = this.balance - b
				}
				return ret.toFixed(2)
			},
			availableHoursText() {
				let ret
				let b = 0
				let _quo
				let _copyquo
				;(function() {
					for (let i in this.yetForm.quotaDistribution) {
						_quo = this.yetForm.quotaDistribution[i].hour
						_copyquo = this.yetForm.copyquotaDistribution[i].hour
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`) && 
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_copyquo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							_copyquo = this.octToDecNot0(_copyquo)
							b += _quo - _copyquo
						}
					}
					for (let i in this.openForm.quotaDistribution) {
						_quo = this.openForm.quotaDistribution[i].hour
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							b += _quo
						}
					}
				}.call(this))
				if (Object.isNotEmpty(this.type)) {
					if (b <= this.availableHours) {
						ret = this.availableHours - b
					}else {
						ret = this.availableHours
					}
				} else {
					ret = this.availableHours - b
				}
				return ret.toFixed(2)
			}
			 
		},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			validateProgress(callback) {
				var getItemPercent = function() {
					return new Promise((resolve, reject)=>{
						this.$http.post("/api/item/getItemPercent", {
							itemId: +this.$route.params.id.split('-')[0]
						}, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								resolve(data.result)
							}
						}).catch((err) => {
							
						})
					})
				}.bind(this)
				var getItemQuota = function() {
					return new Promise((resolve, reject)=>{
						this.$http.post("/api/item/getItemQuota", {
							itemId: +this.$route.params.id.split('-')[0]
						}, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								resolve(data.result)
							}
						}).catch((err) => {
							
						})
					})
				}.bind(this)
				Promise.all([getItemPercent(), getItemQuota()]).then((values) => {
					[this.progressData.percent, this.progressData.quota] = values
					callback && callback()
				});
			},
			bodyclick() {
				this.poptipsindex = -1
			},
			poptipsbox(index, type) {
				if (this.progressData.percent > this.progressData.quota) {
					this.popTipsDialogText = `当前项目进度 > ${this.progressData.quota}%，不允许修改项目额度。`
					this.poptipsDialogVisible = true
				} else {
					if (this.yetForm.quotaDistribution[index].isTips) {
						this.poptipsindex = type
					}
				}
			},
			poptipshide() {
			},
			poptipsitemclick(index, type) { 
				this.yetForm.quotaDistribution[index].isTips = false
				this.yetForm.quotaDistribution[index].measureType = type
				this.yetForm.copyquotaDistribution[index].measureType = type
				this.yetForm.quotaDistribution[index].noedit = false
				this.yetForm.copyquotaDistribution[index].noedit = false
				this.poptipsindex = -1
			},
			popsure() {
				this.$http.post("/api/distribute/queryDistributeDepart", {
					itemId: +this.$route.params.id.split('-')[0]
				}, {
					emulateJSON: true
				})
				.then((res) => {
					var data = res.data;
					if(data.success) {

					}
					this.poptipsDialogVisible = false
				}).catch((err) => {
					
				})
			},
			popcancel(){
				this.poptipsDialogVisible = false
			},
			octToDecNot0(n) {
				let ret = n.toString()
				if (ret.length > 0) {
					if (ret.indexOf('0') == 0) {
						ret = ret.substring(1, ret.length)
					}
				}
				return +ret
			},
			yetFormAmountRule(index) {
				let validate = (rule, value, callback) => {
			        if (+value < (+this.yetForm.copyquotaDistribution[index].amount - +this.yetForm.copyquotaDistribution[index].repayamount)) {
			          	callback(new Error('不能小于已分配额度'));
			        } else if (!/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(value)) {
			        	callback(new Error('额度输入不正确'));
			        } else {
			        	this.$nextTick(()=>{
					        ;(function() {
					        	let b = 0
					        	let ret
					        	let _quot
					        	let _copyquot
								ret = this.balance
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].amount)
									b += _quot
								}
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].amount)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].amount)
									b += _quot - _copyquot
									if (b > ret) {
										this.yetForm.quotaDistribution[i].amount = _quot - (b - ret) + ''
										break
									}
								}
							}.call(this))
				          	callback()
			          	})
			        }
		      	}
				return [
					{validator: validate, trigger: 'blur,change' },
				  	{required: true,message: '请输入额度',trigger: 'blur,change'}
				]
			},
			yetFormHoursRule(index) {
				let validate = (rule, value, callback) => {
					if (+value < (+this.yetForm.copyquotaDistribution[index].hour - +this.yetForm.copyquotaDistribution[index].repayhour)) {
			          	callback(new Error('不能小于已分配工时'));
			        } else if (!/^\+?[1-9][0-9]{0,7}$/.test(value)) {
			        	callback(new Error('工时输入不正确'));
			        } else {
			        	this.$nextTick(()=>{
					        ;(function() {
					        	let b = 0
					        	let ret
					        	let _quot
					        	let _copyquot
								ret = this.availableHours
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].hour)
									b += _quot
								}
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].hour)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].hour)
									b += _quot - _copyquot
									if (b > ret) {
										this.yetForm.quotaDistribution[i].hour = _quot - (b - ret) + ''
										break
									}
								}
							}.call(this))
				          	callback()
			          	})
			        }
		      	}
				return [
					{validator: validate, trigger: 'blur,change' },
				  	{required: true,message: '请输入工时',trigger: 'blur,change'}
				]
			},
			openFormAmountRule(index) {
				let validate = (rule, value, callback) => {
			        if (!/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(value)) {
			        	callback(new Error('额度输入不正确'));
			        } else {
			        	this.$nextTick(()=>{
			        		;(function() {
					        	let b = 0
					        	let ret
					        	let _quot
					        	let _copyquot
								ret = this.balance
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].amount)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].amount)
									b += _quot - _copyquot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].amount)
									b += _quot
									
									if (b > ret) {
										this.openForm.quotaDistribution[i].amount = _quot - (b - ret) + ''
										break
									}
								}
							}.call(this))
				          	callback()
			        	})
			        }
		      	}
				return [
					{validator: validate, trigger: 'blur,change' },
					{required: true,message: '请输入额度',trigger: 'blur'},
				]
			},
			openFormHoursRule(index) {
				let validate = (rule, value, callback) => {
			        if (!/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(value)) {
			        	callback(new Error('额度输入不正确'));
			        } else {
			        	this.$nextTick(()=>{
			        		;(function() {
					        	let b = 0
					        	let ret
					        	let _quot
					        	let _copyquot
								ret = this.availableHours
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].hour)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].hour)
									b += _quot - _copyquot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].hour)
									b += _quot
									
									if (b > ret) {
										this.openForm.quotaDistribution[i].hour = _quot - (b - ret) + ''
										break
									}
								}
							}.call(this))
				          	callback()
			        	})
			        }
		      	}
				return [
					{validator: validate, trigger: 'blur,change' },
				  	{required: true,message: '请输入工时',trigger: 'blur'}
				]
			},
			getType() {
				let path = this.$route.path
				let ary = path.split('/')
				let data = ary[ary.length - 1]
				let dealData = data.split('-')
				if(dealData.length == 3) {
					this.type = dealData[dealData.length - 1]
				}
			},
			/**
			 * 查询：已分配部门
			 */
			queryDistributeDepart(callback) {
//				if (Object.isNotEmpty(this.type) && this.type!='ItemDistribute') {
//					callback.call(this)
//					return void(0)
//				}
				this.$http.post("/api/distribute/queryDistributeDepart", {
						itemId: +this.$route.params.id.split('-')[0]
					}, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							var result = data.result.distributeList
							for (let i in result) {
								result[i].isTips = true
								result[i].amount = result[i].amount.toString()
								result[i].hour = result[i].hour.toString()
								result[i].noedit = true
								result[i].measureType = 0
							}
							this.yetForm.quotaDistribution = result
							this.yetForm.quotaDistribution[0].title = "选择事业部："
							this.yetForm.copyquotaDistribution = Object.deepClone(this.yetForm.quotaDistribution)
							this.yetForm.copylen = this.yetForm.copyquotaDistribution.length
							callback.call(this, data.result.use)
						}
					}).catch((err) => {
						
					})
			},
			init() {
				this.getType()
				this.queryDistributeDepart(function(use) {
					let __use = Object.isNotEmpty(use)?use:{
						amount: 0,
						hour: 0
					}
					this.availableHours = __use.hour
					this.balance = __use.amount
					//判断取哪的数据
					if(this.type != '') {
						if(this.$store.getters.doTaskItem.status == 2) {
							this.openForm.isEdit = 'edit'
							this.openForm.reapply = 'Y'
							this.openForm.buzId = this.$store.getters.doTaskItem.buzId
							this.setDepartment()
						} else {
							delete this.openForm.isEdit
							delete this.openForm.reapply
							delete this.openForm.buzId
						}
					} else {
//						this.state.pjManagement_UnFinished.project_item_data || {}
					}
					this.getDepartTree()
					this.openForm.itemId = +this.$route.params.id.split('-')[0]
					this.openForm.taskId = this.$store.getters.doTaskItem.taskId
					this.openForm.ucId = this.loginInfo.uc.id
					this.openForm.departId = this.loginInfo.uc.departId
				})
			},
			/**
			 * 选择：未分配部门
			 */
			getDepartTree: function() {
				this.$http.post("/api/depart/departTree", null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							var result = data.result;
							this.dataTree = result;
						}
					}).catch((err) => {
						
					})
			},
			setDepartment() {
				for(let i in this.openForm.quotaDistribution) {
					if(Object.isNotEmpty(this.openForm.quotaDistribution[i].departModel)) {
						this.openForm.quotaDistribution[i].namex = this.openForm.quotaDistribution[i].departModel.label
						this.openForm.quotaDistribution[i].departId = this.openForm.quotaDistribution[i].departModel.id
					}
				}
			},
			addBranch: function() {
				if(!Array.isArray(this.openForm.quotaDistribution)) {
					this.openForm.quotaDistribution = []
				}
				this.openForm.quotaDistribution.push({
					namex: '',
					amount: '',
					departId: '',
					hour: '',
					id: '',
					departModel: {},
					measureType: 0
				})
			},
			compare(ary) {
				let v = ary.shift()
				var _d
				let item = this.calculationHour(v['name'])
				_d = this[v.CName]
				if(item > (!!parseFloat(_d) ? parseFloat(_d) : 0)) {
					this.$message({
						customClass: 'error',
						message: v.tip
					})
					return false
				}
				if(ary.length > 0) {
					let status = this.compare(ary)
					if(status != false) {
						return true
					}
					return false
				}
			},
			calculationHour(name) {
				let flags = 0;
				this.openForm.quotaDistribution.forEach((item, index) => {
					flags += parseInt(item[name])
				})
				return flags
			},
			validateOfSure() {
				let _self = this
				function type() {
					if (Object.isEmpty(_self.type)) {
						for (let i in _self.yetForm.quotaDistribution) {
							let division = _self.yetForm.quotaDistribution[i]
							if (division.isAuth == 0) {
								_self.$message({
									customClass: 'error',
									message: '额度再分配正在审核中，暂时不允许操作！'
								})
								return false
							}
						}
					}
					return 'next'
				}
				function noAction(){
					let yetFormDepartList = Object.deepClone(_self.yetForm.quotaDistribution)
					let flag = [],item,yetFormCopy = _self.yetForm.copyquotaDistribution
					if (_self.yetForm.copylen == yetFormDepartList.length) {
						for (var i = 0;i < yetFormDepartList.length;i++) {
							item = yetFormDepartList[i]
							if (
								item.amount == yetFormCopy[i].amount && 
								item.hour == yetFormCopy[i].hour
							) {
								flag.push(true)
							} else {
								flag.push(false)
							}
						}
					} else {
						flag.push(false)
					}
					if (_self.openForm.quotaDistribution.length) {
						for (let i in _self.openForm.quotaDistribution) {
							if (
								Object.isEmpty(_self.openForm.quotaDistribution[i].amount) && 
								Object.isEmpty(_self.openForm.quotaDistribution[i].hour) && 
								Object.isEmpty(_self.openForm.quotaDistribution[i].departModel)
							) {
								flag.push(true)
							} else {
								flag.push(false)
							}
						}
					}
					if (flag.indexOf(false) == -1) {
						//yetform都没改动
						_self.$message({
							customClass: 'error',
							message: '请重新分配额度或工时'
						})
						return false
					}
					return 'next'
				}
				function isDoing() {
					let isDoing = _self.compare([{
							name: 'amount',
							CName: 'balance',
							tip: '分配额度总和大于未分配额度'
						},
						{
							name: 'hour',
							CName: 'availableHours',
							tip: '分配工时总和大于总工时'
						}
					])
					if (isDoing) {
						return 'next'
					} else {
						return false
					}
				}
//				function isClickPopTipsType() {
//					if (_self.poptipsType > 0) {
//						return "next"
//					} else {
//						_self.$message({
//							customClass: 'success',
//							message: 'xxxxx!!!!!!'
//						})
//						return false
//					}
//				}
				return {
					type: new ResponseChain(type),
					noAction: new ResponseChain(noAction),
					isDoing: new ResponseChain(isDoing)
				}
			},
			sure(formName) {
				let validateChain = this.validateOfSure()
//				validateChain.type.setNext(validateChain.isClickPopTipsType)
				let isPass = validateChain.type.transmit()
				if (!isPass) {
					return void(0)
				}
				this.$refs['yetForm'].validate((valid) => {
					if(valid) {
						this.$refs[formName].validate((valid) => {
							if(valid) {
								this.setDepartment()
								;(function() {
									let yetFormDepartList = Object.deepClone(this.yetForm.quotaDistribution)
									this.retForm = Object.deepClone(this.openForm)
									this.retForm.quotaDistribution = [...this.openForm.quotaDistribution, ...yetFormDepartList]
									for (let i in this.retForm.quotaDistribution) {
										if (Object.isEmpty(this.retForm.quotaDistribution[i].departId)) {
											this.retForm.quotaDistribution.splice(i, 1)
										}
									}
								}.call(this))
								this.$http.post("/api/distribute/distribute", this.retForm, {
									emulateJSON: false
								}).then((res) => {
									let data = res.data;
									if(data.success) {
										this.$message({
											customClass: 'success',
											message: '分配成功'
										})
										this.dialogVisible = false
									} else {
										this.$message({
											customClass: 'error',
											message: res.data.message,
										})
									}
								}).catch((err) => {
									;
								});
							} else {
								return false;
							}
						})
					} else {
						return false
					}
				})
			},
			cancel() {
				this.dialogVisible = false
			},
			delAbtYetVisible(division) {
				if (
					Object.isNotEmpty(this.type) &&
					division.isDeleted == 1 && 
					division.authStatus == 2
				) {
					return true
				}
				return false
			},
			delAbtYet(index, item) {
				let data = this.$store.getters.doTaskItem
				let submitDeleteData = {
					itemId: data.item_id,
					departId: item.departId,
					id: item.id
				}
				this.$http.post("/api/distribute/delDistributeDepart", submitDeleteData, {
						emulateJSON: true
					})
					.then((res) => {
						let data = res.data;
						let use = data.result
						if(data.success) {
							this.yetForm.copyquotaDistribution.splice(index, 1)
							this.yetForm.quotaDistribution.splice(index, 1)
							this.$set(this.$data, 'balance', use.amount)
							this.$set(this.$data, 'availableHours', use.hour)
						}
					}).catch((err) => {
						
					});
			},
			deleteDepart(index) {
				let data = this.$store.getters.doTaskItem
				if(Object.isEmpty(data)) {
					this.openForm.quotaDistribution.splice(index, 1)
					return
				}
				if(data.status != 2 || !this.openForm.quotaDistribution[index].id) {
					this.openForm.quotaDistribution.splice(index, 1)
					return
				}
			}
		}
	}
</script>

<style scoped>
	.poptips {
		color: #ffffff;
		position: absolute;
		font-size: 12px;
		background: #000000;
		border-radius: 2px;
		width: 112px;
		top: -24px;
		padding: 0;
		left: 50%;
		margin-left: -56px;
	}
	.poptips:before{
		content: "";
		position: absolute;
		bottom: -4px;
		left: 50%;
		margin-left: -4px;
		border-left: 4px solid transparent; 
		border-right: 4px solid transparent; 
		border-top: 6px solid #000; 
	}
	.poptips span{
		cursor: pointer;
		float: left;
		padding: 0;
		line-height: 1.6;
		margin-left: 4px;
	}
	.el-form-item {
		position: relative;
	}
	.my-self__unit {
		position: absolute;
		right: 5px;
		color: #666;
		font-size: 12px;
		z-index: 1;
	}
	.my-self__unit.m{
		top: 3px;
	}
	.my-self__unit.s{
		top: 4px;
	}
	.rowlabel {
		text-align: left;
		font-size: 12px;
		color: #000000;
		line-height: 1;
		float: left;
		display: block;
		width: 73px;
		padding: 11px 0px 11px 0;
		box-sizing: border-box;
	}
	
	.implement {
		padding-bottom: 8px;
	}
	
	.implement span:first-child {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
		margin-right: 4px;
	}
	
	.implement span:nth-child(2) {
		font-family: 'PingFangSC-Regular';
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 17px;
		margin-left: 4px;
	}
	
	.implement span:nth-child(3) {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 12px;
		color: #295DCF;
		letter-spacing: 0;
		line-height: 17px;
	}
	
	.implement span:nth-child(4) {
		font-family: 'PingFangSC-Regular';
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 17px;
		margin-left: 4px;
	}
	
	.implement span:nth-child(5) {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 12px;
		color: #295DCF;
		letter-spacing: 0;
		line-height: 17px;
	}
	
	.content {
		text-align: center;
		font-size: 12px;
		color: #000000;
	}
	
	.btn {
		width: 90px;
		height: 30px;
		padding: 0;
		border-radius: 2px;
	}
	
	.sure {
		background: #295DCF;
	}
	
	.cancel {
		background: #F2F2F2;
		border: none;
	}
	
	.delete {
		cursor: pointer;
	}
	.dialog-text {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
	}
</style>
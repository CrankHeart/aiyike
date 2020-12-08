<template>
	<div class="ammx">
		<!--项目额度分配 --弹窗 -->
		<el-dialog title="分配部门" :visible.sync="dialogVisible" class="dialog442" :close-on-click-modal="false">
			<el-form :model="logForm" ref="logForm" label-position="left" v-if="!type">
				<el-form-item v-for="(division, index) in logForm.quotaDistribution" :key="index">
					<label class="rowlabel">归还记录</label>
					<el-row class="clearfix" :gutter="20" style="margin-left: 74px;display: block;">
						<el-col :span="8">
							<el-form-item
									:prop="'quotaDistribution.' + index + '.repayamount'" 
									:rules="logFormAmountRule()" unit="元">
								<el-input v-model="division.repayamount" placeholder="额度(元)" auto-complete="off" class="elinput"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item
									:prop="'quotaDistribution.' + index + '.repayhour'" 
									:rules="logFormHoursRule()" unit="h">
								<el-input v-model="division.repayhour" placeholder="时间(h)" auto-complete="off" class="elinput"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
						</el-col>
						<el-col :span="2">
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div class="implement">
				<span>部门额度分配</span>
				<span>未分配额度 </span>
				<span>{{balanceText | nullformat('0')}}元</span>
				<span>未分配工时 </span>
				<span>{{availableHoursText | nullformat('0')}}h</span>
			</div>
			<el-form :model="yetForm" ref="yetForm" label-position="left">
				<el-form-item v-for="(division, index) in yetForm.quotaDistribution" :key="index">
					<label class="rowlabel">{{division.title}}</label>
					<el-row class="clearfix" :gutter="20" style="margin-left: 74px;display: block;">
						<el-col :span="8">
							<el-form-item>
								<el-input v-model="division.namex" :readonly="true"></el-input>
								<el-input v-show="false" v-model="division.departId" :readonly="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item
									:prop="'quotaDistribution.' + index + '.tAmount'" 
									:rules="yetFormAmountRule(index)"  unit="元">
								<el-input v-model="division.tAmount" placeholder="额度(元)" auto-complete="off" class="elinput"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item
									:prop="'quotaDistribution.' + index + '.tH'" 
									:rules="yetFormHoursRule(index)" unit="h">
								<el-input v-model="division.tH" placeholder="时间(h)" auto-complete="off" class="elinput"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<el-form :model="openForm" ref="openForm" label-position="left">
				<el-form-item v-for="(division, index) in openForm.quotaDistribution" :key="index">
					<label class="rowlabel">{{division.title}}</label>
					<el-row class="clearfix" :gutter="20" style="margin-left: 74px;display: block;">
						<el-col :span="8">
							<el-select v-model="division.departId" placeholder="请选择">
								<el-option v-for="item in openForm.departList" :key="item.id" :label="item.label" :value="item.id" :disabled="item.isDisabled">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="7">
							<el-form-item
									:prop="'quotaDistribution.' + index + '.tAmount'" 
									:rules="openFormAmountRule()" unit="元">
								<el-input v-model="division.tAmount" placeholder="额度(元)" auto-complete="off" class="elinput"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item
									:prop="'quotaDistribution.' + index + '.tH'" 
									:rules="openFormHoursRule()" unit="h">
								<el-input v-model="division.tH" placeholder="时间(h)" auto-complete="off" class="elinput"></el-input>
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
							<el-button class="addDivision" @click="addBranch">+ 添加部门</el-button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="sure btn" type="primary" @click="sure('openForm')">确 定</el-button>
				<el-button class="cancel btn" @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	let DepartmentDialogTree = () =>
		import('@/components/DepartmentDialogTree.vue')

	export default {
		name: 'Distribute_Depart_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			itemId: {
				default: ''
			}
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				if (val) {
					this.$nextTick(()=>{
						this.obtainVal()
					})
				}
				this.$emit('update:visible', val)
			},
			itemId(val) {
				this.openForm.itemId = val
			},
			'state.doTaskItem': {
				deep: true,
				handler(val) {
					this.obtainVal()
				}
			}
		},
		data() {
			return {
				tAmount: 0,
				tH: 0,
				loginInfo: JSON.parse(Cache.local(Config.Login)),
				item: {},
				state: this.$store.state,
				dialogVisible: false,
				logForm: {
					quotaDistribution: [{
						repayamount: '',
						repayhour: ''
					}]
				},
				yetForm: {
					quotaDistribution: [],
					copyquotaDistribution: [],
					copylen: 0
				},
				openForm: {
					departList: [],
					quotaDistribution: [{
						title: "",
						tAmount: '',
						departId: '',
						tH: ''
					}],
					itemId: '',
					taskId: '',
					ucId: '',
					departId: '',
					isPass: 'Y'
				},
				formLabelWidth: '65px',
				retForm: {},
				type: this.$route.params.id.split('-')[2],
				submitUrl: '',
				category: '',
			};
		},
		components: {
			DepartmentDialogTree
		},
		computed: {
			balanceText() {
				let ret
				let b = 0
				let _quo
				let _copyquo
				;(function() {
					for (let i in this.yetForm.quotaDistribution) {
						_quo = this.yetForm.quotaDistribution[i].tAmount
						_copyquo = this.yetForm.copyquotaDistribution[i].tAmount
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`) && 
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_copyquo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							_copyquo = this.octToDecNot0(_copyquo)
							b += _quo - _copyquo
						}
					}
					for (let i in this.logForm.quotaDistribution) {
						_quo = this.logForm.quotaDistribution[i].repayamount
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							b += _quo
						}
					}
					for (let i in this.openForm.quotaDistribution) {
						_quo = this.openForm.quotaDistribution[i].tAmount
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							b += _quo
						}
					}
				}.call(this))
				if (b <= this.tAmount) {
					ret = this.tAmount - b
				}else {
					ret = this.tAmount
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
						_quo = this.yetForm.quotaDistribution[i].tH
						_copyquo = this.yetForm.copyquotaDistribution[i].tH
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`) && 
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_copyquo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							_copyquo = this.octToDecNot0(_copyquo)
							b += _quo - _copyquo
						}
					}
					for (let i in this.logForm.quotaDistribution) {
						_quo = this.logForm.quotaDistribution[i].repayhour
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							b += _quo
						}
					}
					for (let i in this.openForm.quotaDistribution) {
						_quo = this.openForm.quotaDistribution[i].tH
						if (
							/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(`${_quo}`)
						) {
							_quo = this.octToDecNot0(_quo)
							b += _quo
						}
					}
				}.call(this))
				if (b <= this.tH) {
					ret = this.tH - b
				}else {
					ret = this.tH
				}
				return ret.toFixed(2)
			}
		},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			yetFormAmountRule(index) {
				let validate = (rule, value, callback) => {
			        if (+value < +this.yetForm.copyquotaDistribution[index].oldAmount) {
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
								ret = this.tAmount
								for (let i in this.logForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.logForm.quotaDistribution[i].repayamount)
									b += _quot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].tAmount)
									b += _quot
								}
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].tAmount)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].tAmount)
									b += _quot - _copyquot
									if (b > ret) {
										this.yetForm.quotaDistribution[i].tAmount = _quot - (b - ret) + ''
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
				console.log(this.category+'category')
				let validate = (rule, value, callback) => {
					if (+value < +this.yetForm.copyquotaDistribution[index].oldHour) {
			          	callback(new Error('不能小于已分配工时'));
			        } else if ((this.category==2 || this.category==4) && !/^\+?[1-9][0-9]{0,7}$/.test(value)) {
			        	callback(new Error('工时输入不正确'));
			        } else if (!/^\+?[0-9][0-9]{0,7}$/.test(value)) {
			        	callback(new Error('工时输入不正确'));
			        } else {
			        	this.$nextTick(()=>{
					        ;(function() {
					        	let b = 0
					        	let ret
					        	let _quot
					        	let _copyquot
								ret = this.tH
								for (let i in this.logForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.logForm.quotaDistribution[i].repayhour)
									b += _quot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].tH)
									b += _quot
								}
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].tH)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].tH)
									b += _quot - _copyquot
									if (b > ret) {
										this.yetForm.quotaDistribution[i].tH = _quot - (b - ret) + ''
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
			openFormAmountRule() {
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
								ret = this.tAmount
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].tAmount)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].tAmount)
									b += _quot - _copyquot
								}
								for (let i in this.logForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.logForm.quotaDistribution[i].repayamount)
									b += _quot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].tAmount)
									b += _quot
									
									if (b > ret) {
										this.openForm.quotaDistribution[i].tAmount = _quot - (b - ret) + ''
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
			openFormHoursRule() {
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
								ret = this.tH
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].tH)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].tH)
									b += _quot - _copyquot
								}
								for (let i in this.logForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.logForm.quotaDistribution[i].repayhour)
									b += _quot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].tH)
									b += _quot
									if (b > ret) {
										this.openForm.quotaDistribution[i].tH = _quot - (b - ret) + ''
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
			logFormAmountRule() {
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
								ret = this.tAmount
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].tAmount)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].tAmount)
									b += _quot - _copyquot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].tAmount)
									b += _quot
								}
								for (let i in this.logForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.logForm.quotaDistribution[i].repayamount)
									b += _quot
									if (b > ret) {
										this.logForm.quotaDistribution[i].repayamount = _quot - (b - ret) + ''
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
			logFormHoursRule() {
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
								ret = this.tH
								for (let i in this.yetForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.yetForm.quotaDistribution[i].tH)
									_copyquot = this.octToDecNot0(this.yetForm.copyquotaDistribution[i].tH)
									b += _quot - _copyquot
								}
								for (let i in this.openForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.openForm.quotaDistribution[i].tH)
									b += _quot
								}
								for (let i in this.logForm.quotaDistribution) {
									_quot = this.octToDecNot0(this.logForm.quotaDistribution[i].repayhour)
									b += _quot
									if (b > ret) {
										this.logForm.quotaDistribution[i].repayhour = _quot - (b - ret) + ''
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
			octToDecNot0(n) {
				let ret = n.toString()
				if (ret.length > 0) {
					if (ret.indexOf('0') == 0) {
						ret = ret.substring(1, ret.length)
					}
				}
				return +ret
			},
			async obtainDetails() {
				let data = {}
				data = await new Promise((resolve,reject)=>{
					this.$http.post("/api/distribute/performDirectorByDepart", {
						itemId: this.openForm.itemId,
						ucId: this.loginInfo.uc.id
					}, {
                        emulateJSON: true
                    }).then((res) => {
                    	resolve(res.data.result)
                    }).catch((err) => {
                    })
				})
				return data
			},
			async obtainVal() {
				let [subItemDistributeList,subDepartList,tH,tAmount] = [[],[],0,0]
				if (Object.isEmpty(this.type)) {
					this.submitUrl = "/api/distribute/performDirector"
					this.category = this.state.pjManagement_UnFinished.project_item_data.category
					this.openForm.itemId = this.$route.params.id.split('-')[0]
					let data = await this.obtainDetails()
					subItemDistributeList = data.subItemDistributeList || []
					subDepartList = data.subDepartList || []
					tH = data.hour || 0
					tAmount = data.amount || 0
				} else {
					this.submitUrl = "/api/distribute/distributeDepart"
					this.category = this.$store.getters.doTaskItem.itemCategory
					this.openForm.itemId = this.$store.getters.doTaskItem.item_id
					subItemDistributeList = this.$store.getters.doTaskItem.subItemDistributeList || []
					subDepartList = this.$store.getters.doTaskItem.departList || []
					tH = Object.deepClone(this.$store.getters.doTaskItem.buBalanceHour) || 0
					tAmount = Object.deepClone(this.$store.getters.doTaskItem.buDepartBalanceAmount) || 0
				}
				this.yetForm.quotaDistribution = Object.deepClone(subItemDistributeList)
				for (let i in this.yetForm.quotaDistribution) {
					this.yetForm.quotaDistribution[i].tAmount = this.yetForm.quotaDistribution[i].tAmount.toString()
					this.yetForm.quotaDistribution[i].tH = this.yetForm.quotaDistribution[i].tH.toString()
				}
				this.yetForm.copyquotaDistribution = Object.deepClone(this.yetForm.quotaDistribution)
				this.yetForm.copylen = this.yetForm.copyquotaDistribution.length
				if (this.yetForm.copylen){
					this.yetForm.quotaDistribution[0].title = "分配部门："
				} else {
					this.openForm.quotaDistribution[0].title = "分配部门："
				}
				let yetDepartIds = []
				for (let i in this.yetForm.quotaDistribution) {
					yetDepartIds.push(this.yetForm.quotaDistribution[i].departId)
				}
				this.openForm.taskId = this.$store.getters.doTaskItem.taskId
				this.openForm.ucId = this.loginInfo.uc.id
				this.openForm.departId = this.loginInfo.uc.departId
				this.openForm.departList = Object.deepClone(subDepartList)
				for (let i in this.openForm.departList) {
					if (yetDepartIds.indexOf(this.openForm.departList[i].id) != -1) {
						this.openForm.departList[i].isDisabled = true
					}
				}
				this.tH = tH
				this.tAmount = tAmount
			},
			addBranch: function() {
                if (!Array.isArray(this.openForm.quotaDistribution)) {
                    this.openForm.quotaDistribution = []
                }
				this.openForm.quotaDistribution.push({
					tAmount: '',
					departId: '',
					tH: ''
				})
			},
			sure(formName) {
                this.$refs[formName].validate((valid) => {
					if (valid) {
						let yetFormDepartList = Object.deepClone(this.yetForm.quotaDistribution)
						this.retForm = Object.deepClone(this.openForm)
						this.retForm.quotaDistribution = [...this.openForm.quotaDistribution, ...yetFormDepartList]
						for (let i in this.retForm.quotaDistribution) {
							if (Object.isEmpty(this.retForm.quotaDistribution[i].departId)) {
								this.retForm.quotaDistribution.splice(i, 1)
							}
						}
						if (Object.isEmpty(this.type)) {
							this.retForm.repayamount = this.logForm.quotaDistribution[0].repayamount
							this.retForm.repayhour = this.logForm.quotaDistribution[0].repayhour
						}
                        this.$http.post(this.submitUrl, this.retForm, {
                            emulateJSON: false
                        }).then((res) => {
                            let data = res.data;
                            if(data.success) {
                                this.$message({
                                    customClass: 'success',
                                    message: '分配部门成功'
                                })
                                this.dialogVisible = false
                            } else {
                                this.$message({
                                    customClass: 'error',
                                    message: '分配部门失败'
                                })
                            }
                        }).catch((err) => {
                            
                        })
					}
				})

			},
			cancel() {
				this.dialogVisible = false
			},
            deleteDepart(index){
                this.openForm.quotaDistribution.splice(index,1)
			}
		}
	}
</script>

<style scoped>
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
		vertical-align: middle;
		font-size: 12px;
		color: #000000;
		line-height: 1;
		float: left;
		display: inline-block;
		width: 73px;
		padding: 11px 0px 11px 0;
		box-sizing: border-box;
	}
	
	.dialog442 .implement:nth-last-of-type(1) {
		float: none;
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
	.delete{
		cursor: pointer;
	}
</style>
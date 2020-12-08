<template>
	<el-form :inline="true" :model="data" ref="ruleForm" label-width="64px" label-position="left" class="outItemStepsForm ayk-form__novlilabel ayk-form__itemmb2">
		<div v-for="(item, index) in data.departments">
			<el-form-item label="评估部门：" :prop="'departments.' + index + '.departIndex'" :rules="departIndexRule(index)">
				<el-select v-model="item.departIndex" placeholder="请选择" class="w140" @change="handlerSelect(item, index)">
					<el-option :disabled="disabledVali(i)" :key="i" v-for="(dps, i) in departs" :label="dps.label" :value="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="评估人：" class="ml10" :prop="'departments.' + index + '.ucName'" :rules="ucNameRule(index)">
				<el-input readonly v-model="item.ucName" class="w140 ml-10" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="评估工时：" unit="h" class="ml10" :prop="'departments.' + index + '.hour'" :rules="hourRule(index)">
				<el-input v-model="item.hour" class="w140" placeholder="请输入工时"></el-input>
				<i @click="delclick" v-if="index == data.departments.length-1 && index!=0" class="el-icon-delete level_remove"></i>
			</el-form-item>
		</div>
		<div>
			<el-form-item label=" ">
				<el-input class="w140 addclick-input" placeholder="添加" readonly @click.native="addclick"></el-input>
			</el-form-item>
		</div>
		<el-form-item label="评估总价：">
			<el-input v-model="data.totalMoney" class="w140" :disabled="true"></el-input>&nbsp;元
		</el-form-item>
		<el-form-item class="btn-group">
			<el-button class="submitbtn" type="primary" @click="lastStep">上一步</el-button>
			<el-button class="submitbtn" type="primary" @click="nextStep">下一步</el-button>
			<el-button class="cancelbtn" @click="cancel">取消</el-button>
		</el-form-item>
		<div v-show="false">
			{{hourValidate()}}
			{{price}}
		</div>
	</el-form>
</template>

<script>
	import FloatTool from '@/utils/FloatTool.js'
	export default {
		name: "InternalAssessMent",
		props: {
			data: {
				type: Object,
				default: function() {
					return {
						editStateEndFlag: false
					}
				}
			}
		},
		data() {
			return {
				departs: []
			}
		},
		watch: {
			'data':{
				deep: true,
				handler(val) {
					this.obtainDepart(val.itemId)
					if (Object.isNotEmpty(val.departments) && this.data.editState && !this.editStateEndFlag) {
						let handler = () => {
							let departIds = this.departs.map((item) => {
								return item.id
							})
							val.departments.forEach((item, index)=> {
								let departIndex = departIds.indexOf(item.departId)
								if (departIndex != -1) {
									this.$set(this.data.departments[index], 'departIndex', departIndex)
									this.handlerSelect(item, item.departIndex)
								} else {
									this.$set(this.data.departments[index], 'departIndex', '')
								}
							})
							this.editStateEndFlag = true	
						}
						if (!this.departs.length) {
							this.obtainDepart(val.item.id, (departs)=> {
								handler()
							})
						} else {
							handler()
						}
					}
				}
			}
		},
		computed: {
			departmentsLen() {
				let count = 0
				this.data.departments.forEach((item, index) => {
					if (Object.isNotEmpty(item.departIndex)) {
						count++
					}
				})
				return count
			},
			price() {
				let totalMoney = 0,totaluprice = 0,totalprice = 0
				this.data.departments.forEach((item, index) => {
					if (Object.isEmpty(item.uprice))
						item.uprice = 0
					else
						item.uprice = +item.uprice
					totaluprice = FloatTool.add(totaluprice, parseFloat(item.uprice).toFixed(2))
					totalprice = FloatTool.multiply(item.hour, parseFloat(item.uprice).toFixed(2))
					if(Object.isEmpty(totalprice))
						totalMoney = FloatTool.add(totalMoney, 0)
					else
						totalMoney = FloatTool.add(totalMoney, totalprice)
				})
				this.data.aveAmount = FloatTool.divide(totaluprice, this.departmentsLen)
				this.data.totalMoney = totalMoney
				return totalMoney
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.$parent.mountedComplete && this.$parent.mountedComplete()
			})
		},
		methods: {
			disabledVali(index) {
				let departIndexs = this.data.departments.filter((item)=>{
					if (Number.isNumber(item.departIndex) && item.departIndex != -1) {
						return true
					}
					return false
				}).map((item)=>{
					return item.departIndex
				})
				if (departIndexs.indexOf(+index) != -1) {
					return true
				}
				return false
			},
			departIndexRule() {
				return [
				  	{required: true,type: 'number',message: '请选择部门',trigger: 'change'}
				]
			},
			ucNameRule() {
				return [
				  	{required: true,message: '评估人不能为空',trigger: 'change'}
				]
			},
			hourRule() {
				return [
				  	{required: true,message: '请输入工时',trigger: 'blur,change'}
				]
			},
			hourValidate() {
				let totalHour = 0,ret = true
				this.data.departments.forEach((item, index) => {
					totalHour += parseInt(item.hour)
				})
				if (totalHour > this.data.item.available_hours) {
					this.$message({
						message: `总工时不能大于${this.data.item.available_hours}`,
						customClass: 'success'
					});
					ret = false
				} else {
					this.data.totalHour = totalHour
				}
				return ret
			},
			obtainDepart(id, callback) {
				if (!id) {
					this.departs = [];
					return void 0
				}
				this.$http.post('/api/itemOut/queryDepartByDistribute', {
					itemId: id
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.departs = data.result;
						callback && callback(this.departs)
					}
				}).catch((err) => {})
			},
			handlerSelect(item, index) {
				let departName = this.departs[item.departIndex] && this.departs[item.departIndex].label
				let departId = this.departs[item.departIndex] && this.departs[item.departIndex].id
				if (departName && departId) {
					item.departName = departName
					item.departId = departId
				} else {
					return void 0
				}
				let pricePromise = new Promise((resolve, reject) => {
					this.$http.post('/api/item/getPriceBydepartOut', {
						departId: item.departId
					}, {
						emulateJSON: true
					}).then((res) => {
						let data = res.data;
						if(data.success) {
							resolve(data.result)
						}
					}).catch((err) => {})
				})
				let leaderPromise = new Promise((resolve, reject) => {
					this.$http.post('/api/depart/queryLeaderByDepartId', {
						departId: item.departId
					}, {
						emulateJSON: true
					}).then((res) => {
						let data = res.data;
						if(data.success) {
							resolve(data.result)
						}
					}).catch((err) => {})
				})
				Promise.all([pricePromise, leaderPromise]).then(values => {
					let [prices, leaders] = values
					this.$set(this.data.departments[index], 'uprice', prices)
					this.$set(this.data.departments[index], 'ucId', leaders.id)
					this.$set(this.data.departments[index], 'ucName', leaders.userName)
				})
			},
			addclick() {
				this.data.departments.push({
					departIndex: '',
					departId: '',
					departName: '',
					ucId: '',
					ucName: '',
					hour: '',
					uprice: ''
				})
			},
			delclick() {
				if(this.data.departments.length) {
					this.data.departments.pop()
				}
			},
			lastStep() {
				let index = this.$parent.getStepsIndex() - 1
				this.$emit("back", "OutItemMgtSteps", {
					stepsIndex: index
				})
			},
			nextStep() {
				if(this.hourValidate()) {
					let index = this.$parent.getStepsIndex() + 1
					this.$emit("back", "OutItemMgtSteps", {
						stepsIndex: index
					})
				}
			},
			cancel() {
				this.$emit("back", "outItemMgt")
			}
		}
	}
</script>

<style scoped>
	.level_remove {
		color: #999;
		cursor: pointer;
		margin-left: 6px;
		vertical-align: middle;
		font-size: 12px;
	}
	
	.ml-10 {
		margin-left: -10px;
	}
	
	.ml10 {
		margin-left: 10px;
	}
	
	.w150 {
		width: 150px;
	}
	
	.w240 {
		width: 240px;
	}
	
	.w458 {
		width: 458px;
	}
	
	.w340 {
		width: 340px;
	}
	
	.w140 {
		width: 140px;
	}
	
	.btn-group {
		text-align: right;
		margin-top: 30px;
	}
</style>
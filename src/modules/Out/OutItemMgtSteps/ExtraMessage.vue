<template>
	<el-form :model="data" ref="extraForm" label-width="88px" label-position="left" class="outItemStepsForm form-itemmb2">
		<el-form-item label="截止日期：">
			 <el-date-picker type="date" placeholder="选择日期" v-model="endTimeObj"></el-date-picker>
		</el-form-item>
		<el-form-item label="目标外围团队：">
			<MultipleSelect search v-model="outCom" :options="outComOptions" :fieldsOptinos="{label:'name',value:'id'}"></MultipleSelect>
		</el-form-item>
		<el-form-item label="备注：">
			<el-input class="textarea" type="textarea" :autosize="{ minRows: 6}" placeholder="请输入内容" v-model="data.remark">
			</el-input>
		</el-form-item>
		<el-form-item class="btn-group">
			<el-button class="submitbtn" type="primary" @click="lastStep">上一步</el-button>
			<el-button class="submitbtn" type="primary" @click="submit" :disabled="submitDis">提交</el-button>
			<el-button class="cancelbtn" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	let MultipleSelect = () =>
		import('@/components/select/MultipleSelect.vue')
		
	export default {
		name: "ExtraMessage",
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		components: {
			MultipleSelect
		},
		data() {
			return {
				endTimeObj: null,
				outComOptions: [],
				outCom: [],
				itemInviteEditFlag: false,
				submitDis: false
			}
		},
		watch: {
			'data.endTime'(val) {
				if (Object.isNotEmpty(val) && this.data.editState) {
					this.endTimeObj = new Date(val)
				}
			},
			'data.itemInvite'(val) {
				if (Object.isNotEmpty(val) && val.length && this.data.editState && !this.itemInviteEditFlag) {
					let ids = val.map((item)=>{
						return item.busId
					})
					if (!this.outComOptions.length) {
						this.obtainOutComOptions((_options)=>{
							this.outCom = ids
						})
					} else {
						this.outCom = ids
					}
					this.itemInviteEditFlag = true
				}
			},
			endTimeObj(val) {
				if (Object.isNotEmpty(this.endTimeObj)) {
					this.data.endTime = `${val.format('yyyy-MM-dd')} 23:59:59`;
				}
			},
			outCom(val) {
				this.data.itemInvite = []
				this.outComOptions.forEach((item, index, arr) => {
					if(val.indexOf(item.id) != -1) {
						item.ucId = item.managerId
						item.busId = item.id
						this.data.itemInvite.push(item)
					}
				})
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.$parent.mountedComplete && this.$parent.mountedComplete()
				this.obtainOutComOptions()
			})
		},
		methods: {
			obtainOutComOptions(callback) {
				this.$http.post('/api/bus/loadOutComByApply', {
					}, {
						emulateJSON: true
					}).then((res) => {
						let data = res.data;
						if(data.success) {
							this.outComOptions = data.result;
							callback && callback(this.outComOptions)
						}
					}).catch((err) => {
					})
			},
			lastStep() {
				let index = this.$parent.getStepsIndex() - 1
				this.$emit("back", "OutItemMgtSteps", {
					stepsIndex: index
				})
			},
			submit() {
				this.submitDis = true
				this.$http.post("/api/ioApply/apply",this.data, {
                    emulateJSON: false
                }).then((res) => {
						let data = res.data;
						if(data.success) {
							this.$message({
								message: '提交成功',
								customClass: 'success'
							})
							this.cancel()
						} else {
							this.$message({
								message: data.message,
								customClass: 'error'
							})
						}
						this.submitDis = false
					}).catch((err) => {
						this.submitDis = false
                });
			},
			cancel() {
				this.$emit("back", "outItemMgt")
			}
		}
	}
</script>

<style scoped>
	.textarea {
		margin-top: 3px;
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
	
	.btn-group {
		text-align: right;
		margin-top: 30px;
	}
</style>
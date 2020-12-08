<template>
	<section class="wrap">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item>当前位置：外围管理</el-breadcrumb-item>
			<el-breadcrumb-item>申请外围团队</el-breadcrumb-item>
		</el-breadcrumb>
		<el-steps :space="360" :active="activeIndex" class="steps-layout" finish-status="success" align-center>
			<el-step title="基本信息"></el-step>
			<el-step title="内部评估"></el-step>
			<el-step title="附加信息"></el-step>
		</el-steps>
		<div class="page-layout">
			<div class="page-bg">
				<BaseInfo v-show="activeIndex == 0" @back="back" :data.sync="formData"></BaseInfo>
				<InternalAssessMent v-show="activeIndex == 1" @back="back" :data.sync="formData"></InternalAssessMent>
				<ExtraMessage v-show="activeIndex == 2" @back="back" :data.sync="formData"></ExtraMessage>
			</div>
			<div class="h24"></div>
		</div>
	</section>
</template>

<script>
	let BaseInfo = () => import('./BaseInfo.vue')
	let InternalAssessMent = () => import('./InternalAssessMent.vue')
	let ExtraMessage = () => import('./ExtraMessage.vue')
	
	export default {
		name: "OutItemMgtSteps",
		components: {
			BaseInfo,
			InternalAssessMent,
			ExtraMessage
		},
		props: {
			index: {
                type: Number,
                default: -1
			},
			data: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				activeIndex: -1,
				stepsView: null,
				mountedStatus: 0,
				mountedQueue: [],
				formData: {
					item: {},
					itemId: '',
					ucId: this.$store.getters.loginInfo.uc.id,
					type: '',
					reason: '',
					ba_name: '',
					manager: '',
					url: '',
					labels: [],
					description: '',
					departments: [{
						departIndex: '',
						departId: '',
						departName: '',
						ucId: '',
						ucName: '',
						hour: '',
						uprice: ''
					}],
					aveAmount: 0,
					totalHour: 0,
					totalMoney: 0,
					endTime: '',
					itemInvite: [],
					remark: ''
				}
			}
		},
		watch: {
			index() {
				this.setStepsIndex()
			},
			activeIndex(val) {
				this.$emit('update:index', val)
			},
			data(val) {
				this.$nextTick(()=>{
					this.dataHandler(val)
				})
			},
			mountedStatus(val) {
				if (val == 3) {
					while (this.mountedQueue.length){
						let fn = this.mountedQueue.pop()
						Function.isFunction(fn) && fn(this.data)
					}
				}
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.dataHandler(this.data)
				this.init()
			})
		},
		beforeDestroy() {
		},
		methods: {
			mountedComplete () {
				this.mountedStatus++
			},
			dataHandler(data) {
				if (Object.isNotEmpty(data)) {
					let handler = (data) => {
						if (data.editState) {
							delete this.formData.departments
						}
						let dataCopy = Object.deepClone(data)
						dataCopy.departments && dataCopy.departments.forEach((item, index)=>{
							item.hour = `${item.hour}`
						})
						for (let i in dataCopy) {
							this.$set(this.formData, i, dataCopy[i])
						}
						if (data.editState) {
							this.$set(this.formData, 'taskId', this.$store.getters.outItemAudit.taskId)
						}
					}
					if (this.mountedStatus != 3) {
						let fn = (data) => {
							handler(data)
						}
						this.mountedQueue.push(fn)
					} else {
						handler(data)
					}
				}
			},
			init() {
				this.setStepsIndex()
			},
			getStepsIndex() {
				return this.activeIndex
			},
			setStepsIndex() {
				this.activeIndex = this.index
				this.execStepsAction()
			},
			execStepsAction() {
				const ACTION = {
					BASE_INFO: 0,
					INTERNAL_ASSESSMENT: 1,
					EXTRA_MESSAGE: 2
				},
				handler = {
					[ACTION.BASE_INFO]() {
						this.stepsView = BaseInfo
					},
					[ACTION.INTERNAL_ASSESSMENT]() {
						this.stepsView = InternalAssessMent
					},
					[ACTION.EXTRA_MESSAGE]() {
						this.stepsView = ExtraMessage
					}
				}
				handler[this.activeIndex] && handler[this.activeIndex].call(this)
			},
			back(name, data) {
				this.$emit("replace", name, data)
			}
		}
	}
</script>

<style scoped>
	.page-layout {
		margin-top: -114px;
		padding-top: 140px;
		height: 100%;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		padding-bottom: 24px;
	}
	
	.page-bg {
		margin: auto;
		min-height: 100%;
		padding: 20px 20px 32px 30px;
		position: relative;
	}
	
	.h24 {
		height: 24px;
	}
</style>
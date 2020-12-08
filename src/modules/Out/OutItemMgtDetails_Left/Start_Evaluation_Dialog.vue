<!--外围项目管理详情-左侧开始评估对话框-->
<template>
	<el-dialog title="工作量评估" :visible.sync="dialogVisible" class="start_evaluation_dialog dialog442 ayk-form__novlilabel">
		<el-form ref="form" label-position="left" :model="form" label-width="120px">
			<el-form-item unit="h" :key="index" class="w154" :label="item.departName + '评估工时：'" v-for="(item, index) in form.departments" :prop="'departments.' + index + '.hour'" :rules="hourRule(index)">
				<el-input v-model="item.hour" placeholder="请输入" @change="hourChange"></el-input>
			</el-form-item>
			<el-form-item unit="元" label="单价：" prop="aveAmount" :rules="aveAmountRule()">
				<el-input v-model="form.aveAmount"></el-input>
			</el-form-item>
			<el-form-item class="bmitem" label="总价：">
				<p class="price">{{totalMoneyComputed}}<span class="utils">元</span></p>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sure">发送</el-button>
			    <el-button class="cancelbtn" @click="cancel">取消</el-button>
		    </span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'Start_Evaluation_Dialog',
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
				this.$emit('update:visible', val)
			}
		},
		data() {
			return {
				dialogVisible: false,
				departList: [],
				form: {
					ucId: this.$store.getters.loginInfo.uc.id,
					taskId: this.$store.getters.outItemAudit.taskId,
					ioApplyId: this.$store.getters.outItemAudit.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					isPass: "Y",
					departments: [],
					aveAmount: '',
					totalHour: '',
					totalMoney: '',
					reason: ""
				}
			};
		},
		components: {},
		computed: {
			totalMoneyComputed() {
				this.form.totalMoney = this.form.totalHour * this.form.aveAmount
				return this.form.totalMoney
			}
		},
		mounted: function() {
			this.dialogVisible = this.visible
			this.obtainDepatList()
		},
		methods: {
			hourChange(value) {
				let hours = 0
				this.form.departments.forEach((item, index) => {
					hours += (+item.hour)
				})
				this.form.totalHour = hours
			},
			hourRule() {
				let validate = (rule, value, callback) => {
					if(!/^[0-9]*?$/.test(value)) {
						callback(new Error('工时输入不正确'));
					} else {
						callback()
					}
				}
				return [{
						validator: validate,
						trigger: 'blur,change'
					},
					{
						required: true,
						message: '请输入工时',
						trigger: 'blur,change'
					}
				]
			},
			aveAmountRule() {
				let validate = (rule, value, callback) => {
					if(!/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(value)) {
						callback(new Error('单价输入不正确'));
					} else {
						callback()
					}
				}
				return [{
						validator: validate,
						trigger: 'blur,change'
					},
					{
						required: true,
						message: '请输入单价',
						trigger: 'blur,change'
					}
				]
			},
			obtainDepatList() {
				this.$http.post(`/api/ioApply/depatList/${this.$route.params.id.split("-")[0]}`, null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							data.result.depatList.forEach((item, index) => {
								item.hour = ``
							})
							this.form.departments = data.result.depatList
						}
					}).catch((err) => {})
			},
			sure() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						this.$http.post(`/api/ioApply/doInvite`, JSON.stringify(this.form), {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.dialogVisible = false
								this.$router.go(-1)
							}
						}).catch((err) => {})
					} else {
						return false;
					}
				});
			},
			cancel() {
				this.dialogVisible = false
			}
		}
	}
</script>

<style scoped>
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
	
	.el-form-item {
		margin-bottom: 2px;
	}
	
	.el-form-item .price {
		font-size: 16px;
		color: #295DCF;
		line-height: 40px;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.el-form-item .utils {
		font-size: 12px;
		color: #151515;
		letter-spacing: 0;
		line-height: 22px;
	}
	
	.bmitem {
		padding-bottom: 24px;
	}
</style>
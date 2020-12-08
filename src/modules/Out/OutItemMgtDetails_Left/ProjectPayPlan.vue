<!--外围项目管理详情-左侧审核按钮组-->
<template>
	<div>
		<div class="btn-area">
			<el-button class="statusbtn" type="primary" @click="write">填写付款计划</el-button>
		</div>
		<el-dialog title="付款计划" :visible.sync="dialogVisible" class="dialog442">
			<el-form class="ayk-form" ref="form" label-position="left" :model="form" label-width="44px">
				<div class="mb16">
					<span class="label-text">是否开发票：</span>
					<el-radio class="ayk-radione" v-model="form.isBill" :label="1">是</el-radio>
					<el-radio class="ayk-radione" v-model="form.isBill" :label="0">否</el-radio>
				</div>
				<el-row :key="index" v-for="(item, index) in form.payPlan">
					<el-col :span="11">
						<el-form-item label="日期：">
							<el-date-picker v-model="item.date" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="11" :offset="1">
						<el-form-item label="金额：" :prop="'payPlan.' + index + '.money'" :rules="moneyRule(index)">
							<el-input v-model="item.money" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1" class="center">
						<i v-if="index != 0" class="el-icon-delete level_remove" @click="delClick(index)"></i>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label=" ">
							<el-input class="addclick-input" placeholder="新增付款计划" readonly @click.native="addclick"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sure('form')">确定</el-button>
			    <el-button class="cancelbtn" @click="cancel()">取消</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'ProjectPayPlan',
		data() {
			return {
				dialogVisible: false,
				form: {
					ucId: this.$store.getters.loginInfo.uc.id,
					taskId: this.$store.getters.outItemAudit.taskId,
					ioApplyId: this.$store.getters.outItemAudit.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					isPass:"Y",
					isBill:1,
					payPlan:[
						{
							date: null,
							money: ''
						}
					]
				}
			};
		},
		components: {},
		mounted: function() {},
		methods: {
			moneyRule(index) {
				let validate = (rule, value, callback) => {
			        if (!/^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/.test(value)) {
			        	callback(new Error('金额输入不正确'));
			        } else {
			        	this.$nextTick(()=>{
			        		;(function() {
			/*		        	let b = 0
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
								}*/
							}.call(this))
				          	callback()
			        	})
			        }
		      	}
				return [
					{validator: validate, trigger: 'blur,change' },
					{required: true,message: '请输入金额',trigger: 'blur'},
				]
			},
			delClick(index) {
				this.form.payPlan.splice(index, 1)
			},
			addclick() {
				this.form.payPlan.push({
					date: null,
					money: ''
				})
			},
			write() {
				this.dialogVisible = true
			},
			sure(form) {
				this.$refs['form'].validate((valid) => {
				if(valid) {
				this.form.payPlan.forEach((item, index) => {
					if (Object.isNotEmpty(item.date) && !String.isString(item.date)) {
						item.date = item.date.format("yyyy-MM-dd")
					}
				})
				this.$http.post('/api/ioApply/payPlan', JSON.stringify(this.form), {
					emulateJSON: true
				}).then((res) => {
					let data = res.data
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: "提交成功"
						})
						this.$router.go(-1)
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						})
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

<style>
	.addclick-input:after{
	    margin-left: -50px;
	}
	.mb16 {
		margin-bottom: 16px;
	}
	
	.level_remove {
		color: #999;
		cursor: pointer;
		font-size: 12px;
		line-height: 36px;
	}
	
	.btn-area {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.label-text {
		font-size: 12px;
		color: #000000;
		margin-right: 8px;
	}
	
	.el-date-editor.el-input {
		width: 100%;
	}
	
	.center {
		text-align: center;
	}
</style>
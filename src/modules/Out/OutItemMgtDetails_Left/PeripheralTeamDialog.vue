<template>
	<div class="layout">
		<el-dialog title="评价外围团队" :visible.sync="dialogVisible" class="dialog442 customer_ev_dialog peripheralteam_dialog">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="星级：" prop="star">
					<el-rate v-model="form.star"></el-rate>
				</el-form-item>
				<el-form-item class="clearfix pteam_item nopadding-label" label="评价：" prop="description">
					<el-input placeholder="填写评论" :rows="3" class="textarea" type="textarea" v-model="form.description"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary"  @click="sure">确定</el-button>
			    <el-button class="cancelbtn" @click="cancel('form')">取消</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'PeripheralTeamDialog',
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
			},
			'state.outItemItem': {
				deep: true,
				handler(val) {
					this.form.tBusId = val.busId
				}
			}
		},
		data() {
			var checkStar = (rule, value, callback) => {
				if(!value) {
					callback(new Error('请选择星级'));
				} else {
					callback();
				}
			};
			return {
				dialogVisible: false,
				state: this.$store.state,
				form: {
					type: 3, //评价外围团队
					star: null,
					tBusId: this.$store.getters.outItemItem.busId,
					description: '',
					itemId: +this.$route.params.id.split('-')[0] //申请Id
				},
				rules: {
					star: [{
						validator: checkStar
					}],
				},
				flag: false
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			dealResData(str) {
				if(str.toLowerCase() === 'no') {
					str = '操作失败'
				}
				if(str.toLowerCase() === 'ok') {
					str = '操作成功'
				}
				return str
			},
			sure() {
				this.$refs["form"].validate((valid) => {
					if(valid) {
						this.$http.post('/api/itemComment/add', this.form, {
							emulateJSON: true
						}).then((res) => {
							let result = res.data.success
							if(result) {
								this.$message({
									message: '评价成功',
									customClass: 'success'
								});
								this.dialogVisible = false
								this.$refs["form"].resetFields()
							} else {
								let str = this.dealResData(res.data.message)
								this.$message({
									message: str,
									type: 'info'
								});
							}
						}).catch((err) => {

						});

					} else {
						return false;
					}
				});
			},
			cancel(formName) {
				this.dialogVisible = false
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.el-rate {
		line-height: 2;
	}
	
	.el-form-item {
		margin-bottom: 10px;
	}
	
	.textarea {
		margin-left: 62px;
		display: block;
		margin-right: 62px;
		box-sizing: border-box;
		padding-right: 62px;
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
</style>
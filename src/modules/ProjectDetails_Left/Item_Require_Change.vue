<!--项目管理-项目详情页-审核项目进度模块-->
<template>
	<div class="check_progress">
		<el-dialog title="审核项目需求变更" :visible.sync="dialogVisible">
			<el-form :model="itemRequireform" ref='itemRequireform' class="form-wrap">
				<div class="partmentprogress" v-for="(itemRequire,index) in itemRequireform.itemRequireList" :key='index'>
					<div>
						<span class="partment">主题：</span>
						<span class="progress">{{itemRequire.theme}}</span>
					</div>
					<div>
						<span class="partment">变更时间：</span>
						<span class="progress">{{itemRequire.create_time|fmtDate}}</span>
					</div>
					<div>
						<span class="partment">补充金额：</span>
						<span class="progress">{{itemRequire.money}}</span class="partment"><span>&nbsp;元</span>
					</div>
					<div>
						<span class="partment">评估工时：</span>
						<span class="progress">{{itemRequire.hour}}</span class="partment"><span>&nbsp;h</span>
					</div>
					<div class="note">
						<span class="partment">内容：</span>
						{{itemRequire.description}}
					</div>
					<div class="auditnot">
						<el-radio v-model="itemRequire.isPass" label="Y">审核通过</el-radio>
						<el-radio v-model="itemRequire.isPass" label="N">驳回</el-radio>
					</div>
					<el-form-item 
						v-if="itemRequire.isPass == 'N'"
						:prop="'itemRequireList.' + index + '.reason'"
						:rules="[
		                  { required: true, message: '驳回原因不能为空'}
		                ]">
						<el-input type="textarea" :rows="3" v-model="itemRequire.reason" placeholder="请输入驳回原因" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="submitbtn" type="primary" @click="sure('itemRequireform')">提交</el-button>
				<el-button class="cancelbtn" @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'Item_Require_Change',
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
				if (val) {
					this.$nextTick(()=>{
						this.init()
					})
				}
				this.$emit('update:visible', val)
			},
			'state.doTaskitemRequireList': {
				deep: true,
				handler(val) {
					this.init()
				}
			}
		},
		data() {
			return {
				state: this.$store.state,
				dialogVisible: false,
				itemRequireform: {
					itemRequireList: [],
					itemId: ''
					
				},
				itemList: null
			}
		},
		mounted() {
			this.dialogVisible = this.visible
		},
		methods: {
			init() {
				this.itemRequireform.itemId = +this.$route.params.id.split('-')[0]
				this.obtainSameItemList()
				this.setDataSourceIsPass()
			},
			obtainSameItemList() {
				var itemList = Object.deepClone(this.$store.getters.doTaskitemRequireList)
				for (var i = 0;i < itemList.length;) {
					if (itemList[i].item_id != this.itemRequireform.itemId) {
						itemList.splice(i, 1)
					} else {
						i++
					}
				}
				this.itemList = itemList
			},
			setDataSourceIsPass() {
				for (let i in this.itemList) {
					if (this.itemList[i].isPass != 'Y' && this.itemList[i].isPass != 'N') {
						this.$set(this.itemList[i], 'isPass','Y')
					}
				}
				this.itemRequireform.itemRequireList = this.itemList
			},
			sure(formName) {
				
				this.$refs[formName].validate((valid) => {
					if(valid){
						this.$http.post('/api/itemRequire/itemRequireAuth', this.itemRequireform, {
							emulateJSON: false
						})
						.then((res) => {
							let data = res.data.result;
							if(res.data.success) {
								this.dialogVisible = false
								this.$message({
						          	message: '审核项目需求变更成功',
						          	customClass: 'success'
						        })
							} else {
								this.$message({
						          	message: res.data.message,
						          	type: 'info'
						        })
							}
						}).catch((err) => {
							
						})
					}
				})
				
			},
			cancel() {
				this.dialogVisible = false
				this.$router.go(-1)
			}
		}
	};
</script>

<style scoped>
	.check_progress .partmentprogress {
		padding-top: 15px;
		margin-bottom: 15px;
		border-top: 1px solid #F1F1F1;
	}
	
	.check_progress .partmentprogress:first-of-type {
		border-top: none;
		padding-bottom: 0;
	}
	
	.check_progress .partmentprogress .partment {
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
		font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.check_progress .partmentprogress .progress {
		font-size: 12px;
		color: #295DCF;
		letter-spacing: 0;
		line-height: 17px;
	}
	
	.check_progress .partmentprogress .note {
		font-size: 12px;
		color: #999;
		letter-spacing: 0;
		margin-top: 6px;
	}
	
	.check_progress .partmentprogress .auditnot {
		margin-top: 12px;
		font-size: 12px;
		color: #000;
		letter-spacing: 0;
	}
</style>
<!--项目管理-项目详情页-审核项目进度模块-->
<template>
	<div class="check_progress">
		<el-dialog title="审核项目进度" :visible.sync="dialogVisible">
			<el-form :model="itemProgressRecord" ref="itemProgressRecord">
				<div class="partmentprogress" v-for="(itemList, index) in itemProgressRecord.itemList">
					<div>
						<span class="partment">{{itemList.departName}}更新进度到</span><span class="progress">&nbsp;{{selfParseFloat(updateProgressText(itemList))}}%</span>
					</div>
					<div class="note">
						备注:{{itemList.description}}
					</div>
					<div class="auditnot">
						<el-radio v-model="itemList.isPass" label="Y">审核通过</el-radio>
						<el-radio v-model="itemList.isPass" label="N">驳回</el-radio>
					</div>
					<el-form-item v-if="itemList.isPass == 'N'" :rules="{required: true, message: '请输入备注信息', trigger: 'blur,change'}" label="备注" class="el-nox nopadding-label" :prop="'itemList.' + index + '.reason'">
						<el-input type="textarea" :rows="3" v-model="itemList.reason" placeholder="请输入驳回原因" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureDec" class="submitbtn">提交</el-button>
				<el-button @click="cancel" class="cancelbtn">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'Review_Project_Schedule',
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
						this.setDataSourceIsPass()
					})
				}
				this.$emit('update:visible', val)
			},
			'state.doTaskItemProgressRecord': {
				deep: true,
				handler(val) {
					this.setDataSourceIsPass()
				}
			}
		},
		data() {
			return {
				dialogVisible: false,
				itemProgressRecord: {
					itemList: [],
					itemId: '',
					ucId: JSON.parse(Cache.local(Config.Login)).uc.id
				},
				itemList: null
			}
		},
		mounted() {
			this.dialogVisible = this.visible
		},
		methods: {
			selfParseFloat(num){
				let _numStr = `${parseFloat(num).toFixed(0)}`
				let _numSp = _numStr.split('.')
				let ret
				if (_numSp.length >= 2 && _numSp[1] == '0') {
					ret = _numSp[0]
				} else {
					ret = _numStr
				}
				return ret
			},
			updateProgressText(listitem) {
				return listitem.hour * 100 / listitem.item.total_hours
			},
			setDataSourceIsPass() {
				this.itemProgressRecord.itemId = +this.$route.params.id.split('-')[0]
				this.itemList = this.$store.getters.doTaskItemProgressRecord
				for (let i = 0;i < this.itemList.length; ) {
					console.log(this.itemList)
					if (this.itemProgressRecord.itemId != this.itemList[i].item_id) {
						this.itemList.splice(i, 1)
					} else {
						i++
					}
				}
				for (let i in this.itemList) {
					if (this.itemList[i].isPass != 'Y' && this.itemList[i].isPass != 'N') {
						this.itemList[i].isPass = 'Y'
					}
				}
				this.itemProgressRecord.itemList = JSON.parse(JSON.stringify(this.itemList))
			},
			sureDec() {
				this.$refs['itemProgressRecord'].validate((valid) => {
		          	if (valid) {
		          		this.sure()
		          	} else {
			            return false
		          	}
		        })
			},
			sure() {
				this.$http.post('/api/progress/itemProgressMgrAuth', this.itemProgressRecord, {
						emulateJSON: false
					})
					.then((res) => {
						let data = res.data.result;
						if(res.data.success) {
							this.$message({
								message: '提交成功',
								customClass: 'success'
							})
							this.dialogVisible = false
							this.$router.go(-1)
						} else {
							this.$message({
								message: res.data.message,
								type: 'info'
							})
						}
					}).catch((err) => {
						
					})
				
			},
			cancel() {
				//this.dialogVisible = false
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
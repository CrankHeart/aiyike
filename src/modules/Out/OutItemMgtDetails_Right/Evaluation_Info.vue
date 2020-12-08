<!--新邀请-洽谈中-已合作--评估信息模块-->
<template>
	<div class="layout">
		<el-dialog title="邀请外围团队" :visible.sync="invOutTeamVisible" class="invOutTeamDialog ayk-dialogform dialog442">
			<el-form ref="invOutTeamForm" :model="invOutTeamForm" label-width="0px">
				<el-form-item>
					<el-select v-model="invOutTeamForm.itemInvite.busId" placeholder="请选择" class="block">
						<el-option :key="index" v-for="(item, index) in outComOptions" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span class="invOutTeamDialog-text">非接单状态的外围团队不在您的选择范围！</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" class="submitbtn" @click="invOutTeamSure">确 定</el-button>
			    <el-button class="cancelbtn" @click="invOutTeamVisible = false">取 消</el-button>
		  	</span>
		</el-dialog>
		<div class="btn-group">
			<el-button class="statusbtn" type="primary" @click="invOutTeamClick" v-if="invitebtnComputed && HasPermission('invOutTeamBtn')">邀请外围团队</el-button>
			<el-button class="submitbtn" type="primary" @click="sendClick" v-if="invitebtnComputed && HasPermission('sendOutTeamBtn')">发送</el-button>
			<el-button class="submitbtn" type="primary" @click="editClick" v-if="editbtnComputed && HasPermission('editOutTeamBtn')">编辑</el-button>
		</div>
		<el-table :data="itemAssessList" style="width: 100%" class="evinfotable">
			<el-table-column prop="status" label="中标" align="center" width="100">
				<template slot-scope="scope">
					<template v-if="formatterType(scope.row.type) == '内部评估'">
						<span class="nowatch"></span>
					</template>
					<template v-else-if="formatterStatus(scope.row.status) == '弃标'">
						<span class="ayk-textips" status="弃标">弃标</span>
					</template>
					<template v-else-if="formatterStatus(scope.row.status) == '待邀请'">
						<span class="ayk-textips" status="待邀请">待邀请</span>
					</template>
					<template v-else>
						<el-switch @click.native.capture.prevent="switchClick(scope.row)" :disabled="switchDisabledComputed" class="switch-type-1" v-model="scope.row.status" on-color="#295DCF" off-color="#f2f2f2" on-text="中标" off-text="未中标" :on-value="1" :off-value="0">
						</el-switch>
					</template>
				</template>
			</el-table-column>
			<el-table-column prop="type" label="评估类型" width="100">
				<template slot-scope="scope">
					{{formatterType(scope.row.type)}}
				</template>
			</el-table-column>
			<el-table-column prop="type" label="评估人／外围团队">
				<template slot-scope="scope">
					<template v-if="scope.row.type == 0">
						{{scope.row.ucName}}
					</template>
					<template v-if="scope.row.type == 1">
						{{scope.row.busName}}
					</template>
				</template>
			</el-table-column>
			<el-table-column prop="totalHour" label="评估总工时(h)" align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.status == 2">
						<div class="middle">
							<span class="nowatch"></span>
						</div>
					</template>
					<template v-else>
						{{scope.row.totalHour | moneyformat}}
					</template>
				</template>
			</el-table-column>
			<el-table-column prop="amount" label="单价(元)" width="80">
				<template slot-scope="scope">
					<template v-if="scope.row.status == 2">
						<div class="middle">
							<span class="nowatch"></span>
						</div>
					</template>
					<template v-else>
						{{scope.row.amount | moneyformat}}
					</template>
				</template>
			</el-table-column>
			<el-table-column prop="totalAmount" label="总价(元)" width="80">
				<template slot-scope="scope">
					<template v-if="scope.row.status == 2">
						<div class="middle">
							<span class="nowatch"></span>
						</div>
					</template>
					<template v-else>
						{{scope.row.totalAmount | moneyformat}}
					</template>
				</template>
			</el-table-column>
			<el-table-column label="详情" align="center" width="80">
				<template slot-scope="scope">
					<template v-if="scope.row.status == 2">
						<div class="middle">
							<span class="dialog" state="弃标" @click="watchReason(scope.row.reason)">查明原因</span>
						</div>
					</template>
					<template v-if="scope.row.status == 0 || scope.row.status == 1">
						<span class="details-btn" @click="watchDetails"></span>
					</template>
					<template v-if="scope.row.type == 1 && scope.row.inviteType ==1 && scope.row.status == 3 && HasPermission('delOutTeamBtn')">
						<i @click="delOutTeamClick(scope.row.id)" class="el-icon-delete level_remove"></i>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="评估信息" :visible.sync="detailsVisible" class="dialog1170 evinfotable" @close="detailsDialogClose">
			<el-table :data="iaDetailList" style="width: 100%">
				<el-table-column prop="status" label="中标状态" width="80" align="center">
					<template slot-scope="scope">
						<template v-if="formatterType(scope.row.type) == '内部评估'">
							<span class="nowatch"></span>
						</template>
						<template v-else-if="formatterStatus(scope.row.status) == '弃标'">
							<span class="ayk-textips" status="弃标">弃标</span>
						</template>
						<template v-else-if="formatterStatus(scope.row.status) == '待邀请'">
							<span class="ayk-textips" status="待邀请">待邀请</span>
						</template>
						<template v-else>
							<el-switch :disabled="dialogSwitchDisabled" class="switch-type-1" v-model="scope.row.status" on-color="#295DCF" off-color="#f2f2f2" on-text="中标" off-text="未中标" :on-value="1" :off-value="0">
							</el-switch>
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="评估类型" width="80" align="center">
					<template slot-scope="scope">
						{{formatterType(scope.row.type)}}
					</template>
				</el-table-column>
				<el-table-column prop="type" label="评估人/外围团队" align="center">
					<template slot-scope="scope">
						<template v-if="scope.row.type == 0">
							{{scope.row.ucName}}
						</template>
						<template v-if="scope.row.type == 1">
							{{scope.row.busName}}
						</template>
					</template>
				</el-table-column>
				<el-table-column :key="index" v-for="(item, index) in iaDetailInList" :label="item.departName + '评估工时(h)'" align="center" width="120">
					<template slot-scope="scope">
						{{scope.row[item.departId]}}
					</template>
				</el-table-column>
				<el-table-column prop="countevtime" label="评估总工时(h)" align="center" width="100">
					<template slot-scope="scope">
						<template v-if="scope.row.status == 2">
							<div class="middle">
								<span class="nowatch"></span>
							</div>
						</template>
						<template v-else>
							{{scope.row.totalHour | moneyformat}}
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="ratio" label="系数" width="100" align="center">
					<template slot-scope="scope">
						<template v-if="scope.row.type == 1">
							<div class="middle">
								<span class="nowatch"></span>
							</div>
						</template>
						<template v-else-if="scope.row.type == 0 && !isEditClick">
							{{scope.row.ratio | moneyformat}}
						</template>
						<template v-else-if="scope.row.type == 0 && isEditClick">
							<input type="text" class="editInput" v-model="scope.row.ratio" />
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="budget" label="外围预算(元)" align="center" width="100">
					<template slot-scope="scope">
						<template v-if="scope.row.type == 1">
							<div class="middle">
								<span class="nowatch"></span>
							</div>
						</template>
						<template v-else-if="scope.row.type == 0 && !isEditClick">
							{{budgetFixed(scope.row.budget) | moneyformat}}
						</template>
						<template v-else-if="scope.row.type == 0 && isEditClick">
							{{budgetComputed(scope.row) | moneyformat}}
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="amount" label="单价(元)" align="center" width="80">
					<template slot-scope="scope">
						{{scope.row.amount | moneyformat}}
					</template>
				</el-table-column>
				<el-table-column prop="totalAmount" label="总价(元)" align="center" width="80">
					<template slot-scope="scope">
						{{scope.row.totalAmount | moneyformat}}
					</template>
				</el-table-column>
			</el-table>
			<div class="edit-btngroup" v-if="editbtnComputed && HasPermission('editOutTeamBtn') && isEditClick">
				<el-button class="submitbtn" type="primary" @click="editSureClick">确认</el-button>
			</div>
		</el-dialog>
		<el-dialog title="弃标原因" :visible.sync="reasonVisible" class="dialog442 reason-dialog">
			<div class="reason-dialog__content middle">
				<span class="text">{{reasonText}}</span>
			</div>
		</el-dialog>
		<alert-dialog :visible.sync="switchVisible" @submit="switchSure" @cancel="switchCancel" :text="switchText" :title="'提示'"></alert-dialog>
	</div>
</template>

<script>
	let AlertDialog = () =>
		import('@/components/dialog/AlertDialog.vue')
	export default {
		name: 'Evaluation_Info',
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			},
			reload: {
				type: Function,
				default: function() {}
			}
		},
		data() {
			return {
				loginInfo: this.$store.getters.loginInfo,
				rowData: {},
				switchVisible: false,
				switchText: '',
				reasonText: '',
				outComOptions: [],
				tableSwitchDisabled: true,
				dialogSwitchDisabled: true,
				invOutTeamVisible: false,
				iaDetailInList: [],
				itemAssessList: [],
				iaDetailList: [],
				detailsVisible: false,
				reasonVisible: false,
				switchForm: {
					ucId: this.$store.getters.loginInfo.uc.id,
					ioApplyId: this.$store.getters.outItemAudit.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					taskId: this.$store.getters.outItemAudit.taskId,
					isPass: "Y",
					itemAssess:{
						id: ''
					}
				},
				sendForm: {
					ucId: this.$store.getters.loginInfo.uc.id,
					ioApplyId: this.$store.getters.outItemAudit.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					taskId: this.$store.getters.outItemAudit.taskId
				},
				invOutTeamForm: {
					ucId: this.$store.getters.loginInfo.uc.id,
					ioApplyId: this.$store.getters.outItemAudit.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					itemInvite: {
						busId: '',
						ucId: 225
					}
				},
				isEditClick: false,
				auditSubmitData: {
					ucId: this.$store.getters.loginInfo.uc.id,
					itemId: this.$store.getters.outItemAudit.item_id,
					ioApplyId: this.$store.getters.outItemAudit.id
				}
			}
		},
		components: {
			AlertDialog
		},
		watch: {
			'data.iaDetailList': {
				deep: true,
				handler(val) {
					this.iaDetailList = val || []
					this.setOutEvInfoItem()
				}
			},
			'data.ItemAssessList': {
				deep: true,
				handler(val) {
					this.itemAssessList = val || []
				}
			},
			'data.iaDetailInList': {
				deep: true,
				handler(val) {
					this.iaDetailInList = val || []
				}
			},
			'invOutTeamForm.itemInvite.busId'(val) {
				let item = this.outComOptions.filter((item, index) => {
					return item.id == val
				})[0] || {}
				this.invOutTeamForm.itemInvite.ucId = item.managerId
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.iaDetailList = this.data.iaDetailList || []
				this.itemAssessList = this.data.ItemAssessList || []
				this.iaDetailInList = this.data.iaDetailInList || []
				this.setOutEvInfoItem()
				this.obtainOutComOptions()
			})
		},
		computed: {
			switchDisabledComputed() {
				if (2 == this.loginInfo.bus.type) {
					return true
				}
				let state = this.$route.params.id.split("-")[1]
				if (state == 5 && this.tableSwitchDisabled) {
					return false
				}
				return true
			},
			invitebtnComputed() {
				let state = this.$route.params.id.split("-")[1]
				if (state == 3) {
					return true
				}
				if (state == 5) {
					return true
				}
				return false
			},
			editbtnComputed() {
				let state = this.$route.params.id.split("-")[1]
				if (state == 1) {
					return true
				}
				return false
			}
		},
		methods: {
			editSureClick() {
				if (+this.$route.params.id.split("-")[1] == 1) {
					this.$set(this.auditSubmitData, 'itemAssess', this.$store.getters.outEvInfoItem)
					this.$http.post('/api/ioApply/directorChange', JSON.stringify(this.auditSubmitData), {
	                    emulateJSON: true
	                }).then((res) => {
	                    let data = res.data
	                    if(data.success) {
	                    	this.$message({
		                        message: "提交成功",
		                        customClass: 'success'
		                    })
	                    	this.detailsVisible = false
	                    }else{
		                	this.$message({
		                        message: data.message,
		                        customClass: 'error'
		                    })
	                    }
	                }).catch((err) => {
	                });
				} else {
					this.$message({
						customClass: 'error',
						message: "无操作权限"
					})
				}
			},
			delOutTeamClick(id) {
				this.$http.post('/api/itemAssess/delInvite', {
					id
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: "操作成功"
						})
						this.reload()
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						})
					}
				}).catch((err) => {})
			},
			switchSure() {
				this.switchForm.itemAssess.id = this.rowData.id
				this.$http.post('/api/ioApply/sureInvite', JSON.stringify(this.switchForm), {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.rowData.status = 1
						this.tableSwitchDisabled = false
						this.$router.go(-1)
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						})
					}
					this.switchVisible = false
				}).catch((err) => {
					this.$message({
						customClass: 'error',
						message: "服务异常"
					})
					this.switchVisible = false
				})
			},
			switchCancel() {
				this.switchVisible = false
			},
			switchClick(row) {
				if (2 == this.loginInfo.bus.type) {
					return void 0
				}
				if (!this.switchDisabledComputed && row.status != 1) {
					this.rowData = row
					this.switchText = `您确定设置${row.busName}为中标团队?`
					this.switchVisible = true
				}
			},
			budgetFixed(budget) {
				if (Object.isEmpty(budget)) {
					return 0
				} else {
					return (+budget).toFixed(2)
				}
			},
			budgetComputed(row) {
				row.budget = (row.ratio * row.totalAmount).toFixed(2)
				return row.budget
			},
			obtainOutComOptions() {
				this.$http.post('/api/bus/loadOutCom', {}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.outComOptions = data.result;
					}
				}).catch((err) => {})
			},
			invOutTeamClick() {
				this.invOutTeamVisible = true
			},
			invOutTeamSure() {
				this.$http.post('/api/ioApply/purchaseInviteAdd', JSON.stringify(this.invOutTeamForm), {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.invOutTeamVisible = false
						this.$message({
							customClass: 'success',
							message: "添加成功"
						})
						this.reload()
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						})
					}
				}).catch((err) => {})
			},
			sendClick() {
				this.$http.post('/api/ioApply/purchaseInvite', JSON.stringify(this.sendForm), {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.$router.go(-1)
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						})
					}
				}).catch((err) => {})
			},
			editClick() {
				this.isEditClick = true
				this.watchDetails()
			},
			detailsDialogClose() {
				this.setOutEvInfoItem()
				this.isEditClick = false
			},
			setOutEvInfoItem() {
				let item = this.iaDetailList.filter((item, index) => {
					return item.type == 0
				})[0]
				item = item || {}
				if (Object.isEmpty(item)) {
					return void 0
				}
				let budget = item.budget
				if (Object.isEmpty(budget)) {
					budget = 0
				} else {
					budget = (+budget).toFixed(2)
				}
				this.$store.commit('outEvInfoItem', {
					id: item.id,
					ratio: item.ratio,
					budget: budget
				})
			},
			watchDetails() {
				this.detailsVisible = true
			},
			watchReason(str) {
				this.reasonText = str
				this.reasonVisible = true
			},
			formatterType(type) {
				if(type == 0) {
					return "内部评估"
				}
				if(type == 1) {
					return "外部评估"
				}
			},
			formatterStatus(status) {
				if(status == 0) {
					return '未中标'
				}
				if(status == 1) {
					return '中标'
				}
				if(status == 2) {
					return '弃标'
				}
				if(status == 3) {
					return '待邀请'
				}
			}
		}
	}
</script>

<style scoped>
	.edit-btngroup {
		text-align: right;
		padding-top: 15px;
	}
	.invOutTeamDialog-text {
		font-size: 12px;
		color: rgb(153, 153, 153);
	}
	
	.reason-dialog .reason-dialog__content {
		height: 190px;
		font-size: 12px;
		color: #000000;
		text-align: center;
	}
	
	.evinfotable span.dialog[state="弃标"] {
		font-size: 12px;
		color: #295DCF;
		cursor: pointer;
	}
	
	.evinfotable span.nowatch {
		display: inline-block;
		width: 40px;
		height: 2px;
		background: #E5E5E5;
		vertical-align: middle;
	}
	
	.layout {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		padding-top: 24px;
	}
	
	.details-btn {
		display: inline-block;
		width: 9px;
		height: 10px;
		background: url(../../../assets/img/details-btn.png) no-repeat;
		background-size: 9px 10px;
		cursor: pointer;
	}
	
	.btn-group {
		margin-bottom: 10px;
		text-align: right;
	}
	
	.editInput {
		width: 86px;
	}
	.level_remove {
		color: #ABC0ED;
		cursor: pointer;
	}
</style>
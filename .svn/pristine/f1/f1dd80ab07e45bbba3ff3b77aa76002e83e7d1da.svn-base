<template>
	<!--编辑部門-->
	<el-dialog title="编辑部门" :visible.sync="dialogVisible" @close="modelClose" class="dialog442">
		<el-form ref="formData" :model="formData" label-width="80px">
			<el-form-item label="部门名称：" prop="label">
				<el-input :maxlength="60" v-model="formData.label" placeholder="请输入部门名称" class="my-input"></el-input>
			</el-form-item>
			<el-form-item label="所属部门：">
				<GroupSelect class="my-input" @handleNodeClick="handleNodeClick" v-model="depart" :treeData="dataTree" placeholder="所属部门"></GroupSelect>
			</el-form-item>
			<el-form-item label="部门领导：" prop="leader">
				<el-select v-model="formData.leader" placeholder="请选择" v-sicon1>
					<el-option v-for="item in leaders" :key="item.id" :label="item.userName" :value="changeInterger(item.id)">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否执行部门：" prop="depart">
				<el-select v-model="formData.isPerformer" placeholder="请选择状态" @click="isDepart(val)">
					<el-option v-for="item in isPerformer" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="部门简介：" prop="description">
				<el-input :maxlength="300" type="textarea" v-model="formData.description" class="my-input"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="addDepartDialogCancel" class="cancelbtn">取消</el-button>
			<el-button type="primary" @click="addDepartDialogSubmit" class="submitbtn">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	let GroupSelect = () =>
		import('@/components/select/GroupSelect.vue')

	export default {
		name: 'EditDepart_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			dataSource: {
				type: Object,
				default: function() {
					return {}
				}
			},
			parentData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				if(val) {
					this.initDepartTree()
					this.queryParam()
				}
				this.$emit('update:visible', val)
			}
		},
		components: {
			GroupSelect
		},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		data() {
			return {
				isPerformer:[{
					value: 0,
					label: '否'
				}, {
					value: 1,
					label: '是'
				}],
				dataTree: [],
				dialogVisible: false,
				formData: {
					id: '',
					parentId: '',
					leader: '',
					label: '',
					description: '',
					isPerformer:''
				},
				data: [],
				depart: {},
				pDefaultProps: {
					children: 'children',
					label: 'label'
				},
				leaders: [{}],
				msgRmList: []
			}
		},
		methods: {
			isDepart(val){
				console.log(val)
			},
			resetForm() {
				this.depart = {}
				this.$refs['formData'].resetFields();
			},
			modelClose() {
				this.resetForm()
			},
			changeInterger(v) {
				return parseInt(v)
			},
			setData() {
				let data = {...this.dataSource}
				this.depart = {...this.parentData}
				this.formData.label = data.label
				this.formData.description = data.description
				this.formData.isPerformer =data.isPerformer
				if(this.leaders.length) {
					let leader = parseInt(JSON.stringify(data.leader))
					if(!isNaN(leader)) {
						this.formData.leader = leader;
					}

				}
			},
			removeMsg(){
				if (Array.isArray(this.msgRmList)) {
					for (let i in this.msgRmList) {
						this.msgRmList[i].close && this.msgRmList[i].close()
					}
				}
			},
			addMsg(o) {
				this.msgRmList.push(o)
			},
			handleNodeClick(data) {
				this.removeMsg()
				let pId = this.dataSource.parentId
				if(pId == 0) {
					this.addMsg(this.$message({
						customClass: 'error',
						message: '一级部门不能修改所属部门'
					}))
					this.depart = {}
					return false
				}
				if(data.id == this.dataSource.id) {
					this.addMsg(this.$message({
						customClass: 'error',
						message: '不能选择部门本身！',
					}))
					this.depart = {}
					return false
				}
			},
			queryParam() {
				//查询
				this.$http.post('/api/depart/queryUcByDepart', {
					departId: this.dataSource.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.leaders = res.data.result;
					this.setData()
				}).catch((err) => {
					this.loading = false
					
				})

			},
			addDepartDialogCancel() {
				this.dialogVisible = false
			},
			addDepartDialogSubmit() {
				this.formData.parentId = this.depart.id
				this.formData.id = this.dataSource.id

				this.$http.post("/api/depart/update", this.formData, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '修改部门成功'
						});
						this.$parent.queryOrgStructChart && this.$parent.queryOrgStructChart()
					} else {
						this.$message({
							customClass: 'error',
							message: '修改部门失败'
						});
					}
					this.dialogVisible = false
				}).catch((err) => {
					
					this.dialogVisible = false
				});
			},
			initDepartTree() {
				this.$http.post("/api/depart/departTreeNo", null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							var result = data.result
							this.dataTree = result;
						}
					}).catch((err) => {
						
					});
			},
			handleChange: function() {

			}
		}
	}
</script>

<style scoped>
	.mb24 {
		margin-bottom: 24px;
	}
</style>
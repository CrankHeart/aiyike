<template>
	<!--新增部門-->
	<el-dialog title="新增部门" :visible.sync="dialogVisible" class="dialog442" @close="closeDialog">
		<el-form ref="formData" :model="formData" label-width="80px" :rules="rules" class="addPart">
			<el-form-item label="部门名称：" prop="label">
				<el-input  :maxlength="60" v-model="formData.label" id="departName" ref='input' placeholder="请输入部门名称"></el-input>
			</el-form-item>
			<el-form-item label="所属部门：" prop="depart">
				<GroupSelect class="my-input" v-model="formData.depart" :treeData="data" placeholder="所属部门"></GroupSelect>
			</el-form-item>
			<el-form-item label="执行部门：" prop="depart">
				<el-select v-model="formData.isPerformer" placeholder="请选择状态" v-sicon1>
						<el-option v-for="item in isPerformer" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
			</el-form-item>
			<el-form-item label="部门描述：" prop="description">	
				<el-input :maxlength="300" type="textarea" v-model="formData.description"></el-input>
		  	</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="addDepartDialogSubmit('formData')" class="submitbtn">确定</el-button>
			<el-button @click="addDepartDialogCancel" class="cancelbtn">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
	let GroupSelect = () =>
		import('@/components/select/GroupSelect.vue')

	export default {
		name: 'AddDepart_Dialog',
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
			'formData.depart' (val) {
				
			}
		},
		components: {
			GroupSelect
		},
		mounted: function() {
			this.dialogVisible = this.visible
			this.initDepartTree()
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
				dialogVisible: false,
				formData: {
					label: '',
					description: '',
					depart: ''
				},
				data: [],
				pDefaultProps: {
					children: 'children',
					label: 'label'
				},
				rules: {
					label: [{
							required: true,
							message: '请输入部门名称',
							trigger: 'blur'
						}/*,
						{
							max: 60,
							message: '长度在 60个字符范围',
							trigger: 'blur'
						}*/
					]
				}
			}
		},
		methods: {
			closeDialog() {
				this.resetForm()
			},
			resetForm() {
				this.formData.depart = {}
				this.$refs['formData'].resetFields();
			},
			addDepartDialogCancel() {
				this.dialogVisible = false
			},
			addDepartDialogSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.saveDepart();
					} else {
						;
						return false;
					}
				});
			},
			saveDepart: function() {
				this.$http.post("/api/depart/save/" + this.formData.depart.id, this.formData, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '添加部门成功'
						})
						this.initDepartTree()
						this.$parent.$refs.depart && 
						this.$parent.$refs.depart.$refs.OrgStructList && 
						this.$parent.$refs.depart.$refs.OrgStructList.queryOrgStructChart && 
						this.$parent.$refs.depart.$refs.OrgStructList.queryOrgStructChart()
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						});
					}
					this.dialogVisible = false
					this.resetForm()
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
							this.data = result
						}
					}).catch((err) => {
						
					});
			},/*clearSpace(){
				let obj = this.$refs.input.$el;
				if(obj){
					let input = obj.children
					console.log(input[0].value.replace(/[ ]/,''));
					input[0].value = input[0].value.replace(/[ ]/,'');
				}
			},*/
			handleChange: function() {

			}
		}
	}
</script>

<style scoped>
	.mb24 {
		margin-bottom: 24px;
	}
	
	.el-tree {
		margin-left: 60px;
	}
	
</style>
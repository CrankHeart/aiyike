<template>
	<!--新增弹出框begin-->
	<el-dialog class="dialog442" title="新增" :visible.sync="dialogVisible">
		<el-form :model="formData" label-width="80px" :rules="rules" ref="formData">
			<el-form-item label="岗位名称：" prop="name">
				<el-input type="text" :maxlength="20" v-model="formData.name" placeholder="请输入岗位名称"></el-input>
			</el-form-item>
			
			<el-form-item label="专业类别：" prop='description'>
				<template>
				    <el-select v-model="formData.type" placeholder="请选择">
				<el-option v-for="(item ,index) in types" :key="index" :label="item.name" :value="item.value">
				</el-option>
				   </el-select>
				</template>
			</el-form-item>
			
			<el-form-item label="岗位简介：" prop='description'>
				<el-input type="textarea" :maxlength="20" v-model="formData.description"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button class="submitbtn" type="primary" @click="addPosSubmit('formData')">确定</el-button>
			<el-button class="cancelbtn" @click="addPosDialogCancel('formData')">取消</el-button>
		</div>
	</el-dialog>
	<!--新增弹出框end-->
</template>

<script>
	export default {
		name: 'NewAddPos_Dialog',
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
				types: null,
				dialogVisible: false,
				formData: {
					type: '',
					name: '',
					description: '',
					busId:''
				},
				busId: JSON.parse(Cache.local(Config.Login)).bus.id,
				
				rules: {
		          name: [
		            { required: true, message: '请输入岗位名称', trigger: 'blur' },
		            {  max: 20, message: '长度在20个字符范围', trigger: 'blur' }
		          ]
		        }
			}
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
			this.initTypes()
		},
		methods: {
			initTypes(){
				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'major'
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						this.types = data.result;
					}
				}).catch((err) => {
					this.loading = false
					
				})	
			},
			addPosDialogCancel: function(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
			},
			addPosSubmit: function(formName) {
				this.$refs[formName].validate((valid) => {
	          	if (valid) {
	          		this.savePos();
	          	} else {
		            ;
		            return false;
	          	}
	          });
			},
			savePos:function(){
				this.formData.busId = this.busId;
				this.$http.post("/api/station/add", this.formData, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '添加成功'
						});
					} else {
						this.$message({
							customClass: 'error',
							message: data.message
						});
					}
					this.addPosDialogCancel('formData')
					this.$parent.reload && this.$parent.reload()
				}).catch((err) => {
					
					this.addPosDialogCancel()
				});
			}
		}
	}
</script>

<style>
</style>
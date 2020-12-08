<template>
	<el-form :model="data" :rules="rules" ref="baseForm" label-width="74px" label-position="left" class="outItemStepsForm form-itemmb2">
		<el-form-item label="项目名称：" prop="itemId">
			<el-autocomplete v-model="itemName" @select="itemNameSelect" :props="{value:'name',label:'name'}" class="w150" :fetch-suggestions="querySearchItemName" placeholder="请输入"></el-autocomplete>
		</el-form-item>
		<el-form-item label="外围类型：" prop="type">
			<el-select v-model="data.type" placeholder="请选择">
				<el-option v-for="(item,index) in outType" :key="index" :label="item.name" :value="+item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="外围原因：" prop="reason">
			<el-select v-model="data.reason" placeholder="请选择">
				<el-option v-for="(item,index) in outReason" :key="index" :label="item.name" :value="+item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="商务经理：">
			<el-input v-model="data.ba_name" class="w150" placeholder="请输入" disabled></el-input>
		</el-form-item>
		<el-form-item label="项目经理：">
			<el-input v-model="data.manager" class="w150" placeholder="请输入" disabled></el-input>
		</el-form-item>
		<el-form-item label="资料库：" prop="url">
			<el-input v-model="data.url" class="w458" placeholder="http://"></el-input>
		</el-form-item>
		<el-form-item label="业务范围：" prop="labels">
			<MultipleSelect search v-model="labels" :options="labelsOptions" :fieldsOptinos="{label:'name',value:'id'}"></MultipleSelect>
		</el-form-item>
		<el-form-item label="范围描述：" prop="">
			<!-- <el-input class="textarea" type="textarea" :autosize="{ minRows: 6}" placeholder="请输入范围描述" v-model="data.description"></el-input> -->
			<script ref="editor" id="editor" type="text/plain" style="width:100%;height:500px;"></script>
		</el-form-item>
		<el-form-item class="btn-group">
			<el-button class="submitbtn" type="primary" @click="nextStep">下一步</el-button>
			<el-button class="cancelbtn" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	let MultipleSelect = () =>
		import('@/components/select/MultipleSelect.vue')

	export default {
		name: "BaseInfo",
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			},
			editor:null
		},
		components: {
			MultipleSelect
		},
		data() {
			var labelsValidate = (rule, value, callback) => {
				if (Array.isArray(value) && value.length) {
					callback();
				} else {
					callback(new Error('请选择业务范围'));
				}
			}
			return {
				outType: '',
				outReason: '',
				itemName: '',
				itemNames: [],
				labels: [],
				labelsOptions: [],
				rules: {
					itemId: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						type: 'number',
						message: '请选择外围类型',
						trigger: 'blur'
					}],
					reason: [{
						required: true,
						type: 'number',
						message: '请选择外围原因',
						trigger: 'blur'
					}],
					url: [{
						required: true,
						message: '请输入资料地址',
						trigger: 'blur'
					}, {
						pattern: /(^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$)|(^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$)/,
						message: '请输入正确的网址',
						trigger: 'blur'
					}],
					labels: [{
						required: true,
						type: 'array',
						message: '请选择业务范围',
						trigger: 'blur'
					}],
					// description: [{
					// 	required: true,
					// 	message: '请输入范围描述',
					// 	trigger: 'blur'
					// }]
				}
			}
		},
		watch: {
			'data.itemId' (val) {
				console.log('data.itemId', val)
				if (val) {
					let handler = () => {
						let item = {}
						let have = this.itemNames.some((_item, _index, _self) => {
							if(_item.id == val) {
								item = _item
								return true
							} else {
								return false
							}
						})
						if(!have) {
							this.itemName = ''
							this.data.item = {}
							this.data.itemId = ''
						} else {
							this.itemName = item.name
							this.data.item = item
							this.data.itemId = `${item.id}`
							this.itemNameUnionDataSet(item)
						}
					}
					if (!this.itemNames.length) {
						this.obtainItemNames((_itemNames)=> {
							handler()
						})
					} else {
						handler()
					}
				}
			},
			labels(val) {
				this.data.labels = []
				this.labelsOptions.forEach((item, index, arr) => {
					if(val.indexOf(item.id) != -1) {
						this.data.labels.push(item)
					}
				})
			},
			itemName(val) {
				let handler = () => {
					let item = {}
					let have = this.itemNames.some((_item, _index, _self) => {
						if(_item.name == val) {
							item = _item
							return true
						} else {
							return false
						}
					})
					if(!have) {
						this.noItemIdHandler()
					} else {
						let valiCanSelect = () => {
							this.$http.post('/api/ioApply/isIoApplyComplete', {
								itemId: `${item.id}`,
								ioApplyId: this.data.ioApplyId || 0
							}, {
								emulateJSON: true
							}).then((res) => {
								let data = res.data;
								if(data.success) {
									this.data.item = item
									this.data.itemId = `${item.id}`
									this.itemNameUnionDataSet(item)
								} else {
									this.itemName = ''
									this.noItemIdHandler()
									this.$message({
	                                    message: data.message,
	                                    customClass: 'error'
	                                })
								}
							}).catch((err) => {
							})
						}
						valiCanSelect()
					}
				}
				if (!this.itemNames.length) {
					this.obtainItemNames((_itemNames)=> {
						handler()
					})
				} else {
					handler()
				}
			},
			'data.labels'(val) {
				if (val && this.data.editState) {
					let handler = () => {
						if (String.isString(val)) {
							val = JSON.parse(val)
							let t = val.map((item, index, arr) => {
								return item.id
							})
							this.labels = t
						}
					}
					if (!this.labelsOptions.length) {
						this.obtainLabels((_labelsOptions) => {
							handler()
						})
					} else {
						handler()
					}
				}
			},
			
		},
		mounted() {
			this.$nextTick(() => {
				this.obtainItemNames()
				this.initTypeAndReason()
				this.obtainLabels()
				this.$parent.mountedComplete && this.$parent.mountedComplete()
				this.loadUeJs()
			})
		},
		beforeDestroy(){
			this.$refs.editor && this.editor && this.editor.destroy()
		},
		methods: {
			editHandler() {
				let handler = () => {
					this.editor.addListener("ready", () => {
						this.editor.setContent('')
					})
				}
				if(this.editor) {
					handler()
				}
			},
			async loadUeJs() {
				await require.ensure([], function(require) {
					return require('@/../static/ue/ueditor.config.js')
				})
				await require.ensure([], function(require) {
					return require('@/../static/ue/ueditor.all.js')
				})
				await require.ensure([], function(require) {
					return require('@/../static/ue/lang/zh-cn/zh-cn.js')
				})
				await require.ensure([], function(require) {
					return require('@/../static/ue/ueditor.parse.js')
				})
				let _self = this
				let editorInterval = requestAnimationFrame(
					function req() {
						if(_self.$refs.editor) {
							cancelAnimationFrame(editorInterval)
							_self.setUe()
						} else {
							editorInterval = requestAnimationFrame(req)
						}
					}
				)
			},
			setUe() {
				this.editor = UE.getEditor('editor', {
					//关闭字数统计
					wordCount: false,
					//关闭elementPath
					elementPathEnabled: false,
				})
				this.editor.addListener("ready", () => {
					this.pageShow = true
				})
				//编辑周报
				this.editHandler()
			},
			// 获取ue内容方法
			getUEContent() {
				return this.editor.getContent()
			},

			noItemIdHandler() {
				this.data.item = {}
				this.data.itemId = ''
				this.data.departments = [{
					departIndex: '',
					departId: '',
					departName: '',
					ucId: '',
					ucName: '',
					hour: '',
					uprice: ''
				}]
				this.itemNameUnionDataSet({
					ba_name: '',
					manager: ''
				})
			},
			initTypeAndReason() {
				this.$store.dispatch("DICTIONARY", "apply_reason").then((data)=>{
					this.outReason = data;
				})
				this.$store.dispatch("DICTIONARY", "apply_type").then((data)=>{
					this.outType = data;
				})
			},
			obtainLabels(callback) {
				this.$http.post("/api/label/queryLabelAll", {}, {
					emulateJSON: true
				}).then((res) => {
					this.labelsOptions = res.data.result
					callback && callback(this.labelsOptions)
				}).catch((err) => {});
			},
			obtainItemNames(callback) {
				this.$http.post("/api/item/searchItemNameByMgr", {
					itemName: '',
					ucId: JSON.parse(Cache.local(Config.Login)).uc.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.itemNames = res.data.result
					callback && callback(this.itemNames)
				}).catch((err) => {});
			},
			querySearchItemName: function(queryString, cb) {
				let itemNames = this.itemNames
				let results = queryString ? itemNames.filter(this.createItemNameFilter(queryString)) : itemNames
				cb(results)
			},
			createItemNameFilter: function(queryString) {
				return(item) => {
					return(item.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
				}
			},
			itemNameSelect(item) {
				if(item.id) {
					this.data.item = item
					this.data.itemId = `${item.id}`
					this.itemNameUnionDataSet(item)
				} else {
					this.noItemIdHandler()
				}
			},
			itemNameUnionDataSet(item) {
				this.data.ba_name = item.ba_name
				this.data.manager = item.manager
			},
			nextStep() {
				this.data.description = this.getUEContent();
				this.$refs['baseForm'].validate((valid) => {
					if(valid) {
						let index = this.$parent.getStepsIndex() + 1
						this.$emit("back", "OutItemMgtSteps", {
							stepsIndex: index
						})
					} else {
						return false;
					}
				});
			},
			cancel() {
				this.$emit("back", "outItemMgt");
				this.editor.setContent('')
			}
		}
	}
</script>

<style scoped>
	.textarea {
		margin-top: 3px;
	}
	
	.w150 {
		width: 150px;
	}
	
	.w240 {
		width: 240px;
	}
	
	.w458 {
		width: 458px;
	}
	
	.w340 {
		width: 340px;
	}
	
	.btn-group {
		text-align: right;
		margin-top: 30px;
	}
</style>
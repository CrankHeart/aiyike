<template>
	<div class="wrap container">
		<tabs v-model="activeName" @tab-click="handleClick">
			<tab-pane label="会审节点" name="itemNode" v-if="HasPermission('itemNode')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>当前位置: 会审节点</el-breadcrumb-item>
				</el-breadcrumb>
				<!--项目配置表单-->
				<div class="project_config">
					<div class="page-bg">
						<div class="note_config">项目进度更新至节点或大于节点时，须PMO、事业部总监、商务经理审核。</div>
						<el-form :model="levelForm" ref="levelForm" label-width="100px" class="levelForm huishen">
							<el-form-item v-for="(domain, index) in levelForm.domains" :label="'节点 ' + (index+1)+'：'" :key="domain.key" :prop="'domains.' + index + '.value'" class="level_item">
								<el-input v-model="domain.value" class="level_val" @blur="editSbumit(domain)"></el-input>
								<i class="el-icon-delete level_remove" @click.prevent="removeDomain(domain)"></i>
							</el-form-item>
							<el-form-item class="level_item">
								<el-button @click="addDomain" class="addRole"><span class="self-icon-add"></span>添加一个节点</el-button>
							</el-form-item>
							<el-form-item class="level_item submit_item">
								<el-button type="primary" @click="submitForm()" class="submit_btn submitbtn">提交</el-button>
								<el-button class="cancel_btn cancelbtn">取消</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</tab-pane>
			<tab-pane label="级别配置" name="levelconfig" v-if="HasPermission('levelconfig')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>当前位置: 级别对应薪资设定</el-breadcrumb-item>
				</el-breadcrumb>
				<component :is="busrankview"></component>
			</tab-pane>
			<tab-pane label="外围预算百分比" name="applyrate" v-if="HasPermission('applyrate')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>当前位置: 外围预算百分比</el-breadcrumb-item>
				</el-breadcrumb>
				<component :is="applyrateview"></component>
			</tab-pane>
			<tab-pane label="实施额度百分比" name="itemrate" v-if="HasPermission('itemrate')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>当前位置: 实施额度百分比</el-breadcrumb-item>
				</el-breadcrumb>
				<component :is="itemrateview"></component>
			</tab-pane>
			<tab-pane label="额度再分配" name="itemquota" v-if="HasPermission('itemquota')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>当前位置: 额度再分配</el-breadcrumb-item>
				</el-breadcrumb>
				<component :is="itemquotaview"></component>
			</tab-pane>
		</tabs>
	</div>
</template>

<script>
	function syncComponent(path) {
		return() =>
			import('@/' + path + '.vue')
	}
	let Tabs = syncComponent('components/tabs/Tabs')
	let TabPane = syncComponent('components/tabs/TabPane')
	let busrank = () =>
		import('./busrank.vue')
	let applyrate = () =>
		import('./applyrate.vue')
	let itemrate = () =>
		import('./itemrate.vue')
	let itemquota = () =>
		import('./itemquota.vue')
	let HerGhostScroll = () => import('@/components/scroll/HerGhostScroll.vue')	
	export default {
		name: 'Test',
		mounted() {
			this.$nextTick(() => {
				this.queryParam();
			});
		},
		data() {
			return {
				busrankview: null,
				applyrateview: null,
				itemrateview: null,
				itemquotaview: null,
				activeName: null,
				levelForm: {
					domains: [
						/*{
												value: '30'
											},{
												value: '50'
											},{
												value: '80'
											}*/
					]
				}
			}
		},
		watch: {},
		components: {
			Tabs,
			TabPane,
			'herghost-scroll' : HerGhostScroll,
		},
		methods: {
			queryParam() {
				this.$http.post('/api/dictionary/queryIpNode', {
					emulateJSON: true
				}).then((res) => {
					//this.levelForm.domains = res.data.result.content;
					this.levelForm.domains = res.data.result;
				}).catch((err) => {
					this.loading = false
					
				})

			},
			handleClick(tab) {
				switch(tab.name) {
					case "levelconfig":
						this.busrankview = busrank
						break;
					case "applyrate":
						this.applyrateview = applyrate
						break;
					case "itemrate":
						this.itemrateview = itemrate
						break;
					case "itemquota":
						this.itemquotaview = itemquota
						break;
					default:
						break;
				}
			},
			addDomain() {
				this.levelForm.domains.push({
					value: ''
				});
			},
            dealResData(str){
                if(str.toLowerCase()==='no'){
                    str = '操作失败'
                }
                if(str.toLowerCase()==='ok'){
                    str = '操作成功'
                }
                return str
            },
			removeDomain(item) {
				var index = this.levelForm.domains.indexOf(item)
				if(index !== -1) {
					this.levelForm.domains.splice(index, 1)
				}
				let id = item.id
				if(id != undefined) {
					this.$http.post("/api/dictionary/del/" + id, this.levelForm, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data
                            let str = this.dealResData(data.message)
							if(data.success) {
								this.delTag(item.id)
								this.reload()
								this.$message({
									customClass: 'success',
									message: '删除成功'
								});
							} else {
								this.$message({
									customClass: 'error',
									message: str
								});
							}
							this.add_dialog = false
							this.reload()
						}).catch((err) => {
							this.$message({
								customClass: 'success',
								message: '请求失败'
							});
						});

					//post('/api/label/del/'+id)
					//	success:this.delTag(name)
				} else {
					this.delTag(item.id)
				}

			},
			delTag(id) {
				for(let i in this.levelForm.domains) {
					if(this.levelForm.domains[i].id == id) {
						this.levelForm.domains.splice(i, 1)
						break
					}
				}
			},
			submitForm() {
				let newAddData = []
				for(let i in this.levelForm.domains) {
					if(this.levelForm.domains[i].id == undefined) {
						newAddData.push(this.levelForm.domains[i])
						let val=this.levelForm.domains[i].value
					   if(val == 0 ||val < 0 || val > 100) {
						this.$message({
							customClass: 'error',
							message: '不能小于0或大于100!'
						});
						return false;
					 }
					
					}
				}
				this.$http.post("/api/dictionary/addIpNode", {
						labels: newAddData
					}, {
						emulateJSON: false
					})
					.then((res) => {
						var data = res.data
                        let str = this.dealResData(data.message)
						if(data.success) {
							this.$message({
								customClass: 'success',
								message: '修改成功'
							});
						} else {
							this.$message({
								customClass: 'error',
								message: str
							});
						}
						this.update_dialog = false
						this.reload()
					}).catch((err) => {
						this.update_dialog = false
					});
			},
			editSbumit(item) {
				if(item.id != undefined) {
					this.levelForm.id = item.id
					this.levelForm.value = item.value
					let val = item.value;
					if(val == 0 ||val < 0 || val > 100) {
						this.$message({
							customClass: 'error',
							message: '不能小于0或大于100!'
						});
						return false;
					}
					this.$http.post("/api/dictionary/update", this.levelForm, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.$message({
									customClass: 'success',
									message: '修改成功'
								});
							} else {
								this.$message({
									customClass: 'error',
									message: '修改失败'
								});
							}
							this.update_dialog = false;
							this.reload();
						}).catch((err) => {
							this.update_dialog = false;
						});
				}
			}

		}
	}
</script>

<style scoped>
	.mr-40{
		margin-right: 40px;
	}
	.page-bg {
		margin: auto;
	    min-height: 100%;
    	margin-bottom: 20px;
	}
	.eff-chart {
		margin-top: 24px;
	}
	
	.worktab>.el-tabs__header {
		background: #f8f9fb;
	}
	
	.tabs {}
	
	.todo-module {
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.el-row {
		height: auto;
	}
	
	.project_config {
		margin-top: -26px;
	    padding-top: 50px;
	    height: 100%;
	    box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	    padding-bottom: 20px;
	}
	
	.note_config {
		padding-top: 20px;
		margin: 0px 0px 20px 0;
		padding-left: 20px;
		font-weight: bold;
	}
	
	.level_val {
		width: 150px;
		height: 26px;
		position: relative;
	}
	
	.level_val:after {
		position: absolute;
		content: "%";
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		right: 8px;
		top: 0;
	}
	
	.level_set {
		font-size: 14px;
		color: #000000;
		letter-spacing: 0;
		margin: 20px 0 20px 35px;
		padding-top: 20px;
	}
	
	.level_remove {
		color: #999;
		cursor: pointer;
		margin-left: 6px;
		line-height: 26px;
	}	
	.level_item:last-child {
		text-align: right;
	}
	.addRole {
		width: 100px;
		height: 30px;
		line-height: 1;
		padding: 0;	
		margin: 0;
		font-size: 12px;
		background: #FFFFFF;
		border: 1px solid #F1F1F1;
		font-size: 12px;
		color: #D0D0D0;
		border-radius: 2px;
	}
	.submit_item{
		bottom: 10px;
	}
</style>
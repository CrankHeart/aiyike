<template>
	<div class="project_config">
		<div class="pg page-bg">
			<herghost-scroll class="menu-hgscroll" :options="{
				paddingLeft: '20px',
				paddingRight: '20px',
			}">
				<div class="level_set">级别对应薪资设定</div>
				<el-form :model="levelForm" ref="levelForm" label-width="30px" class="levelForm">
					<el-form-item v-for="(domain, index) in levelForm.domains" :label="'P' + index+'：'" :key="domain.key" :prop="'domains.' + index + '.value'" class="level_item">
						<el-input v-model="domain.min" class="level_val" @blur="handleClick(domain)"></el-input>
						<el-input v-model="domain.max" class="level_val" @blur="handleClick(domain)"></el-input>
						<span v-if="index == (levelForm.domains.length-1)">
			    			<i class="el-icon-delete level_remove" @click.prevent="removeDomain(domain)"></i>				    	
			    		</span>
					</el-form-item>
					<el-form-item class="level_item">
						<el-button @click="addDomain" class="addRole"><span class="self-icon-add"></span>添加一个级别</el-button>
					</el-form-item>
					<div class="btn-group submit_item">
						<el-button type="primary" @click="submitForm()" class="submit_btn submitbtn">提交</el-button>
						<el-button class="cancel_btn cancelbtn">取消</el-button>
					</div>
				</el-form>
			</herghost-scroll>	
		</div>
	</div>
</template>

<script>
	function syncComponent(path) {
		return() =>
			import('@/' + path + '.vue')
	}
	let Tabs = syncComponent('components/tabs/Tabs')
	let TabPane = syncComponent('components/tabs/TabPane')
	let HerGhostScroll = () => import('@/components/scroll/HerGhostScroll.vue')	

	export default {
		name: 'busrank',
		mounted() {
			this.$nextTick(() => {
				this.queryParam();
			});
		},
		data() {
			return {
				activeName: null,
				levelForm: {
					domains: []
				}
			}
		},
		watch: {
			levelForm: {
				deep: true,
				handler: function(curval, oldval) {
				}
			}
		},
		components: {
			Tabs,
			TabPane,
			'herghost-scroll' : HerGhostScroll,
		},
		methods: {
			queryParam() {
				this.$http.post('/api/busRank/queryBusRankAll', {
					emulateJSON: true
				}).then((res) => {
					//this.levelForm.domains = res.data.result.content;
					this.levelForm.domains = res.data.result;
				}).catch((err) => {
					this.loading = false
					
				})

			},
			addDomain() {
				this.levelForm.domains.push({
					min: '',
					max: '',
					name:''
				});
			},
			removeDomain(item) {
				var index = this.levelForm.domains.indexOf(item)
				if(index !== -1) {
					this.levelForm.domains.splice(index, 1)
				}
				let id = item.id;
				if(id != undefined) {
					this.$http.post("/api/busRank/del/" + id, this.levelForm, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.delTag(item.id)
								this.reload();
								this.$message({
									customClass: 'success',
									message: '删除成功'
								});
							} else {
								this.$message({
									customClass: 'error',
									message: '删除失败'
								});
							}
							this.add_dialog = false;
							this.reload();
						}).catch((err) => {
							this.$message({
								customClass: 'success',
								message: '删除成功'
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
						//this.levelForm.domains[i].index=i;
						this.levelForm.domains[i].name='p'.concat(i);
						newAddData.push(this.levelForm.domains[i])
						let max=this.levelForm.domains[i].max
						let min=this.levelForm.domains[i].min
						
						
					if(max==null||min ==null) {
						this.$message({
							customClass: 'error',
							message: '请补全信息!'
						});
						return false;
					 }
						if(max == 0 ||max < 0  || min == 0 ||min < 0) {
						this.$message({
							customClass: 'error',
							message: '不能小于0!'
						});
						return false;
					   }
					   if(parseInt(max)<parseInt(min) ) {
						this.$message({
							customClass: 'error',
							message: '薪资范围有误!'
						});
						return false;
					 }
					   
					}
				}
				this.$http.post("/api/busRank/addBusRank", {
						labels: newAddData
					}, {
						emulateJSON: false
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.$message({
								customClass: 'success',
								message: '添加成功'
							});
						} else {
							this.$message({
								customClass: 'error',
								message: '添加失败'
							});
						}
						this.update_dialog = false;
						this.reload();
					}).catch((err) => {
						this.update_dialog = false;
					});
			},
			handleClick(item) {
				if(item.id != undefined) {
					this.levelForm.id = item.id
					this.levelForm.min = item.min
					this.levelForm.max = item.max
					
						let max=this.levelForm.max
						let min=this.levelForm.min
						
					if(max==''||min == '') {
						this.$message({
							customClass: 'error',
							message: '请补全信息!'
						});
						return false;
					 }
					   if(max == 0 ||max < 0 || min == 0 ||min < 0) {
						this.$message({
							customClass: 'error',
							message: '不能小于0!'
						});
						return false;
					 }
		              if(parseInt(max)<parseInt(min) ) {
					 	this.$message({
							customClass: 'error',
							message: '薪资范围有误!'
						});
						return false;
					 }
		            
					this.$http.post("/api/busRank/update", this.levelForm, {
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
	.self-icon-add {
		margin-right: 4px;
	}
	.eff-chart {
		margin-top: 24px;
	}
	
	.worktab>.el-tabs__header {
		background: #f8f9fb;
	}
	
	.tabs {
		margin-right: 334px;
	}
	
	.todo-module {
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.el-row {
		height: auto;
	}
	
	.level {
		margin-top: 24px;
	}
	.page-bg {
		height: calc(100% - 20px);
		margin: auto;
	}
	
	.levelForm .level_val:first-child:after {
		position: absolute;
		content: "~";
		right: -16px;
		top: 0;
		font-family: 'PingFangSC-Regular';
		font-size: 12px;
		color: #000000;
		letter-spacing: 0;
	}
	
	.level_val {
		width: 150px;
		height: 26px;
		position: relative;
	}
	
	.levelForm .level_val+.level_val {
		margin-left: 20px;
	}
	
	.level_val:after {
		position: absolute;
		content: "元";
		font-family: 'PingFangSC-Regular';
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		right: 8px;
		top: 0;
	}
	
	.level_set {
		margin: 0px 0 20px 0px;
		padding-top: 20px;
		padding-left: 20px;
		font-weight: bold;
	}
	
	.level_remove {
		color: #999;
		cursor: pointer;
		margin-left: 10px;
		line-height: 26px;
	}
	.level_item{
		padding-left: 20px;
	}
	.level_item:last-child {
		text-align: right;
	}
	.btn-group {
		text-align: right;
	}
	.addRole {
		padding: 0;
		height: 30px;
		width: 116px;
		line-height: 1;
		margin: 0;
		font-size: 12px;
		background: #FFFFFF;
		border: 1px solid #F1F1F1;
		font-size: 12px;
		color: #D0D0D0;
		border-radius: 2px;
	}
</style>
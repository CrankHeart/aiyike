<!--状态配置-->
<template>
	<div class="">
		<!--面包屑-->
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">当前位置：管理员</el-breadcrumb-item>
			<el-breadcrumb-item>状态配置</el-breadcrumb-item>
		</el-breadcrumb>
		<!--状态配置表单-->
		<div class="status_level page-bg">
			<div class="level_set">指标计算百分比</div>
			<el-form :model="indexForm" ref="indexForm" label-width="30px" class="indexForm">
				<el-form-item v-for="(domain,index) in indexForm.domains" :key="index" :label="domain.name+':'" class="level_item">
					<span class="person_index">个人指标</span>
					<el-input v-model="domain.percent" class="levelval"  @blur="handleClick(domain)"></el-input>
					<div v-if="domain.type == 0">
						<span class="day_index">0天</span>
						<el-input v-model="domain.days" class="levelval dayval" @blur="handleClick(domain)"></el-input>
						<span class="person_index">个人指标</span>
						<el-input v-model="domain.expercent" class="levelval" @blur="handleClick(domain)"></el-input>
					</div>
				</el-form-item>
				<div class="level_item">
					<el-button type="primary" @click="submitForm()" class="submitbtn">提交</el-button>
					<el-button class="cancelbtn">取消</el-button>
				</div>
			</el-form>

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

	export default {
		name: 'Test',
		mounted() {
			this.$nextTick(() => {
				this.queryParam();
			});
		},
		data() {
			return {
				indexForm: {
					domains: []
				}
			}
		},
		watch: {
			indexForm: {
				deep: true,
				handler: function(curval, oldval) {
				}
			}
		},
		components: {
			Tabs,
			TabPane
		},
		methods: {
			queryParam() {
				this.$http.post('/api/status/queryAllStatus', {
					emulateJSON: true
				}).then((res) => {
					this.indexForm.domains = res.data.result;
				}).catch((err) => {
					this.loading = false
					
				})

			},
			addDomain() {
				this.indexForm.domains.push({
					value1: '',
					value2: ''
				});
			},
			removeDomain(item) {
				var index = this.indexForm.domains.indexOf(item)
				if(index !== -1) {
					this.indexForm.domains.splice(index, 1)
				}
			},
			submitForm() {
				let newAddData = []
				for(let i in this.indexForm.domains) {
					newAddData.push(this.indexForm.domains[i])
					let val=this.indexForm.domains[i].percent
					let val1=this.indexForm.domains[i].expercent
					   if(val == 0 ||val < 0 || val > 100 ||val1 == 0 ||val1 < 0 || val1 > 100) {
						this.$message({
							customClass: 'error',
							message: '不能小于0或大于100!'
						});
						return false;
					 }
				}
				this.$http.post("/api/status/addStatusPercent", {
						labels: newAddData
					}, {
						emulateJSON: false
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
						//this.update_dialog = false;
						this.reload();
					}).catch((err) => {
						//this.update_dialog = false;
					});
			},
			handleClick(item) {
				if(item.id != undefined) {
					this.indexForm.id = item.id
					this.indexForm.days = item.days
					this.indexForm.percent = item.percent
					this.indexForm.expercent = item.expercent
						let val=this.indexForm.percent
						let val1=this.indexForm.expercent
					   if(val == 0 ||val < 0 || val > 100 ||val1 == 0 ||val1 < 0 || val1 > 100) {
						this.$message({
							customClass: 'error',
							message: '不能小于0或大于100!'
						});
						return false;
					 }
					this.$http.post("/api/status/update", this.indexForm, {
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
								var message='修改失败';
								if(data.code==500){
									message='修改失败,数据格式有误';
								}
								this.$message({
									customClass: 'error',
									message: message
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
	
	.status_level {
		margin-top: 24px;
		width: 825px;
		height: 100%;
		padding-left: 20px;
		padding-right: 20px;
		margin: 0 auto;
		padding-bottom: 20px;
		margin-bottom: 20px;
	}
	
	.levelval {
		width: 123px;
		height: 26px;
		margin-right: 45px;
		position: relative;
	}
	
	.indexForm .levelval+.levelval {
		margin-left: 20px;
	}
	
	.indexForm .levelval:before {
		position: absolute;
		content: "x";
		left: -15px;
		top: 0;
		font-size: 12px;
		color: #333333;
		letter-spacing: 0;
	}
	
	.levelval:after {
		position: absolute;
		content: "%";
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		right: 8px;
		top: 0;
	}
	
	.dayval:after {
		content: "天";
	}
	
	.person_index {
		margin-right: 25px;
		margin-left: 20px;
		font-size: 12px;
		color: #666666;
		letter-spacing: 0;
	}
	
	.day_index {
		margin-right: 25px;
		margin-left: 20px;
		text-align: center;
		width: 50px;
		display: inline-block;
		margin-top: 12px;
		font-size: 12px;
		color: #666666;
		letter-spacing: 0;
	}
	
	.level_set {
		font-size: 14px;
		color: #000000;
		letter-spacing: 0;
		margin: 20px 0 15px 0;
		padding-top: 20px;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.level_item:last-child {
		text-align: right;
	}
</style>
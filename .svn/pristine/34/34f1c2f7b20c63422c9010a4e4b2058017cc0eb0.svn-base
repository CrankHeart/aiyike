<template>
	<div class="project_config">
		<div class="page-bg">
			<div class="note_config">外围预算百分比设置</div>
			<el-form :model="form" label-width="80px" label-position="left" class="levelForm">
				<el-form-item label="外围预算百分比：" label-width="115px">
					<el-input v-model="form.value" auto-complete="off" style="width: 150px;" class="level_val"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer clearfix submit_item">
				<el-button type="primary" @click="addBtn" class="submitbtn">提交</el-button>
				<el-button @click="add_dialog = false" class="cancelbtn">取消</el-button>
			</div>
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
		data() {
			return {
				activeName: null,
				formLabelWidth: 'left',
				form: {
					value: ''
				}
			}
		},
		mounted() {
			this.$http.post('/api/dictionary/queryApplyRate', {
				emulateJSON: true
			}).then((res) => {
				let result = res.data.result;
				this.form.value = result.value;
			}).catch((err) => {
				this.loading = false
				
			})
			//let a = sessionStorage.getItem("aaaaa")
			//this.form.value=a;
		},
		methods: {
			addBtn() {
				let val = this.form.value;
				if(val == 0 ||val < 0 || val > 100) {
					this.$message({
						customClass: 'error',
						message: '不能小于等于0或大于100!'
					});
					return false;
				}
				this.$http.post("/api/dictionary/applyRate", this.form, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.$message({
								customClass: 'success',
								message: '提交修改成功'
							});
							//sessionStorage.setItem("aaaaa",this.form.value);
						} else {
							this.$message({
								customClass: 'error',
								message: '提交修改成功'
							});
						}
						this.add_dialog = false;
						this.reload();
					}).catch((err) => {
						this.add_dialog = false;
					});
			}
		}
	}
</script>

<style scoped>
	.mr-40{
		margin-right: 40px;
	}
	.page-bg {
		/*height:100%;*/
		height: calc(100% - 20px);
		padding-left: 20px;
		margin: auto;
	}
	.dialog-footer{
		text-align: right;
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
		
	.note_config {
		margin: 0px 0px 20px 0;
		padding-top: 20px;
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
		font-family: 'PingFangSC-Regular';
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		right: 8px;
		top: 0;
	}
	
	.level_set {
		font-family: 'PingFangSC-Semibold';
		font-size: 14px;
		color: #000000;
		letter-spacing: 0;
		font-weight: 700;
		margin: 20px 0 20px 35px;
		padding-top: 20px;
	}
	
	.level_remove {
		display: inline-block;
		margin-left: 10px;
		vertical-align: middle;
		width: 14px;
		height: 14px;
		background-color: #999;
		border-radius: 100%;
		cursor: pointer;
		position: relative;
	}
	
	.level_remove:after {
		width: 10px;
		position: absolute;
		content: "-";
		color: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: 700;
	}
	
	.level_item:last-child {
		text-align: right;
	}
</style>